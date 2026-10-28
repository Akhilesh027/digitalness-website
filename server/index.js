import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import multer from 'multer';
import * as cheerio from 'cheerio';
import { PDFParse } from 'pdf-parse';
import { CanvasFactory } from 'pdf-parse/worker';
import { Document, Packer, Paragraph, ImageRun, PageBreak } from 'docx';
import { PDFDocument } from 'pdf-lib';
import sharp from 'sharp';
import { ZipArchive } from 'archiver';

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT || 8787);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024,
    files: 20,
  },
});

app.use(
  cors({
    origin: true,
    exposedHeaders: [
      'x-filename',
      'x-original-size',
      'x-output-size',
      'x-conversion-fidelity',
    ],
  }),
);

app.use(express.json({ limit: '1mb' }));

/* ============================================================
   HELPERS
============================================================ */

function safeName(value = 'file') {
  return (
    String(value)
      .replace(/[^a-z0-9._-]+/gi, '-')
      .replace(/^-+|-+$/g, '') || 'file'
  );
}

function baseNameOf(name = 'file') {
  return safeName(path.basename(name, path.extname(name)));
}

function extensionOf(name = '') {
  return path.extname(name).toLowerCase();
}

function normalizeUrl(value) {
  let url = String(value || '').trim();

  if (!url) {
    throw new Error('Please enter a website URL.');
  }

  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }

  return new URL(url).toString();
}

function uploadedFiles(req) {
  return Array.isArray(req.files) ? req.files : [];
}

function requireFiles(req) {
  const files = uploadedFiles(req);

  if (!files.length) {
    throw new Error('Please upload a file first.');
  }

  return files;
}

function requireSingleFile(req) {
  return requireFiles(req)[0];
}

function requireExtensions(files, allowed, message) {
  const invalid = files.find(
    (file) => !allowed.includes(extensionOf(file.originalname)),
  );

  if (invalid) {
    throw new Error(message || `Unsupported file: ${invalid.originalname}`);
  }
}

function sendBuffer(res, buffer, filename, contentType) {
  res.setHeader('content-type', contentType);
  res.setHeader(
    'content-disposition',
    `attachment; filename="${filename}"`,
  );
  res.setHeader('x-filename', filename);
  res.setHeader('content-length', String(buffer.length));
  return res.send(buffer);
}

async function withTempDir(prefix, worker) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), prefix));

  try {
    return await worker(directory);
  } finally {
    fs.rmSync(directory, {
      recursive: true,
      force: true,
    });
  }
}

function runCommand(command, args, timeout = 120000) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      windowsHide: true,
      shell: false,
    });

    let stdout = '';
    let stderr = '';

    const timer = setTimeout(() => {
      child.kill();
      reject(new Error(`${command} timed out.`));
    }, timeout);

    child.stdout?.on('data', (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr?.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    child.on('error', (error) => {
      clearTimeout(timer);
      reject(error);
    });

    child.on('close', (code) => {
      clearTimeout(timer);

      if (code === 0) {
        resolve({ stdout, stderr });
      } else {
        reject(
          new Error(
            stderr.trim() ||
              stdout.trim() ||
              `${command} exited with code ${code}`,
          ),
        );
      }
    });
  });
}

function commandFor(type) {
  if (type === 'libreoffice') {
    return process.env.LIBREOFFICE_BIN || 'soffice';
  }

  if (type === 'ghostscript') {
    return (
      process.env.GHOSTSCRIPT_BIN ||
      (process.platform === 'win32' ? 'gswin64c.exe' : 'gs')
    );
  }

  if (type === 'pdftoppm') {
    return (
      process.env.PDFTOPPM_BIN ||
      (process.platform === 'win32' ? 'pdftoppm.exe' : 'pdftoppm')
    );
  }

  throw new Error(`Unknown dependency: ${type}`);
}

async function commandAvailable(type) {
  try {
    const command = commandFor(type);

    if (type === 'ghostscript') {
      await runCommand(command, ['--version'], 8000);
    } else if (type === 'pdftoppm') {
      await runCommand(command, ['-v'], 8000);
    } else {
      await runCommand(command, ['--version'], 8000);
    }

    return true;
  } catch {
    return false;
  }
}

/* ============================================================
   ZIP HELPER — ARCHIVER V8
============================================================ */

function zipEntries(res, entries, filename) {
  return new Promise((resolve, reject) => {
    const archive = new ZipArchive({
      zlib: {
        level: 9,
      },
    });

    archive.on('error', reject);
    res.on('finish', resolve);
    res.on('close', resolve);

    res.setHeader('content-type', 'application/zip');
    res.setHeader(
      'content-disposition',
      `attachment; filename="${filename}"`,
    );
    res.setHeader('x-filename', filename);

    archive.pipe(res);

    for (const entry of entries) {
      archive.append(entry.buffer, {
        name: entry.name,
      });
    }

    archive.finalize();
  });
}

