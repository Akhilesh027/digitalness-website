import { useParams, Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';

import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import CTA from '../components/CTA';

import {
  getService,
  services
} from '../data/services';

import NotFound from './NotFound';


export default function ServiceDetail() {

  const { slug } = useParams();

  const s = getService(slug);


  if (!s) {
    return <NotFound />;
  }


  const related = services
    .filter(
      (item) =>
        item.category === s.category &&
        item.slug !== s.slug
    )
    .slice(0, 3);


  /*
    IMAGE RULE

    google-ads
        ↓
    /images/service/google-ads.jpg
        ↓
    public/images/service/google-ads.jpg

    If you later add `image` directly to a service object,
    that path takes priority.
  */

  const serviceImage =
    s.image ||
    `/images/service/${s.slug}.jpg`;


  return (
    <>

      <Seo
        title={s.name}
        description={s.intro}
        path={`/service/${s.slug}`}
      />


      {/* =====================================================
          SERVICE HERO
      ===================================================== */}

      <section className="service-hero">

        <div className="container service-hero-grid">


          {/* LEFT CONTENT */}

          <Reveal>

            <span className="eyebrow">
              {s.eyebrow}
            </span>


            <h1>
              {s.headline}
            </h1>


            <p>
              {s.intro}
            </p>


            <div className="hero-actions">

              <Link
                className="btn btn-primary"
                to="/contact"
              >
                Discuss {s.name}

                <ArrowRight size={16} />
              </Link>


              <a
                className="btn btn-secondary"
                href="#deliverables"
              >
                See deliverables
              </a>

            </div>

          </Reveal>


          {/* =================================================
              SERVICE IMAGE
          ================================================= */}

          <Reveal
            className="service-visual"
            delay={0.1}
          >

            <img
              className="service-visual-image"
              src={serviceImage}
              alt={`${s.name} service by Digitalness`}
              loading="eager"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
              }}
            />


            <div className="service-visual-overlay" />


            <div className="visual-label">
              {s.name}
            </div>


            {s.features
              .slice(0, 4)
              .map(
                (feature, index) => (

                  <div
                    key={feature}
                    className={`visual-chip vc-${index + 1}`}
                  >
                    {feature}
                  </div>

                )
              )}

          </Reveal>

        </div>

      </section>


      {/* =====================================================
          CONTEXT + SOLUTION
      ===================================================== */}

      <section className="section">

        <div className="container split">


          <Reveal>

            <span className="eyebrow">
              Context
            </span>


            <h2>
              {s.problemHeading}
            </h2>


            <div className="problem-list">

              {s.problems.map(
                (problem) => (

                  <div key={problem}>

                    <span>—</span>

                    <p>
                      {problem}
                    </p>

                  </div>

                )
              )}

            </div>

          </Reveal>


          <Reveal className="info-panel">

            <span className="eyebrow">
              Solution
            </span>


            <h2>
              {s.solutionHeading}
            </h2>


            <p>
              {s.solution}
            </p>

          </Reveal>

        </div>

      </section>


      {/* =====================================================
          CAPABILITIES
      ===================================================== */}

      <section className="section section-soft">

        <div className="container">

          <span className="eyebrow">
            Capabilities
          </span>


          <h2>
            What {s.name} covers
          </h2>


          <div className="card-grid four">

            {s.features.map(
              (feature, index) => (

                <Reveal
                  className="mini-card"
                  key={feature}
                  delay={index * 0.04}
                >

                  <span>
                    {String(index + 1).padStart(2, '0')}
                  </span>


                  <h3>
                    {feature}
                  </h3>


                  <p>
                    {s.capabilityDescriptions?.[index] ||
                      `${feature} is configured around the goals and customer journey for this ${s.name.toLowerCase()} engagement.`}
                  </p>

                </Reveal>

              )
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          BENEFITS + USE CASES
      ===================================================== */}

      <section className="section">

        <div className="container split">


          <Reveal>

            <span className="eyebrow">
              Benefits
            </span>


            <h2>
              {s.benefitHeading}
            </h2>


            <div className="check-list">

              {s.benefits.map(
                (benefit) => (

                  <p key={benefit}>

                    <Check size={18} />

                    {benefit}

                  </p>

                )
              )}

            </div>

          </Reveal>


          <Reveal>

            <span className="eyebrow">
              Use cases
            </span>


            <h2>
              Where {s.name} fits
            </h2>


            <div className="use-list">

              {s.useCases.map(
                (item) => (

                  <span key={item}>
                    {item}
                  </span>

                )
              )}

            </div>


            <p className="muted">

              Commonly relevant across{' '}

              {s.industries
                .slice(0, 5)
                .join(', ')}

              {' '}and other businesses with a similar customer or operating journey.

            </p>

          </Reveal>

        </div>

      </section>


      {/* =====================================================
          SERVICE-SPECIFIC WORKFLOW
      ===================================================== */}

      <section className="section section-dark">

        <div className="container">

          <span className="eyebrow">
            Workflow
          </span>


          <h2>
            {s.processHeading}
          </h2>


          <div className="process-grid">

            {s.process.map(
              (step, index) => (

                <Reveal
                  className="process-card"
                  key={`${step}-${index}`}
                  delay={index * 0.04}
                >

                  <span>
                    {String(index + 1).padStart(2, '0')}
                  </span>


                  <h3>
                    {step}
                  </h3>


                  <p>
                    {s.processDescriptions?.[index] ||
                      `This stage moves ${s.name.toLowerCase()} toward the agreed business outcome.`}
                  </p>

                </Reveal>

              )
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          DELIVERABLES
      ===================================================== */}

      <section
        className="section"
        id="deliverables"
      >

        <div className="container split">


          <Reveal>

            <span className="eyebrow">
              Scope
            </span>


            <h2>
              {s.deliverableHeading}
            </h2>


            <div className="deliverable-box">

              {s.deliverables.map(
                (item) => (

                  <p key={item}>

                    <Check size={17} />

                    {item}

                  </p>

                )
              )}

            </div>

          </Reveal>


          <Reveal>

            <span className="eyebrow">
              Industries
            </span>


            <h2>
              Where {s.name} is commonly useful
            </h2>


            <div className="pill-cloud compact">

              {s.industries.map(
                (industry) => (

                  <span key={industry}>
                    {industry}
                  </span>

                )
              )}

            </div>

          </Reveal>

        </div>

      </section>


      {/* =====================================================
          FAQ
      ===================================================== */}

      <section className="section section-soft">

        <div className="container narrow">

          <span className="eyebrow">
            FAQ
          </span>


          <h2>
            {s.faqHeading}
          </h2>


          <div className="faq-list">

            {s.faqs.map(
              (faq, index) => (

                <details
                  key={faq.q}
                  open={index === 0}
                >

                  <summary>
                    {faq.q}
                  </summary>


                  <p>
                    {faq.a}
                  </p>

                </details>

              )
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          RELATED SERVICES
      ===================================================== */}

      <section className="section">

        <div className="container">

          <span className="eyebrow">
            Related services
          </span>


          <h2>
            Services that can support {s.name}
          </h2>


          <div className="card-grid three">

            {related.map(
              (service) => (

                <Link
                  className="service-card"
                  key={service.slug}
                  to={`/service/${service.slug}`}
                >

                  <h3>
                    {service.name}
                  </h3>


                  <p>
                    {service.focus.charAt(0).toUpperCase() +
                      service.focus.slice(1)}.
                  </p>


                  <span>

                    Explore

                    <ArrowRight size={15} />

                  </span>

                </Link>

              )
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <CTA
        title={
          s.ctaTitle ||
          `Want to explore ${s.name} for your business?`
        }

        text={
          s.ctaText ||
          `Tell us what you want to improve and we’ll help frame a practical ${s.name.toLowerCase()} scope.`
        }
      />

    </>
  );
}
