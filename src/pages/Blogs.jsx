import { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, Calendar, User, ArrowLeft, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import Seo from '../components/Seo';
import { blogs as fallbackBlogs } from '../data/site';

// Helper to resolve image URLs (handles relative /uploads/ paths)
const resolveImageUrl = (img) => {
  if (!img) return null;
  if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('data:')) {
    return img;
  }
  // If running locally or on server, relative path or local port 5000
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return `https://server.digitalness.co.in${img.startsWith('/') ? '' : '/'}${img}`;
  }
  const base = (
    import.meta.env.VITE_CRM_API_URL ||
    import.meta.env.VITE_API_URL ||
    'https://server.digitalness.co.in'
  ).replace(/\/+$/, '');
  return `${base}${img.startsWith('/') ? '' : '/'}${img}`;
};

// Fetch helper that tries local proxy, local direct port 5000, then remote server
async function fetchBlogsFromApi() {
  const endpoints = [
    '/api/blogs/public',
    'https://server.digitalness.co.in/api/blogs/public',
    'https://server.digitalness.co.in/api/blogs/public'
  ];

  for (const url of endpoints) {
    try {
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      if (res.ok) {
        const json = await res.json();
        if (json?.data && Array.isArray(json.data) && json.data.length > 0) {
          return json.data;
        }
      }
    } catch {
      // Try next endpoint
    }
  }
  return null;
}

// Fetch single blog detail by slug
async function fetchBlogDetailFromApi(slug) {
  const endpoints = [
    `/api/blogs/slug/${encodeURIComponent(slug)}`,
    `https://server.digitalness.co.in/api/blogs/slug/${encodeURIComponent(slug)}`,
    `https://server.digitalness.co.in/api/blogs/slug/${encodeURIComponent(slug)}`
  ];

  for (const url of endpoints) {
    try {
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      if (res.ok) {
        const json = await res.json();
        if (json?.data) return json.data;
      }
    } catch {
      // Try next endpoint
    }
  }
  return null;
}