/* ============================================================
   SEO AUDIT
============================================================ */

app.post('/api/seo-audit', async (req, res) => {
  try {
    const target = normalizeUrl(req.body.url);
    const started = Date.now();

    const response = await fetch(target, {
      headers: {
        'User-Agent': 'DigitalnessSEOTool/1.0',
      },
      redirect: 'follow',
      signal: AbortSignal.timeout(12000),
    });

    if (!response.ok) {
      throw new Error(`Target returned HTTP ${response.status}`);
    }

    const html = await response.text();
    const milliseconds = Date.now() - started;
    const $ = cheerio.load(html);

    const title = $('title').first().text().trim();
    const description =
      $('meta[name="description"]').attr('content')?.trim() || '';

    const h1 = $('h1').length;
    const h2 = $('h2').length;
    const images = $('img').length;

    const missingAlt = $('img').filter(
      (_, element) => !$(element).attr('alt'),
    ).length;

    let internal = 0;
    let external = 0;

    const host = new URL(response.url).host;

    $('a[href]').each((_, element) => {
      try {
        const href = $(element).attr('href');
        const url = new URL(href, response.url);

        if (url.protocol.startsWith('http')) {
          if (url.host === host) {
            internal += 1;
          } else {
            external += 1;
          }
        }
      } catch {
        // Ignore invalid href values.
      }
    });

    const viewport = Boolean(
      $('meta[name="viewport"]').attr('content'),
    );

    const canonical =
      $('link[rel="canonical"]').attr('href') || '';

    const checks = {
      meta_title: title ? `${title.length} characters` : 'Missing',
      meta_description: description
        ? `${description.length} characters`
        : 'Missing',
      heading_structure: `${h1} H1 / ${h2} H2`,
      images_alt: `${images - missingAlt}/${images} images have alt text`,
      internal_links: internal,
      external_links: external,
      canonical: canonical || 'Not found',
      mobile_viewport: viewport ? 'Present' : 'Missing',
      page_response: `${milliseconds} ms fetch time`,
      html_size: `${Math.round(Buffer.byteLength(html) / 1024)} KB`,
    };

    const recommendations = [];
    let score = 100;

    if (!title) {
      score -= 18;
      recommendations.push(
        'Add a unique, descriptive title element.',
      );
    } else if (title.length < 30 || title.length > 65) {
      score -= 5;
      recommendations.push(
        'Review title length and keep it concise and descriptive.',
      );
    }

    if (!description) {
      score -= 12;
      recommendations.push(
        'Add a useful meta description for the page.',
      );
    } else if (
      description.length < 70 ||
      description.length > 170
    ) {
      score -= 4;
      recommendations.push(
        'Review meta description length and message clarity.',
      );
    }

    if (h1 !== 1) {
      score -= 10;
      recommendations.push(
        `Use one clear primary H1 on this page; found ${h1}.`,
      );
    }

    if (missingAlt > 0) {
      score -= Math.min(12, missingAlt * 2);
      recommendations.push(
        `Add meaningful alt text where appropriate; ${missingAlt} image(s) currently omit it.`,
      );
    }

    if (!viewport) {
      score -= 12;
      recommendations.push(
        'Add a responsive viewport meta tag.',
      );
    }

    if (!canonical) {
      score -= 5;
      recommendations.push(
        'Consider adding a canonical URL for indexable pages.',
      );
    }

    if (milliseconds > 2500) {
      score -= 8;
      recommendations.push(
        'Investigate server and page delivery speed; the fetch response was relatively slow.',
      );
    }

    res.json({
      url: response.url,
      score: Math.max(0, score),
      title,
      description,
      checks,
      recommendations: recommendations.length
        ? recommendations
        : [
            'Core on-page checks look healthy. Continue with content quality, schema, crawlability, Core Web Vitals and off-page review.',
          ],
    });
  } catch (error) {
    res.status(400).json({
      error: error.message || 'Could not audit this URL',
    });
  }
});

/* ============================================================
   REAL-TIME MARKET RESEARCH
============================================================ */

function cleanMarketText(value = '') {
  return String(value)
    .replace(/\s+/g, ' ')
    .trim();
}

function extractDomain(url) {
  try {
    return new URL(url)
      .hostname
      .replace(/^www\./, '');
  } catch {
    return '';
  }
}

