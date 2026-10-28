import { useEffect, useMemo, useState } from 'react';
import Seo from '../components/Seo';
import '../styles/free_filetools.css';

const API_BASE =
  import.meta.env.VITE_API_URL ||
  '';

const fileToolsCss = `
  .tools-nav-label {
    display: block;
    margin: 10px 10px 8px;
    color: rgba(19, 1, 80, .55);
    font-size: .66rem;
    font-weight: 800;
    letter-spacing: .12em;
    text-transform: uppercase;
  }

  .tools-nav-label-files {
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid rgba(19, 1, 80, .1);
  }

  .file-tool-panel {
    display: grid;
    gap: 22px;
  }

  .file-tool-intro {
    display: grid;
    gap: 8px;
  }

  .file-tool-intro h3 {
    margin: 0;
    max-width: 760px;
    color: #17152b;
    font-size: 1rem;
    font-weight: 650;
    line-height: 1.6;
  }

  .file-tool-form {
    display: grid;
    gap: 18px;
  }

  .file-tool-upload {
    display: grid;
    gap: 9px;
  }

  .file-tool-upload > span,
  .file-tool-options label > span {
    color: #28243f;
    font-size: .78rem;
    font-weight: 750;
  }

  .file-tool-upload input[type="file"] {
    width: 100%;
    padding: 18px;
    border: 1px dashed rgba(19, 1, 80, .24);
    border-radius: 15px;
    background: #faf9ff;
    color: #48435d;
    cursor: pointer;
  }

  .file-tool-upload input[type="file"]::file-selector-button {
    margin-right: 12px;
    padding: 10px 14px;
    border: 0;
    border-radius: 10px;
    background: #130150;
    color: #fff;
    font-family: inherit;
    font-weight: 700;
    cursor: pointer;
  }

  .file-tool-selected {
    display: grid;
    gap: 7px;
  }

  .file-tool-file-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 14px;
    align-items: center;
    padding: 10px 12px;
    border: 1px solid #e8e6f0;
    border-radius: 11px;
    background: #fff;
  }

  .file-tool-file-main {
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .file-tool-file-actions {
    display: flex;
    gap: 6px;
  }

  .file-tool-file-actions button {
    min-width: 34px;
    height: 32px;
    padding: 0 9px;
    border: 1px solid #dfdbea;
    border-radius: 9px;
    background: #fff;
    color: #130150;
    font: inherit;
    font-size: .7rem;
    font-weight: 800;
    cursor: pointer;
  }

  .file-tool-file-actions button:disabled {
    opacity: .35;
    cursor: default;
  }

  .file-tool-selected b {
    min-width: 0;
    overflow: hidden;
    color: #29243e;
    font-size: .76rem;
    font-weight: 700;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .file-tool-selected small {
    flex: none;
    color: #7b758f;
    font-size: .68rem;
  }

  .file-tool-options {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  .file-tool-options label {
    display: grid;
    gap: 7px;
  }

  .file-tool-options input,
  .file-tool-options select {
    width: 100%;
    min-height: 46px;
    padding: 0 12px;
    border: 1px solid #dfdcea;
    border-radius: 11px;
    background: #fff;
    color: #211b3c;
    font: inherit;
  }

  .file-tool-options input[type="range"] {
    min-height: 28px;
    padding: 0;
    accent-color: #130150;
  }

  .file-tool-form .btn {
    justify-self: start;
  }

  .file-tool-message,
  .file-tool-success {
    margin: 0;
    padding: 13px 15px;
    border-radius: 12px;
    font-size: .78rem;
    font-weight: 650;
    line-height: 1.55;
  }

  .file-tool-success {
    border: 1px solid rgba(29, 133, 87, .18);
    background: rgba(29, 133, 87, .07);
    color: #16653f;
  }

  .tool-error.file-tool-message {
    border: 1px solid rgba(185, 48, 65, .18);
    background: rgba(185, 48, 65, .06);
    color: #8c2432;
  }

  .file-tool-panel .tool-note {
    margin: 0;
    color: #706a82;
    font-size: .75rem;
    line-height: 1.6;
  }

  .file-tool-hub {
    display: grid;
    gap: 22px;
  }

  .file-tool-hub-picker {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(260px, 420px);
    gap: 20px;
    align-items: end;
    padding: 20px;
    border: 1px solid #e3e0ec;
    border-radius: 18px;
    background: linear-gradient(180deg, #ffffff 0%, #faf9ff 100%);
  }

  .file-tool-hub-copy {
    display: grid;
    gap: 7px;
  }

  .file-tool-hub-copy strong {
    color: #17152b;
    font-size: 1rem;
  }

  .file-tool-hub-copy p {
    margin: 0;
    max-width: 680px;
    color: #706a82;
    font-size: .78rem;
    line-height: 1.6;
  }

  .file-tool-hub-select {
    display: grid;
    gap: 7px;
  }

  .file-tool-hub-select span {
    color: #28243f;
    font-size: .72rem;
    font-weight: 800;
  }

  .file-tool-hub-select select {
    width: 100%;
    min-height: 50px;
    padding: 0 42px 0 14px;
    border: 1px solid #dcd8e8;
    border-radius: 12px;
    background: #fff;
    color: #130150;
    font: inherit;
    font-weight: 750;
    cursor: pointer;
  }

  .file-tool-hub-current {
    display: grid;
    gap: 16px;
  }

  .file-tool-hub-title {
    display: flex;
    justify-content: space-between;
    gap: 14px;
    align-items: flex-start;
    padding-bottom: 14px;
    border-bottom: 1px solid #ece9f3;
  }

  .file-tool-hub-title h3 {
    margin: 0;
    color: #130150;
    font-size: 1.18rem;
  }

  .file-tool-hub-title span {
    flex: none;
    padding: 6px 9px;
    border-radius: 999px;
    background: #f1effa;
    color: #61567e;
    font-size: .65rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: .08em;
  }

  @media (max-width: 760px) {
    .file-tool-options {
      grid-template-columns: 1fr;
    }

    .file-tool-file-row {
      grid-template-columns: 1fr;
    }

    .file-tool-file-actions {
      flex-wrap: wrap;
    }

    .file-tool-form .btn {
      width: 100%;
    }

    .file-tool-hub-picker {
      grid-template-columns: 1fr;
      padding: 16px;
    }

    .file-tool-hub-title {
      flex-direction: column;
    }
  }


  .tools-file-dropdown-wrap {
    display: grid;
    gap: 10px;
    margin-top: 4px;
  }

  .tools-file-dropdown-toggle {
    width: 100%;
    display: flex !important;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .tools-file-dropdown-toggle .tools-file-chevron {
    font-size: 13px;
    line-height: 1;
    transition: transform .2s ease;
  }

  .tools-file-dropdown-toggle.open .tools-file-chevron {
    transform: rotate(180deg);
  }

  .tools-file-dropdown-panel {
    padding: 10px;
    border: 1px solid #e4e1ed;
    border-radius: 14px;
    background: #fbfaff;
    box-shadow: 0 10px 24px rgba(19, 1, 80, .07);
  }

  .tools-file-dropdown-panel label {
    display: grid;
    gap: 7px;
    margin: 0;
    color: #605b70;
    font-size: 12px;
    font-weight: 800;
  }

  .tools-file-dropdown-panel select {
    width: 100%;
    min-width: 0;
    padding: 11px 12px;
    border: 1px solid #d9d5e4;
    border-radius: 10px;
    background: #fff;
    color: #130150;
    font: inherit;
    font-size: 14px;
    font-weight: 750;
    outline: none;
  }

  .tools-file-dropdown-panel select:focus {
    border-color: #6d5dfc;
    box-shadow: 0 0 0 3px rgba(109, 93, 252, .12);
  }

`;

const growthToolNames = [
  'Logo Generator',
  'Color Palette',
  'Typography',
  'Market Research',
  'Brand Positioning',
  'Branding Funnel',
  'SEO Audit',
  'Keyword Ideas',
  'Marketing Funnel'
];

const fileToolGroups = [
  {
    name: 'File Conversion',
    description:
      'Convert between the supported document, PDF and image formats from one compact selector.',
    tools: [
      'PDF to Word',
      'Word to PDF',
      'JPG to PDF',
      'PDF to JPG',
      'JPG/PNG/WebP Converter'
    ]
  },
  {
    name: 'PDF Utilities',
    description:
      'Compress, merge or split PDF files without filling the sidebar with separate entries.',
    tools: [
      'PDF Compressor',
      'Merge PDF',
      'Split PDF'
    ]
  },
  {
    name: 'Image Utilities',
    description:
      'Compress or resize supported images from one compact image-tools selector.',
    tools: [
      'Image Compressor',
      'Image Resizer'
    ]
  }
];


const fileToolNames = [
  'PDF Compressor',
  'PDF to Word',
  'Word to PDF',
  'Merge PDF',
  'Split PDF',
  'JPG to PDF',
  'PDF to JPG',
  'Image Compressor',
  'Image Resizer',
  'JPG/PNG/WebP Converter'
];

async function apiFetch(path, options = {}) {
  return fetch(`${API_BASE}${path}`, options);
}

/* ============================================================
   LOGO GENERATOR
============================================================ */

const LOGO_STYLE_PRESETS = {
  modern: {
    label: 'Modern',
    fontFamily: '"Montserrat", sans-serif',
    weight: 800,
    radius: 24,
    iconStroke: 4.5,
    letterSpacing: -0.5,
    frame: 'soft',
    description:
      'Clean geometry, contemporary typography and simplified symbols.'
  },

  premium: {
    label: 'Premium',
    fontFamily: 'Georgia, "Times New Roman", serif',
    weight: 700,
    radius: 30,
    iconStroke: 2.7,
    letterSpacing: 1.2,
    frame: 'elegant',
    description:
      'Refined typography, restrained details and luxury-inspired composition.'
  },

  minimalist: {
    label: 'Minimalist',
    fontFamily: '"Montserrat", sans-serif',
    weight: 650,
    radius: 18,
    iconStroke: 2.7,
    letterSpacing: 1,
    frame: 'minimal',
    description:
      'Simple marks, generous spacing and minimal visual elements.'
  },

  creative: {
    label: 'Creative',
    fontFamily: '"Montserrat", sans-serif',
    weight: 850,
    radius: 28,
    iconStroke: 4,
    letterSpacing: -0.7,
    frame: 'creative',
    description:
      'Expressive shapes, unusual compositions and more playful visual direction.'
  },

  professional: {
    label: 'Professional',
    fontFamily: '"Montserrat", sans-serif',
    weight: 750,
    radius: 16,
    iconStroke: 3.8,
    letterSpacing: 0,
    frame: 'corporate',
    description:
      'Balanced corporate layouts with trustworthy typography and structure.'
  }
};

const LOGO_INDUSTRIES = [
  'Furniture & Interiors',
  'Technology & IT',
  'Food & Restaurants',
  'Fashion & Beauty',
  'Real Estate',
  'Healthcare',
  'Education',
  'E-commerce & Retail',
  'Digital Services',
  'Professional Services'
];

const INDUSTRY_KEYWORDS = {
  furniture: [
    'furniture',
    'interior',
    'interiors',
    'sofa',
    'chair',
    'decor',
    'home'
  ],

  technology: [
    'technology',
    'tech',
    'digital',
    'it',
    'software',
    'saas',
    'web',
    'app'
  ],

  food: [
    'food',
    'restaurant',
    'restaurants',
    'cafe',
    'bakery',
    'kitchen',
    'chef',
    'catering'
  ],

  fashion: [
    'fashion',
    'beauty',
    'salon',
    'boutique',
    'makeup',
    'cosmetic',
    'luxury'
  ],

  realestate: [
    'real estate',
    'realestate',
    'property',
    'builder',
    'construction',
    'housing',
    'plots'
  ],

  healthcare: [
    'healthcare',
    'medical',
    'hospital',
    'clinic',
    'doctor',
    'pharma',
    'health'
  ],

  education: [
    'education',
    'school',
    'college',
    'academy',
    'training',
    'learning',
    'institute'
  ],

  ecommerce: [
    'ecommerce',
    'e-commerce',
    'retail',
    'shop',
    'shopping',
    'marketplace',
    'store'
  ],

  professional: [
    'professional',
    'consulting',
    'consultancy',
    'legal',
    'law',
    'finance',
    'corporate'
  ]
};

function normalizeLogoStyle(style = '') {
  const value =
    String(style)
      .trim()
      .toLowerCase();

  if (value.includes('premium')) {
    return 'premium';
  }

  if (value.includes('minimal')) {
    return 'minimalist';
  }

  if (value.includes('creative')) {
    return 'creative';
  }

  if (value.includes('professional')) {
    return 'professional';
  }

  return 'modern';
}


function normalizeLogoIndustry(industry = '') {
  const value =
    String(industry)
      .trim()
      .toLowerCase();

  for (
    const [key, words]
    of Object.entries(
      INDUSTRY_KEYWORDS
    )
  ) {
    if (
      words.some(
        word =>
          value.includes(word)
      )
    ) {
      return key;
    }
  }

  return 'technology';
}


function logoClamp(
  value,
  min,
  max
) {
  return Math.min(
    max,
    Math.max(
      min,
      value
    )
  );
}


function logoHexToRgb(hex) {
  if (!hex) {
    return null;
  }

  let clean =
    String(hex)
      .trim()
      .replace('#', '');

  if (clean.length === 3) {
    clean =
      clean
        .split('')
        .map(
          character =>
            character + character
        )
        .join('');
  }

  if (
    !/^[0-9a-fA-F]{6}$/.test(
      clean
    )
  ) {
    return null;
  }

  const number =
    parseInt(
      clean,
      16
    );

  return {
    r:
      (number >> 16) &
      255,

    g:
      (number >> 8) &
      255,

    b:
      number &
      255
  };
}


function logoRgbToHex({
  r,
  g,
  b
}) {
  const toHex =
    value =>
      logoClamp(
        Math.round(value),
        0,
        255
      )
        .toString(16)
        .padStart(
          2,
          '0'
        );

  return (
    `#${toHex(r)}${toHex(g)}${toHex(b)}`
  );
}


function parseLogoColor(
  value
) {
  if (!value) {
    return '#6D5DFC';
  }

  const text =
    String(value)
      .trim();

  if (
    text.startsWith('#')
  ) {
    const rgb =
      logoHexToRgb(text);

    return rgb
      ? logoRgbToHex(rgb)
      : '#6D5DFC';
  }

  const match =
    text.match(
      /^rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i
    ) ||
    text.match(
      /^(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})$/i
    );

  if (!match) {
    return '#6D5DFC';
  }

  const values = [
    Number(match[1]),
    Number(match[2]),
    Number(match[3])
  ];

  if (
    values.some(
      value =>
        value < 0 ||
        value > 255
    )
  ) {
    return '#6D5DFC';
  }

  return logoRgbToHex({
    r: values[0],
    g: values[1],
    b: values[2]
  });
}


function mixLogoColor(
  hex,
  target,
  amount
) {
  const source =
    logoHexToRgb(hex);

  const destination =
    logoHexToRgb(target);

  if (
    !source ||
    !destination
  ) {
    return hex;
  }

  const ratio =
    logoClamp(
      amount,
      0,
      1
    );

  return logoRgbToHex({
    r:
      source.r +
      (
        destination.r -
        source.r
      ) *
        ratio,

    g:
      source.g +
      (
        destination.g -
        source.g
      ) *
        ratio,

    b:
      source.b +
      (
        destination.b -
        source.b
      ) *
        ratio
  });
}


function lightenLogoColor(
  hex,
  amount = .2
) {
  return mixLogoColor(
    hex,
    '#FFFFFF',
    amount
  );
}


function darkenLogoColor(
  hex,
  amount = .2
) {
  return mixLogoColor(
    hex,
    '#000000',
    amount
  );
}


function logoLuminance(
  hex
) {
  const rgb =
    logoHexToRgb(hex);

  if (!rgb) {
    return 0;
  }

  const channel =
    value => {
      const converted =
        value / 255;

      return converted <=
        .03928
        ? converted / 12.92
        : Math.pow(
            (
              converted +
              .055
            ) /
              1.055,
            2.4
          );
    };

  return (
    .2126 *
      channel(rgb.r) +
    .7152 *
      channel(rgb.g) +
    .0722 *
      channel(rgb.b)
  );
}


function logoReadableText(
  background
) {
  return logoLuminance(
    background
  ) > .46
    ? '#111827'
    : '#FFFFFF';
}


function logoSeed(
  value
) {
  let hash = 0;

  const text =
    String(value);

  for (
    let index = 0;
    index < text.length;
    index += 1
  ) {
    hash =
      (
        (
          hash << 5
        ) -
        hash
      ) +
      text.charCodeAt(index);

    hash |= 0;
  }

  return (
    Math.abs(hash) +
    1
  );
}


function logoRandom(
  seed
) {
  let state =
    seed %
    2147483647;

  if (
    state <= 0
  ) {
    state +=
      2147483646;
  }

  return () => {
    state =
      (
        state *
        16807
      ) %
      2147483647;

    return (
      state -
      1
    ) /
      2147483646;
  };
}


function getLogoInitials(
  name = ''
) {
  const parts =
    String(name)
      .trim()
      .split(/\s+/)
      .filter(Boolean);

  if (!parts.length) {
    return 'LG';
  }

  if (
    parts.length === 1
  ) {
    return parts[0]
      .slice(
        0,
        2
      )
      .toUpperCase();
  }

  return (
    parts[0][0] +
    parts[
      parts.length - 1
    ][0]
  ).toUpperCase();
}


function logoDisplayName(
  name = ''
) {
  const value =
    String(name)
      .trim() ||
    'Your Brand';

  return value.length > 22
    ? `${value.slice(0, 20)}…`
    : value;
}


function splitLogoName(
  name = ''
) {
  const parts =
    String(name)
      .trim()
      .split(/\s+/)
      .filter(Boolean);

  if (
    parts.length <= 1
  ) {
    return [
      logoDisplayName(name)
    ];
  }

  const midpoint =
    Math.ceil(
      parts.length /
      2
    );

  return [
    parts
      .slice(
        0,
        midpoint
      )
      .join(' '),

    parts
      .slice(midpoint)
      .join(' ')
  ];
}


function logoIndustryLabel(
  industryKey,
  originalIndustry
) {
  const labels = {
    furniture:
      'Furniture & Interiors',

    technology:
      'Technology & IT',

    food:
      'Food & Restaurant',

    fashion:
      'Fashion & Beauty',

    realestate:
      'Real Estate',

    healthcare:
      'Healthcare',

    education:
      'Education',

    ecommerce:
      'E-commerce & Retail',

    professional:
      'Professional Services'
  };

  return (
    labels[industryKey] ||
    originalIndustry ||
    'Business Identity'
  );
}