export function Blogs() {
  const [apiBlogs, setApiBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
          let isMounted = true;
          async function load() {
            const data = await fetchBlogsFromApi();
            if (isMounted) {
              if (data && data.length > 0) {
                setApiBlogs(data);
              }
              setLoading(false);
            }
          }
          load();
          return () => {
            isMounted = false;
          };
        }, []);

  // Merge API blogs (which take precedence) with initial fallback articles
  const allBlogs = useMemo(() => {
    const formattedApi = apiBlogs.map((b) => ({
      slug: b.slug,
      title: b.title,
      category: b.category || 'Insights',
      excerpt: b.shortDescription || b.excerpt || '',
      content: b.content,
      featuredImage: resolveImageUrl(b.featuredImage),
      bannerImage: resolveImageUrl(b.bannerImage),
      author: b.author || 'Digitalness Team',
      publishedAt: b.publishedAt || b.createdAt,
      isFeatured: Boolean(b.isFeatured),
    }));

    // Find any fallback blogs whose slug isn't already in the API list
    const existingSlugs = new Set(formattedApi.map((b) => b.slug));
    const extraFallbacks = fallbackBlogs
      .filter((b) => !existingSlugs.has(b.slug))
      .map((b) => ({
        ...b,
        author: 'Digitalness Team',
        publishedAt: null,
      }));

    return [...formattedApi, ...extraFallbacks];
  }, [apiBlogs]);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set(['All']);
    allBlogs.forEach((b) => {
      if (b.category) set.add(b.category);
    });
    return Array.from(set);
  }, [allBlogs]);

  // Filtered list
  const filtered = useMemo(() => {
    return allBlogs.filter((b) => {
      const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allBlogs, selectedCategory, searchQuery]);

  return (
    <>
        <Seo
          title="Blogs & Insights"
          description="Practical thinking and guides across digital marketing, performance ads, web development, SEO and branding by Digitalness."
          path="/blogs"
        />

        <style>{`
        .blog-hero {
          padding: 80px 0 48px;
          text-align: center;
          background:
            radial-gradient(circle at 75% 30%, rgba(109,93,252,.12), transparent 38%),
            linear-gradient(180deg, #fbfbff 0%, #f2f0ff 100%);
          border-bottom: 1px solid #ece9f8;
        }
        .blog-hero h1 {
          margin: 0;
          font-size: clamp(2.3rem, 5vw, 4.2rem);
          line-height: 1.08;
          letter-spacing: -.04em;
          color: #130150;
        }
        .blog-hero p {
          max-width: 680px;
          margin: 16px auto 0;
          color: #64677a;
          line-height: 1.7;
          font-size: 1.05rem;
        }
        .blog-controls {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin: 40px auto 28px;
          max-width: 1180px;
        }
        .blog-search-bar {
          position: relative;
          max-width: 440px;
          width: 100%;
        }
        .blog-search-bar input {
          width: 100%;
          padding: 12px 14px 12px 42px;
          border-radius: 12px;
          border: 1px solid #d8d4e8;
          background: #fff;
          font-size: 0.95rem;
          box-sizing: border-box;
          outline: none;
          transition: border-color .2s;
        }
        .blog-search-bar input:focus {
          border-color: #6d5dfc;
        }
        .blog-search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #8c93a4;
        }
        .category-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .cat-pill {
          background: #fff;
          border: 1px solid #e3e7ef;
          padding: 7px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #4a4370;
          cursor: pointer;
          transition: all .2s;
        }
        .cat-pill.active, .cat-pill:hover {
          background: #130150;
          color: #fff;
          border-color: #130150;
        }
        .blog-grid-enhanced {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 24px;
        }
        .blog-card-item {
          display: flex;
          flex-direction: column;
          background: #fff;
          border: 1px solid #e5e2f0;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(19, 1, 80, 0.04);
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
          text-decoration: none;
          color: inherit;
        }
        .blog-card-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(19, 1, 80, 0.10);
          border-color: #c9c2ff;
        }
        .blog-card-img-wrap {
          width: 100%;
          height: 200px;
          background: #f0f2f8;
          overflow: hidden;
          position: relative;
        }
        .blog-card-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .3s ease;
        }
        .blog-card-item:hover .blog-card-img-wrap img {
          transform: scale(1.04);
        }
        .blog-img-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #130150 0%, #30168f 100%);
          color: rgba(255,255,255,0.7);
        }
        .blog-card-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .blog-meta-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.78rem;
          margin-bottom: 12px;
        }
        .blog-cat-badge {
          background: #f2f0ff;
          color: #6d5dfc;
          padding: 4px 10px;
          border-radius: 8px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .05em;
        }
        .blog-date {
          color: #8c93a4;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .blog-card-item h3 {
          margin: 0 0 10px;
          font-size: 1.22rem;
          line-height: 1.35;
          color: #130150;
        }
        .blog-card-item p {
          color: #60687a;
          font-size: 0.92rem;
          line-height: 1.6;
          margin: 0 0 16px;
          flex: 1;
        }
        .blog-read-more {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #130150;
          font-weight: 800;
          font-size: 0.88rem;
          margin-top: auto;
          transition: gap .2s;
        }
        .blog-card-item:hover .blog-read-more {
          gap: 10px;
          color: #6d5dfc;
        }
      `}</style>

        <section className="blog-hero">
          <div className="container narrow">
            <span className="eyebrow">Practical Thinking</span>
            <h1>Blogs & Digital Insights</h1>
            <p>
              Actionable perspectives, frameworks, and case breakdowns across growth marketing, web engineering, brand systems, and performance.
            </p>
          </div>
        </section>

            <section className="section" style={{ paddingTop: '32px' }}>
              <div className="container">
                <div className="blog-controls">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                    <div className="category-pills">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    <div className="blog-search-bar">
                      <Search size={16} className="blog-search-icon" />
                      <input
                        type="text"
                        placeholder="Search articles & topics..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {filtered.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '64px 0', color: '#64677a' }}>
                    <BookOpen size={40} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
                    <h3>No articles match your criteria</h3>
                    <p>Try searching for a different keyword or select another category.</p>
                  </div>
                ) : (
                  <div className="blog-grid-enhanced">
                    {filtered.map((b) => (
                      <Link key={b.slug} to={`/blog/${b.slug}`} className="blog-card-item">
                        <div className="blog-card-img-wrap">
                          {b.featuredImage ? (
                            <img src={b.featuredImage} alt={b.title} loading="lazy" />
                          ) : (
                            <div className="blog-img-placeholder">
                              <div style={{ textAlign: 'center', padding: '16px' }}>
                                <Sparkles size={28} style={{ margin: '0 auto 8px', opacity: 0.8 }} />
                                <span style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em' }}>
                                  {b.category}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="blog-card-content">
                          <div className="blog-meta-top">
                            <span className="blog-cat-badge">{b.category}</span>
                            {b.publishedAt && (
                              <span className="blog-date">
                                <Calendar size={13} />
                                {new Date(b.publishedAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </span>
                            )}
                          </div>

                          <h3>{b.title}</h3>
                          <p>{b.excerpt}</p>

                          <span className="blog-read-more">
                            Read Article <ArrowRight size={15} />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </>
          );
}

          export function BlogDetail() {
  const {slug} = useParams();
          const [blog, setBlog] = useState(null);
          const [loading, setLoading] = useState(true);

  useEffect(() => {
                let isMounted = true;
                async function load() {
                  // 1. Try API endpoints
                  const apiItem = await fetchBlogDetailFromApi(slug);
                  if (isMounted && apiItem) {
                    setBlog({
                      slug: apiItem.slug,
                      title: apiItem.title,
                      category: apiItem.category || 'Insights',
                      shortDescription: apiItem.shortDescription,
                      excerpt: apiItem.shortDescription,
                      content: apiItem.content,
                      featuredImage: resolveImageUrl(apiItem.featuredImage),
                      bannerImage: resolveImageUrl(apiItem.bannerImage),
                      author: apiItem.author || 'Digitalness Team',
                      publishedAt: apiItem.publishedAt || apiItem.createdAt,
                      metaTitle: apiItem.metaTitle,
                      metaDescription: apiItem.metaDescription,
                    });
                    setLoading(false);
                    return;
                  }

                  // 2. Fallback to site.js
                  const fallback = fallbackBlogs.find((x) => x.slug === slug);
                  if (isMounted) {
                    setBlog(fallback || null);
                    setLoading(false);
                  }
                }
                load();
                return () => {
                  isMounted = false;
                };
              }, [slug]);

          if (!loading && !blog) {
    return <Blogs />;
  }

          const b = blog || { };

          return (
    <>
            <Seo
              title={b.metaTitle || b.title || 'Blog Post'}
              description={b.metaDescription || b.shortDescription || b.excerpt}
              path={`/blog/${slug}`}
            />

                  <article className="article container narrow" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
                    <Link
                      to="/blogs"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#6d5dfc',
                        fontWeight: 700,
                        fontSize: '0.88rem',
                        marginBottom: '24px',
                        textDecoration: 'none',
                      }}
                    >
                      <ArrowLeft size={16} /> Back to all articles
                    </Link>

                    {b.category && <span className="eyebrow">{b.category}</span>}
                    <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.15, margin: '8px 0 16px', color: '#130150' }}>
                      {b.title}
                    </h1>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '18px',
                        color: '#8c93a4',
                        fontSize: '0.88rem',
                        marginBottom: '28px',
                        borderBottom: '1px solid #e3e7ef',
                        paddingBottom: '16px',
                      }}
                    >
                      {b.author && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <User size={15} /> {b.author}
                        </span>
                      )}
                      {b.publishedAt && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Calendar size={15} />
                          {new Date(b.publishedAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      )}
                    </div>

                    {(b.bannerImage || b.featuredImage) && (
                      <div
                        style={{
                          width: '100%',
                          maxHeight: '440px',
                          borderRadius: '20px',
                          overflow: 'hidden',
                          margin: '0 0 32px',
                          boxShadow: '0 8px 30px rgba(19, 1, 80, 0.08)',
                        }}
                      >
                        <img
                          src={b.bannerImage || b.featuredImage}
                          alt={b.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      </div>
                    )}

                    {b.excerpt && (
                      <p
                        className="lead"
                        style={{
                          fontSize: '1.2rem',
                          lineHeight: 1.7,
                          color: '#4a4370',
                          fontWeight: 500,
                          marginBottom: '32px',
                        }}
                      >
                        {b.excerpt}
                      </p>
                    )}

                    {b.content ? (
                      <div
                        className="blog-content-body"
                        style={{
                          lineHeight: 1.85,
                          fontSize: '1.08rem',
                          color: '#2d3748',
                          whiteSpace: 'pre-line',
                        }}
                      >
                        {b.content}
                      </div>
                    ) : (
                        <div style={{ lineHeight: 1.8, fontSize: '1.05rem', color: '#334155' }}>
                          <h2>Start with the business question</h2>
                          <p>
                            Digital tactics become more useful when they are tied to a specific business decision: who are we trying to reach, what do they need to understand, what action should be easier, and how will we know whether the change helped?
                          </p>
                          <h2>Build the system around the journey</h2>
                          <p>
                            Review the message, channel, creative, landing experience and measurement together. A weak result can come from friction anywhere in that chain, so changing only one ad, post or page can hide the real issue.
                          </p>
                          <h2>Measure signals that support decisions</h2>
                          <p>
                            Choose a small set of indicators that connect activity to quality and conversion. Review them consistently, document what changed and use the learning to decide the next experiment.
                          </p>
                      </div>
        )}

                    <div style={{ marginTop: '54px', paddingTop: '28px', borderTop: '1px solid #e3e7ef' }}>
                      <Link
                        to="/blogs"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          background: '#130150',
                          color: '#fff',
                          padding: '12px 24px',
                          borderRadius: '12px',
                          fontWeight: 700,
                          textDecoration: 'none',
                          fontSize: '0.9rem',
                        }}
                      >
                        <ArrowLeft size={16} /> Explore All Articles
                      </Link>
                    </div>
                  </article>
                </>
              );
}