async function braveWebSearch(query, count = 8) {
  const apiKey = process.env.BRAVE_SEARCH_API_KEY;

  if (!apiKey) {
    throw new Error(
      'BRAVE_SEARCH_API_KEY is missing from the .env file.',
    );
  }

  const url = new URL(
    'https://api.search.brave.com/res/v1/web/search',
  );

  url.searchParams.set('q', query);
  url.searchParams.set('count', String(count));
  url.searchParams.set('country', 'IN');
  url.searchParams.set('search_lang', 'en');

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'X-Subscription-Token': apiKey,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Search API returned ${response.status}: ${text}`,
    );
  }

  const data = await response.json();

  return (data.web?.results || []).map((result) => ({
    title: cleanMarketText(result.title),
    url: result.url,
    domain: extractDomain(result.url),
    description: cleanMarketText(result.description),
  }));
}

function marketKeywords(results) {
  const ignored = new Set([
    'the',
    'and',
    'for',
    'with',
    'from',
    'that',
    'this',
    'your',
    'you',
    'our',
    'are',
    'best',
    'top',
    'near',
    'services',
    'service',
    'company',
    'companies',
    'india',
    'hyderabad',
    'website',
    'official',
  ]);

  const frequency = {};

  for (const result of results) {
    const text = `${result.title} ${result.description}`
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ');

    const words = text.split(/\s+/);

    for (const word of words) {
      if (word.length < 4 || ignored.has(word)) {
        continue;
      }

      frequency[word] = (frequency[word] || 0) + 1;
    }
  }

  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([keyword, mentions]) => ({
      keyword,
      mentions,
    }));
}

app.post('/api/market-research', async (req, res) => {
  try {
    const industry = String(req.body.industry || '').trim();
    const location = String(req.body.location || '').trim();

    if (!industry) {
      return res.status(400).json({
        error: 'Please enter an industry or business type.',
      });
    }

    const market = location
      ? `${industry} ${location}`
      : industry;

    const queries = [
      market,
      `${market} competitors`,
      `${industry} trends ${location}`.trim(),
    ];

    const searchGroups = [];

    for (const query of queries) {
      searchGroups.push(
        await braveWebSearch(query, 8),
      );
    }

    const combined = searchGroups.flat();
    const uniqueMap = new Map();

    for (const item of combined) {
      if (item.url && !uniqueMap.has(item.url)) {
        uniqueMap.set(item.url, item);
      }
    }

    const results = Array.from(uniqueMap.values());
    const domainMap = new Map();

    for (const result of results) {
      if (!result.domain) {
        continue;
      }

      if (!domainMap.has(result.domain)) {
        domainMap.set(result.domain, {
          domain: result.domain,
          name: result.title,
          url: result.url,
          description: result.description,
          appearances: 1,
        });
      } else {
        domainMap.get(result.domain).appearances += 1;
      }
    }

    const competitors = Array.from(domainMap.values())
      .sort((a, b) => b.appearances - a.appearances)
      .slice(0, 10);

    res.json({
      ok: true,
      live: true,
      generatedAt: new Date().toISOString(),
      industry,
      location,
      queries,
      resultCount: results.length,
      competitors,
      keywords: marketKeywords(results),
      sources: results.slice(0, 15),
    });
  } catch (error) {
    console.error('Market research error:', error);

    res.status(500).json({
      error:
        error.message ||
        'Market research failed.',
    });
  }
});

/* ============================================================
   CONTACT
============================================================ */

app.post('/api/contact', (req, res) => {
  try {
    const lead = {
      ...req.body,
      createdAt: new Date().toISOString(),
    };

    const dataDirectory = path.join(__dirname, 'data');
    const file = path.join(dataDirectory, 'leads.json');

    fs.mkdirSync(dataDirectory, {
      recursive: true,
    });

    let rows = [];

    try {
      rows = JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch {
      rows = [];
    }

    rows.push(lead);

    fs.writeFileSync(
      file,
      JSON.stringify(rows, null, 2),
    );

    res.status(201).json({
      ok: true,
    });
  } catch (error) {
    res.status(500).json({
      error:
        error.message ||
        'Could not save contact request.',
    });
  }
});

/* ============================================================
   PDF TO WORD
============================================================ */

async function pdfToWordBuffer(buffer, mode = 'preserve') {
  const selectedMode = String(mode || 'preserve').toLowerCase();

  if (selectedMode === 'editable') {
    const parser = new PDFParse({
      data: buffer,
      CanvasFactory,
    });

    try {
      const parsed = await parser.getText({
        lineEnforce: true,
        parseHyperlinks: true,
      });

      const text = String(parsed.text || '').replace(/\u0000/g, '').trim();

      if (!text) {
        throw new Error(
          'No selectable text was found in this PDF. Use “Preserve layout” mode for scanned or image-based PDFs.',
        );
      }

      const lines = text.split(/\r?\n/);
      const children = lines.map((line) =>
        new Paragraph({
          text: line,
          spacing: {
            after: line.trim() ? 80 : 0,
          },
        }),
      );

      const document = new Document({
        sections: [
          {
            properties: {
              page: {
                margin: {
                  top: 720,
                  right: 720,
                  bottom: 720,
                  left: 720,
                },
              },
            },
            children,
          },
        ],
      });

      return {
        buffer: Buffer.from(await Packer.toBuffer(document)),
        fidelity: 'Editable text mode. Selectable PDF text is extracted; complex layouts may be simplified.',
      };
    } finally {
      await parser.destroy();
    }
  }

  const parser = new PDFParse({
    data: buffer,
    CanvasFactory,
  });

  try {
    const screenshots = await parser.getScreenshot({
      desiredWidth: 1280,
      imageDataUrl: false,
      imageBuffer: true,
    });

    const pages = Array.isArray(screenshots?.pages)
      ? screenshots.pages
      : [];

    if (!pages.length) {
      throw new Error('Could not render pages from this PDF.');
    }

    const children = [];

    for (let index = 0; index < pages.length; index += 1) {
      const png = Buffer.from(pages[index].data);
      const metadata = await sharp(png).metadata();
      const sourceWidth = Number(metadata.width || 1280);
      const sourceHeight = Number(metadata.height || 1810);
      const width = 600;
      const height = Math.max(
        1,
        Math.round(width * (sourceHeight / sourceWidth)),
      );

      children.push(
        new Paragraph({
          children: [
            new ImageRun({
              type: 'png',
              data: png,
              transformation: {
                width,
                height,
              },
            }),
          ],
          spacing: {
            after: 0,
          },
        }),
      );

      if (index < pages.length - 1) {
        children.push(
          new Paragraph({
            children: [new PageBreak()],
          }),
        );
      }
    }

    const document = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 360,
                right: 360,
                bottom: 360,
                left: 360,
              },
            },
          },
          children,
        },
      ],
    });

    return {
      buffer: Buffer.from(await Packer.toBuffer(document)),
      fidelity: 'Preserve-layout mode. Every PDF page is rendered into Word so visible content is retained; page content is not fully editable.',
    };
  } finally {
    await parser.destroy();
  }
}

/* ============================================================
   WORD TO PDF
============================================================ */

async function wordToPdfBuffer(buffer, originalName) {
  if (!(await commandAvailable('libreoffice'))) {
    throw new Error(
      'Word to PDF requires LibreOffice. Install LibreOffice and make soffice available on PATH, or set LIBREOFFICE_BIN.',
    );
  }

  return withTempDir(
    'digitalness-word-pdf-',
    async (directory) => {
      const sourceExtension =
        extensionOf(originalName) || '.docx';

      const inputPath = path.join(
        directory,
        `input${sourceExtension}`,
      );

      fs.writeFileSync(inputPath, buffer);

      await runCommand(
        commandFor('libreoffice'),
        [
          '--headless',
          '--convert-to',
          'pdf',
          '--outdir',
          directory,
          inputPath,
        ],
      );

      const outputPath = path.join(
        directory,
        'input.pdf',
      );

      if (!fs.existsSync(outputPath)) {
        throw new Error(
          'LibreOffice did not create the PDF output.',
        );
      }

      return fs.readFileSync(outputPath);
    },
  );
}

/* ============================================================
   OLD /api/convert COMPATIBILITY ROUTE
============================================================ */

app.post(
  '/api/convert',
  upload.single('document'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          error: 'No document uploaded.',
        });
      }

      const type = String(req.body.type || '');
      const base = baseNameOf(req.file.originalname);

      if (type === 'word-to-pdf') {
        requireExtensions(
          [req.file],
          ['.doc', '.docx', '.odt'],
          'Word to PDF accepts DOC, DOCX and ODT files.',
        );

        const output = await wordToPdfBuffer(
          req.file.buffer,
          req.file.originalname,
        );

        return sendBuffer(
          res,
          output,
          `${base}.pdf`,
          'application/pdf',
        );
      }

      if (type === 'pdf-to-word') {
        requireExtensions(
          [req.file],
          ['.pdf'],
          'PDF to Word accepts PDF files only.',
        );

        const result = await pdfToWordBuffer(
          req.file.buffer,
          String(req.body.mode || 'preserve'),
        );

        res.setHeader(
          'x-conversion-fidelity',
          result.fidelity,
        );

        return sendBuffer(
          res,
          result.buffer,
          `${base}.docx`,
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        );
      }

      return res.status(400).json({
        error: 'Unsupported conversion type.',
      });
    } catch (error) {
      return res.status(500).json({
        error:
          error.message ||
          'Document conversion failed.',
      });
    }
  },
);

/* ============================================================
   1. PDF COMPRESSOR
============================================================ */

async function compressPdf(buffer, preset = 'balanced') {
  const profiles = {
    strong: { desiredWidth: 900, jpegQuality: 52 },
    balanced: { desiredWidth: 1200, jpegQuality: 68 },
    quality: { desiredWidth: 1600, jpegQuality: 84 },
  };

  const profile = profiles[preset] || profiles.balanced;
  const parser = new PDFParse({ data: buffer, CanvasFactory });

  try {
    const screenshots = await parser.getScreenshot({
      desiredWidth: profile.desiredWidth,
      imageDataUrl: false,
      imageBuffer: true,
    });

    const pages = Array.isArray(screenshots?.pages) ? screenshots.pages : [];
    if (!pages.length) {
      throw new Error('Could not render PDF pages for compression.');
    }

    const output = await PDFDocument.create();

    for (const page of pages) {
      const jpeg = await sharp(Buffer.from(page.data))
        .jpeg({ quality: profile.jpegQuality, mozjpeg: true })
        .toBuffer();

      const meta = await sharp(jpeg).metadata();
      const imageWidth = Number(meta.width || profile.desiredWidth);
      const imageHeight = Number(meta.height || Math.round(imageWidth * 1.414));
      const pdfWidth = 595.28;
      const pdfHeight = pdfWidth * (imageHeight / imageWidth);
      const image = await output.embedJpg(jpeg);
      const pdfPage = output.addPage([pdfWidth, pdfHeight]);
      pdfPage.drawImage(image, { x: 0, y: 0, width: pdfWidth, height: pdfHeight });
    }

    const result = Buffer.from(await output.save({ useObjectStreams: true }));
    return result.length < buffer.length ? result : buffer;
  } finally {
    await parser.destroy();
  }
}

app.post(
  '/api/file-tools/pdf-compress',
  upload.array('files', 1),
  async (req, res) => {
    try {
      const file = requireSingleFile(req);

      requireExtensions(
        [file],
        ['.pdf'],
        'PDF Compressor accepts PDF files only.',
      );

      const output = await compressPdf(
        file.buffer,
        String(req.body.preset || 'balanced'),
      );

      res.setHeader(
        'x-original-size',
        String(file.buffer.length),
      );

      res.setHeader(
        'x-output-size',
        String(output.length),
      );

      return sendBuffer(
        res,
        output,
        `${baseNameOf(
          file.originalname,
        )}-compressed.pdf`,
        'application/pdf',
      );
    } catch (error) {
      return res.status(400).json({
        error:
          error.message ||
          'PDF compression failed.',
      });
    }
  },
);

/* ============================================================
   2. PDF TO WORD
============================================================ */

app.post(
  '/api/file-tools/pdf-to-word',
  upload.array('files', 1),
  async (req, res) => {
    try {
      const file = requireSingleFile(req);

      requireExtensions(
        [file],
        ['.pdf'],
        'PDF to Word accepts PDF files only.',
      );

      const result = await pdfToWordBuffer(
        file.buffer,
        String(req.body.mode || 'preserve'),
      );

      res.setHeader(
        'x-conversion-fidelity',
        result.fidelity,
      );

      return sendBuffer(
        res,
        result.buffer,
        `${baseNameOf(file.originalname)}.docx`,
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      );
    } catch (error) {
      return res.status(400).json({
        error:
          error.message ||
          'PDF to Word failed.',
      });
    }
  },
);

/* ============================================================
   3. WORD TO PDF
============================================================ */

app.post(
  '/api/file-tools/word-to-pdf',
  upload.array('files', 1),
  async (req, res) => {
    try {
      const file = requireSingleFile(req);

      requireExtensions(
        [file],
        ['.doc', '.docx', '.odt'],
        'Word to PDF accepts DOC, DOCX and ODT files.',
      );

      const output = await wordToPdfBuffer(
        file.buffer,
        file.originalname,
      );

      return sendBuffer(
        res,
        output,
        `${baseNameOf(file.originalname)}.pdf`,
        'application/pdf',
      );
    } catch (error) {
      return res.status(400).json({
        error:
          error.message ||
          'Word to PDF failed.',
      });
    }
  },
);

/* ============================================================
   4. MERGE PDF
============================================================ */

async function mergePdfs(files) {
  const output = await PDFDocument.create();

  for (const file of files) {
    const source = await PDFDocument.load(
      file.buffer,
    );

    const pages = await output.copyPages(
      source,
      source.getPageIndices(),
    );

    for (const page of pages) {
      output.addPage(page);
    }
  }

  return Buffer.from(
    await output.save({
      useObjectStreams: true,
    }),
  );
}

app.post(
  '/api/file-tools/pdf-merge',
  upload.array('files', 20),
  async (req, res) => {
    try {
      const files = requireFiles(req);

      if (files.length < 2) {
        throw new Error(
          'Choose at least two PDF files to merge.',
        );
      }

      requireExtensions(
        files,
        ['.pdf'],
        'Merge PDF accepts PDF files only.',
      );

      const output = await mergePdfs(files);

      return sendBuffer(
        res,
        output,
        'merged.pdf',
        'application/pdf',
      );
    } catch (error) {
      return res.status(400).json({
        error:
          error.message ||
          'PDF merge failed.',
      });
    }
  },
);

/* ============================================================
   5. SPLIT PDF
============================================================ */

function parseSplitRanges(value, pageCount) {
  const input = String(value || '').trim();

  if (!input) {
    return Array.from(
      { length: pageCount },
      (_, index) => [index],
    );
  }

  const groups = [];

  const tokens = input
    .split(',')
    .map((token) => token.trim())
    .filter(Boolean);

  for (const token of tokens) {
    const match = token.match(
      /^(\d+)(?:-(\d+))?$/,
    );

    if (!match) {
      throw new Error(
        'Page groups must look like 1-3,4,5-7.',
      );
    }

    const start = Number(match[1]);
    const end = Number(match[2] || match[1]);

    if (
      start < 1 ||
      end < start ||
      end > pageCount
    ) {
      throw new Error(
        `Invalid page group "${token}". The PDF has ${pageCount} page(s).`,
      );
    }

    groups.push(
      Array.from(
        {
          length: end - start + 1,
        },
        (_, index) => start - 1 + index,
      ),
    );
  }

  return groups;
}

async function splitPdf(buffer, ranges, base) {
  const source = await PDFDocument.load(buffer);

  const groups = parseSplitRanges(
    ranges,
    source.getPageCount(),
  );

  const results = [];

  for (
    let index = 0;
    index < groups.length;
    index += 1
  ) {
    const output = await PDFDocument.create();

    const pages = await output.copyPages(
      source,
      groups[index],
    );

    for (const page of pages) {
      output.addPage(page);
    }

    results.push({
      name: `${base}-part-${String(
        index + 1,
      ).padStart(2, '0')}.pdf`,

      buffer: Buffer.from(
        await output.save({
          useObjectStreams: true,
        }),
      ),
    });
  }

  return results;
}

app.post(
  '/api/file-tools/pdf-split',
  upload.array('files', 1),
  async (req, res) => {
    try {
      const file = requireSingleFile(req);

      requireExtensions(
        [file],
        ['.pdf'],
        'Split PDF accepts PDF files only.',
      );

      const base = baseNameOf(
        file.originalname,
      );

      const parts = await splitPdf(
        file.buffer,
        req.body.ranges,
        base,
      );

      return await zipEntries(
        res,
        parts,
        `${base}-split.zip`,
      );
    } catch (error) {
      if (!res.headersSent) {
        return res.status(400).json({
          error:
            error.message ||
            'PDF split failed.',
        });
      }
    }
  },
);

/* ============================================================
   6. JPG TO PDF
============================================================ */

async function jpgsToPdf(files) {
  const document = await PDFDocument.create();

  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 24;

  for (const file of files) {
    const jpeg = await sharp(file.buffer)
      .rotate()
      .jpeg({
        quality: 92,
      })
      .toBuffer();

    const image = await document.embedJpg(jpeg);

    const availableWidth =
      pageWidth - margin * 2;

    const availableHeight =
      pageHeight - margin * 2;

    const scale = Math.min(
      availableWidth / image.width,
      availableHeight / image.height,
      1,
    );

    const width = image.width * scale;
    const height = image.height * scale;

    const page = document.addPage([
      pageWidth,
      pageHeight,
    ]);

    page.drawImage(image, {
      x: (pageWidth - width) / 2,
      y: (pageHeight - height) / 2,
      width,
      height,
    });
  }

  return Buffer.from(
    await document.save({
      useObjectStreams: true,
    }),
  );
}

app.post(
  '/api/file-tools/jpg-to-pdf',
  upload.array('files', 20),
  async (req, res) => {
    try {
      const files = requireFiles(req);

      requireExtensions(
        files,
        ['.jpg', '.jpeg'],
        'JPG to PDF accepts JPG/JPEG images only.',
      );

      const output = await jpgsToPdf(files);

      return sendBuffer(
        res,
        output,
        'images.pdf',
        'application/pdf',
      );
    } catch (error) {
      return res.status(400).json({
        error:
          error.message ||
          'JPG to PDF failed.',
      });
    }
  },
);

/* ============================================================
   7. PDF TO JPG
============================================================ */

async function pdfToJpgFiles(
  buffer,
  originalName,
  dpi = 150,
) {
  const resolution = Math.max(72, Math.min(300, Number(dpi) || 150));
  const desiredWidth = Math.max(
    720,
    Math.min(2480, Math.round((resolution / 150) * 1240)),
  );

  const parser = new PDFParse({ data: buffer, CanvasFactory });

  try {
    const screenshots = await parser.getScreenshot({
      desiredWidth,
      imageDataUrl: false,
      imageBuffer: true,
    });

    const pages = Array.isArray(screenshots?.pages) ? screenshots.pages : [];
    if (!pages.length) {
      throw new Error('No PDF pages were rendered.');
    }

    const results = [];

    for (let index = 0; index < pages.length; index += 1) {
      const jpg = await sharp(Buffer.from(pages[index].data))
        .jpeg({ quality: 90, mozjpeg: true })
        .toBuffer();

      results.push({
        name: `${baseNameOf(originalName)}-page-${String(index + 1).padStart(2, '0')}.jpg`,
        buffer: jpg,
      });
    }

    return results;
  } finally {
    await parser.destroy();
  }
}

app.post(
  '/api/file-tools/pdf-to-jpg',
  upload.array('files', 1),
  async (req, res) => {
    try {
      const file = requireSingleFile(req);

      requireExtensions(
        [file],
        ['.pdf'],
        'PDF to JPG accepts PDF files only.',
      );

      const pages = await pdfToJpgFiles(
        file.buffer,
        file.originalname,
        req.body.dpi,
      );

      return await zipEntries(
        res,
        pages,
        `${baseNameOf(
          file.originalname,
        )}-jpg.zip`,
      );
    } catch (error) {
      if (!res.headersSent) {
        return res.status(400).json({
          error:
            error.message ||
            'PDF to JPG failed.',
        });
      }
    }
  },
);

/* ============================================================
   8. IMAGE COMPRESSOR
============================================================ */

async function compressImage(file, quality = 75) {
  const selectedQuality = Math.max(
    20,
    Math.min(95, Number(quality) || 75),
  );

  const metadata = await sharp(
    file.buffer,
  ).metadata();

  if (metadata.format === 'png') {
    return {
      extension: 'png',
      type: 'image/png',
      buffer: await sharp(file.buffer)
        .rotate()
        .png({
          compressionLevel: 9,
          palette: true,
          quality: selectedQuality,
        })
        .toBuffer(),
    };
  }

  if (metadata.format === 'webp') {
    return {
      extension: 'webp',
      type: 'image/webp',
      buffer: await sharp(file.buffer)
        .rotate()
        .webp({
          quality: selectedQuality,
        })
        .toBuffer(),
    };
  }

  return {
    extension: 'jpg',
    type: 'image/jpeg',
    buffer: await sharp(file.buffer)
      .rotate()
      .jpeg({
        quality: selectedQuality,
        mozjpeg: true,
      })
      .toBuffer(),
  };
}

app.post(
  '/api/file-tools/image-compress',
  upload.array('files', 1),
  async (req, res) => {
    try {
      const file = requireSingleFile(req);

      requireExtensions(
        [file],
        ['.jpg', '.jpeg', '.png', '.webp'],
        'Image Compressor accepts JPG, PNG and WebP files.',
      );

      const output = await compressImage(
        file,
        req.body.quality,
      );

      res.setHeader(
        'x-original-size',
        String(file.buffer.length),
      );

      res.setHeader(
        'x-output-size',
        String(output.buffer.length),
      );

      return sendBuffer(
        res,
        output.buffer,
        `${baseNameOf(
          file.originalname,
        )}-compressed.${output.extension}`,
        output.type,
      );
    } catch (error) {
      return res.status(400).json({
        error:
          error.message ||
          'Image compression failed.',
      });
    }
  },
);

/* ============================================================
   9. IMAGE RESIZER
============================================================ */

async function resizeImage(
  file,
  width,
  height,
  fit = 'inside',
) {
  const selectedWidth =
    Number(width) > 0
      ? Math.min(12000, Number(width))
      : undefined;

  const selectedHeight =
    Number(height) > 0
      ? Math.min(12000, Number(height))
      : undefined;

  if (!selectedWidth && !selectedHeight) {
    throw new Error(
      'Enter a width, a height, or both.',
    );
  }

  const allowedFits = new Set([
    'inside',
    'cover',
    'contain',
    'fill',
  ]);

  const selectedFit = allowedFits.has(fit)
    ? fit
    : 'inside';

  const metadata = await sharp(
    file.buffer,
  ).metadata();

  const image = sharp(file.buffer)
    .rotate()
    .resize({
      width: selectedWidth,
      height: selectedHeight,
      fit: selectedFit,
      withoutEnlargement: false,
    });

  if (metadata.format === 'png') {
    return {
      extension: 'png',
      type: 'image/png',
      buffer: await image
        .png({
          compressionLevel: 9,
        })
        .toBuffer(),
    };
  }

  if (metadata.format === 'webp') {
    return {
      extension: 'webp',
      type: 'image/webp',
      buffer: await image
        .webp({
          quality: 90,
        })
        .toBuffer(),
    };
  }

  return {
    extension: 'jpg',
    type: 'image/jpeg',
    buffer: await image
      .jpeg({
        quality: 90,
        mozjpeg: true,
      })
      .toBuffer(),
  };
}

app.post(
  '/api/file-tools/image-resize',
  upload.array('files', 1),
  async (req, res) => {
    try {
      const file = requireSingleFile(req);

      requireExtensions(
        [file],
        ['.jpg', '.jpeg', '.png', '.webp'],
        'Image Resizer accepts JPG, PNG and WebP files.',
      );

      const output = await resizeImage(
        file,
        req.body.width,
        req.body.height,
        String(req.body.fit || 'inside'),
      );

      return sendBuffer(
        res,
        output.buffer,
        `${baseNameOf(
          file.originalname,
        )}-resized.${output.extension}`,
        output.type,
      );
    } catch (error) {
      return res.status(400).json({
        error:
          error.message ||
          'Image resize failed.',
      });
    }
  },
);

/* ============================================================
   10. JPG / PNG / WEBP CONVERTER
============================================================ */

async function convertImage(
  file,
  format = 'webp',
  quality = 85,
) {
  const selectedQuality = Math.max(
    20,
    Math.min(100, Number(quality) || 85),
  );

  const image = sharp(file.buffer).rotate();

  if (format === 'png') {
    return {
      extension: 'png',
      type: 'image/png',
      buffer: await image
        .png({
          compressionLevel: 9,
        })
        .toBuffer(),
    };
  }

  if (format === 'jpg' || format === 'jpeg') {
    return {
      extension: 'jpg',
      type: 'image/jpeg',
      buffer: await image
        .jpeg({
          quality: selectedQuality,
          mozjpeg: true,
        })
        .toBuffer(),
    };
  }

  return {
    extension: 'webp',
    type: 'image/webp',
    buffer: await image
      .webp({
        quality: selectedQuality,
      })
      .toBuffer(),
  };
}

app.post(
  '/api/file-tools/image-convert',
  upload.array('files', 1),
  async (req, res) => {
    try {
      const file = requireSingleFile(req);

      requireExtensions(
        [file],
        ['.jpg', '.jpeg', '.png', '.webp'],
        'Image Converter accepts JPG, PNG and WebP files.',
      );

      const format = String(
        req.body.format || 'webp',
      ).toLowerCase();

      if (
        !['jpg', 'jpeg', 'png', 'webp'].includes(
          format,
        )
      ) {
        throw new Error(
          'Output format must be JPG, PNG or WebP.',
        );
      }

      const output = await convertImage(
        file,
        format,
        req.body.quality,
      );

      return sendBuffer(
        res,
        output.buffer,
        `${baseNameOf(
          file.originalname,
        )}.${output.extension}`,
        output.type,
      );
    } catch (error) {
      return res.status(400).json({
        error:
          error.message ||
          'Image conversion failed.',
      });
    }
  },
);

/* ============================================================
   HEALTH
============================================================ */


app.get('/', (req, res) => {
  res.json({
    ok: true,
    service: 'Digitalness API',
    health: '/api/health',
  });
});

app.get('/api/health', async (_, res) => {
  const [
    libreOffice,
    ghostscript,
    poppler,
  ] = await Promise.all([
    commandAvailable('libreoffice'),
    commandAvailable('ghostscript'),
    commandAvailable('pdftoppm'),
  ]);

  res.json({
    ok: true,
    service: 'Digitalness local API',
    dependencies: {
      libreOffice,
      ghostscript,
      poppler,
    },
  });
});

/* ============================================================
   MULTER / SERVER ERRORS
============================================================ */

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).json({
      error:
        error.code === 'LIMIT_FILE_SIZE'
          ? 'File is too large. Maximum size is 50 MB.'
          : error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    error: 'Unexpected server error.',
  });
});

/* ============================================================
   START
============================================================ */

app.listen(PORT, () => {
  console.log(
    `Digitalness API running at http://localhost:${PORT}`,
  );
});