function IndustryLogoIcon({
  industryKey,
  color,
  accent,
  styleKey,
  variant = 0,
  stroke = 4
}) {
  const strokeWidth =
    styleKey === 'premium'
      ? Math.max(
          2,
          stroke - 1
        )
      : stroke;

  const common = {
    fill: 'none',
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  };

  const detailColor =
    styleKey === 'minimalist'
      ? color
      : accent;

  switch (
    industryKey
  ) {
    case 'furniture':
      if (
        variant % 3 === 1
      ) {
        return (
          <g {...common}>
            <path d="M28 30h44v44H28z" />
            <path d="M35 63V45h30v18" />
            <path d="M35 56h30" />
            <path d="M39 74v8M61 74v8" />
            <circle
              cx="72"
              cy="28"
              r="4"
              fill={detailColor}
              stroke="none"
            />
          </g>
        );
      }

      if (
        variant % 3 === 2
      ) {
        return (
          <g {...common}>
            <path d="M24 62c0-10 8-18 18-18h16c10 0 18 8 18 18v10H24z" />
            <path d="M34 44V32h32v12" />
            <path d="M32 72v9M68 72v9" />
            <path d="M50 32V20" />
            <circle
              cx="50"
              cy="18"
              r="4"
              fill={detailColor}
              stroke="none"
            />
          </g>
        );
      }

      return (
        <g {...common}>
          <rect
            x="18"
            y="49"
            width="64"
            height="20"
            rx="6"
          />
          <rect
            x="28"
            y="34"
            width="44"
            height="19"
            rx="6"
          />
          <path d="M26 69l-4 13M74 69l4 13" />
          <circle
            cx="50"
            cy="24"
            r="4"
            fill={detailColor}
            stroke="none"
          />
        </g>
      );

    case 'technology':
      if (
        variant % 3 === 1
      ) {
        return (
          <g {...common}>
            <circle
              cx="50"
              cy="50"
              r="21"
            />
            <path d="M50 18v11M50 71v11M18 50h11M71 50h11" />
            <path d="M35 35l8 8M65 35l-8 8M35 65l8-8M65 65l-8-8" />
            <circle
              cx="50"
              cy="50"
              r="7"
              fill={detailColor}
              stroke="none"
            />
          </g>
        );
      }

      if (
        variant % 3 === 2
      ) {
        return (
          <g {...common}>
            <path d="M24 30h52v40H24z" />
            <path d="M36 42h14v14H36zM57 42h7M57 50h12M36 62h32" />
            <circle
              cx="74"
              cy="24"
              r="4"
              fill={detailColor}
              stroke="none"
            />
          </g>
        );
      }

      return (
        <g {...common}>
          <rect
            x="27"
            y="27"
            width="46"
            height="46"
            rx="8"
          />
          <path d="M40 40h20v20H40z" />
          <path d="M18 35h9M18 50h9M18 65h9M73 35h9M73 50h9M73 65h9" />
          <circle
            cx="62"
            cy="19"
            r="4"
            fill={detailColor}
            stroke="none"
          />
        </g>
      );

    case 'food':
      if (
        variant % 3 === 1
      ) {
        return (
          <g {...common}>
            <path d="M32 22v28c0 8 5 14 12 14" />
            <path d="M24 22v18M40 22v18" />
            <path d="M66 22v60" />
            <path d="M58 22c0 12 2 21 8 28 6-7 8-16 8-28" />
            <circle
              cx="50"
              cy="75"
              r="4"
              fill={detailColor}
              stroke="none"
            />
          </g>
        );
      }

      if (
        variant % 3 === 2
      ) {
        return (
          <g {...common}>
            <path d="M27 66h46" />
            <path d="M34 64c1-17 8-28 16-28s15 11 16 28" />
            <path d="M50 36V25" />
            <path d="M42 24h16" />
            <circle
              cx="70"
              cy="30"
              r="4"
              fill={detailColor}
              stroke="none"
            />
          </g>
        );
      }

      return (
        <g {...common}>
          <path d="M24 64h52" />
          <path d="M30 61a20 20 0 0 1 40 0" />
          <path d="M50 40V27" />
          <circle
            cx="50"
            cy="23"
            r="4"
            fill={detailColor}
            stroke="none"
          />
        </g>
      );

    case 'fashion':
      if (
        variant % 3 === 1
      ) {
        return (
          <g {...common}>
            <path d="M50 20c-8 0-10 8-3 12l3 2" />
            <path d="M50 34L24 55h52z" />
            <path d="M32 55v20h36V55" />
            <circle
              cx="73"
              cy="29"
              r="4"
              fill={detailColor}
              stroke="none"
            />
          </g>
        );
      }

      if (
        variant % 3 === 2
      ) {
        return (
          <g {...common}>
            <path d="M38 23h24l7 18-12 7 7 31H36l7-31-12-7z" />
            <path d="M42 23c2 7 5 10 8 10s6-3 8-10" />
            <circle
              cx="72"
              cy="66"
              r="4"
              fill={detailColor}
              stroke="none"
            />
          </g>
        );
      }

      return (
        <g {...common}>
          <path d="M31 34c5-8 12-12 19-12s14 4 19 12" />
          <path d="M25 42h50" />
          <path d="M25 42l25 29 25-29" />
          <circle
            cx="50"
            cy="20"
            r="3.5"
            fill={detailColor}
            stroke="none"
          />
        </g>
      );

    case 'realestate':
      if (
        variant % 3 === 1
      ) {
        return (
          <g {...common}>
            <path d="M25 77V29h22v48M53 77V20h22v57" />
            <path d="M32 39h7M32 50h7M32 61h7M60 31h7M60 43h7M60 55h7" />
            <circle
              cx="76"
              cy="21"
              r="4"
              fill={detailColor}
              stroke="none"
            />
          </g>
        );
      }

      if (
        variant % 3 === 2
      ) {
        return (
          <g {...common}>
            <path d="M18 49l32-27 32 27" />
            <path d="M28 47v29h44V47" />
            <path d="M42 76V58h16v18" />
            <path d="M22 79h56" />
            <circle
              cx="77"
              cy="28"
              r="4"
              fill={detailColor}
              stroke="none"
            />
          </g>
        );
      }

      return (
        <g {...common}>
          <path d="M18 48l32-26 32 26" />
          <path d="M26 46v29h48V46" />
          <path d="M42 75V56h16v19" />
          <circle
            cx="76"
            cy="26"
            r="4"
            fill={detailColor}
            stroke="none"
          />
        </g>
      );

    case 'healthcare':
      if (
        variant % 3 === 1
      ) {
        return (
          <g {...common}>
            <path d="M50 78s-27-16-27-38c0-10 7-18 17-18 6 0 9 3 10 7 2-4 5-7 11-7 10 0 17 8 17 18 0 22-28 38-28 38z" />
            <path d="M31 50h12l5-10 7 20 5-10h10" />
            <circle
              cx="73"
              cy="27"
              r="4"
              fill={detailColor}
              stroke="none"
            />
          </g>
        );
      }

      if (
        variant % 3 === 2
      ) {
        return (
          <g {...common}>
            <circle
              cx="50"
              cy="50"
              r="28"
            />
            <path d="M44 32h12v12h12v12H56v12H44V56H32V44h12z" />
            <circle
              cx="72"
              cy="27"
              r="4"
              fill={detailColor}
              stroke="none"
            />
          </g>
        );
      }

      return (
        <g {...common}>
          <path d="M42 22h16v16h16v16H58v16H42V54H26V38h16z" />
          <circle
            cx="70"
            cy="22"
            r="4"
            fill={detailColor}
            stroke="none"
          />
        </g>
      );

    case 'education':
      if (
        variant % 3 === 1
      ) {
        return (
          <g {...common}>
            <path d="M28 26h22v50H28zM50 26h22v50H50z" />
            <path d="M34 36h10M34 45h10M56 36h10M56 45h10" />
            <circle
              cx="76"
              cy="22"
              r="4"
              fill={detailColor}
              stroke="none"
            />
          </g>
        );
      }

      if (
        variant % 3 === 2
      ) {
        return (
          <g {...common}>
            <path d="M18 35l32-13 32 13-32 13z" />
            <path d="M29 45v19c7 6 14 8 21 8s14-2 21-8V45" />
            <path d="M82 35v22" />
            <circle
              cx="82"
              cy="60"
              r="4"
              fill={detailColor}
              stroke="none"
            />
          </g>
        );
      }

      return (
        <g {...common}>
          <path d="M18 34l32-12 32 12-32 12z" />
          <path d="M26 44v20c8 6 16 8 24 8s16-2 24-8V44" />
          <circle
            cx="82"
            cy="34"
            r="4"
            fill={detailColor}
            stroke="none"
          />
        </g>
      );

    case 'ecommerce':
      if (
        variant % 3 === 1
      ) {
        return (
          <g {...common}>
            <path d="M22 28h10l7 35h34l7-25H35" />
            <circle
              cx="45"
              cy="73"
              r="5"
            />
            <circle
              cx="68"
              cy="73"
              r="5"
            />
            <circle
              cx="75"
              cy="27"
              r="4"
              fill={detailColor}
              stroke="none"
            />
          </g>
        );
      }

      if (
        variant % 3 === 2
      ) {
        return (
          <g {...common}>
            <rect
              x="27"
              y="30"
              width="46"
              height="46"
              rx="5"
            />
            <path d="M38 30c0-9 4-14 12-14s12 5 12 14" />
            <path d="M38 50h24M38 60h16" />
            <circle
              cx="72"
              cy="70"
              r="4"
              fill={detailColor}
              stroke="none"
            />
          </g>
        );
      }

      return (
        <g {...common}>
          <path d="M30 34h40l-4 36H34z" />
          <path d="M40 34c0-8 4-14 10-14s10 6 10 14" />
          <circle
            cx="70"
            cy="66"
            r="4"
            fill={detailColor}
            stroke="none"
          />
        </g>
      );

    case 'professional':
      if (
        variant % 2 === 1
      ) {
        return (
          <g {...common}>
            <path d="M24 72V39l26-17 26 17v33" />
            <path d="M35 45h30M35 56h30M35 67h30" />
            <circle
              cx="73"
              cy="25"
              r="4"
              fill={detailColor}
              stroke="none"
            />
          </g>
        );
      }

      return (
        <g {...common}>
          <circle
            cx="50"
            cy="50"
            r="27"
          />
          <path d="M36 59l10-18 8 12 10-16" />
          <circle
            cx="67"
            cy="32"
            r="4"
            fill={detailColor}
            stroke="none"
          />
        </g>
      );

    default:
      return (
        <g {...common}>
          <circle
            cx="50"
            cy="50"
            r="24"
          />
          <path d="M50 26v48M26 50h48" />
        </g>
      );
  }
}


function buildLogoConcepts({
  businessName,
  industry,
  style,
  preferredColor,
  version
}) {
  const industryKey =
    normalizeLogoIndustry(
      industry
    );

  const styleKey =
    normalizeLogoStyle(
      style
    );

  const preset =
    LOGO_STYLE_PRESETS[
      styleKey
    ];

  const baseColor =
    parseLogoColor(
      preferredColor
    );

  const seed =
    logoSeed(
      [
        businessName,
        industry,
        style,
        baseColor,
        version
      ].join('|')
    );

  const random =
    logoRandom(seed);

  const layoutPool = [
    'symbol',
    'wordmark',
    'badge',
    'emblem',
    'horizontal'
  ];

  const firstLayout =
    styleKey === 'premium'
      ? 'emblem'
      : styleKey === 'minimalist'
        ? 'symbol'
        : 'wordmark';

  const layouts = [
    firstLayout,
    layoutPool[
      Math.floor(
        random() *
        layoutPool.length
      )
    ],
    layoutPool[
      Math.floor(
        random() *
        layoutPool.length
      )
    ]
  ];

  return layouts.map(
    (
      layout,
      index
    ) => {
      const variant =
        Math.floor(
          random() *
          9
        );

      const accent =
        styleKey ===
        'premium'
          ? lightenLogoColor(
              baseColor,
              .4
            )
          : lightenLogoColor(
              baseColor,
              .17 +
                random() *
                  .2
            );

      const deep =
        darkenLogoColor(
          baseColor,
          styleKey ===
            'premium'
            ? .62
            : .48
        );

      const pale =
        lightenLogoColor(
          baseColor,
          .9
        );

      const darkBackground =
        styleKey ===
          'premium' ||
        (
          styleKey ===
            'modern' &&
          index === 1
        );

      const background =
        darkBackground
          ? deep
          : (
              styleKey ===
              'creative'
                ? lightenLogoColor(
                    baseColor,
                    .94 -
                      random() *
                        .05
                  )
                : '#FFFFFF'
            );

      const readable =
        logoReadableText(
          background
        );

      const foreground =
        readable ===
        '#FFFFFF'
          ? (
              styleKey ===
              'premium'
                ? accent
                : '#FFFFFF'
            )
          : baseColor;

      return {
        id:
          `logo-${version}-${index}-${variant}`,

        businessName:
          businessName.trim() ||
          'Your Brand',

        displayName:
          logoDisplayName(
            businessName
          ),

        lines:
          splitLogoName(
            businessName
          ),

        initials:
          getLogoInitials(
            businessName
          ),

        industryKey,

        industryLabel:
          logoIndustryLabel(
            industryKey,
            industry
          ),

        styleKey,

        styleLabel:
          preset.label,

        styleDescription:
          preset.description,

        preset,

        layout,

        variant,

        baseColor,

        accent,

        deep,

        pale,

        background,

        foreground,

        readable,

        muted:
          readable ===
          '#FFFFFF'
            ? lightenLogoColor(
                accent,
                .3
              )
            : '#707386',

        border:
          readable ===
          '#FFFFFF'
            ? lightenLogoColor(
                deep,
                .18
              )
            : lightenLogoColor(
                baseColor,
                .63
              ),

        ornament:
          random() >
          .48,

        angle:
          Math.round(
            -8 +
            random() *
              16
          )
      };
    }
  );
}


