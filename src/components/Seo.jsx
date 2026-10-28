import { Helmet } from 'react-helmet-async';

export default function Seo({title, description, path='/'}) {
  const fullTitle = title ? `${title} | Digitalness` : 'Digitalness | Digital Growth Agency';
  const desc = description || 'Digitalness combines digital marketing, web development, branding, SEO and business solutions into practical growth systems.';
  const url = `https://digitalness.co.in${path}`;
  return <Helmet>
    <title>{fullTitle}</title>
    <meta name="description" content={desc} />
    <link rel="canonical" href={url} />
    <meta property="og:title" content={fullTitle} />
    <meta property="og:description" content={desc} />
    <meta property="og:url" content={url} />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
  </Helmet>;
}
