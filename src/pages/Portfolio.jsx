import { useMemo, useState } from 'react';
import Seo from '../components/Seo';
import { portfolio } from '../data/site';

export default function Portfolio() {
  const [category, setCategory] = useState('All');
  const [industry, setIndustry] = useState('All');
  const [tech, setTech] = useState('All');

  const categories = [
    'All',
    ...new Set(portfolio.map((item) => item.category))
  ];

  const industries = [
    'All',
    ...new Set(portfolio.map((item) => item.industry))
  ];

  const technologies = [
    'All',
    ...new Set(portfolio.map((item) => item.tech))
  ];

  const filteredProjects = useMemo(() => {
    return portfolio.filter((item) => {
      const categoryMatch =
        category === 'All' ||
        item.category === category;

      const industryMatch =
        industry === 'All' ||
        item.industry === industry;

      const technologyMatch =
        tech === 'All' ||
        item.tech === tech;

      return (
        categoryMatch &&
        industryMatch &&
        technologyMatch
      );
    });
  }, [category, industry, tech]);

  return (
    <>
      <Seo
        title="Portfolio"
        path="/portfolio"
      />

      <section className="page-hero">
        <div className="container narrow">
          <span className="eyebrow">
            Selected Work
          </span>

          <h1>
            Work shaped around the problem,
            not a template
          </h1>

          <p>
            Explore Digitalness projects across
            digital marketing, branding, SEO,
            web development and business growth.
            Filter the portfolio by service,
            industry and technology.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">

          {/* ==============================
              PORTFOLIO FILTERS
          ============================== */}

          <div className="portfolio-filters">

            <label>
              Service

              <select
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
              >
                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Industry

              <select
                value={industry}
                onChange={(event) =>
                  setIndustry(event.target.value)
                }
              >
                {industries.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Technology

              <select
                value={tech}
                onChange={(event) =>
                  setTech(event.target.value)
                }
              >
                {technologies.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </label>

          </div>

          {/* ==============================
              PORTFOLIO PROJECTS
          ============================== */}

          <div className="portfolio-grid">

            {filteredProjects.map((project) => (
              <article
                className="project-card"
                key={project.title}
              >

                {/* PROJECT IMAGE */}

                <div className="project-art">

                  {project.image ? (
                    <img
                      src={project.image}
                      alt={
                        project.alt ||
                        `${project.title} - ${project.industry}`
                      }
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.display =
                          'none';
                      }}
                    />
                  ) : null}

                  <div className="project-art-overlay" />

                  <span>
                    {project.industry}
                  </span>

                  <b>
                    {project.category}
                  </b>

                </div>

                {/* PROJECT CONTENT */}

                <h3>
                  {project.title}
                </h3>

                <p>
                  {project.result}
                </p>

                <small>
                  {project.tech}
                </small>

              </article>
            ))}

          </div>

          {/* ==============================
              EMPTY STATE
          ============================== */}

          {!filteredProjects.length && (
            <div className="info-panel">
              <h3>
                No projects match the selected filters.
              </h3>

              <p>
                Change or reset one or more filters
                to explore other Digitalness
                portfolio projects.
              </p>
            </div>
          )}

        </div>
      </section>
    </>
  );
}