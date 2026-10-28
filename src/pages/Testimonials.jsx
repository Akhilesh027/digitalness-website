import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ExternalLink, Quote, ShieldCheck, Star } from 'lucide-react';
import Seo from '../components/Seo';

const GOOGLE_REVIEWS_URL =
  'https://share.google/ZlY7FGc9ZSQ7Udqbl';

const googleReviewHighlights = [
  {
    rating: 5,
    text: 'Very professional service with excellent customer support.'
  },
  {
    rating: 5,
    text: 'Friendly team, timely delivery, and outstanding quality.'
  },
  {
    rating: 5,
    text: 'Budget friendly Drone shoot'
  }
];

const experienceHighlights = [
  {
    client: 'Sri Utsavam Banquets',
    area: 'Hospitality & Event Marketing',
    text:
      'Digitalness has supported ongoing social media communication, Google Business Profile activity and digital marketing requirements around venue discovery and customer enquiries.'
  },
  {
    client: 'Srinivasa Furnitures',
    area: 'Furniture Retail & Creative Marketing',
    text:
      'The engagement has included product-focused social media creatives, reels, local visibility activity and campaign communication across furniture categories.'
  },
  {
    client: 'AHA Group',
    area: 'Real Estate Marketing',
    text:
      'Digitalness has supported real-estate campaign communication, digital advertising creatives and enquiry-oriented marketing around project visibility and location advantages.'
  },
  {
    client: 'Remedy Law Firm & Associates',
    area: 'Professional Services',
    text:
      'Digitalness has worked on professional social communication and campaign creatives designed around clear, responsible and informative legal-service messaging.'
  },
  {
    client: 'TONI&GUY essensuals',
    area: 'Beauty & Personal Care',
    text:
      'Digital advertising activity has focused on reaching relevant local audiences and supporting salon-service discovery across the Ameenpur and Bachupally markets.'
  },
  {
    client: 'Lepakshi Furniture & Interiors',
    area: 'Branding & Product Communication',
    text:
      'Digitalness has developed product creatives, promotional campaigns and visual communication focused on maintaining product accuracy and a premium furniture presentation.'
  }
];

const trustPoints = [
  'Client-attributed quotes are published only after approval.',
  'Project summaries are separated from testimonial statements.',
  'Performance figures are not presented as client endorsements unless verified.',
  'Client names, visuals and comments should be used only with suitable permission.'
];

