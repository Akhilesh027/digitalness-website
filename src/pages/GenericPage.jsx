import { useLocation } from 'react-router-dom';
import Seo from '../components/Seo';

const pages = {
  '/case-studies': [
    'Case Studies',
    'Structured examples of how Digitalness connects business context, execution and measurable learning.'
  ],
  '/careers': [
    'Careers',
    'Work across strategy, content, design, performance marketing and web experiences with a multidisciplinary digital team.'
  ],
  '/testimonials': [
    'Testimonials',
    'Client perspectives on working with Digitalness across marketing, design, web and growth execution.'
  ],
  '/faqs': [
    'Frequently Asked Questions',
    'Practical answers about scopes, timelines, collaboration, measurement and ongoing support.'
  ]
};

export default function GenericPage() {
  const { pathname } = useLocation();

  const page =
    pages[pathname] ||
    ['Digitalness', 'Digital growth solutions.'];

  return (
    <>
      <Seo
        title={page[0]}
        path={pathname}
      />

      <section className="page-hero">
        <div className="container narrow">
          <span className="eyebrow">Digitalness</span>
          <h1>{page[0]}</h1>
          <p>{page[1]}</p>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <div className="info-panel">
            <h2>This page is ready for production content</h2>
            <p>
              The route, responsive layout and SEO metadata are already wired.
              Replace this block with final approved copy or connect it to your
              CMS/API without changing the site architecture.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