function LogoPreviewCard({
  concept,
  selected,
  onSelect
}) {
  const {
    layout,
    preset
  } = concept;

  const iconX =
    layout === 'horizontal'
      ? 82
      : 210;

  const iconY =
    layout === 'horizontal'
      ? 128
      : 95;

  const textX =
    layout === 'horizontal'
      ? 285
      : 210;

  const nameY =
    layout === 'horizontal'
      ? 126
      : (
          layout === 'emblem'
            ? 176
            : 168
        );

  const nameSize =
    concept.displayName.length >
    15
      ? 27
      : concept.displayName.length >
        10
        ? 32
        : 38;

  return (
    <button
      type="button"
      className={
        selected
          ? 'dynamic-logo-card selected'
          : 'dynamic-logo-card'
      }
      aria-pressed={
        selected
      }
      onClick={() =>
        onSelect(
          concept.id
        )
      }
      style={{
        '--logo-base':
          concept.baseColor,

        '--logo-border':
          concept.border,

        '--logo-bg':
          concept.background
      }}
    >

      <svg
        viewBox="0 0 420 260"
        role="img"
        aria-label={
          `${concept.styleLabel} ${concept.industryLabel} logo concept for ${concept.businessName}`
        }
      >

        <defs>
          <linearGradient
            id={`logoGradient-${concept.id}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor={
                concept.baseColor
              }
            />

            <stop
              offset="100%"
              stopColor={
                concept.accent
              }
            />
          </linearGradient>
        </defs>

        <rect
          width="420"
          height="260"
          fill={
            concept.background
          }
        />

        {
          concept.styleKey ===
            'creative'
            ? (
              <>
                <circle
                  cx="368"
                  cy="34"
                  r="54"
                  fill={
                    concept.pale
                  }
                />

                <path
                  d="M0 230C82 196 126 252 210 221s133-15 210-50"
                  fill="none"
                  stroke={
                    concept.accent
                  }
                  strokeWidth="3"
                  opacity=".55"
                />
              </>
            )
            : null
        }

        {
          concept.styleKey ===
            'premium'
            ? (
              <>
                <path
                  d="M55 34H365"
                  stroke={
                    concept.accent
                  }
                  strokeWidth="1"
                  opacity=".65"
                />

                <path
                  d="M55 226H365"
                  stroke={
                    concept.accent
                  }
                  strokeWidth="1"
                  opacity=".65"
                />
              </>
            )
            : null
        }

        {
          layout === 'badge' ||
          layout === 'emblem'
            ? (
              <rect
                x="24"
                y="22"
                width="372"
                height="216"
                rx={
                  preset.radius
                }
                fill="none"
                stroke={
                  concept.border
                }
                strokeWidth={
                  concept.styleKey ===
                    'minimalist'
                    ? 1
                    : 2
                }
                strokeDasharray={
                  concept.styleKey ===
                    'creative'
                    ? '9 7'
                    : undefined
                }
              />
            )
            : null
        }

        <text
          x="210"
          y="44"
          textAnchor="middle"
          fill={
            concept.muted
          }
          fontSize="14"
          fontFamily='"Montserrat", sans-serif'
          fontWeight="650"
          letterSpacing="1"
        >
          {
            `${concept.styleLabel.toUpperCase()} · ${concept.industryLabel.toUpperCase()}`
          }
        </text>

        <g
          transform={
            `translate(${iconX - 50} ${iconY - 50}) rotate(${concept.angle} 50 50)`
          }
        >
          {
            concept.styleKey ===
              'premium' &&
            concept.ornament
              ? (
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke={
                    concept.accent
                  }
                  strokeWidth="1.5"
                  opacity=".75"
                />
              )
              : null
          }

          {
            concept.styleKey ===
              'creative' &&
            concept.ornament
              ? (
                <rect
                  x="15"
                  y="15"
                  width="70"
                  height="70"
                  rx="20"
                  fill={
                    concept.pale
                  }
                  transform="rotate(10 50 50)"
                />
              )
              : null
          }

          <IndustryLogoIcon
            industryKey={
              concept.industryKey
            }
            color={
              concept.foreground
            }
            accent={
              concept.accent
            }
            styleKey={
              concept.styleKey
            }
            variant={
              concept.variant
            }
            stroke={
              preset.iconStroke
            }
          />
        </g>

        {
          layout ===
            'symbol'
            ? (
              <>
                <text
                  x="210"
                  y="174"
                  textAnchor="middle"
                  fill={
                    concept.foreground
                  }
                  fontSize="37"
                  fontWeight={
                    preset.weight
                  }
                  fontFamily={
                    preset.fontFamily
                  }
                  letterSpacing={
                    preset.letterSpacing
                  }
                >
                  {
                    concept.initials
                  }
                </text>

                <text
                  x="210"
                  y="205"
                  textAnchor="middle"
                  fill={
                    concept.muted
                  }
                  fontSize="15"
                  fontFamily='"Montserrat", sans-serif'
                >
                  {
                    concept.displayName
                  }
                </text>
              </>
            )
            : null
        }

        {
          layout ===
            'horizontal'
            ? (
              <>
                <text
                  x={textX}
                  y={nameY}
                  textAnchor="middle"
                  fill={
                    concept.foreground
                  }
                  fontSize={
                    nameSize
                  }
                  fontWeight={
                    preset.weight
                  }
                  fontFamily={
                    preset.fontFamily
                  }
                  letterSpacing={
                    preset.letterSpacing
                  }
                >
                  {
                    concept.displayName
                  }
                </text>

                <text
                  x={textX}
                  y="153"
                  textAnchor="middle"
                  fill={
                    concept.muted
                  }
                  fontSize="14"
                  fontFamily='"Montserrat", sans-serif'
                >
                  {
                    concept.industryLabel
                  }
                </text>
              </>
            )
            : null
        }

        {
          [
            'wordmark',
            'badge',
            'emblem'
          ].includes(
            layout
          )
            ? (
              <>
                <text
                  x="210"
                  y={nameY}
                  textAnchor="middle"
                  fill={
                    concept.foreground
                  }
                  fontSize={
                    nameSize
                  }
                  fontWeight={
                    preset.weight
                  }
                  fontFamily={
                    preset.fontFamily
                  }
                  letterSpacing={
                    preset.letterSpacing
                  }
                >
                  {
                    concept.displayName
                  }
                </text>

                <text
                  x="210"
                  y={nameY + 28}
                  textAnchor="middle"
                  fill={
                    concept.muted
                  }
                  fontSize="14"
                  fontFamily='"Montserrat", sans-serif'
                >
                  {
                    concept.industryLabel
                  }
                </text>
              </>
            )
            : null
        }

        {
          concept.styleKey ===
            'professional'
            ? (
              <path
                d="M145 220H275"
                stroke={
                  concept.baseColor
                }
                strokeWidth="3"
              />
            )
            : null
        }

      </svg>

      <span className="dynamic-logo-card-footer">
        <b>
          {
            concept.layout
              .charAt(0)
              .toUpperCase() +
            concept.layout
              .slice(1)
        }
        </b>

        <small>
          {
            concept.styleDescription
          }
        </small>
      </span>

    </button>
  );
}


function LogoTool() {
  const [
    businessName,
    setBusinessName
  ] =
    useState(
      'Digitalness'
    );

  const [
    industry,
    setIndustry
  ] =
    useState(
      'Digital Services'
    );

  const [
    style,
    setStyle
  ] =
    useState(
      'Modern'
    );

  const [
    preferredColor,
    setPreferredColor
  ] =
    useState(
      '#6D5DFC'
    );

  const [
    colorText,
    setColorText
  ] =
    useState(
      '#6D5DFC'
    );

  const [
    version,
    setVersion
  ] =
    useState(1);

  const [
    selectedLogo,
    setSelectedLogo
  ] =
    useState('');

  const concepts =
    useMemo(
      () =>
        buildLogoConcepts({
          businessName,
          industry,
          style,
          preferredColor,
          version
        }),
      [
        businessName,
        industry,
        style,
        preferredColor,
        version
      ]
    );

  useEffect(
    () => {
      if (
        concepts.length
      ) {
        setSelectedLogo(
          concepts[0].id
        );
      }
    },
    [
      concepts
    ]
  );

  const selectedConcept =
    concepts.find(
      concept =>
        concept.id ===
        selectedLogo
    ) ||
    concepts[0];

  function updateColorFromText(
    value
  ) {
    setColorText(value);

    const trimmed =
      String(value)
        .trim();

    const validHex =
      /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(
        trimmed
      );

    const validRgb =
      /^rgb\s*\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/i.test(
        trimmed
      ) ||
      /^\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}$/.test(
        trimmed
      );

    if (
      validHex ||
      validRgb
    ) {
      const normalized =
        parseLogoColor(
          value
        );

      setPreferredColor(
        normalized
      );
    }
  }

  function resetLogoTool() {
    setBusinessName(
      'Digitalness'
    );

    setIndustry(
      'Digital Services'
    );

    setStyle(
      'Modern'
    );

    setPreferredColor(
      '#6D5DFC'
    );

    setColorText(
      '#6D5DFC'
    );

    setVersion(
      current =>
        current + 1
    );
  }

  return (
    <div className="tool-panel logo-generator-upgrade">

      <style>
        {`
          .logo-generator-upgrade {
            display: grid;
            gap: 24px;
          }

          .logo-generator-upgrade .logo-generator-form {
            display: grid;
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
            gap: 18px;
          }

          .logo-generator-upgrade .logo-generator-form label {
            display: grid;
            gap: 8px;
            color: var(--theme-text, #17152b);
            font-weight: 750;
          }

          .logo-generator-upgrade .logo-generator-form input,
          .logo-generator-upgrade .logo-generator-form select {
            width: 100%;
            min-height: 50px;
            padding: 0 14px;
            border: 1px solid var(--theme-border, #dedce8);
            border-radius: 12px;
            background: var(--theme-surface, #fff);
            color: var(--theme-text, #17152b);
            font: inherit;
            outline: none;
          }

          .logo-generator-upgrade .logo-generator-form input:focus,
          .logo-generator-upgrade .logo-generator-form select:focus {
            border-color: var(--theme-primary, #130150);
            box-shadow: 0 0 0 3px color-mix(
              in srgb,
              var(--theme-primary, #130150) 12%,
              transparent
            );
          }

          .logo-color-control {
            display: grid;
            grid-template-columns: 58px 1fr;
            gap: 10px;
          }

          .logo-color-control input[type="color"] {
            min-height: 50px;
            padding: 4px;
            cursor: pointer;
          }

          .dynamic-logo-grid {
            display: grid;
            grid-template-columns:
              repeat(3, minmax(0, 1fr));
            gap: 18px;
          }

          .dynamic-logo-card {
            width: 100%;
            padding: 0;
            overflow: hidden;
            border: 1px solid var(--logo-border);
            border-radius: 22px;
            background: var(--logo-bg);
            color: inherit;
            cursor: pointer;
            text-align: left;
            box-shadow: 0 12px 30px rgba(22, 18, 48, .05);
            transition:
              transform .18s ease,
              border-color .18s ease,
              box-shadow .18s ease;
          }

          .dynamic-logo-card:hover {
            transform: translateY(-3px);
            border-color: var(--logo-base);
            box-shadow: 0 16px 34px rgba(22, 18, 48, .09);
          }

          .dynamic-logo-card.selected {
            border: 2px solid var(--logo-base);
            box-shadow:
              0 0 0 4px color-mix(
                in srgb,
                var(--logo-base) 15%,
                transparent
              ),
              0 16px 34px rgba(22, 18, 48, .08);
          }

          .dynamic-logo-card svg {
            display: block;
            width: 100%;
            height: auto;
            aspect-ratio: 420 / 260;
          }

          .dynamic-logo-card-footer {
            display: grid;
            gap: 4px;
            padding: 13px 15px 15px;
            border-top: 1px solid var(--theme-border, #ece9f2);
            background: var(--theme-surface, #fff);
          }

          .dynamic-logo-card-footer b {
            color: var(--theme-text, #17152b);
            font-size: .8rem;
          }

          .dynamic-logo-card-footer small {
            color: var(--theme-muted, #77718a);
            font-size: .68rem;
            line-height: 1.45;
          }

          .logo-generator-actions {
            display: flex;
            align-items: center;
            gap: 10px;
            flex-wrap: wrap;
          }

          .logo-selected-summary {
            display: grid;
            grid-template-columns:
              repeat(4, minmax(0, 1fr));
            gap: 12px;
            padding: 16px;
            border: 1px solid var(--theme-border, #e7e3ef);
            border-radius: 15px;
            background: var(--theme-soft, #faf9ff);
          }

          .logo-selected-summary > div {
            min-width: 0;
          }

          .logo-selected-summary small,
          .logo-selected-summary strong {
            display: block;
          }

          .logo-selected-summary small {
            margin-bottom: 4px;
            color: var(--theme-muted, #77718a);
            font-size: .65rem;
            text-transform: uppercase;
            letter-spacing: .06em;
          }

          .logo-selected-summary strong {
            overflow: hidden;
            color: var(--theme-text, #17152b);
            font-size: .82rem;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          @media (max-width: 980px) {
            .dynamic-logo-grid {
              grid-template-columns:
                repeat(2, minmax(0, 1fr));
            }

            .logo-selected-summary {
              grid-template-columns:
                repeat(2, minmax(0, 1fr));
            }
          }

          @media (max-width: 680px) {
            .logo-generator-upgrade .logo-generator-form,
            .dynamic-logo-grid,
            .logo-selected-summary {
              grid-template-columns: 1fr;
            }

            .logo-generator-actions .btn {
              width: 100%;
            }
          }
        `}
      </style>

      <div className="logo-generator-form">

        <label>
          <span>
            Business name
          </span>

          <input
            value={
              businessName
            }
            onChange={
              event =>
                setBusinessName(
                  event.target.value
                )
            }
            placeholder="Enter business name"
          />
        </label>

        <label>
          <span>
            Industry
          </span>

          <input
            list="logo-industry-options"
            value={
              industry
            }
            onChange={
              event =>
                setIndustry(
                  event.target.value
                )
            }
            placeholder="Example: Furniture & Interiors"
          />

          <datalist id="logo-industry-options">
            {
              LOGO_INDUSTRIES.map(
                item => (
                  <option
                    key={item}
                    value={item}
                  />
                )
              )
            }
          </datalist>
        </label>

        <label>
          <span>
            Style
          </span>

          <select
            value={
              style
            }
            onChange={
              event =>
                setStyle(
                  event.target.value
                )
            }
          >
            <option>
              Modern
            </option>

            <option>
              Premium
            </option>

            <option>
              Minimalist
            </option>

            <option>
              Creative
            </option>

            <option>
              Professional
            </option>
          </select>
        </label>

        <label>
          <span>
            Preferred color
          </span>

          <div className="logo-color-control">

            <input
              type="color"
              value={
                preferredColor
              }
              onChange={
                event => {
                  setPreferredColor(
                    event.target.value
                  );

                  setColorText(
                    event.target.value
                      .toUpperCase()
                  );
                }
              }
              aria-label="Preferred logo color"
            />

            <input
              value={
                colorText
              }
              onChange={
                event =>
                  updateColorFromText(
                    event.target.value
                  )
              }
              onBlur={() =>
                setColorText(
                  preferredColor
                    .toUpperCase()
                )
              }
              placeholder="#6D5DFC or rgb(109, 93, 252)"
              aria-label="Preferred logo HEX or RGB color"
            />

          </div>
        </label>

      </div>

      <div className="dynamic-logo-grid">

        {
          concepts.map(
            concept => (
              <LogoPreviewCard
                key={
                  concept.id
                }
                concept={
                  concept
                }
                selected={
                  selectedLogo ===
                  concept.id
                }
                onSelect={
                  setSelectedLogo
                }
              />
            )
          )
        }

      </div>

      <div className="logo-generator-actions">

        <button
          type="button"
          className="btn btn-primary"
          onClick={() =>
            setVersion(
              current =>
                current + 1
            )
          }
        >
          Regenerate logos
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={
            resetLogoTool
          }
        >
          Reset
        </button>

      </div>

      {
        selectedConcept
          ? (
            <div className="logo-selected-summary">

              <div>
                <small>
                  Industry direction
                </small>

                <strong>
                  {
                    selectedConcept.industryLabel
                  }
                </strong>
              </div>

              <div>
                <small>
                  Design style
                </small>

                <strong>
                  {
                    selectedConcept.styleLabel
                  }
                </strong>
              </div>

              <div>
                <small>
                  Concept type
                </small>

                <strong>
                  {
                    selectedConcept.layout
                  }
                </strong>
              </div>

              <div>
                <small>
                  Brand color
                </small>

                <strong>
                  {
                    selectedConcept.baseColor
                      .toUpperCase()
                  }
                </strong>
              </div>

            </div>
          )
          : null
      }

      <p className="tool-note">
        Each concept is generated from the current
        business name, industry, style, preferred
        color and regeneration seed. Changing an
        input immediately creates a new industry-
        and style-specific direction instead of
        reusing one generic logo.
      </p>

    </div>
  );
}


/* ============================================================
   COLOR PALETTE — STANDALONE BRAND TOOL
============================================================ */

const BRAND_PALETTE_LIBRARY_KEY = 'digitalness-brand-palette-library-v1';

const brandPaletteIndustries = {
  'Digital Services': 252,
  'Technology & IT': 216,
  'Furniture & Interiors': 31,
  'Food & Restaurants': 10,
  'Fashion & Beauty': 326,
  'Real Estate': 145,
  Healthcare: 202,
  Education: 218,
  'E-commerce & Retail': 282,
  'Professional Services': 225,
  Hospitality: 350,
  Other: 250
};

const brandPaletteStyles = {
  Modern: { sat: 72, light: 39, bgSat: 22 },
  Premium: { sat: 54, light: 29, bgSat: 20 },
  Minimal: { sat: 34, light: 34, bgSat: 10 },
  Creative: { sat: 82, light: 46, bgSat: 28 },
  Professional: { sat: 52, light: 30, bgSat: 14 },
  Natural: { sat: 42, light: 34, bgSat: 20 }
};

const brandPaletteHarmonies = {
  Balanced: [34, 166],
  Analogous: [30, -30],
  Complementary: [180, 28],
  Triadic: [120, 240],
  'Split Complementary': [150, 210],
  Monochrome: [0, 0]
};

const brandPaletteStarters = [
  {
    name: 'Digital Confidence',
    colors: ['#312E81', '#6366F1', '#06B6D4', '#F8FAFC', '#FFFFFF', '#111827']
  },
  {
    name: 'Quiet Luxury',
    colors: ['#34251F', '#8C6A4A', '#C6A15B', '#F8F4EC', '#FFFDF8', '#241A16']
  },
  {
    name: 'Clinical Trust',
    colors: ['#0F4C5C', '#2A7F8E', '#5CB8A6', '#F4FAFA', '#FFFFFF', '#15343A']
  },
  {
    name: 'Property Growth',
    colors: ['#174A35', '#2D6A4F', '#C49A3A', '#F6F8F3', '#FFFFFF', '#173126']
  },
  {
    name: 'Warm Appetite',
    colors: ['#8A2C20', '#C5522A', '#E7A33E', '#FFF8F2', '#FFFFFF', '#3E211A']
  },
  {
    name: 'Retail Energy',
    colors: ['#5B21B6', '#7C3AED', '#F97316', '#FAF7FF', '#FFFFFF', '#251547']
  }
];

function normalizeBrandPaletteColor(value) {
  if (typeof value !== 'string') return null;
  const input = value.trim();

  if (/^#?[0-9a-f]{3}$/i.test(input)) {
    const clean = input.replace('#', '');
    return `#${clean.split('').map(char => char + char).join('')}`.toUpperCase();
  }

  if (/^#?[0-9a-f]{6}$/i.test(input)) {
    return `#${input.replace('#', '')}`.toUpperCase();
  }

  const match = input.match(
    /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(?:0|1|0?\.\d+))?\s*\)$/i
  ) || input.match(/^(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})$/);

  if (!match) return null;

  const values = match.slice(1, 4).map(Number);
  if (values.some(value => value < 0 || value > 255)) return null;

  return logoRgbToHex({ r: values[0], g: values[1], b: values[2] }).toUpperCase();
}

function brandPaletteHexToHsl(hex) {
  const rgb = logoHexToRgb(hex);
  if (!rgb) return { h: 250, s: 70, l: 40 };

  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let h = 0;

  if (delta) {
    if (max === r) h = 60 * (((g - b) / delta) % 6);
    else if (max === g) h = 60 * (((b - r) / delta) + 2);
    else h = 60 * (((r - g) / delta) + 4);
  }

  if (h < 0) h += 360;
  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  return { h, s: s * 100, l: l * 100 };
}

function brandPaletteHslToHex(hue, saturation, lightness) {
  const h = ((Number(hue) % 360) + 360) % 360;
  const s = Math.max(0, Math.min(100, Number(saturation))) / 100;
  const l = Math.max(0, Math.min(100, Number(lightness))) / 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  return logoRgbToHex({
    r: (r + m) * 255,
    g: (g + m) * 255,
    b: (b + m) * 255
  }).toUpperCase();
}

function brandPaletteContrast(first, second) {
  const a = logoLuminance(first);
  const b = logoLuminance(second);
  const light = Math.max(a, b);
  const dark = Math.min(a, b);
  return Number(((light + .05) / (dark + .05)).toFixed(2));
}

function brandPaletteReadable(background) {
  const white = brandPaletteContrast('#FFFFFF', background);
  const dark = brandPaletteContrast('#111827', background);
  return white >= dark ? '#FFFFFF' : '#111827';
}

function brandPaletteRgb(hex) {
  const rgb = logoHexToRgb(hex);
  return rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : '';
}

function makeBrandPalette({ industry, style, harmony, baseColor, version }) {
  const settings = brandPaletteStyles[style] || brandPaletteStyles.Modern;
  const offsets = brandPaletteHarmonies[harmony] || brandPaletteHarmonies.Balanced;
  const validBase = normalizeBrandPaletteColor(baseColor);
  const industryHue = brandPaletteIndustries[industry] ?? brandPaletteIndustries.Other;
  const baseHsl = validBase
    ? brandPaletteHexToHsl(validBase)
    : { h: industryHue, s: settings.sat, l: settings.light };

  const variation = ((version * 17) % 23) - 11;
  const hue = validBase ? baseHsl.h : industryHue + variation;
  const primary = validBase || brandPaletteHslToHex(hue, settings.sat, settings.light);

  let secondary;
  let accent;

  if (harmony === 'Monochrome') {
    secondary = brandPaletteHslToHex(hue, Math.max(18, baseHsl.s * .65), Math.min(72, baseHsl.l + 20));
    accent = brandPaletteHslToHex(hue, Math.max(16, baseHsl.s * .45), Math.max(18, baseHsl.l - 15));
  } else {
    secondary = brandPaletteHslToHex(
      hue + offsets[0] + variation * .35,
      Math.max(34, settings.sat - 8),
      style === 'Premium' ? 42 : 52
    );
    accent = brandPaletteHslToHex(
      hue + offsets[1] - variation * .3,
      Math.min(88, settings.sat + 4),
      style === 'Premium' ? 52 : 48
    );
  }

  if (style === 'Premium') {
    accent = brandPaletteHslToHex(42 + variation * .2, 55, 50);
  }

  if (style === 'Natural') {
    secondary = brandPaletteHslToHex(hue + 66, 34, 42);
    accent = brandPaletteHslToHex(hue + 28, 48, 54);
  }

  const background = brandPaletteHslToHex(hue, settings.bgSat, style === 'Premium' ? 96 : 98);
  const surface = style === 'Premium'
    ? brandPaletteHslToHex(hue, 14, 99)
    : '#FFFFFF';
  let text = brandPaletteHslToHex(hue, Math.min(42, settings.sat), 15);

  if (brandPaletteContrast(text, background) < 4.5) {
    text = '#111827';
  }

  return { primary, secondary, accent, background, surface, text };
}

function readBrandPaletteLibrary() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(BRAND_PALETTE_LIBRARY_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function ColorTool() {
  const roles = [
    ['primary', 'Primary', 'Main brand recognition, logo and strongest emphasis.'],
    ['secondary', 'Secondary', 'Supporting brand color for secondary graphics and layouts.'],
    ['accent', 'Accent', 'Small high-attention color for highlights and promotional emphasis.'],
    ['background', 'Background', 'Main light canvas for digital and print layouts.'],
    ['surface', 'Surface', 'Cards, panels, packaging and presentation surfaces.'],
    ['text', 'Text', 'Main readable brand text with contrast checking.']
  ];

  const [brandName, setBrandName] = useState('Digitalness');
  const [industry, setIndustry] = useState('Digital Services');
  const [style, setStyle] = useState('Modern');
  const [harmony, setHarmony] = useState('Balanced');
  const [baseColor, setBaseColor] = useState('');
  const [baseColorInput, setBaseColorInput] = useState('');
  const [version, setVersion] = useState(0);
  const [message, setMessage] = useState(
    'Choose an industry or optional seed color, then use a real color harmony to build a usable brand palette. Nothing is applied to the website.'
  );
  const [savedPalettes, setSavedPalettes] = useState(() => readBrandPaletteLibrary());

  const generated = useMemo(
    () => makeBrandPalette({ industry, style, harmony, baseColor, version }),
    [industry, style, harmony, baseColor, version]
  );

  const [palette, setPalette] = useState(generated);
  const [rawValues, setRawValues] = useState(generated);

  useEffect(() => {
    setPalette(generated);
    setRawValues(generated);
  }, [generated]);

  useEffect(() => {
    try {
      localStorage.removeItem('digitalness-theme-v1');
    } catch {}
  }, []);

  function setPaletteFromColors(colors, label) {
    const next = {};
    roles.forEach(([key]) => {
      next[key] = normalizeBrandPaletteColor(colors[key]) || generated[key];
    });
    setPalette(next);
    setRawValues(next);
    setMessage(`${label}. Preview changed inside the palette tool only.`);
  }

  function editColor(key, value, fromText = false) {
    // Text fields are allowed to contain an incomplete value while the user types.
    // The color is committed only on blur / Enter so #130150 is not interrupted at #130.
    if (fromText) {
      setRawValues(current => ({ ...current, [key]: value }));
      return;
    }

    const valid = normalizeBrandPaletteColor(value);
    if (!valid) return;

    setPalette(current => ({ ...current, [key]: valid }));
    setRawValues(current => ({ ...current, [key]: valid }));
    setMessage(`${key.charAt(0).toUpperCase() + key.slice(1)} updated in the palette preview only.`);
  }

  function validateTextColor(key) {
    const valid = normalizeBrandPaletteColor(rawValues[key]);

    if (!valid) {
      setRawValues(current => ({ ...current, [key]: palette[key] }));
      setMessage('Invalid color was restored. Use HEX or RGB, for example #130150 or rgb(19, 1, 80).');
      return;
    }

    setPalette(current => ({ ...current, [key]: valid }));
    setRawValues(current => ({ ...current, [key]: valid }));
    setMessage(`${key.charAt(0).toUpperCase() + key.slice(1)} updated successfully.`);
  }

  function commitBaseColor() {
    if (!baseColorInput.trim()) {
      setBaseColor('');
      setMessage(`Using the ${industry} industry direction.`);
      return;
    }

    const valid = normalizeBrandPaletteColor(baseColorInput);

    if (!valid) {
      setBaseColorInput(baseColor);
      setMessage('Invalid base color. Use HEX or RGB, for example #130150 or rgb(19, 1, 80).');
      return;
    }

    setBaseColor(valid);
    setBaseColorInput(valid);
    setMessage(`Custom seed ${valid} is now driving the ${harmony.toLowerCase()} palette.`);
  }

  function useIndustryColors() {
    setBaseColor('');
    setBaseColorInput('');
    setVersion(current => current + 1);
    setMessage(`Generated a ${style.toLowerCase()} palette for ${industry} using ${harmony.toLowerCase()} harmony.`);
  }

  function generateAnother() {
    setVersion(current => current + 1);
    setMessage(`Generated another ${style.toLowerCase()} direction for ${industry}.`);
  }

  function savePalette() {
    const item = {
      id: String(Date.now()),
      name: brandName || 'Untitled brand',
      industry,
      style,
      harmony,
      colors: palette
    };
    const next = [item, ...savedPalettes].slice(0, 12);
    setSavedPalettes(next);
    try {
      localStorage.setItem(BRAND_PALETTE_LIBRARY_KEY, JSON.stringify(next));
    } catch {}
    setMessage('Palette saved to your palette library. It was not applied to the website.');
  }

  function deletePalette(id) {
    const next = savedPalettes.filter(item => item.id !== id);
    setSavedPalettes(next);
    try {
      localStorage.setItem(BRAND_PALETTE_LIBRARY_KEY, JSON.stringify(next));
    } catch {}
  }

  async function copyPalette() {
    const text = roles.map(([key, label]) => `${label}: ${palette[key]}`).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setMessage('Palette HEX values copied.');
    } catch {
      setMessage('Clipboard access was blocked by the browser.');
    }
  }

  async function copyCss() {
    const css = `:root {\n${roles
      .map(([key]) => `  --brand-${key}: ${palette[key]};`)
      .join('\n')}\n}`;
    try {
      await navigator.clipboard.writeText(css);
      setMessage('CSS variables copied only. They were not applied to this website.');
    } catch {
      setMessage('Clipboard access was blocked by the browser.');
    }
  }

  function exportJson() {
    downloadBlob(
      new Blob(
        [JSON.stringify({ brandName, industry, style, harmony, colors: palette }, null, 2)],
        { type: 'application/json' }
      ),
      `${(brandName || 'brand').replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-palette.json`
    );
    setMessage('Palette JSON exported.');
  }

  function resetPalette() {
    setBrandName('Digitalness');
    setIndustry('Digital Services');
    setStyle('Modern');
    setHarmony('Balanced');
    setBaseColor('');
    setBaseColorInput('');
    setVersion(0);
    const next = makeBrandPalette({
      industry: 'Digital Services',
      style: 'Modern',
      harmony: 'Balanced',
      baseColor: '',
      version: 0
    });
    setPalette(next);
    setRawValues(next);
    setMessage('Palette generator reset. Website colors were not changed.');
  }

  const contrastRows = [
    ['Text / Background', brandPaletteContrast(palette.text, palette.background)],
    ['Text / Surface', brandPaletteContrast(palette.text, palette.surface)],
    ['Primary button', brandPaletteContrast(brandPaletteReadable(palette.primary), palette.primary)],
    ['Secondary button', brandPaletteContrast(brandPaletteReadable(palette.secondary), palette.secondary)]
  ];

  return (
    <div className="tool-panel" style={{ display: 'grid', gap: 24 }}>
      <div style={{ padding: 16, border: '1px solid #E2DFEA', borderRadius: 14, background: '#FAF9FF' }}>
        <strong style={{ color: '#130150' }}>Real-world brand palette generator</strong>
        <p style={{ margin: '7px 0 0', color: '#6F687D', lineHeight: 1.6 }}>{message}</p>
      </div>

      <div className="tool-form" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 14 }}>
        <label>
          Brand name
          <input value={brandName} onChange={event => setBrandName(event.target.value)} />
        </label>

        <label>
          Industry
          <select
            value={industry}
            onChange={event => {
              setIndustry(event.target.value);
              setBaseColor('');
              setBaseColorInput('');
              setVersion(current => current + 1);
            }}
          >
            {Object.keys(brandPaletteIndustries).map(item => <option key={item}>{item}</option>)}
          </select>
        </label>

        <label>
          Brand style
          <select value={style} onChange={event => setStyle(event.target.value)}>
            {Object.keys(brandPaletteStyles).map(item => <option key={item}>{item}</option>)}
          </select>
        </label>

        <label>
          Color harmony
          <select value={harmony} onChange={event => setHarmony(event.target.value)}>
            {Object.keys(brandPaletteHarmonies).map(item => <option key={item}>{item}</option>)}
          </select>
        </label>

        <label>
          Optional base color
          <div style={{ display: 'grid', gridTemplateColumns: '54px 1fr', gap: 8 }}>
            <input
              type="color"
              value={normalizeBrandPaletteColor(baseColor) || palette.primary}
              onChange={event => {
                setBaseColor(event.target.value);
                setBaseColorInput(event.target.value.toUpperCase());
              }}
              style={{ padding: 4 }}
            />
            <input
              value={baseColorInput}
              onChange={event => setBaseColorInput(event.target.value)}
              onBlur={commitBaseColor}
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  commitBaseColor();
                }
              }}
              placeholder="Optional: #130150 or rgb(19, 1, 80)"
            />
          </div>
        </label>

        <label>
          Industry direction
          <button type="button" className="btn btn-secondary" onClick={useIndustryColors}>
            Use industry colors
          </button>
        </label>
      </div>

      <div>
        <p className="tool-note">Professional starter directions</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10 }}>
          {brandPaletteStarters.map(starter => {
            const [primary, secondary, accent, background, surface, text] = starter.colors;
            const colors = { primary, secondary, accent, background, surface, text };
            return (
              <button
                key={starter.name}
                type="button"
                onClick={() => setPaletteFromColors(colors, starter.name)}
                style={{ padding: 13, border: '1px solid #E2DFEA', borderRadius: 12, background: '#FFF', textAlign: 'left', cursor: 'pointer' }}
              >
                <span style={{ display: 'flex', gap: 5, marginBottom: 8 }}>
                  {starter.colors.slice(0, 4).map(color => (
                    <i key={color} style={{ width: 18, height: 18, borderRadius: '50%', background: color, border: '1px solid rgba(0,0,0,.08)' }} />
                  ))}
                </span>
                <b>{starter.name}</b>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 13 }}>
        {roles.map(([key, label, help]) => (
          <article key={key} style={{ overflow: 'hidden', border: '1px solid #E3E1EA', borderRadius: 14, background: '#FFF' }}>
            <div style={{ minHeight: 105, padding: 12, display: 'flex', alignItems: 'flex-end', background: palette[key] }}>
              <span style={{ padding: '5px 8px', borderRadius: 999, background: 'rgba(255,255,255,.86)', color: '#17152B', fontSize: 12, fontWeight: 800 }}>
                {palette[key]}
              </span>
            </div>

            <div style={{ padding: 13, display: 'grid', gap: 7 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
                <b>{label}</b>
                <input
                  type="color"
                  value={palette[key]}
                  onChange={event => editColor(key, event.target.value)}
                  style={{ width: 38, height: 30, padding: 2 }}
                />
              </div>

              <input
                value={rawValues[key]}
                onChange={event => editColor(key, event.target.value, true)}
                onBlur={() => validateTextColor(key)}
                onKeyDown={event => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    validateTextColor(key);
                  }
                }}
                aria-label={`${label} HEX or RGB`}
              />

              <small style={{ color: '#77718A' }}>{brandPaletteRgb(palette[key])}</small>
              <small style={{ color: '#77718A', lineHeight: 1.45 }}>{help}</small>
            </div>
          </article>
        ))}
      </div>

      <div
        style={{
          padding: 20,
          border: '1px solid #E3E1EA',
          borderRadius: 18,
          background: palette.background,
          color: palette.text
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              style={{
                width: 42,
                height: 42,
                display: 'grid',
                placeItems: 'center',
                borderRadius: 12,
                background: palette.primary,
                color: brandPaletteReadable(palette.primary),
                fontWeight: 900
              }}
            >
              {(brandName || 'B').charAt(0).toUpperCase()}
            </span>
            <div>
              <b>{brandName || 'Brand preview'}</b>
              <small style={{ display: 'block', opacity: .7 }}>{industry} · {style}</small>
            </div>
          </div>
          <span style={{ padding: '6px 10px', borderRadius: 999, background: palette.accent, color: brandPaletteReadable(palette.accent), fontWeight: 800 }}>
            Accent
          </span>
        </div>

        <div style={{ marginTop: 16, padding: 18, borderRadius: 14, background: palette.surface }}>
          <h3 style={{ margin: '0 0 8px', color: palette.text }}>Real-world brand preview</h3>
          <p style={{ margin: '0 0 14px', color: palette.text, opacity: .75 }}>
            Use this contained preview to judge the palette before applying it in a logo, poster, website design, packaging or presentation.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button type="button" style={{ border: 0, borderRadius: 9, padding: '9px 12px', background: palette.primary, color: brandPaletteReadable(palette.primary), fontWeight: 750 }}>
              Primary action
            </button>
            <button type="button" style={{ border: 0, borderRadius: 9, padding: '9px 12px', background: palette.secondary, color: brandPaletteReadable(palette.secondary), fontWeight: 750 }}>
              Secondary action
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10 }}>
        {contrastRows.map(([label, ratio]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: 13, border: '1px solid #E5E2EC', borderRadius: 11, background: '#FFF' }}>
            <span>{label} — {ratio}:1</span>
            <b style={{ color: ratio >= 4.5 ? '#17623A' : '#9A3D00' }}>
              {ratio >= 4.5 ? 'AA readable' : 'Review contrast'}
            </b>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button type="button" className="btn btn-primary" onClick={generateAnother}>Generate another</button>
        <button type="button" className="btn btn-secondary" onClick={savePalette}>Save palette</button>
        <button type="button" className="btn btn-secondary" onClick={copyPalette}>Copy HEX</button>
        <button type="button" className="btn btn-secondary" onClick={copyCss}>Copy CSS</button>
        <button type="button" className="btn btn-secondary" onClick={exportJson}>Export JSON</button>
        <button type="button" className="btn btn-secondary" onClick={resetPalette}>Reset</button>
      </div>

      {savedPalettes.length > 0 && (
        <div style={{ display: 'grid', gap: 9 }}>
          <p className="tool-note">Saved palette library</p>
          {savedPalettes.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', padding: 12, border: '1px solid #E3E1EA', borderRadius: 11, background: '#FFF' }}>
              <div>
                <b>{item.name}</b>
                <small style={{ display: 'block', color: '#77718A', marginTop: 3 }}>{item.industry} · {item.style}</small>
                <span style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                  {[item.colors.primary, item.colors.secondary, item.colors.accent].map(color => (
                    <i key={color} style={{ width: 14, height: 14, borderRadius: '50%', background: color }} />
                  ))}
                </span>
              </div>

              <div style={{ display: 'flex', gap: 7 }}>
                <button type="button" className="btn btn-secondary" onClick={() => setPaletteFromColors(item.colors, `${item.name} loaded`)}>Load</button>
                <button type="button" className="btn btn-secondary" onClick={() => deletePalette(item.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="tool-note">
        This tool now creates brand palettes only. It does not write colors to the website root, navbar, footer, pages, buttons or other components.
      </p>
    </div>
  );
}


function TypographyTool() {
  const fontPairs = [
    {
      heading: 'Playfair Display',
      body: 'Inter',
      headingFallback: 'serif',
      bodyFallback: 'sans-serif',
      style: 'Elegant & Premium',
      description:
        'A refined editorial heading paired with a clean modern body font. Good for luxury brands, interiors, real estate and premium businesses.'
    },
    {
      heading: 'DM Serif Display',
      body: 'Manrope',
      headingFallback: 'serif',
      bodyFallback: 'sans-serif',
      style: 'Editorial & Modern',
      description:
        'A strong serif heading combined with a minimal geometric body font. Useful for sophisticated brand identities.'
    },
    {
      heading: 'Space Grotesk',
      body: 'Inter',
      headingFallback: 'sans-serif',
      bodyFallback: 'sans-serif',
      style: 'Modern & Digital',
      description:
        'A contemporary technology-style heading paired with a highly readable body font. Good for digital agencies, SaaS and technology brands.'
    },
    {
      heading: 'Libre Baskerville',
      body: 'Source Sans 3',
      headingFallback: 'serif',
      bodyFallback: 'sans-serif',
      style: 'Professional & Trustworthy',
      description:
        'A traditional serif heading combined with a simple professional body font. Suitable for law, healthcare and corporate brands.'
    },
    {
      heading: 'Poppins',
      body: 'Nunito Sans',
      headingFallback: 'sans-serif',
      bodyFallback: 'sans-serif',
      style: 'Friendly & Contemporary',
      description:
        'A bold rounded heading paired with a softer body typeface. Good for social brands, startups and modern service businesses.'
    }
  ];

  const [index, setIndex] =
    useState(0);

  const [headingText, setHeadingText] =
    useState(
      'Clarity creates stronger digital experiences.'
    );

  const [bodyText, setBodyText] =
    useState(
      'A typography system should support hierarchy, readability and consistent brand expression across devices.'
    );

  const pair =
    fontPairs[index];

  function nextPair() {
    setIndex(
      current =>
        (
          current + 1
        ) %
        fontPairs.length
    );
  }

  return (
    <div className="tool-panel typography-tool-upgrade">

      {/* Load the real fonts */}
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />

      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600;700&family=Libre+Baskerville:wght@400;700&family=Manrope:wght@400;500;600;700&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700&family=Playfair+Display:wght@600;700&family=Poppins:wght@500;600;700&family=Source+Sans+3:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap"
      />

      {/* CSS only for this Typography Tool */}
      <style>
        {`
          .typography-tool-upgrade {
            display: grid;
            gap: 24px;
          }

          .typography-topbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            flex-wrap: wrap;
          }

          .typography-pair-info {
            display: grid;
            gap: 4px;
          }

          .typography-pair-info small {
            color: #77718a;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: .08em;
            text-transform: uppercase;
          }

          .typography-pair-info strong {
            color: #130150;
            font-size: 18px;
          }

          .typography-controls {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            padding: 20px;
            border: 1px solid #e8e5f0;
            border-radius: 16px;
            background: #faf9ff;
          }

          .typography-controls label {
            display: grid;
            gap: 8px;
          }

          .typography-controls label span {
            color: #35304b;
            font-size: 13px;
            font-weight: 700;
          }

          .typography-controls input,
          .typography-controls textarea {
            width: 100%;
            border: 1px solid #ddd9ea;
            border-radius: 11px;
            background: #fff;
            padding: 12px 14px;
            color: #1b1730;
            font: inherit;
            outline: none;
          }

          .typography-controls textarea {
            min-height: 90px;
            resize: vertical;
          }

          .typography-controls input:focus,
          .typography-controls textarea:focus {
            border-color: #6d5dfc;
            box-shadow:
              0 0 0 3px
              rgba(109, 93, 252, .10);
          }

          .typography-live-preview {
            --heading-font:
              'Playfair Display';

            --body-font:
              'Inter';

            padding: 34px;
            border: 1px solid #e5e2ed;
            border-radius: 18px;
            background: #fff;
          }

          .typography-font-label {
            margin-bottom: 9px;
            color: #77718a;
            font-size: 12px;
            font-weight: 600;
          }

          .typography-heading {
            margin:
              0
              0
              30px !important;

            font-family:
              var(--heading-font),
              serif !important;

            font-size:
              clamp(
                32px,
                4vw,
                54px
              ) !important;

            font-weight:
              700 !important;

            line-height:
              1.1 !important;

            letter-spacing:
              -0.025em;

            color:
              #130150 !important;
          }

          .typography-body {
            margin: 0 !important;

            max-width: 900px;

            font-family:
              var(--body-font),
              sans-serif !important;

            font-size:
              18px !important;

            font-weight:
              400 !important;

            line-height:
              1.75 !important;

            color:
              #373047 !important;
          }

          .typography-explanation {
            display: grid;
            grid-template-columns:
              repeat(
                3,
                minmax(0, 1fr)
              );

            gap: 14px;
          }

          .typography-explanation article {
            padding: 18px;
            border:
              1px solid
              #e8e5f0;

            border-radius: 14px;
            background: #fff;
          }

          .typography-explanation small {
            display: block;
            margin-bottom: 7px;
            color: #817a94;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: .07em;
            text-transform: uppercase;
          }

          .typography-explanation strong {
            display: block;
            color: #130150;
            font-size: 16px;
            line-height: 1.4;
          }

          .typography-description {
            margin: 0;
            padding: 16px 18px;
            border-left: 3px solid #130150;
            border-radius: 0 12px 12px 0;
            background: #faf9ff;
            color: #625b73;
            font-size: 14px;
            line-height: 1.65;
          }

          @media (max-width: 760px) {
            .typography-controls {
              grid-template-columns: 1fr;
            }

            .typography-explanation {
              grid-template-columns: 1fr;
            }

            .typography-live-preview {
              padding: 22px;
            }

            .typography-topbar .btn {
              width: 100%;
            }
          }
        `}
      </style>


      <div className="typography-topbar">

        <div className="typography-pair-info">

          <small>
            Current typography style
          </small>

          <strong>
            {pair.style}
          </strong>

        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={nextPair}
        >
          Show another pairing
        </button>

      </div>


      {/* User can test their own content */}
      <div className="typography-controls">

        <label>

          <span>
            Test your heading
          </span>

          <input
            value={headingText}
            onChange={
              event =>
                setHeadingText(
                  event.target.value
                )
            }
            placeholder="Enter your heading"
          />

        </label>

        <label>

          <span>
            Test your body content
          </span>

          <textarea
            value={bodyText}
            onChange={
              event =>
                setBodyText(
                  event.target.value
                )
            }
            placeholder="Enter your body text"
          />

        </label>

      </div>


      {/* Real font preview */}
      <div
        className="typography-live-preview"
        style={{
          '--heading-font':
            `'${pair.heading}'`,

          '--body-font':
            `'${pair.body}'`
        }}
      >

        <div className="typography-font-label">
          Heading font — {pair.heading}
        </div>

        <h2 className="typography-heading">
          {headingText}
        </h2>


        <div className="typography-font-label">
          Body font — {pair.body}
        </div>

        <p className="typography-body">
          {bodyText}
        </p>

      </div>


      {/* Typography explanation */}
      <div className="typography-explanation">

        <article>

          <small>
            Heading
          </small>

          <strong>
            {pair.heading}
          </strong>

        </article>

        <article>

          <small>
            Body
          </small>

          <strong>
            {pair.body}
          </strong>

        </article>

        <article>

          <small>
            Pairing
          </small>

          <strong>
            {pair.style}
          </strong>

        </article>

      </div>


      <p className="typography-description">
        {pair.description}
      </p>

    </div>
  );
}

/* ============================================================
   MARKET RESEARCH
============================================================ */
function MarketResearchTool() {
  const [industry, setIndustry] =
    useState('');

  const [location, setLocation] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const [report, setReport] =
    useState(null);

  const [status, setStatus] =
    useState('Ready');


  async function researchMarket(event) {
    event.preventDefault();

    const cleanIndustry =
      industry.trim();

    const cleanLocation =
      location.trim();

    if (!cleanIndustry) {
      setError(
        'Please enter an industry or business type.'
      );

      return;
    }

    setLoading(true);
    setError('');
    setReport(null);
    setStatus(
      'Connecting to live market research...'
    );

    try {
      const response =
        await fetch(
          'http://127.0.0.1:8787/api/market-research',
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json'
            },

            body:
              JSON.stringify({
                industry:
                  cleanIndustry,

                location:
                  cleanLocation
              })
          }
        );

      const raw =
        await response.text();

      console.log(
        'Market Research HTTP:',
        response.status
      );

      console.log(
        'Market Research raw response:',
        raw
      );

      let data;

      try {
        data =
          raw
            ? JSON.parse(raw)
            : {};
      } catch {
        throw new Error(
          `Server returned invalid response: ${raw}`
        );
      }

      if (!response.ok) {
        throw new Error(
          data.error ||
          `Server error ${response.status}`
        );
      }

      setReport(data);

      setStatus(
        `Live research completed • ${
          data.resultCount || 0
        } results analysed`
      );

    } catch (err) {
      console.error(
        'Market Research Error:',
        err
      );

      setError(
        err.message ||
        'Unable to fetch market research.'
      );

      setStatus(
        'Research failed'
      );

    } finally {
      setLoading(false);
    }
  }


  return (
    <div
      className="tool-panel"
      style={{
        display: 'grid',
        gap: '22px'
      }}
    >

      <form
        onSubmit={researchMarket}
        className="tool-form"
      >

        <label>
          <span>
            Industry / Business Type
          </span>

          <input
            type="text"
            value={industry}
            onChange={
              event =>
                setIndustry(
                  event.target.value
                )
            }
            placeholder="Example: Banquet Halls"
          />
        </label>


        <label>
          <span>
            Location
          </span>

          <input
            type="text"
            value={location}
            onChange={
              event =>
                setLocation(
                  event.target.value
                )
            }
            placeholder="Example: Hyderabad"
          />
        </label>


        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading
            ? 'Researching live market...'
            : 'Research Market'}
        </button>

      </form>


      <div
        style={{
          padding: '12px 15px',
          borderRadius: '10px',
          background: '#f8f7fc',
          border:
            '1px solid #e8e5f0',
          color: '#5f5870',
          fontSize: '14px'
        }}
      >
        Status: {status}
      </div>


      {error && (
        <div
          style={{
            padding: '15px',
            background: '#fff2f2',
            border:
              '1px solid #ffcaca',
            color: '#a61b1b',
            borderRadius: '10px',
            whiteSpace: 'pre-wrap'
          }}
        >
          <strong>
            Market Research Error
          </strong>

          <div
            style={{
              marginTop: '7px'
            }}
          >
            {error}
          </div>
        </div>
      )}


      {report && (
        <div
          style={{
            display: 'grid',
            gap: '26px'
          }}
        >

          <div
            style={{
              padding: '20px',
              borderRadius: '16px',
              background: '#faf9ff',
              border:
                '1px solid #e6e1f0'
            }}
          >

            <div
              style={{
                fontSize: '12px',
                fontWeight: '700',
                textTransform:
                  'uppercase',
                letterSpacing:
                  '.08em',
                color: '#77718a'
              }}
            >
              Live Market Analysis
            </div>

            <h3
              style={{
                margin:
                  '8px 0 5px',
                color: '#130150'
              }}
            >
              {report.industry}
              {report.location
                ? ` — ${report.location}`
                : ''}
            </h3>

            <p
              style={{
                margin: 0,
                color: '#6f687d'
              }}
            >
              {report.resultCount || 0}
              {' '}
              current web results analysed
            </p>

          </div>


          {Array.isArray(
            report.competitors
          ) &&
            report.competitors.length >
              0 && (

            <section>

              <h3>
                Competitors & Market Players
              </h3>

              <div
                style={{
                  display: 'grid',
                  gap: '12px'
                }}
              >

                {report.competitors.map(
                  (
                    competitor,
                    index
                  ) => (

                    <article
                      key={
                        competitor.url ||
                        index
                      }
                      style={{
                        padding:
                          '17px',
                        border:
                          '1px solid #e8e5f0',
                        borderRadius:
                          '13px',
                        background:
                          '#fff'
                      }}
                    >

                      <strong
                        style={{
                          color:
                            '#130150'
                        }}
                      >
                        {index + 1}.{' '}
                        {competitor.name ||
                          competitor.domain}
                      </strong>

                      {competitor.description && (
                        <p
                          style={{
                            margin:
                              '8px 0',
                            color:
                              '#696375',
                            lineHeight:
                              1.6
                          }}
                        >
                          {
                            competitor.description
                          }
                        </p>
                      )}

                      {competitor.url && (
                        <a
                          href={
                            competitor.url
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          {competitor.domain ||
                            'View source'}
                        </a>
                      )}

                    </article>

                  )
                )}

              </div>

            </section>
          )}


          {Array.isArray(
            report.keywords
          ) &&
            report.keywords.length >
              0 && (

            <section>

              <h3>
                Market Keywords
              </h3>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}
              >

                {report.keywords.map(
                  (
                    item,
                    index
                  ) => (

                    <span
                      key={
                        `${item.keyword}-${index}`
                      }
                      style={{
                        padding:
                          '9px 13px',
                        borderRadius:
                          '999px',
                        background:
                          '#eeeaff',
                        color:
                          '#130150',
                        fontWeight:
                          '700',
                        fontSize:
                          '13px'
                      }}
                    >
                      {item.keyword}

                      {item.mentions
                        ? ` (${item.mentions})`
                        : ''}
                    </span>

                  )
                )}

              </div>

            </section>
          )}


          {Array.isArray(
            report.sources
          ) &&
            report.sources.length >
              0 && (

            <section>

              <h3>
                Live Sources
              </h3>

              <div
                style={{
                  display: 'grid',
                  gap: '10px'
                }}
              >

                {report.sources.map(
                  (
                    source,
                    index
                  ) => (

                    <a
                      key={
                        `${source.url}-${index}`
                      }
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        padding:
                          '14px 16px',
                        border:
                          '1px solid #e8e5f0',
                        borderRadius:
                          '12px',
                        textDecoration:
                          'none',
                        background:
                          '#fff'
                      }}
                    >

                      <strong
                        style={{
                          color:
                            '#130150'
                        }}
                      >
                        {source.title}
                      </strong>

                      <div
                        style={{
                          marginTop:
                            '5px',
                          color:
                            '#77718a',
                          fontSize:
                            '12px'
                        }}
                      >
                        {source.domain}
                      </div>

                    </a>

                  )
                )}

              </div>

            </section>
          )}


          <details>
            <summary
              style={{
                cursor: 'pointer',
                fontWeight: '700',
                color: '#130150'
              }}
            >
              View raw research data
            </summary>

            <pre
              style={{
                marginTop: '12px',
                padding: '15px',
                overflowX: 'auto',
                background: '#f7f6fa',
                borderRadius: '10px',
                fontSize: '12px'
              }}
            >
              {JSON.stringify(
                report,
                null,
                2
              )}
            </pre>
          </details>

        </div>
      )}

    </div>
  );
}


/* ============================================================
   BRAND POSITIONING
============================================================ */

const POSITIONING_INDUSTRY_STARTERS = {
  'Digital Services': {
    audience: 'growing businesses that need consistent digital growth',
    problem: 'fragmented marketing, inconsistent execution and unclear digital priorities',
    value: 'turn disconnected digital activity into a coordinated growth system',
    differentiator: 'strategy, creative, technology and measurement working together',
    proof: 'connected delivery across marketing, websites, branding, SEO and analytics'
  },
  'Furniture & Interiors': {
    audience: 'homeowners, architects and buyers looking for dependable furniture and interior solutions',
    problem: 'difficulty comparing quality, design, comfort and trustworthy service',
    value: 'make premium spaces easier to plan, choose and complete',
    differentiator: 'design-led guidance combined with practical product and interior expertise',
    proof: 'real product quality, project execution, material knowledge and customer experience'
  },
  'Technology & IT': {
    audience: 'businesses that need reliable technology to operate and grow',
    problem: 'complex systems, disconnected tools and technical decisions that slow execution',
    value: 'simplify technology and turn it into measurable business capability',
    differentiator: 'practical engineering, scalable architecture and business-first implementation',
    proof: 'working products, technical expertise, delivery process and measurable performance'
  },
  'Food & Restaurants': {
    audience: 'customers looking for memorable food, dependable quality and an enjoyable dining experience',
    problem: 'too many similar choices with little clarity around quality, taste and experience',
    value: 'deliver a distinctive food experience people want to return to and recommend',
    differentiator: 'consistent taste, presentation, hospitality and a recognizable dining identity',
    proof: 'menu quality, customer experience, repeat visits and service consistency'
  },
  'Fashion & Beauty': {
    audience: 'style-conscious customers who want confidence, quality and a distinctive look',
    problem: 'generic choices that do not feel personal, premium or trustworthy',
    value: 'help customers express their style with confidence',
    differentiator: 'a refined visual point of view, personalized service and premium presentation',
    proof: 'craft, styling expertise, product quality and customer transformations'
  },
  'Real Estate': {
    audience: 'buyers and investors looking for property opportunities they can understand and trust',
    problem: 'unclear project information, weak differentiation and uncertainty around value',
    value: 'make property decisions clearer, more confident and opportunity-focused',
    differentiator: 'transparent communication, location-led value and credible project guidance',
    proof: 'approvals, location advantages, project documentation and on-ground visibility'
  },
  Healthcare: {
    audience: 'patients and families looking for dependable, accessible and compassionate care',
    problem: 'uncertainty about where to receive trustworthy care and what to expect',
    value: 'make quality healthcare easier to understand, access and trust',
    differentiator: 'patient-first care, qualified expertise and clear communication',
    proof: 'clinical expertise, facilities, service standards and patient outcomes'
  },
  Education: {
    audience: 'students and families seeking practical learning and stronger future opportunities',
    problem: 'difficulty choosing learning that is relevant, supportive and outcome-oriented',
    value: 'turn learning into practical capability and confident progress',
    differentiator: 'structured teaching, relevant curriculum and learner-focused guidance',
    proof: 'faculty expertise, learner outcomes, curriculum quality and practical exposure'
  },
  'E-commerce & Retail': {
    audience: 'buyers who want convenient access to useful products with confidence and value',
    problem: 'too much choice, inconsistent trust and friction between discovery and purchase',
    value: 'make product discovery and buying simpler, faster and more dependable',
    differentiator: 'easy discovery, clear value, dependable experience and customer convenience',
    proof: 'product range, transaction experience, service quality and repeat customers'
  },
  'Professional Services': {
    audience: 'businesses and individuals looking for reliable specialist guidance',
    problem: 'difficulty judging expertise, trust and the practical value of professional advice',
    value: 'turn specialist knowledge into clear decisions and confident action',
    differentiator: 'clear guidance, responsive service and outcome-focused expertise',
    proof: 'experience, process, client work and professional credibility'
  }
};

const POSITIONING_PERSONALITIES = {
  Modern: {
    tone: 'clear, contemporary, confident and concise',
    promiseLead: 'Make progress simpler and more measurable'
  },
  Premium: {
    tone: 'refined, assured, selective and sophisticated',
    promiseLead: 'Deliver a more considered and elevated experience'
  },
  Professional: {
    tone: 'credible, precise, dependable and business-focused',
    promiseLead: 'Create clarity, confidence and dependable outcomes'
  },
  Friendly: {
    tone: 'warm, simple, helpful and approachable',
    promiseLead: 'Make every step easier to understand and act on'
  },
  Bold: {
    tone: 'direct, energetic, decisive and ambitious',
    promiseLead: 'Challenge the ordinary and move customers to action'
  },
  Innovative: {
    tone: 'forward-looking, intelligent, curious and progressive',
    promiseLead: 'Turn better ideas into smarter ways to move forward'
  }
};

function trimPositioningText(value = '') {
  return String(value)
    .replace(/\s+/g, ' ')
    .trim();
}

function positioningSentence(value = '') {
  const clean = trimPositioningText(value);

  if (!clean) {
    return '';
  }

  return clean
    .replace(/[.!?]+$/g, '');
}

function positioningTitle(value = '') {
  const clean = positioningSentence(value);

  if (!clean) {
    return '';
  }

  return (
    clean.charAt(0).toUpperCase() +
    clean.slice(1)
  );
}

function shortenPositioning(value = '', max = 62) {
  const clean = positioningSentence(value);

  if (clean.length <= max) {
    return clean;
  }

  const clipped =
    clean.slice(0, max);

  const lastSpace =
    clipped.lastIndexOf(' ');

  return `${
    clipped.slice(
      0,
      lastSpace > 25
        ? lastSpace
        : max
    )
  }…`;
}

function PositioningTool() {
  const [brandName, setBrandName] =
    useState('Digitalness');

  const [industry, setIndustry] =
    useState('Digital Services');

  const [audience, setAudience] =
    useState(
      POSITIONING_INDUSTRY_STARTERS[
        'Digital Services'
      ].audience
    );

  const [problem, setProblem] =
    useState(
      POSITIONING_INDUSTRY_STARTERS[
        'Digital Services'
      ].problem
    );

  const [value, setValue] =
    useState(
      POSITIONING_INDUSTRY_STARTERS[
        'Digital Services'
      ].value
    );

  const [
    differentiator,
    setDifferentiator
  ] =
    useState(
      POSITIONING_INDUSTRY_STARTERS[
        'Digital Services'
      ].differentiator
    );

  const [proof, setProof] =
    useState(
      POSITIONING_INDUSTRY_STARTERS[
        'Digital Services'
      ].proof
    );

  const [
    personality,
    setPersonality
  ] =
    useState('Professional');

  const [goal, setGoal] =
    useState('Generate qualified leads');

  const [
    variation,
    setVariation
  ] =
    useState(0);

  const [
    copied,
    setCopied
  ] =
    useState('');

  const strategy =
    useMemo(
      () => {
        const brand =
          trimPositioningText(
            brandName
          ) ||
          'Your brand';

        const category =
          trimPositioningText(
            industry
          ) ||
          'business';

        const target =
          positioningSentence(
            audience
          ) ||
          'the right customers';

        const customerProblem =
          positioningSentence(
            problem
          ) ||
          'unclear choices and inconsistent experiences';

        const benefit =
          positioningSentence(
            value
          ) ||
          'create a clearer and more valuable customer outcome';

        const difference =
          positioningSentence(
            differentiator
          ) ||
          'a more focused and relevant approach';

        const credibility =
          positioningSentence(
            proof
          ) ||
          'clear evidence and consistent delivery';

        const selectedPersonality =
          POSITIONING_PERSONALITIES[
            personality
          ] ||
          POSITIONING_PERSONALITIES
            .Professional;

        const selectedGoal =
          positioningSentence(
            goal
          ) ||
          'build stronger demand';

        const statements = [
          `For ${target} who are dealing with ${customerProblem}, ${brand} is a ${category} brand that helps them ${benefit}. It stands apart through ${difference}, supported by ${credibility}.`,

          `${brand} is positioned for ${target} who want to move beyond ${customerProblem}. The brand delivers ${benefit} through ${difference}, with trust reinforced by ${credibility}.`,

          `Unlike generic alternatives in ${category}, ${brand} focuses on ${target}, helping them ${benefit}. Its advantage is ${difference}, backed by ${credibility}.`
        ];

        const valueProps = [
          `${brand} helps ${target} ${benefit} through ${difference}.`,

          `${benefit.charAt(0).toUpperCase()}${benefit.slice(1)} for ${target}, powered by ${difference}.`,

          `${brand} combines ${difference} so ${target} can ${benefit}.`
        ];

        const competitiveAngles = [
          `Compete on ${difference}, not only on price or generic service claims.`,
          `Own the space between the customer problem — ${customerProblem} — and the desired outcome — ${benefit}.`,
          `Make ${credibility} visible so the promise of ${difference} feels believable before a customer converts.`
        ];

        const promise =
          `${selectedPersonality.promiseLead}: ${benefit}.`;

        const pillars = [
          {
            title:
              'Customer outcome',
            text:
              positioningTitle(
                benefit
              )
          },
          {
            title:
              'Distinct advantage',
            text:
              positioningTitle(
                difference
              )
          },
          {
            title:
              'Reason to believe',
            text:
              positioningTitle(
                credibility
              )
          }
        ];

        const goalLower =
          selectedGoal.toLowerCase();

        const goalPhrase =
          goalLower.includes(
            'lead'
          )
            ? 'Turn attention into qualified enquiries'
            : goalLower.includes(
                'sale'
              )
              ? 'Turn preference into confident purchase'
              : goalLower.includes(
                  'trust'
                )
                ? 'Earn trust before asking for action'
                : goalLower.includes(
                    'premium'
                  )
                  ? 'Build a more valuable and premium perception'
                  : goalLower.includes(
                      'awareness'
                    )
                    ? 'Become easier to recognize and remember'
                    : goalLower.includes(
                        'market'
                      )
                      ? 'Enter the market with a clearer reason to choose'
                      : positioningTitle(
                          selectedGoal
                        );

        const shortBenefit =
          shortenPositioning(
            benefit,
            46
          );

        const shortDifference =
          shortenPositioning(
            difference,
            43
          );

        const taglines = [
          `${positioningTitle(
            shortBenefit
          )}.`,

          `${brand}. ${positioningTitle(
            shortDifference
          )}.`,

          `${goalPhrase}.`
        ];

        const recommendations = [
          `Lead website and campaign messaging with the audience problem: “${positioningTitle(
            customerProblem
          )}.”`,
          `Repeat the core value consistently: “${positioningTitle(
            benefit
          )}.”`,
          `Use proof such as ${credibility} near calls-to-action, enquiry forms and sales conversations.`,
          `Keep the brand voice ${selectedPersonality.tone}.`,
          `For the goal “${selectedGoal}”, prioritize one clear next action instead of multiple competing CTAs.`
        ];

        const index =
          variation %
          statements.length;

        return {
          positioning:
            statements[index],
          valueProposition:
            valueProps[index],
          competitiveAngle:
            competitiveAngles[
              index
            ],
          promise,
          pillars,
          tone:
            selectedPersonality.tone,
          taglines,
          recommendations,
          brand,
          category,
          target,
          goal:
            selectedGoal
        };
      },
      [
        brandName,
        industry,
        audience,
        problem,
        value,
        differentiator,
        proof,
        personality,
        goal,
        variation
      ]
    );

  function loadIndustryDirection() {
    const starter =
      POSITIONING_INDUSTRY_STARTERS[
        industry
      ];

    if (!starter) {
      return;
    }

    setAudience(
      starter.audience
    );

    setProblem(
      starter.problem
    );

    setValue(
      starter.value
    );

    setDifferentiator(
      starter.differentiator
    );

    setProof(
      starter.proof
    );

    setVariation(
      current =>
        current + 1
    );

    setCopied('');
  }

  function resetPositioning() {
    const starter =
      POSITIONING_INDUSTRY_STARTERS[
        'Digital Services'
      ];

    setBrandName(
      'Digitalness'
    );

    setIndustry(
      'Digital Services'
    );

    setAudience(
      starter.audience
    );

    setProblem(
      starter.problem
    );

    setValue(
      starter.value
    );

    setDifferentiator(
      starter.differentiator
    );

    setProof(
      starter.proof
    );

    setPersonality(
      'Professional'
    );

    setGoal(
      'Generate qualified leads'
    );

    setVariation(0);
    setCopied('');
  }

  async function copyStrategy() {
    const text = [
      'BRAND POSITIONING',
      strategy.positioning,
      '',
      'VALUE PROPOSITION',
      strategy.valueProposition,
      '',
      'BRAND PROMISE',
      strategy.promise,
      '',
      'COMPETITIVE ANGLE',
      strategy.competitiveAngle,
      '',
      'MESSAGE PILLARS',
      ...strategy.pillars.map(
        pillar =>
          `• ${pillar.title}: ${pillar.text}`
      ),
      '',
      'TONE OF VOICE',
      strategy.tone,
      '',
      'TAGLINE DIRECTIONS',
      ...strategy.taglines.map(
        tagline =>
          `• ${tagline}`
      ),
      '',
      'RECOMMENDATIONS',
      ...strategy.recommendations.map(
        item =>
          `• ${item}`
      )
    ].join('\n');

    try {
      await navigator.clipboard
        .writeText(text);

      setCopied(
        'Strategy copied to clipboard.'
      );
    } catch {
      setCopied(
        'Copy was blocked by the browser. Select the text manually.'
      );
    }
  }

  return (
    <div className="tool-panel brand-positioning-tool">

      <style>
        {`
          .brand-positioning-tool {
            display: grid;
            gap: 24px;
          }

          .brand-positioning-intro {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 18px;
            padding: 18px;
            border: 1px solid var(--theme-border, #e6e2ef);
            border-radius: 16px;
            background: var(--theme-soft, #faf9ff);
          }

          .brand-positioning-intro h3 {
            margin: 0 0 6px;
            color: var(--theme-text, #130150) !important;
            font-size: 1rem;
          }

          .brand-positioning-intro p {
            margin: 0;
            max-width: 760px;
            color: var(--theme-muted, #6f687d);
            font-size: .8rem;
            line-height: 1.65;
          }

          .brand-positioning-form {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 16px;
          }

          .brand-positioning-form label {
            display: grid;
            gap: 8px;
            color: var(--theme-text, #1b1730);
            font-size: .78rem;
            font-weight: 750;
          }

          .brand-positioning-form .positioning-wide {
            grid-column: 1 / -1;
          }

          .brand-positioning-form input,
          .brand-positioning-form select,
          .brand-positioning-form textarea {
            width: 100%;
            border: 1px solid var(--theme-border, #dfdcea);
            border-radius: 11px;
            background: var(--theme-surface, #fff);
            color: var(--theme-text, #1b1730);
            font: inherit;
            font-weight: 550;
            outline: none;
          }

          .brand-positioning-form input,
          .brand-positioning-form select {
            min-height: 48px;
            padding: 0 13px;
          }

          .brand-positioning-form textarea {
            min-height: 92px;
            padding: 12px 13px;
            line-height: 1.55;
            resize: vertical;
          }

          .brand-positioning-form input:focus,
          .brand-positioning-form select:focus,
          .brand-positioning-form textarea:focus {
            border-color: var(--theme-primary, #130150);
            box-shadow: 0 0 0 3px var(--theme-focus, rgba(19, 1, 80, .09));
          }

          .brand-positioning-actions {
            display: flex;
            align-items: center;
            gap: 10px;
            flex-wrap: wrap;
          }

          .brand-positioning-output {
            display: grid;
            gap: 16px;
          }

          .positioning-main-card {
            padding: clamp(22px, 4vw, 34px);
            border-radius: 18px;
            background:
              linear-gradient(
                135deg,
                var(--theme-primary, #130150),
                var(--theme-secondary, #6d5dfc)
              );
            color: var(--theme-on-primary, #fff);
          }

          .positioning-main-card small {
            display: block;
            margin-bottom: 10px;
            opacity: .72;
            font-size: .68rem;
            font-weight: 800;
            letter-spacing: .12em;
            text-transform: uppercase;
          }

          .positioning-main-card p {
            margin: 0;
            max-width: 980px;
            color: inherit !important;
            font-size: clamp(1.05rem, 2vw, 1.35rem);
            font-weight: 650;
            line-height: 1.7;
          }

          .positioning-strategy-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }

          .positioning-strategy-card {
            padding: 18px;
            border: 1px solid var(--theme-border, #e6e2ef);
            border-radius: 15px;
            background: var(--theme-surface, #fff);
          }

          .positioning-strategy-card small {
            display: block;
            margin-bottom: 7px;
            color: var(--theme-primary, #130150);
            font-size: .67rem;
            font-weight: 850;
            letter-spacing: .08em;
            text-transform: uppercase;
          }

          .positioning-strategy-card p {
            margin: 0;
            color: var(--theme-text, #242033);
            font-size: .85rem;
            line-height: 1.65;
          }

          .positioning-pillars {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 12px;
          }

          .positioning-pillar {
            padding: 17px;
            border-radius: 14px;
            background: var(--theme-soft, #f6f4fb);
            border: 1px solid var(--theme-border, #e6e2ef);
          }

          .positioning-pillar b {
            display: block;
            margin-bottom: 6px;
            color: var(--theme-primary, #130150);
            font-size: .78rem;
          }

          .positioning-pillar span {
            color: var(--theme-muted, #676174);
            font-size: .75rem;
            line-height: 1.55;
          }

          .positioning-taglines {
            display: grid;
            gap: 9px;
          }

          .positioning-taglines span {
            padding: 12px 14px;
            border: 1px solid var(--theme-border, #e6e2ef);
            border-radius: 11px;
            background: var(--theme-surface, #fff);
            color: var(--theme-text, #242033);
            font-size: .8rem;
            font-weight: 700;
          }

          .positioning-recommendations {
            display: grid;
            gap: 9px;
          }

          .positioning-recommendations p {
            margin: 0;
            padding: 11px 13px;
            border-left: 3px solid var(--theme-primary, #130150);
            border-radius: 0 10px 10px 0;
            background: var(--theme-soft, #faf9ff);
            color: var(--theme-muted, #625b73);
            font-size: .76rem;
            line-height: 1.55;
          }

          .positioning-copy-message {
            margin: 0;
            color: var(--theme-muted, #6f687d);
            font-size: .72rem;
          }

          @media (max-width: 820px) {
            .brand-positioning-form,
            .positioning-strategy-grid,
            .positioning-pillars {
              grid-template-columns: 1fr;
            }

            .brand-positioning-form .positioning-wide {
              grid-column: auto;
            }

            .brand-positioning-intro {
              flex-direction: column;
            }
          }

          @media (max-width: 560px) {
            .brand-positioning-actions .btn {
              width: 100%;
            }
          }
        `}
      </style>

      <div className="brand-positioning-intro">
        <div>
          <h3>
            Build a complete positioning direction
          </h3>

          <p>
            Every field below directly changes the strategy.
            Define who the brand serves, the customer problem,
            the value you create, your differentiator and the
            proof that makes the promise believable.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={
            loadIndustryDirection
          }
        >
          Use industry starter
        </button>
      </div>

      <div className="brand-positioning-form">

        <label>
          Brand / business name

          <input
            value={brandName}
            onChange={
              event =>
                setBrandName(
                  event.target.value
                )
            }
            placeholder="Example: Digitalness"
          />
        </label>

        <label>
          Industry

          <select
            value={industry}
            onChange={
              event =>
                setIndustry(
                  event.target.value
                )
            }
          >
            {Object.keys(
              POSITIONING_INDUSTRY_STARTERS
            ).map(
              item => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              )
            )}
          </select>
        </label>

        <label>
          Brand personality

          <select
            value={personality}
            onChange={
              event =>
                setPersonality(
                  event.target.value
                )
            }
          >
            {Object.keys(
              POSITIONING_PERSONALITIES
            ).map(
              item => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              )
            )}
          </select>
        </label>

        <label>
          Primary goal

          <select
            value={goal}
            onChange={
              event =>
                setGoal(
                  event.target.value
                )
            }
          >
            <option>
              Generate qualified leads
            </option>
            <option>
              Increase sales
            </option>
            <option>
              Build trust
            </option>
            <option>
              Increase brand awareness
            </option>
            <option>
              Build premium perception
            </option>
            <option>
              Enter a new market
            </option>
          </select>
        </label>

        <label className="positioning-wide">
          Target audience

          <textarea
            value={audience}
            onChange={
              event =>
                setAudience(
                  event.target.value
                )
            }
            placeholder="Who is the brand specifically for?"
          />
        </label>

        <label className="positioning-wide">
          Main customer problem

          <textarea
            value={problem}
            onChange={
              event =>
                setProblem(
                  event.target.value
                )
            }
            placeholder="What problem or frustration does this audience face?"
          />
        </label>

        <label className="positioning-wide">
          Value / outcome offered

          <textarea
            value={value}
            onChange={
              event =>
                setValue(
                  event.target.value
                )
            }
            placeholder="What meaningful outcome does the brand create?"
          />
        </label>

        <label className="positioning-wide">
          Key differentiator

          <textarea
            value={
              differentiator
            }
            onChange={
              event =>
                setDifferentiator(
                  event.target.value
                )
            }
            placeholder="Why should customers choose this brand instead of alternatives?"
          />
        </label>

        <label className="positioning-wide">
          Proof / reason to believe

          <textarea
            value={proof}
            onChange={
              event =>
                setProof(
                  event.target.value
                )
            }
            placeholder="What evidence makes the positioning credible?"
          />
        </label>

      </div>

      <div className="brand-positioning-actions">

        <button
          type="button"
          className="btn btn-primary"
          onClick={() =>
            setVariation(
              current =>
                current + 1
            )
          }
        >
          Generate another direction
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={copyStrategy}
        >
          Copy strategy
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={resetPositioning}
        >
          Reset
        </button>

      </div>

      {copied && (
        <p className="positioning-copy-message">
          {copied}
        </p>
      )}

      <div className="brand-positioning-output">

        <div className="positioning-main-card">

          <small>
            Positioning statement
          </small>

          <p>
            {strategy.positioning}
          </p>

        </div>

        <div className="positioning-strategy-grid">

          <article className="positioning-strategy-card">
            <small>
              Value proposition
            </small>

            <p>
              {strategy.valueProposition}
            </p>
          </article>

          <article className="positioning-strategy-card">
            <small>
              Brand promise
            </small>

            <p>
              {strategy.promise}
            </p>
          </article>

          <article className="positioning-strategy-card">
            <small>
              Competitive angle
            </small>

            <p>
              {strategy.competitiveAngle}
            </p>
          </article>

          <article className="positioning-strategy-card">
            <small>
              Tone of voice
            </small>

            <p>
              {positioningTitle(
                strategy.tone
              )}.
            </p>
          </article>

        </div>

        <div>
          <p className="tool-note">
            Messaging pillars
          </p>

          <div className="positioning-pillars">
            {strategy.pillars.map(
              pillar => (
                <div
                  className="positioning-pillar"
                  key={pillar.title}
                >
                  <b>
                    {pillar.title}
                  </b>

                  <span>
                    {pillar.text}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        <div>
          <p className="tool-note">
            Tagline directions
          </p>

          <div className="positioning-taglines">
            {strategy.taglines.map(
              (
                tagline,
                index
              ) => (
                <span
                  key={`${tagline}-${index}`}
                >
                  {tagline}
                </span>
              )
            )}
          </div>
        </div>

        <div>
          <p className="tool-note">
            How to apply this positioning
          </p>

          <div className="positioning-recommendations">
            {strategy.recommendations.map(
              (
                item,
                index
              ) => (
                <p
                  key={`${index}-${item}`}
                >
                  {index + 1}. {item}
                </p>
              )
            )}
          </div>
        </div>

      </div>

    </div>
  );
}



/* ============================================================
   BRANDING FUNNEL
============================================================ */


function BrandingFunnel() {
  const STORAGE_KEY = 'digitalness-branding-funnel-v1';

  const defaultProfile = {
    businessName: 'Digitalness',
    industry: 'Digital Services',
    audience: 'SMBs that need better digital growth systems',
    goal: 'Generate more qualified enquiries',
    differentiator: 'Strategy, creative, websites and performance working as one connected system',
    offer: 'Brand strategy, websites, performance marketing and business growth support'
  };

  const [profile, setProfile] = useState(defaultProfile);
  const [completed, setCompleted] = useState({});
  const [activeStage, setActiveStage] = useState('Awareness');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed?.profile) setProfile(prev => ({ ...prev, ...parsed.profile }));
      if (parsed?.completed) setCompleted(parsed.completed);
      if (parsed?.activeStage) setActiveStage(parsed.activeStage);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ profile, completed, activeStage })
      );
    } catch {}
  }, [profile, completed, activeStage]);

  function updateField(key, value) {
    setProfile(prev => ({ ...prev, [key]: value }));
  }

  const stageBlueprint = useMemo(() => {
    const name = profile.businessName || 'Your brand';
    const industry = profile.industry || 'your industry';
    const audience = profile.audience || 'your target audience';
    const goal = profile.goal || 'grow the business';
    const differentiator = profile.differentiator || 'a clear advantage';
    const offer = profile.offer || 'your core offer';

    return [
      {
        stage: 'Awareness',
        purpose: 'Reach the right people and make the brand recognizable.',
        objective: `Introduce ${name} to ${audience} and establish a clear first impression in ${industry}.`,
        tasks: [
          `Define the core awareness message around ${goal.toLowerCase()}.`,
          `Create top-of-funnel content that explains what ${name} does and who it serves.`,
          `Prepare campaign visuals and brand assets that highlight ${differentiator.toLowerCase()}.`
        ],
        deliverables: [
          'Brand awareness message',
          'Top-of-funnel ad/content set',
          'Hero creative directions'
        ],
        dependencies: ['Business goal clarity', 'Basic visual identity', 'Audience definition'],
        successMetric: 'Reach, impressions, video views, branded recall'
      },
      {
        stage: 'Interest',
        purpose: 'Make the audience care about the problem and the solution.',
        objective: `Build curiosity by connecting ${offer.toLowerCase()} to the needs of ${audience}.`,
        tasks: [
          `Publish educational content that reframes the audience problem ${name} solves.`,
          `Show practical proof of how ${offer.toLowerCase()} improves outcomes.`,
          `Use lead magnets, guides or short explainers to move visitors into active interest.`
        ],
        deliverables: [
          'Educational content themes',
          'Lead magnet or value content',
          'Problem-solution landing section'
        ],
        dependencies: ['Awareness messaging', 'Offer clarity'],
        successMetric: 'Landing-page engagement, CTR, saves, form starts'
      },
      {
        stage: 'Consideration',
        purpose: 'Build trust, credibility and preference.',
        objective: `Help prospects compare options and see why ${name} is a stronger choice than generic alternatives.`,
        tasks: [
          `Create comparison and objection-handling content based on ${differentiator.toLowerCase()}.`,
          'Add testimonials, case studies, process summaries and proof points.',
          `Design service pages or proposals that connect brand trust to ${goal.toLowerCase()}.`
        ],
        deliverables: [
          'Case study proof assets',
          'Trust-building content',
          'Offer comparison points'
        ],
        dependencies: ['Interest-stage content', 'Proof and testimonials'],
        successMetric: 'Returning visitors, consultation requests, proposal views'
      },
      {
        stage: 'Conversion',
        purpose: 'Make the next action clear, easy and low-friction.',
        objective: `Turn active interest into enquiries, bookings or sales for ${name}.`,
        tasks: [
          'Strengthen CTA messaging across the website, ads and follow-up steps.',
          'Reduce form friction and clarify the offer, pricing direction or consultation promise.',
          `Align landing pages, sales scripts and response workflows around ${goal.toLowerCase()}.`
        ],
        deliverables: [
          'Conversion-focused CTA set',
          'Optimized lead/contact flow',
          'Follow-up workflow outline'
        ],
        dependencies: ['Consideration assets', 'Working forms or CRM flow'],
        successMetric: 'Qualified leads, bookings, sales, conversion rate'
      },
      {
        stage: 'Retention',
        purpose: 'Stay useful after the first conversion.',
        objective: `Keep clients engaged so ${name} becomes more valuable over time.`,
        tasks: [
          'Create a simple onboarding and expectation-setting sequence.',
          'Plan regular communication, reporting or content touchpoints after conversion.',
          `Build a brand experience that reinforces ${differentiator.toLowerCase()} post-sale.`
        ],
        deliverables: [
          'Onboarding flow',
          'Post-purchase communication plan',
          'Retention touchpoint calendar'
        ],
        dependencies: ['Conversion workflow', 'Delivery process'],
        successMetric: 'Repeat business, retention rate, satisfaction, low churn'
      },
      {
        stage: 'Advocacy',
        purpose: 'Turn happy clients into referrals and social proof.',
        objective: `Encourage recommendations, testimonials and repeat referrals for ${name}.`,
        tasks: [
          'Ask for reviews, ratings and testimonials at the right delivery milestone.',
          'Create referral-friendly messaging and simple shareable brand assets.',
          'Turn customer wins into stories that attract similar prospects.'
        ],
        deliverables: [
          'Referral request script',
          'Testimonial/review process',
          'Customer story framework'
        ],
        dependencies: ['Retention experience', 'Satisfied clients'],
        successMetric: 'Reviews, referrals, testimonial count, advocacy rate'
      }
    ];
  }, [profile]);

  const stages = useMemo(() => stageBlueprint.map((stageData, index) => {
    const doneMap = completed[stageData.stage] || {};
    const total = stageData.tasks.length;
    const done = stageData.tasks.filter((_, taskIndex) => doneMap[taskIndex]).length;
    const progress = total ? Math.round((done / total) * 100) : 0;
    return {
      ...stageData,
      width: `${100 - index * 7}%`,
      done,
      total,
      progress,
      complete: done === total
    };
  }), [stageBlueprint, completed]);

  const overall = useMemo(() => {
    const totalTasks = stages.reduce((sum, s) => sum + s.total, 0);
    const doneTasks = stages.reduce((sum, s) => sum + s.done, 0);
    return totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0;
  }, [stages]);

  const current = stages.find(s => s.stage === activeStage) || stages[0];

  function toggleTask(stageName, taskIndex) {
    setCompleted(prev => ({
      ...prev,
      [stageName]: {
        ...(prev[stageName] || {}),
        [taskIndex]: !(prev[stageName] || {})[taskIndex]
      }
    }));
  }

  function resetProgress() {
    setCompleted({});
    setActiveStage('Awareness');
  }

  async function copyPlan() {
    const lines = [
      `${profile.businessName} — Branding Funnel`,
      `Industry: ${profile.industry}`,
      `Audience: ${profile.audience}`,
      `Goal: ${profile.goal}`,
      `Differentiator: ${profile.differentiator}`,
      `Offer: ${profile.offer}`,
      `Overall progress: ${overall}%`,
      ''
    ];

    stages.forEach(stage => {
      lines.push(`${stage.stage} (${stage.progress}%)`);
      lines.push(`Objective: ${stage.objective}`);
      lines.push('Tasks:');
      stage.tasks.forEach((task, idx) => {
        lines.push(`- [${(completed[stage.stage] || {})[idx] ? 'x' : ' '}] ${task}`);
      });
      lines.push(`Deliverables: ${stage.deliverables.join(', ')}`);
      lines.push(`Dependencies: ${stage.dependencies.join(', ')}`);
      lines.push(`Success metric: ${stage.successMetric}`);
      lines.push('');
    });

    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  function loadStarter() {
    setProfile({
      businessName: 'Digitalness',
      industry: 'Digital Services',
      audience: 'Businesses that need better digital strategy, websites and lead generation',
      goal: 'Generate more qualified leads and improve digital trust',
      differentiator: 'Integrated strategy, creative, websites, marketing and measurement under one team',
      offer: 'Digital marketing, branding, websites, SEO and business growth support'
    });
    setCompleted({});
    setActiveStage('Awareness');
  }

  return (
    <div className="tool-panel" style={{ display: 'grid', gap: 24 }}>
      <div style={{ display: 'grid', gap: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16 }}>
          <label style={{ display: 'grid', gap: 8 }}>
            <span>Business name</span>
            <input value={profile.businessName} onChange={event => updateField('businessName', event.target.value)} placeholder="Enter business name" />
          </label>
          <label style={{ display: 'grid', gap: 8 }}>
            <span>Industry</span>
            <input value={profile.industry} onChange={event => updateField('industry', event.target.value)} placeholder="Example: Digital Services" />
          </label>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16 }}>
          <label style={{ display: 'grid', gap: 8 }}>
            <span>Target audience</span>
            <input value={profile.audience} onChange={event => updateField('audience', event.target.value)} placeholder="Who should the brand reach?" />
          </label>
          <label style={{ display: 'grid', gap: 8 }}>
            <span>Primary goal</span>
            <input value={profile.goal} onChange={event => updateField('goal', event.target.value)} placeholder="What should branding help achieve?" />
          </label>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16 }}>
          <label style={{ display: 'grid', gap: 8 }}>
            <span>Differentiator</span>
            <input value={profile.differentiator} onChange={event => updateField('differentiator', event.target.value)} placeholder="Why should someone choose this brand?" />
          </label>
          <label style={{ display: 'grid', gap: 8 }}>
            <span>Core offer</span>
            <input value={profile.offer} onChange={event => updateField('offer', event.target.value)} placeholder="Main service / product / offer" />
          </label>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-primary" onClick={loadStarter}>Use starter example</button>
          <button type="button" className="btn btn-secondary" onClick={copyPlan}>{copied ? 'Copied' : 'Copy funnel plan'}</button>
          <button type="button" className="btn btn-secondary" onClick={resetProgress}>Reset progress</button>
        </div>
      </div>

      <div style={{ border: '1px solid #d9dbe5', borderRadius: 20, padding: 18, background: '#fafbff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <strong>{profile.businessName} branding funnel</strong>
            <p style={{ margin: '8px 0 0', color: '#6b7280' }}>
              A step-by-step brand journey built for {profile.industry.toLowerCase()} with progress tracking and stage-based tasks.
            </p>
          </div>
          <div style={{ minWidth: 220 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontWeight: 700 }}>
              <span>Overall progress</span>
              <span>{overall}%</span>
            </div>
            <div style={{ height: 10, borderRadius: 999, background: '#e6e8f0', overflow: 'hidden' }}>
              <div style={{ width: `${overall}%`, height: '100%', background: 'linear-gradient(90deg,#130150,#8b5cf6)' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="funnel-stack">
        {stages.map(stage => (
          <button
            key={stage.stage}
            type="button"
            onClick={() => setActiveStage(stage.stage)}
            style={{
              width: stage.width,
              textAlign: 'left',
              border: activeStage === stage.stage ? '2px solid #8b5cf6' : '0',
              background: 'linear-gradient(90deg,#130150,#8b5cf6)',
              borderRadius: 18,
              color: '#fff',
              padding: '22px 28px',
              display: 'flex',
              justifyContent: 'space-between',
              gap: 16,
              alignItems: 'center',
              cursor: 'pointer',
              boxShadow: activeStage === stage.stage ? '0 0 0 4px rgba(139,92,246,.12)' : 'none'
            }}
          >
            <div>
              <b style={{ display: 'block', fontSize: 18 }}>{stage.stage}</b>
              <span style={{ opacity: .9 }}>{stage.purpose}</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 700 }}>{stage.progress}%</div>
              <div style={{ opacity: .85, fontSize: 14 }}>{stage.done}/{stage.total} tasks</div>
            </div>
          </button>
        ))}
      </div>

      {current && (
        <div style={{ display: 'grid', gap: 18, border: '1px solid #d9dbe5', borderRadius: 20, padding: 22 }}>
          <div>
            <span className="eyebrow">Active stage</span>
            <h3 style={{ marginTop: 8 }}>{current.stage}</h3>
            <p style={{ marginTop: 8 }}>{current.objective}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 18 }}>
            <div style={{ border: '1px solid #ececf4', borderRadius: 16, padding: 16 }}>
              <strong>Tasks</strong>
              <div style={{ display: 'grid', gap: 12, marginTop: 14 }}>
                {current.tasks.map((task, index) => {
                  const checked = Boolean((completed[current.stage] || {})[index]);
                  return (
                    <label key={task} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <input type="checkbox" checked={checked} onChange={() => toggleTask(current.stage, index)} style={{ marginTop: 4 }} />
                      <span style={{ textDecoration: checked ? 'line-through' : 'none', opacity: checked ? .7 : 1 }}>{task}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'grid', gap: 14 }}>
              <div style={{ border: '1px solid #ececf4', borderRadius: 16, padding: 16 }}>
                <strong>Deliverables</strong>
                <ul style={{ margin: '12px 0 0', paddingLeft: 18 }}>
                  {current.deliverables.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div style={{ border: '1px solid #ececf4', borderRadius: 16, padding: 16 }}>
                <strong>Dependencies</strong>
                <ul style={{ margin: '12px 0 0', paddingLeft: 18 }}>
                  {current.dependencies.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div style={{ border: '1px solid #ececf4', borderRadius: 16, padding: 16 }}>
                <strong>Success metric</strong>
                <p style={{ margin: '12px 0 0' }}>{current.successMetric}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



/* ============================================================
   SEO AUDIT
============================================================ */

function SeoAudit() {
  const [
    url,
    setUrl
  ] =
    useState(
      'https://digitalness.co.in'
    );

  const [
    data,
    setData
  ] =
    useState(null);

  const [
    loading,
    setLoading
  ] =
    useState(false);

  const [
    error,
    setError
  ] =
    useState('');

  async function run(
    event
  ) {

    event.preventDefault();

    setLoading(true);
    setError('');
    setData(null);

    try {

      const response =
        await apiFetch(
          '/api/seo-audit',
          {
            method:
              'POST',

            headers: {
              'Content-Type':
                'application/json'
            },

            body:
              JSON.stringify({
                url
              })
          }
        );

      const payload =
        await response.json();

      if (
        !response.ok
      ) {

        throw new Error(
          payload.error ||
          'Audit failed.'
        );

      }

      setData(
        payload
      );

    } catch (
      err
    ) {

      setError(
        `${err.message} Make sure the Digitalness backend is running on port 8787.`
      );

    } finally {

      setLoading(false);

    }

  }

  const title =
    data?.page?.title ??
    data?.title ??
    '';

  const description =
    data?.page?.description ??
    data?.description ??
    '';

  const checks =
    Array.isArray(
      data?.checks
    )
      ? data.checks
      : data?.checks
        ? Object.entries(
            data.checks
          ).map(
            ([
              key,
              value
            ]) => ({
              id: key,

              label:
                key.replaceAll(
                  '_',
                  ' '
                ),

              evidence:
                typeof value ===
                'object'
                  ? JSON.stringify(
                      value
                    )
                  : String(
                      value
                    )
            })
          )
        : [];

  const recommendations =
    Array.isArray(
      data?.recommendations
    )
      ? data.recommendations
      : [];

  return (
    <div className="tool-panel">

      <form
        className="inline-form"
        onSubmit={run}
      >

        <input
          value={url}
          onChange={
            event =>
              setUrl(
                event.target.value
              )
          }
          placeholder="https://example.com"
        />

        <button
          className="btn btn-primary"
          type="submit"
          disabled={loading}
        >
          {
            loading
              ? 'Auditing…'
              : 'Run SEO audit'
          }
        </button>

      </form>

      {
        error
          ? (

            <p className="tool-error">
              {error}
            </p>

          )
          : null
      }

      {
        data
          ? (
            <>

              <div className="score-row">

                <div className="score">

                  <strong>
                    {
                      data.score ??
                      0
                    }
                  </strong>

                  <span>
                    /100
                  </span>

                </div>

                <div>

                  <h3>
                    {
                      title ||
                      'No title found'
                    }
                  </h3>

                  <p>
                    {
                      description ||
                      'No meta description found.'
                    }
                  </p>

                </div>

              </div>

              <div className="audit-grid">

                {
                  checks.map(
                    (
                      check,
                      index
                    ) => (

                      <div
                        key={
                          check.id ||
                          check.label ||
                          index
                        }
                      >

                        <b>
                          {
                            check.label ||
                            check.id ||
                            `Check ${
                              index + 1
                            }`
                          }
                        </b>

                        <span>
                          {
                            check.evidence ||
                            String(
                              check.value ??
                              ''
                            )
                          }
                        </span>

                      </div>

                    )
                  )
                }

              </div>

              <div className="recommend-box">

                <h3>
                  Recommendations
                </h3>

                {
                  recommendations.length
                    ? recommendations.map(
                        (
                          item,
                          index
                        ) => (

                          <p
                            key={`${index}-${JSON.stringify(item)}`}
                          >
                            •{' '}
                            {
                              typeof item ===
                                'string'
                                ? item
                                : item.fix ||
                                  item.message ||
                                  JSON.stringify(
                                    item
                                  )
                            }
                          </p>

                        )
                      )
                    : (

                      <p>
                        • No immediate recommendations returned.
                      </p>

                    )
                }

              </div>

            </>
          )
          : null
      }

    </div>
  );
}


/* ============================================================
   KEYWORD IDEAS
============================================================ */

function KeywordTool() {
  const [
    query,
    setQuery
  ] =
    useState(
      'digital marketing'
    );

  const modifiers = [
    'agency',
    'services',
    'company',
    'near me',
    'for small business',
    'strategy',
    'consultant',
    'pricing',
    'solutions',
    'Hyderabad'
  ];

  const intents = {
    Commercial: [
      'services',
      'agency',
      'company',
      'consultant',
      'pricing'
    ],

    Local: [
      'near me',
      'Hyderabad'
    ],

    Informational: [
      'strategy',
      'guide',
      'ideas',
      'tips'
    ]
  };

  const ideas = [
    query,

    ...modifiers.map(
      modifier =>
        `${query} ${modifier}`
    ),

    `best ${query}`,

    `${query} for startups`,

    `${query} checklist`
  ].filter(Boolean);

  return (
    <div className="tool-panel">

      <label>
        Keyword, business,
        product or industry

        <input
          value={query}
          onChange={
            event =>
              setQuery(
                event.target.value
              )
          }
        />
      </label>

      <div className="keyword-list">

        {
          ideas.map(
            (
              idea,
              index
            ) => {

              const intent =
                index === 0
                  ? 'Seed'
                  : Object.entries(
                      intents
                    ).find(
                      ([
                        ,
                        list
                      ]) =>
                        list.some(
                          modifier =>
                            idea
                              .toLowerCase()
                              .includes(
                                modifier.toLowerCase()
                              )
                        )
                    )?.[0] ||
                    'Exploratory';

              return (

                <span
                  key={`${idea}-${index}`}
                >

                  <b>
                    {idea}
                  </b>

                  <small>
                    {intent}
                  </small>

                </span>

              );

            }
          )
        }

      </div>

      <p className="tool-note">
        This ideation view does not
        invent live search volume.
        Genuine volume, CPC and
        difficulty require a configured
        keyword data provider.
      </p>

    </div>
  );
}


/* ============================================================
   MARKETING FUNNEL
============================================================ */

function MarketingFunnel() {
  const STORAGE_KEY =
    'digitalness-marketing-funnel-v2';

  const defaults = {
    visitors: 5000,
    contactRate: 5,
    leadRate: 40,
    customerRate: 20,
    averageValue: 15000,
    adSpend: 50000,
    targetRevenue: 500000
  };

  const [inputs, setInputs] =
    useState(defaults);

  const [message, setMessage] =
    useState(
      'Live calculator — change any value and the complete funnel updates instantly.'
    );

  useEffect(() => {
    try {
      const saved =
        localStorage.getItem(
          STORAGE_KEY
        );

      if (!saved) {
        return;
      }

      const parsed =
        JSON.parse(saved);

      if (
        parsed &&
        typeof parsed === 'object'
      ) {
        setInputs(current => ({
          ...current,
          ...parsed
        }));
      }
    } catch {
      // Ignore invalid saved calculator data.
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(inputs)
      );
    } catch {
      // The calculator still works when storage is unavailable.
    }
  }, [inputs]);

  function number(value) {
    const parsed = Number(value);

    return Number.isFinite(parsed)
      ? Math.max(0, parsed)
      : 0;
  }

  function rate(value) {
    return Math.min(
      100,
      number(value)
    );
  }

  function updateInput(
    key,
    value
  ) {
    const percentageKeys =
      new Set([
        'contactRate',
        'leadRate',
        'customerRate'
      ]);

    setInputs(current => ({
      ...current,
      [key]: percentageKeys.has(key)
        ? rate(value)
        : number(value)
    }));

    setMessage(
      'Updated live — all funnel stages, costs and revenue metrics recalculated.'
    );
  }

  function applyScenario(name) {
    const scenarios = {
      Conservative: {
        contactRate: 3,
        leadRate: 30,
        customerRate: 12
      },

      Balanced: {
        contactRate: 5,
        leadRate: 40,
        customerRate: 20
      },

      Growth: {
        contactRate: 8,
        leadRate: 50,
        customerRate: 28
      }
    };

    setInputs(current => ({
      ...current,
      ...scenarios[name]
    }));

    setMessage(
      `${name} scenario applied. Change any field to customize it.`
    );
  }

  function resetCalculator() {
    setInputs(defaults);
    setMessage(
      'Default marketing funnel restored.'
    );
  }

  const metrics = useMemo(() => {
    const visitors =
      number(inputs.visitors);

    const contactRate =
      rate(inputs.contactRate);

    const leadRate =
      rate(inputs.leadRate);

    const customerRate =
      rate(inputs.customerRate);

    const averageValue =
      number(inputs.averageValue);

    const adSpend =
      number(inputs.adSpend);

    const targetRevenue =
      number(inputs.targetRevenue);

    const contacts =
      Math.round(
        visitors *
        contactRate /
        100
      );

    const leads =
      Math.round(
        contacts *
        leadRate /
        100
      );

    const customers =
      Math.round(
        leads *
        customerRate /
        100
      );

    const revenue =
      customers *
      averageValue;

    const visitorToCustomer =
      visitors > 0
        ? customers /
          visitors *
          100
        : 0;

    const costPerContact =
      contacts > 0
        ? adSpend /
          contacts
        : 0;

    const costPerLead =
      leads > 0
        ? adSpend /
          leads
        : 0;

    const customerAcquisitionCost =
      customers > 0
        ? adSpend /
          customers
        : 0;

    const roas =
      adSpend > 0
        ? revenue /
          adSpend
        : 0;

    const revenueAfterAdSpend =
      revenue -
      adSpend;

    const breakEvenCustomers =
      averageValue > 0
        ? Math.ceil(
            adSpend /
            averageValue
          )
        : 0;

    const targetCustomers =
      averageValue > 0
        ? Math.ceil(
            targetRevenue /
            averageValue
          )
        : 0;

    const requiredLeads =
      customerRate > 0
        ? Math.ceil(
            targetCustomers /
            (customerRate / 100)
          )
        : 0;

    const requiredContacts =
      leadRate > 0
        ? Math.ceil(
            requiredLeads /
            (leadRate / 100)
          )
        : 0;

    const requiredVisitors =
      contactRate > 0
        ? Math.ceil(
            requiredContacts /
            (contactRate / 100)
          )
        : 0;

    return {
      visitors,
      contacts,
      leads,
      customers,
      revenue,
      visitorToCustomer,
      costPerContact,
      costPerLead,
      customerAcquisitionCost,
      roas,
      revenueAfterAdSpend,
      breakEvenCustomers,
      targetCustomers,
      requiredLeads,
      requiredContacts,
      requiredVisitors
    };
  }, [inputs]);

  const currency = value =>
    `₹${Math.round(
      value || 0
    ).toLocaleString('en-IN')}`;

  const percent = value =>
    `${Number(
      value || 0
    ).toFixed(2)}%`;

  const funnelStages = [
    {
      label: 'Visitors',
      value: metrics.visitors,
      width: 100,
      note: 'Website / landing-page traffic'
    },
    {
      label: 'Contacts',
      value: metrics.contacts,
      width: 86,
      note: `${inputs.contactRate}% of visitors`
    },
    {
      label: 'Qualified Leads',
      value: metrics.leads,
      width: 72,
      note: `${inputs.leadRate}% of contacts`
    },
    {
      label: 'Customers',
      value: metrics.customers,
      width: 58,
      note: `${inputs.customerRate}% of qualified leads`
    }
  ];

  return (
    <div className="tool-panel marketing-funnel-live">

      <style>
        {`
          .marketing-funnel-live {
            display: grid;
            gap: 24px;
          }

          .marketing-funnel-status {
            margin: 0;
            padding: 12px 14px;
            border: 1px solid var(--theme-border, #e4e2ec);
            border-radius: 12px;
            background: var(--theme-soft, #f8f7fc);
            color: var(--theme-muted, #6f687d);
            font-size: .78rem;
            line-height: 1.55;
          }

          .marketing-funnel-actions {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
          }

          .marketing-funnel-secondary-inputs {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }

          .marketing-funnel-secondary-inputs label {
            display: grid;
            gap: 7px;
          }

          .marketing-funnel-secondary-inputs input {
            width: 100%;
          }

          .marketing-funnel-kpis {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 12px;
          }

          .marketing-funnel-kpi {
            padding: 18px;
            border: 1px solid var(--theme-border, #e4e2ec);
            border-radius: 15px;
            background: var(--theme-surface, #fff);
          }

          .marketing-funnel-kpi strong,
          .marketing-funnel-kpi span {
            display: block;
          }

          .marketing-funnel-kpi strong {
            color: var(--theme-text, #130150);
            font-size: 1.15rem;
          }

          .marketing-funnel-kpi span {
            margin-top: 5px;
            color: var(--theme-muted, #77718a);
            font-size: .72rem;
          }

          .marketing-funnel-visual {
            display: grid;
            gap: 10px;
            padding: 20px;
            border: 1px solid var(--theme-border, #e4e2ec);
            border-radius: 18px;
            background: var(--theme-background, #fafbff);
          }

          .marketing-funnel-stage {
            margin: 0 auto;
            padding: 14px 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 14px;
            border-radius: 12px;
            background: linear-gradient(
              90deg,
              var(--theme-primary, #130150),
              var(--theme-secondary, #7c4dff)
            );
            color: var(--theme-on-primary, #fff);
          }

          .marketing-funnel-stage b,
          .marketing-funnel-stage small {
            color: inherit;
          }

          .marketing-funnel-stage small {
            opacity: .82;
          }

          .marketing-funnel-plan {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
          }

          .marketing-funnel-plan > div {
            padding: 18px;
            border: 1px solid var(--theme-border, #e4e2ec);
            border-radius: 15px;
            background: var(--theme-surface, #fff);
          }

          .marketing-funnel-plan strong {
            display: block;
            margin-bottom: 10px;
            color: var(--theme-text, #130150);
          }

          .marketing-funnel-plan p {
            margin: 6px 0;
            color: var(--theme-muted, #6f687d);
            line-height: 1.5;
          }

          @media (max-width: 980px) {
            .marketing-funnel-kpis {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          @media (max-width: 700px) {
            .marketing-funnel-secondary-inputs,
            .marketing-funnel-kpis,
            .marketing-funnel-plan {
              grid-template-columns: 1fr;
            }

            .marketing-funnel-actions .btn {
              width: 100%;
            }

            .marketing-funnel-stage {
              width: 100% !important;
              align-items: flex-start;
              flex-direction: column;
            }
          }
        `}
      </style>

      <p className="marketing-funnel-status">
        {message}
      </p>

      <div className="marketing-funnel-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() =>
            applyScenario(
              'Conservative'
            )
          }
        >
          Conservative
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() =>
            applyScenario(
              'Balanced'
            )
          }
        >
          Balanced
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() =>
            applyScenario(
              'Growth'
            )
          }
        >
          Growth
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={resetCalculator}
        >
          Reset
        </button>
      </div>

      <div className="tool-form five">

        <label>
          Visitors

          <input
            type="number"
            min="0"
            value={inputs.visitors}
            onChange={event =>
              updateInput(
                'visitors',
                event.target.value
              )
            }
          />
        </label>

        <label>
          Contact rate %

          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={inputs.contactRate}
            onChange={event =>
              updateInput(
                'contactRate',
                event.target.value
              )
            }
          />
        </label>

        <label>
          Qualified leads %

          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={inputs.leadRate}
            onChange={event =>
              updateInput(
                'leadRate',
                event.target.value
              )
            }
          />
        </label>

        <label>
          Customer rate %

          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={inputs.customerRate}
            onChange={event =>
              updateInput(
                'customerRate',
                event.target.value
              )
            }
          />
        </label>

        <label>
          Avg. value ₹

          <input
            type="number"
            min="0"
            value={inputs.averageValue}
            onChange={event =>
              updateInput(
                'averageValue',
                event.target.value
              )
            }
          />
        </label>

      </div>

      <div className="marketing-funnel-secondary-inputs">
        <label>
          <span>
            Advertising / acquisition spend ₹
          </span>

          <input
            type="number"
            min="0"
            value={inputs.adSpend}
            onChange={event =>
              updateInput(
                'adSpend',
                event.target.value
              )
            }
          />
        </label>

        <label>
          <span>
            Target revenue ₹
          </span>

          <input
            type="number"
            min="0"
            value={inputs.targetRevenue}
            onChange={event =>
              updateInput(
                'targetRevenue',
                event.target.value
              )
            }
          />
        </label>
      </div>

      <div className="funnel-metrics">

        <div>
          <strong>
            {metrics.contacts.toLocaleString('en-IN')}
          </strong>
          <span>
            contacts
          </span>
        </div>

        <div>
          <strong>
            {metrics.leads.toLocaleString('en-IN')}
          </strong>
          <span>
            qualified leads
          </span>
        </div>

        <div>
          <strong>
            {metrics.customers.toLocaleString('en-IN')}
          </strong>
          <span>
            customers
          </span>
        </div>

        <div>
          <strong>
            {currency(metrics.revenue)}
          </strong>
          <span>
            potential revenue
          </span>
        </div>

      </div>

      <div className="marketing-funnel-kpis">
        <div className="marketing-funnel-kpi">
          <strong>
            {percent(
              metrics.visitorToCustomer
            )}
          </strong>
          <span>
            visitor → customer rate
          </span>
        </div>

        <div className="marketing-funnel-kpi">
          <strong>
            {currency(
              metrics.costPerLead
            )}
          </strong>
          <span>
            estimated cost per qualified lead
          </span>
        </div>

        <div className="marketing-funnel-kpi">
          <strong>
            {currency(
              metrics.customerAcquisitionCost
            )}
          </strong>
          <span>
            estimated customer acquisition cost
          </span>
        </div>

        <div className="marketing-funnel-kpi">
          <strong>
            {metrics.roas.toFixed(2)}x
          </strong>
          <span>
            estimated ROAS
          </span>
        </div>

        <div className="marketing-funnel-kpi">
          <strong>
            {currency(
              metrics.costPerContact
            )}
          </strong>
          <span>
            estimated cost per contact
          </span>
        </div>

        <div className="marketing-funnel-kpi">
          <strong>
            {currency(
              metrics.revenueAfterAdSpend
            )}
          </strong>
          <span>
            revenue minus acquisition spend
          </span>
        </div>

        <div className="marketing-funnel-kpi">
          <strong>
            {metrics.breakEvenCustomers}
          </strong>
          <span>
            customers needed to cover ad spend
          </span>
        </div>

        <div className="marketing-funnel-kpi">
          <strong>
            {metrics.targetCustomers}
          </strong>
          <span>
            customers needed for target revenue
          </span>
        </div>
      </div>

      <div className="marketing-funnel-visual">
        <strong>
          Live funnel preview
        </strong>

        {funnelStages.map(stage => (
          <div
            className="marketing-funnel-stage"
            key={stage.label}
            style={{
              width: `${stage.width}%`
            }}
          >
            <div>
              <b>
                {stage.label}
              </b>
              <small>
                {stage.note}
              </small>
            </div>

            <strong>
              {stage.value.toLocaleString(
                'en-IN'
              )}
            </strong>
          </div>
        ))}
      </div>

      <div className="marketing-funnel-plan">
        <div>
          <strong>
            Target revenue plan
          </strong>

          <p>
            Target revenue: <b>{currency(inputs.targetRevenue)}</b>
          </p>

          <p>
            Required customers: <b>{metrics.targetCustomers}</b>
          </p>

          <p>
            Required qualified leads: <b>{metrics.requiredLeads}</b>
          </p>

          <p>
            Required contacts: <b>{metrics.requiredContacts}</b>
          </p>

          <p>
            Required visitors: <b>{metrics.requiredVisitors.toLocaleString('en-IN')}</b>
          </p>
        </div>

        <div>
          <strong>
            Live interpretation
          </strong>

          <p>
            At the current conversion rates, every 100 visitors produce approximately{' '}
            <b>{metrics.visitorToCustomer.toFixed(2)}</b>{' '}
            customers.
          </p>

          <p>
            Your estimated acquisition cost per customer is{' '}
            <b>{currency(metrics.customerAcquisitionCost)}</b>.
          </p>

          <p>
            Current estimated return on advertising spend is{' '}
            <b>{metrics.roas.toFixed(2)}x</b>.
          </p>

          <p>
            Improve any conversion-rate field above and the required traffic and costs update immediately.
          </p>
        </div>
      </div>

      <p className="tool-note">
        This is a live planning calculator based on the numbers entered above. It does not automatically read Meta Ads, Google Ads, Analytics or CRM data unless those accounts are connected through their APIs.
      </p>

    </div>
  );
}



/* ============================================================
   FILE HELPERS
============================================================ */

function downloadBlob(
  blob,
  filename
) {

  const objectUrl =
    URL.createObjectURL(
      blob
    );

  const anchor =
    document.createElement(
      'a'
    );

  anchor.href =
    objectUrl;

  anchor.download =
    filename;

  document.body.appendChild(
    anchor
  );

  anchor.click();

  anchor.remove();

  window.setTimeout(
    () => {

      URL.revokeObjectURL(
        objectUrl
      );

    },
    1500
  );

}


function formatBytes(
  value
) {

  const bytes =
    Number(value);

  if (
    !Number.isFinite(
      bytes
    ) ||
    bytes <= 0
  ) {

    return '';

  }

  if (
    bytes < 1024
  ) {

    return `${bytes} B`;

  }

  const kilobytes =
    bytes / 1024;

  if (
    kilobytes <
    1024
  ) {

    return `${kilobytes.toFixed(1)} KB`;

  }

  return `${(
    kilobytes /
    1024
  ).toFixed(2)} MB`;

}


/* ============================================================
   FILE TOOL CONFIGURATION
============================================================ */

const fileToolConfigs = {

  'PDF Compressor': {

    endpoint:
      '/api/file-tools/pdf-compress',

    accept:
      '.pdf,application/pdf',

    button:
      'Compress PDF',

    description:
      'Reduce PDF size with built-in visual compression. No Ghostscript is required.',

    dependency:
      'Strong/balanced modes rebuild pages as optimized images, so searchable text and interactive PDF elements may be flattened.',

    options: [

      {
        key:
          'preset',

        label:
          'Compression',

        type:
          'select',

        defaultValue:
          'balanced',

        choices: [

          [
            'strong',
            'Strong compression'
          ],

          [
            'balanced',
            'Balanced'
          ],

          [
            'quality',
            'Higher quality'
          ]

        ]
      }

    ]

  },


  'PDF to Word': {

    endpoint:
      '/api/file-tools/pdf-to-word',

    accept:
      '.pdf,application/pdf',

    button:
      'Convert to Word',

    description:
      'Convert PDF pages to Word using either full visual preservation or editable text extraction.',

    dependency:
      'Use Preserve layout for scanned PDFs, designs, tables and complex pages. Editable text works best when the PDF contains selectable text.',

    options: [
      {
        key:
          'mode',

        label:
          'Conversion mode',

        type:
          'select',

        defaultValue:
          'preserve',

        choices: [
          [
            'preserve',
            'Preserve layout & all visible content'
          ],
          [
            'editable',
            'Editable text (selectable PDFs)'
          ]
        ]
      }
    ]

  },


  'Word to PDF': {

    endpoint:
      '/api/file-tools/word-to-pdf',

    accept:
      '.doc,.docx,.odt,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',

    button:
      'Convert to PDF',

    description:
      'Convert DOC, DOCX or ODT into a real PDF.',

    dependency:
      'Requires LibreOffice / soffice on the backend server.'

  },


  'Merge PDF': {

    endpoint:
      '/api/file-tools/pdf-merge',

    accept:
      '.pdf,application/pdf',

    multiple:
      true,

    minFiles:
      2,

    button:
      'Merge PDFs',

    description:
      'Combine two or more PDFs in the same order you select them.'

  },


  'Split PDF': {

    endpoint:
      '/api/file-tools/pdf-split',

    accept:
      '.pdf,application/pdf',

    button:
      'Split PDF',

    description:
      'Split every page automatically or define groups such as 1-3,4,5-7.',

    options: [

      {
        key:
          'ranges',

        label:
          'Page groups',

        type:
          'text',

        defaultValue:
          '',

        placeholder:
          'Leave blank for one PDF per page'
      }

    ]

  },


  'JPG to PDF': {

    endpoint:
      '/api/file-tools/jpg-to-pdf',

    accept:
      '.jpg,.jpeg,image/jpeg',

    multiple:
      true,

    button:
      'Create PDF',

    description:
      'Turn one or more JPG images into a multi-page PDF.'

  },


  'PDF to JPG': {

    endpoint:
      '/api/file-tools/pdf-to-jpg',

    accept:
      '.pdf,application/pdf',

    button:
      'Convert PDF to JPG',

    description:
      'Render every PDF page as a JPG and receive all pages in a ZIP file. No Poppler installation is required.',

    options: [

      {
        key:
          'dpi',

        label:
          'Image resolution (DPI)',

        type:
          'number',

        defaultValue:
          150,

        min:
          72,

        max:
          300
      }

    ]

  },


  'Image Compressor': {

    endpoint:
      '/api/file-tools/image-compress',

    accept:
      '.jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp',

    button:
      'Compress Image',

    description:
      'Compress JPG, PNG or WebP while preserving the image format.',

    options: [

      {
        key:
          'quality',

        label:
          'Quality',

        type:
          'range',

        defaultValue:
          75,

        min:
          20,

        max:
          95
      }

    ]

  },


  'Image Resizer': {

    endpoint:
      '/api/file-tools/image-resize',

    accept:
      '.jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp',

    button:
      'Resize Image',

    description:
      'Resize JPG, PNG or WebP to your required dimensions.',

    options: [

      {
        key:
          'width',

        label:
          'Width (px)',

        type:
          'number',

        defaultValue:
          1200,

        min:
          1,

        max:
          12000
      },

      {
        key:
          'height',

        label:
          'Height (px)',

        type:
          'number',

        defaultValue:
          '',

        min:
          1,

        max:
          12000,

        placeholder:
          'Optional'
      },

      {
        key:
          'fit',

        label:
          'Fit',

        type:
          'select',

        defaultValue:
          'inside',

        choices: [

          [
            'inside',
            'Keep aspect ratio'
          ],

          [
            'cover',
            'Cover / crop'
          ],

          [
            'contain',
            'Contain'
          ],

          [
            'fill',
            'Stretch to dimensions'
          ]

        ]
      }

    ]

  },


  'JPG/PNG/WebP Converter': {

    endpoint:
      '/api/file-tools/image-convert',

    accept:
      '.jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp',

    button:
      'Convert Image',

    description:
      'Convert JPG, PNG and WebP images between supported formats.',

    options: [

      {
        key:
          'format',

        label:
          'Output format',

        type:
          'select',

        defaultValue:
          'webp',

        choices: [

          [
            'jpg',
            'JPG'
          ],

          [
            'png',
            'PNG'
          ],

          [
            'webp',
            'WebP'
          ]

        ]
      },

      {
        key:
          'quality',

        label:
          'Quality',

        type:
          'range',

        defaultValue:
          85,

        min:
          20,

        max:
          100
      }

    ]

  }

};


/* ============================================================
   GENERIC FILE TOOL
============================================================ */

function FileUtility({
  config
}) {

  const defaultOptions =
    Object.fromEntries(

      (
        config.options ||
        []
      ).map(
        option => [

          option.key,

          option.defaultValue ??
            ''

        ]
      )

    );

  const [
    files,
    setFiles
  ] =
    useState([]);

  const [
    options,
    setOptions
  ] =
    useState(
      defaultOptions
    );

  const [
    status,
    setStatus
  ] =
    useState('');

  const [
    error,
    setError
  ] =
    useState('');

  const [
    working,
    setWorking
  ] =
    useState(false);


  function updateOption(
    key,
    value
  ) {

    setOptions(
      current => ({
        ...current,
        [key]: value
      })
    );

  }


  function addSelectedFiles(event) {
    const incoming = Array.from(
      event.target.files || []
    );

    if (!incoming.length) {
      return;
    }

    setFiles(current => {
      if (!config.multiple) {
        return incoming.slice(0, 1);
      }

      const combined = [
        ...current,
        ...incoming
      ];

      const seen = new Set();

      return combined.filter(file => {
        const key = `${file.name}-${file.size}-${file.lastModified}`;

        if (seen.has(key)) {
          return false;
        }

        seen.add(key);
        return true;
      }).slice(0, 20);
    });

    event.target.value = '';
  }


  function removeFile(index) {
    setFiles(current =>
      current.filter((_, itemIndex) =>
        itemIndex !== index
      )
    );
  }


  function moveFile(index, direction) {
    setFiles(current => {
      const nextIndex = index + direction;

      if (
        nextIndex < 0 ||
        nextIndex >= current.length
      ) {
        return current;
      }

      const next = [...current];
      [next[index], next[nextIndex]] = [
        next[nextIndex],
        next[index]
      ];

      return next;
    });
  }


  async function submit(
    event
  ) {

    event.preventDefault();

    setError('');

    setStatus('');

    const minimum =
      config.minFiles ||
      1;

    if (
      files.length <
      minimum
    ) {

      setError(
        minimum > 1
          ? `Choose at least ${minimum} files.`
          : 'Choose a file first.'
      );

      return;

    }

    setWorking(true);

    setStatus(
      'Processing your file…'
    );

    try {

      const formData =
        new FormData();

      files.forEach(
        file => {

          formData.append(
            'files',
            file
          );

        }
      );

      Object.entries(
        options
      ).forEach(
        ([
          key,
          value
        ]) => {

          formData.append(
            key,
            String(
              value ??
              ''
            )
          );

        }
      );

      const response =
        await apiFetch(
          config.endpoint,
          {
            method:
              'POST',

            body:
              formData
          }
        );

      if (
        !response.ok
      ) {

        const payload =
          await response
            .json()
            .catch(
              () => ({})
            );

        throw new Error(
          payload.error ||
          `Processing failed with HTTP ${response.status}.`
        );

      }

      const blob =
        await response.blob();

      const filename =
        response.headers.get(
          'x-filename'
        ) ||
        'digitalness-output';

      downloadBlob(
        blob,
        filename
      );

      const originalSize =
        response.headers.get(
          'x-original-size'
        );

      const outputSize =
        response.headers.get(
          'x-output-size'
        );

      if (
        originalSize &&
        outputSize
      ) {

        const before =
          Number(
            originalSize
          );

        const after =
          Number(
            outputSize
          );

        const reduction =
          before > 0
            ? Math.max(
                0,

                Math.round(
                  (
                    1 -
                    after /
                      before
                  ) *
                    100
                )
              )
            : 0;

        setStatus(
          `Complete — ${formatBytes(
            before
          )} → ${formatBytes(
            after
          )}${
            reduction
              ? ` (${reduction}% smaller)`
              : ''
          }. Download started.`
        );

      } else {

        setStatus(
          'Complete. Your download has started.'
        );

      }

    } catch (
      err
    ) {

      setStatus('');

      setError(
        err.message ||
        'The file could not be processed.'
      );

    } finally {

      setWorking(false);

    }

  }


  return (
    <div className="tool-panel file-tool-panel">

      <div className="file-tool-intro">

        <h3>
          {
            config.description
          }
        </h3>

        {
          config.dependency
            ? (

              <p className="tool-note">
                {
                  config.dependency
                }
              </p>

            )
            : null
        }

      </div>

      <form
        className="upload-box file-tool-form"
        onSubmit={submit}
      >

        <label className="file-tool-upload">

          <span>
            {
              config.multiple
                ? 'Choose files'
                : 'Choose file'
            }
          </span>

          <input
            type="file"
            accept={
              config.accept
            }
            multiple={
              Boolean(
                config.multiple
              )
            }
            onChange={
              addSelectedFiles
            }
          />

        </label>

        {
          files.length
            ? (

              <div className="file-tool-selected">

                {
                  files.map(
                    (file, index) => (

                      <div
                        className="file-tool-file-row"
                        key={`${file.name}-${file.size}-${file.lastModified}-${index}`}
                      >

                        <div className="file-tool-file-main">
                          <b>
                            {index + 1}. {file.name}
                          </b>

                          <small>
                            {formatBytes(file.size)}
                          </small>
                        </div>

                        <div className="file-tool-file-actions">
                          {
                            config.multiple
                              ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => moveFile(index, -1)}
                                    disabled={index === 0}
                                    title="Move up"
                                  >
                                    ↑
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => moveFile(index, 1)}
                                    disabled={index === files.length - 1}
                                    title="Move down"
                                  >
                                    ↓
                                  </button>
                                </>
                              )
                              : null
                          }

                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            title="Remove file"
                          >
                            Remove
                          </button>
                        </div>

                      </div>

                    )
                  )
                }

              </div>

            )
            : null
        }

        {
          (
            config.options ||
            []
          ).length
            ? (

              <div className="file-tool-options">

                {
                  config.options.map(
                    option => (

                      <label
                        key={
                          option.key
                        }
                      >

                        <span>

                          {
                            option.label
                          }

                          {
                            option.type ===
                              'range'
                              ? ` — ${
                                  options[
                                    option.key
                                  ]
                                }`
                              : ''
                          }

                        </span>

                        {
                          option.type ===
                            'select'
                            ? (

                              <select
                                value={
                                  options[
                                    option.key
                                  ]
                                }
                                onChange={
                                  event =>
                                    updateOption(
                                      option.key,
                                      event.target.value
                                    )
                                }
                              >

                                {
                                  option.choices.map(
                                    ([
                                      value,
                                      label
                                    ]) => (

                                      <option
                                        key={
                                          value
                                        }
                                        value={
                                          value
                                        }
                                      >
                                        {
                                          label
                                        }
                                      </option>

                                    )
                                  )
                                }

                              </select>

                            )
                            : (

                              <input
                                type={
                                  option.type
                                }
                                value={
                                  options[
                                    option.key
                                  ]
                                }
                                min={
                                  option.min
                                }
                                max={
                                  option.max
                                }
                                placeholder={
                                  option.placeholder
                                }
                                onChange={
                                  event =>
                                    updateOption(
                                      option.key,
                                      event.target.value
                                    )
                                }
                              />

                            )
                        }

                      </label>

                    )
                  )
                }

              </div>

            )
            : null
        }

        <button
          className="btn btn-primary"
          type="submit"
          disabled={
            working
          }
        >
          {
            working
              ? 'Processing…'
              : config.button
          }
        </button>

      </form>

      {
        error
          ? (

            <p className="tool-error file-tool-message">
              {error}
            </p>

          )
          : null
      }

      {
        status
          ? (

            <p className="file-tool-success">
              {status}
            </p>

          )
          : null
      }

    </div>
  );
}


/* ============================================================
   COMPACT FILE TOOL HUBS
============================================================ */

function FileToolHub({ groupName }) {
  const group =
    fileToolGroups.find(
      item => item.name === groupName
    ) || fileToolGroups[0];

  const [selectedTool, setSelectedTool] =
    useState(group.tools[0]);

  useEffect(() => {
    setSelectedTool(group.tools[0]);
  }, [group.name]);

  const config =
    fileToolConfigs[selectedTool];

  return (
    <div className="file-tool-hub">
      <div className="file-tool-hub-picker">
        <div className="file-tool-hub-copy">
          <strong>{group.name}</strong>
          <p>{group.description}</p>
        </div>

        <label className="file-tool-hub-select">
          <span>Select tool</span>
          <select
            value={selectedTool}
            onChange={event =>
              setSelectedTool(event.target.value)
            }
          >
            {group.tools.map(tool => (
              <option key={tool} value={tool}>
                {tool}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="file-tool-hub-current">
        <div className="file-tool-hub-title">
          <h3>{selectedTool}</h3>
          <span>{group.name}</span>
        </div>

        {config ? (
          <FileUtility
            key={selectedTool}
            config={config}
          />
        ) : null}
      </div>
    </div>
  );
}

function FileConversionPanel() {
  return <FileToolHub groupName="File Conversion" />;
}

function PdfUtilitiesPanel() {
  return <FileToolHub groupName="PDF Utilities" />;
}

function ImageUtilitiesPanel() {
  return <FileToolHub groupName="Image Utilities" />;
}


/* ============================================================
   ALL PANELS
============================================================ */

const panels = {

  'Logo Generator':
    LogoTool,

  'Color Palette':
    ColorTool,

  Typography:
    TypographyTool,

  'Market Research':
    MarketResearchTool,

  'Brand Positioning':
    PositioningTool,

  'Branding Funnel':
    BrandingFunnel,

  'SEO Audit':
    SeoAudit,

  'Keyword Ideas':
    KeywordTool,

  'Marketing Funnel':
    MarketingFunnel

};


/* ============================================================
   FREE TOOLS PAGE
============================================================ */

export default function Tools() {
  const [
    active,
    setActive
  ] =
    useState(
      'Logo Generator'
    );

  const [
    fileMenuOpen,
    setFileMenuOpen
  ] = useState(false);

  const fileConfig =
    fileToolConfigs[active];

  const Panel =
    panels[active];

  return (
    <>

      <style>
        {fileToolsCss}
      </style>

      <Seo
        title="Free Tools"
        path="/tools"
      />

      <section className="page-hero">

        <div className="container narrow">

          <span className="eyebrow">
            Digitalness free tools
          </span>

          <h1>
            Useful tools for brand,
            marketing, SEO, PDF and images
          </h1>

          <p>
            Explore brand, marketing and
            SEO utilities together with
            working PDF and image
            processing tools.
          </p>

        </div>

      </section>

      <section className="section">

        <div className="container tools-layout">

          <aside className="tools-nav">

            <span className="tools-nav-label">
              Brand & growth
            </span>

            {
              growthToolNames.map(
                tool => (

                  <button
                    key={tool}
                    type="button"
                    className={
                      active === tool
                        ? 'active'
                        : ''
                    }
                    onClick={() =>
                      setActive(
                        tool
                      )
                    }
                  >
                    {tool}
                  </button>

                )
              )
            }

            <span className="tools-nav-label tools-nav-label-files">
              PDF &amp; Image Tools
            </span>

            <div className="tools-file-dropdown-wrap">

              <button
                type="button"
                className={`tools-file-dropdown-toggle ${
                  fileConfig ? 'active' : ''
                } ${fileMenuOpen ? 'open' : ''}`}
                onClick={() =>
                  setFileMenuOpen(current => !current)
                }
                aria-expanded={fileMenuOpen}
              >
                <span>File Conversion</span>
                <span className="tools-file-chevron" aria-hidden="true">⌄</span>
              </button>

              {fileMenuOpen ? (
                <div className="tools-file-dropdown-panel">
                  <label>
                    <span>Select conversion tool</span>
                    <select
                      value={fileConfig ? active : ''}
                      onChange={event => {
                        const tool = event.target.value;
                        if (tool) {
                          setActive(tool);
                        }
                      }}
                    >
                      <option value="" disabled>
                        Choose a tool
                      </option>

                      {fileToolNames.map(tool => (
                        <option key={tool} value={tool}>
                          {tool}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              ) : null}

            </div>

          </aside>

          <div>

            <div className="tool-heading">

              <span className="eyebrow">
                Interactive tool
              </span>

              <h2>
                {active}
              </h2>

            </div>

            {
              fileConfig
                ? (
                  <FileUtility
                    key={active}
                    config={fileConfig}
                  />
                )
                : Panel
                  ? <Panel />
                  : null
            }

          </div>

        </div>

      </section>

    </>
  );
}