export default function Testimonials() {
  return (
    <>
      <Seo
        title="Testimonials"
        path="/testimonials"
        description="Client experiences, engagement highlights and verified testimonial information from Digitalness Industries LLP."
      />

      <style>{`
        .testimonials-hero {
          padding: 84px 0 60px;
          background:
            radial-gradient(circle at 84% 18%, rgba(109,93,252,.15), transparent 30%),
            linear-gradient(180deg, #f7f5ff 0%, #ffffff 100%);
        }

        .testimonials-hero .narrow {
          max-width: 920px;
        }

        .testimonials-hero h1 {
          margin: 14px 0 18px;
          color: #130150;
          font-size: clamp(2.8rem, 6vw, 5.6rem);
          line-height: .98;
          letter-spacing: -.055em;
        }

        .testimonials-hero h1 span {
          display: block;
          color: #6d5dfc;
        }

        .testimonials-hero p {
          max-width: 820px;
          color: #5e6474;
          font-size: 1.06rem;
          line-height: 1.84;
        }

        .testimonials-page {
          padding: 64px 0 96px;
        }

        .testimonials-section-head {
          max-width: 780px;
          margin-bottom: 28px;
        }

        .testimonials-section-head h2 {
          margin: 0 0 12px;
          color: #130150;
          font-size: clamp(2rem, 4vw, 3.2rem);
          letter-spacing: -.04em;
        }

        .testimonials-section-head p {
          margin: 0;
          color: #626978;
          line-height: 1.8;
        }

        .google-review-summary {
          display: grid;
          grid-template-columns: minmax(0, .72fr) minmax(0, 1.28fr);
          gap: 22px;
          margin-bottom: 54px;
        }

        .google-rating-card {
          padding: 28px;
          border: 1px solid #e2def0;
          border-radius: 22px;
          background:
            radial-gradient(circle at 90% 10%, rgba(109,93,252,.12), transparent 34%),
            #fff;
          box-shadow: 0 18px 48px rgba(19,1,80,.055);
        }

        .google-rating-label {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 16px;
          color: #5f6371;
          font-size: .82rem;
          font-weight: 850;
          text-transform: uppercase;
          letter-spacing: .07em;
        }

        .google-rating-score {
          display: flex;
          align-items: flex-end;
          gap: 10px;
          margin-bottom: 10px;
        }

        .google-rating-score strong {
          color: #130150;
          font-size: clamp(3.7rem, 7vw, 5.5rem);
          line-height: .9;
          letter-spacing: -.06em;
        }

        .google-rating-score span {
          padding-bottom: 8px;
          color: #707482;
          font-weight: 750;
        }

        .google-stars {
          display: flex;
          gap: 4px;
          margin-bottom: 14px;
          color: #f4b400;
        }

        .google-rating-card p {
          margin: 0 0 22px;
          color: #656b79;
          line-height: 1.7;
        }

        .google-review-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 46px;
          padding: 0 18px;
          border-radius: 999px;
          background: #130150;
          color: #fff;
          font-weight: 850;
          text-decoration: none;
        }

        .google-review-link:hover {
          background: #261082;
        }

        .google-review-grid {
          display: grid;
          gap: 12px;
        }

        .google-review-card {
          padding: 20px 22px;
          border: 1px solid #e6e2ef;
          border-radius: 18px;
          background: #fff;
          box-shadow: 0 10px 30px rgba(19,1,80,.035);
        }

        .google-review-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 12px;
        }

        .google-review-card-top strong {
          color: #17132f;
          font-size: .9rem;
        }

        .google-review-card-stars {
          display: flex;
          gap: 2px;
          color: #f4b400;
        }

        .google-review-card blockquote {
          margin: 0;
          color: #555d6e;
          font-size: .98rem;
          line-height: 1.72;
        }

        .google-review-note {
          margin-top: 12px;
          color: #7a7f8e;
          font-size: .78rem;
          line-height: 1.55;
        }

        .testimonial-verification {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          gap: 16px;
          align-items: start;
          margin-bottom: 46px;
          padding: 22px;
          border: 1px solid #e2def0;
          border-radius: 18px;
          background: #faf9ff;
        }

        .testimonial-verification-icon {
          width: 46px;
          height: 46px;
          display: grid;
          place-items: center;
          border-radius: 14px;
          background: #130150;
          color: #fff;
        }

        .testimonial-verification h3 {
          margin: 0 0 6px;
          color: #17132f;
          font-size: 1.08rem;
        }

        .testimonial-verification p {
          margin: 0;
          color: #656b79;
          line-height: 1.72;
        }

        .experience-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .experience-card {
          position: relative;
          min-height: 270px;
          padding: 25px;
          overflow: hidden;
          border: 1px solid #e5e2ef;
          border-radius: 20px;
          background: #fff;
          box-shadow: 0 14px 42px rgba(19,1,80,.045);
        }

        .experience-card::after {
          content: '';
          position: absolute;
          width: 130px;
          height: 130px;
          top: -54px;
          right: -48px;
          border-radius: 50%;
          background: rgba(109,93,252,.09);
        }

        .experience-card-top {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          gap: 16px;
          align-items: flex-start;
        }

        .experience-card-icon {
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          border-radius: 13px;
          background: #f2efff;
          color: #6d5dfc;
        }

        .experience-card small {
          display: block;
          margin: 20px 0 8px;
          color: #6d5dfc;
          font-weight: 850;
        }

        .experience-card h3 {
          margin: 0 0 13px;
          color: #17132f;
          font-size: 1.25rem;
        }

        .experience-card p {
          margin: 0;
          color: #616777;
          font-size: .96rem;
          line-height: 1.78;
        }

        .testimonial-policy {
          margin-top: 72px;
          padding: 54px 0;
          background: #130150;
        }

        .testimonial-policy h2 {
          margin: 0 0 14px;
          color: #fff;
          font-size: clamp(2rem, 4vw, 3.1rem);
          letter-spacing: -.04em;
        }

        .testimonial-policy > .container > p {
          max-width: 820px;
          margin: 0;
          color: rgba(255,255,255,.72);
          line-height: 1.8;
        }

        .trust-grid {
          display: grid;
          grid-template-columns: repeat(2,minmax(0,1fr));
          gap: 12px;
          margin-top: 28px;
        }

        .trust-item {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          padding: 17px 18px;
          border: 1px solid rgba(255,255,255,.14);
          border-radius: 15px;
          background: rgba(255,255,255,.06);
          color: rgba(255,255,255,.83);
          line-height: 1.6;
        }

        .trust-item svg {
          flex: 0 0 auto;
          margin-top: 2px;
          color: #b8adff;
        }

        .testimonials-cta {
          margin-top: 68px;
          padding: 32px;
          border: 1px solid #e3def3;
          border-radius: 22px;
          background: #f6f3ff;
        }

        .testimonials-cta h2 {
          margin: 0 0 10px;
          color: #130150;
          font-size: 1.9rem;
        }

        .testimonials-cta p {
          max-width: 760px;
          margin: 0 0 20px;
          color: #626878;
          line-height: 1.75;
        }

        .testimonials-cta a {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 46px;
          padding: 0 18px;
          border-radius: 999px;
          background: #130150;
          color: #fff;
          font-weight: 850;
        }

        @media (max-width: 800px) {
          .google-review-summary,
          .experience-grid,
          .trust-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 650px) {
          .testimonials-hero {
            padding: 54px 0 40px;
          }

          .testimonials-page {
            padding: 44px 0 68px;
          }

          .experience-card {
            min-height: 0;
          }

          .testimonial-policy {
            margin-top: 54px;
            padding: 42px 0;
          }
        }
      `}</style>

      <section className="testimonials-hero">
        <div className="container narrow">
          <span className="eyebrow">Client Experiences</span>

          <h1>
            Relationships built around
            <span>clear work and practical progress.</span>
          </h1>

          <p>
            Digitalness works across marketing, creative communication,
            websites, search visibility and business technology. This page is
            designed to present approved client testimonials alongside factual
            engagement summaries without overstating outcomes or publishing
            unverified endorsements.
          </p>
        </div>
      </section>

      <section className="testimonials-page">
        <div className="container">
          <div className="testimonials-section-head">
            <span className="eyebrow">Google Reviews</span>

            <h2>What customers are saying on Google</h2>

            <p>
              Digitalness currently holds a 5.0 Google rating from 37 reviews.
              The review excerpts below are the public highlights currently
              available from the Google listing. Use the Google button to read
              the complete live review collection.
            </p>
          </div>

          <div className="google-review-summary">
            <aside className="google-rating-card">
              <span className="google-rating-label">
                Google customer rating
              </span>

              <div className="google-rating-score">
                <strong>5.0</strong>
                <span>out of 5</span>
              </div>

              <div className="google-stars" aria-label="5 out of 5 stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    fill="currentColor"
                    strokeWidth={1.7}
                  />
                ))}
              </div>

              <p>
                Based on 37 Google reviews on the Digitalness business listing.
              </p>

              <a
                className="google-review-link"
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read all 37 Google reviews
                <ExternalLink size={16} />
              </a>
            </aside>

            <div className="google-review-grid">
              {googleReviewHighlights.map((review, index) => (
                <article
                  className="google-review-card"
                  key={`${review.text}-${index}`}
                >
                  <div className="google-review-card-top">
                    <strong>Google Review</strong>

                    <div
                      className="google-review-card-stars"
                      aria-label={`${review.rating} out of 5 stars`}
                    >
                      {Array.from({ length: review.rating }).map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          size={15}
                          fill="currentColor"
                          strokeWidth={1.7}
                        />
                      ))}
                    </div>
                  </div>

                  <blockquote>
                    “{review.text}”
                  </blockquote>
                </article>
              ))}

              <div className="google-review-note">
                Google exposes only a limited set of review excerpts through
                the public listing data available to this page build. The
                button above opens the shared Google page for the full live
                review list.
              </div>
            </div>
          </div>

          <div className="testimonial-verification">
            <div className="testimonial-verification-icon">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h3>Verified testimonial standard</h3>

              <p>
                Digitalness publishes attributed client quotations only after
                the wording and use are approved. Until approved quotations are
                available, the cards below describe known engagement activity
                rather than presenting invented client statements.
              </p>
            </div>
          </div>

          <div className="testimonials-section-head">
            <span className="eyebrow">Selected client experiences</span>

            <h2>
              Different industries. Different requirements. One connected approach.
            </h2>

            <p>
              These summaries describe the type of work Digitalness has supported
              across selected engagements. They are not presented as direct
              quotations or independently verified performance claims.
            </p>
          </div>

          <div className="experience-grid">
            {experienceHighlights.map((item) => (
              <article className="experience-card" key={item.client}>
                <div className="experience-card-top">
                  <div className="experience-card-icon">
                    <Quote size={20} />
                  </div>
                </div>

                <small>{item.area}</small>

                <h3>{item.client}</h3>

                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>

        <section className="testimonial-policy">
          <div className="container">
            <span className="eyebrow">Responsible publication</span>

            <h2>How testimonials are handled</h2>

            <p>
              Client feedback can be useful only when it is authentic,
              attributable and used with permission. Digitalness therefore
              separates client-approved testimonials from general project
              descriptions and marketing claims.
            </p>

            <div className="trust-grid">
              {trustPoints.map((point) => (
                <div className="trust-item" key={point}>
                  <CheckCircle2 size={18} />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="container">
          <div className="testimonials-cta">
            <h2>Worked with Digitalness?</h2>

            <p>
              If you are an existing or previous client and would like to share
              approved feedback about your experience, contact Digitalness so
              the testimonial can be reviewed and published accurately.
            </p>

            <Link to="/contact">
              Contact Digitalness
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
