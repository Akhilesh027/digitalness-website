import { useMemo, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import Seo from '../components/Seo';

const FAQ_SECTIONS = [
  {
    "title": "About Digitalness",
    "items": [
      {
        "number": 1,
        "question": "What is Digitalness Industries LLP?",
        "answer": [
          "Digitalness Industries LLP is a digital marketing, creative and technology solutions company that helps businesses develop their online presence, connect with relevant audiences and improve digital business operations. We provide integrated services covering advertising, branding, websites, software development, CRM systems, business automation and communication solutions."
        ]
      },
      {
        "number": 2,
        "question": "What makes Digitalness different from other digital marketing agencies?",
        "answer": [
          "Digitalness approaches digital growth as a connected business system rather than a collection of unrelated services. We consider how advertising, websites, social media, customer enquiries, CRM systems and follow-up processes work together. This enables us to develop solutions around wider business objectives instead of concentrating exclusively on individual marketing activities."
        ]
      },
      {
        "number": 3,
        "question": "What services does Digitalness provide?",
        "answer": [
          "Our services include Meta Ads, Google Ads, SEO, Google Business Profile optimisation, social media management, creative designing, branding, content development, photography, videography, website design, web and mobile application development, CRM solutions, WhatsApp integrations, IVR systems, marketing automation and technology consulting. Service availability and exact deliverables are confirmed through individual proposals."
        ]
      },
      {
        "number": 4,
        "question": "Does Digitalness work with small businesses and startups?",
        "answer": [
          "Yes. We work with businesses at different stages of development, including startups, growing enterprises and established organisations. Our recommendations depend on the business's objectives, existing resources, intended audience, competitive environment and budget."
        ]
      },
      {
        "number": 5,
        "question": "Which industries does Digitalness serve?",
        "answer": [
          "Our experience includes furniture and interiors, real estate, hospitality and banquet halls, beauty and salons, healthcare, education, retail and professional services. We approach each industry according to its customer behaviour, communication needs and applicable regulatory requirements."
        ]
      },
      {
        "number": 6,
        "question": "Does Digitalness provide customised solutions?",
        "answer": [
          "Yes. Business requirements differ, so we can prepare customised proposals that combine suitable services, deliverables and technical requirements. Pricing, timelines and responsibilities are defined according to the agreed scope of work."
        ]
      },
      {
        "number": 7,
        "question": "Can Digitalness manage our complete digital presence?",
        "answer": [
          "Depending on your requirements, Digitalness can coordinate multiple services, including paid advertising, social media content, website development, SEO, local search and CRM solutions. The exact responsibilities are documented in the approved service agreement."
        ]
      }
    ]
  },
  {
    "title": "Digital Marketing & Advertising",
    "items": [
      {
        "number": 8,
        "question": "What is digital marketing, and how can it benefit my business?",
        "answer": [
          "Digital marketing involves promoting products, services or brands through online channels such as search engines, social media, websites and paid advertising platforms. It can help businesses communicate with relevant audiences, improve visibility, generate enquiries and evaluate campaign activity using measurable information."
        ]
      },
      {
        "number": 9,
        "question": "Does Digitalness provide Meta Ads management?",
        "answer": [
          "Yes. Digitalness provides advertising management services for Meta platforms, including Facebook and Instagram. Depending on campaign objectives, our work may involve audience planning, campaign configuration, advertising creatives, budget recommendations, monitoring and optimisation."
        ]
      },
      {
        "number": 10,
        "question": "Does Digitalness provide Google Ads services?",
        "answer": [
          "Yes. We support Google advertising campaigns based on business objectives and relevant customer search behaviour. Services may include keyword research, campaign setup, targeting, advertisement development, conversion tracking and performance analysis."
        ]
      },
      {
        "number": 11,
        "question": "Is the advertising budget included in Digitalness's service charges?",
        "answer": [
          "No, unless expressly stated otherwise in your approved proposal. Digitalness's professional management charges and the advertising budget paid to platforms such as Meta or Google are separate.",
          "Meta Ads bidding budgets and Google Ads advertising expenditure are charged separately from agency management fees."
        ]
      },
      {
        "number": 12,
        "question": "How much advertising budget should my business allocate?",
        "answer": [
          "The appropriate advertising budget depends on your industry, target market, geographic reach, competition, campaign objectives and available resources. Digitalness can provide budget recommendations based on the planned campaign, but actual advertising costs and results depend on market and platform conditions."
        ]
      },
      {
        "number": 13,
        "question": "Can Digitalness guarantee leads or sales?",
        "answer": [
          "Digitalness does not provide unconditional guarantees of leads, conversions, sales or revenue. Performance depends on several factors, including audience demand, competition, advertising expenditure, pricing, website experience and the client's sales process. We focus on professional execution, measurement and ongoing optimisation within the agreed service scope."
        ]
      },
      {
        "number": 14,
        "question": "How long does it take for advertising campaigns to generate results?",
        "answer": [
          "Results vary by business and campaign. Some advertisements may begin receiving impressions or interactions shortly after approval, while reliable performance evaluation may require additional data and optimisation. The timing of qualified enquiries or commercial conversions cannot be guaranteed."
        ]
      },
      {
        "number": 15,
        "question": "Can Digitalness advertise my business in a specific city or locality?",
        "answer": [
          "Yes. Where the advertising platform supports the required targeting, campaigns can be structured around selected geographic markets and relevant audience characteristics. Geographic targeting availability and accuracy are subject to the platform's systems and policies."
        ]
      },
      {
        "number": 16,
        "question": "Will Digitalness provide advertising performance reports?",
        "answer": [
          "Yes, reporting can be included in the agreed service scope. Depending on the campaign, reports may cover advertising expenditure, reach, impressions, clicks, engagement, enquiries and other available performance indicators."
        ]
      }
    ]
  },
  {
    "title": "Search Engine Optimisation & Google Business Profile",
    "items": [
      {
        "number": 17,
        "question": "What is Search Engine Optimisation (SEO)?",
        "answer": [
          "Search Engine Optimisation is the process of improving a website's content, technical structure and relevance to help search engines understand it and potentially improve organic search visibility."
        ]
      },
      {
        "number": 18,
        "question": "Does Digitalness provide website SEO services?",
        "answer": [
          "Yes. Services may include keyword research, on-page SEO, technical assessments, metadata optimisation, content recommendations, internal linking and search performance monitoring."
        ]
      },
      {
        "number": 19,
        "question": "Can Digitalness guarantee the first position on Google?",
        "answer": [
          "No. Search rankings are determined by search engines and depend on numerous factors beyond any agency's exclusive control. We apply appropriate optimisation methods but do not promise permanent or guaranteed positions."
        ]
      },
      {
        "number": 20,
        "question": "What is Google Business Profile optimisation?",
        "answer": [
          "Google Business Profile optimisation involves maintaining and improving relevant business information, categories, descriptions, photographs and other permitted profile content that customers may encounter through Google Search and Maps."
        ]
      },
      {
        "number": 21,
        "question": "Does Digitalness provide Google Business Profile management?",
        "answer": [
          "Yes. Depending on the engagement, we can assist with profile information, content updates, local search recommendations and ongoing optimisation."
        ]
      },
      {
        "number": 22,
        "question": "Can Google Business Profile help local businesses attract customers?",
        "answer": [
          "A well-maintained profile can make it easier for local customers to find accurate business information, explore services and contact the business. Actual visibility and enquiries depend on location, competition, platform systems and other factors."
        ]
      },
      {
        "number": 23,
        "question": "How long does SEO take to show improvements?",
        "answer": [
          "SEO is generally a continuing activity rather than an immediate result. The timeframe depends on the condition of the website, competition, search demand, content quality and implementation progress."
        ]
      }
    ]
  },
  {
    "title": "Social Media, Branding & Creative Services",
    "items": [
      {
        "number": 24,
        "question": "Does Digitalness manage business social media accounts?",
        "answer": [
          "Yes. Our social media services may include content planning, monthly calendars, creative production, captions, campaign communication and approved publishing activities."
        ]
      },
      {
        "number": 25,
        "question": "Does Digitalness create professional social media posters?",
        "answer": [
          "Yes. We design social media graphics, promotional advertisements, product creatives, campaign banners, carousels and other agreed visual materials."
        ]
      },
      {
        "number": 26,
        "question": "Does Digitalness provide reels and video editing?",
        "answer": [
          "Yes. Our creative services include short-form videos, reels, promotional edits, motion graphics and related content production. The number, length and complexity of videos depend on the approved package."
        ]
      },
      {
        "number": 27,
        "question": "Can Digitalness create content in regional languages?",
        "answer": [
          "Multilingual content may be provided according to the project requirements, available resources and approved quotation. Language accuracy and any additional production requirements are considered during planning."
        ]
      },
      {
        "number": 28,
        "question": "Does Digitalness provide logo design and branding services?",
        "answer": [
          "Yes. We provide services that may include logo development, visual identity, typography, colour systems, brand communication and promotional design."
        ]
      },
      {
        "number": 29,
        "question": "Can Digitalness create a monthly content calendar?",
        "answer": [
          "Yes. Monthly content planning can be included in social media management engagements. Calendars may contain promotional content, product information, educational posts, seasonal campaigns and other relevant communication themes."
        ]
      },
      {
        "number": 30,
        "question": "How many revisions are included for a design?",
        "answer": [
          "Revision limits depend on the approved proposal. Minor corrections within the agreed scope may be included, while major redesigns, new creative concepts or additional deliverables may require separate charges."
        ]
      },
      {
        "number": 31,
        "question": "Who owns the designs and creative materials produced by Digitalness?",
        "answer": [
          "Ownership and usage rights are governed by the written service agreement, applicable copyright law, third-party licences and any agreed transfer conditions. Digitalness may retain ownership of its pre-existing templates, reusable systems and proprietary materials."
        ]
      }
    ]
  },
  {
    "title": "Website Development & Technology Solutions",
    "items": [
      {
        "number": 32,
        "question": "Does Digitalness develop business websites?",
        "answer": [
          "Yes. We develop business websites, corporate websites, service websites, landing pages, portfolios and other digital experiences according to agreed requirements."
        ]
      },
      {
        "number": 33,
        "question": "Can Digitalness create e-commerce websites?",
        "answer": [
          "Yes. Depending on the project scope, e-commerce solutions may include product catalogues, shopping interfaces, payment integrations, customer accounts, order workflows and administrative functions."
        ]
      },
      {
        "number": 34,
        "question": "Does Digitalness develop custom web applications?",
        "answer": [
          "Yes. We can evaluate custom web application requirements involving business workflows, dashboards, databases, user management and third-party integrations."
        ]
      },
      {
        "number": 35,
        "question": "Can Digitalness develop mobile applications?",
        "answer": [
          "Mobile application development is among our technology service areas. Project feasibility, supported platforms, features, timelines and costs are determined through requirements analysis."
        ]
      },
      {
        "number": 36,
        "question": "Are Digitalness websites mobile-responsive?",
        "answer": [
          "Mobile responsiveness can be included in website development specifications. We aim to build interfaces that work across agreed desktop, tablet and mobile viewport requirements."
        ]
      },
      {
        "number": 37,
        "question": "Will Digitalness provide domain registration and website hosting?",
        "answer": [
          "Domain and hosting arrangements depend on the agreed service package. These services may involve separate third-party charges and recurring renewal obligations."
        ]
      },
      {
        "number": 38,
        "question": "Can Digitalness redesign an existing website?",
        "answer": [
          "Yes. We can assess an existing website and propose improvements to its interface, structure, responsiveness, content presentation or technical implementation."
        ]
      },
      {
        "number": 39,
        "question": "Will Digitalness maintain the website after launch?",
        "answer": [
          "Post-launch maintenance may be provided through an agreed support or maintenance arrangement. Unless expressly included, initial development fees do not automatically cover indefinite maintenance or future functionality changes"
        ]
      }
    ]
  }
];

export default function FAQs() {
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState(null);

  const filteredSections = useMemo(() => {
    const term = query.trim().toLowerCase();

    if (!term) return FAQ_SECTIONS;

    return FAQ_SECTIONS
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => {
          const haystack = [
            section.title,
            item.question,
            ...item.answer
          ].join(' ').toLowerCase();

          return haystack.includes(term);
        })
      }))
      .filter((section) => section.items.length > 0);
  }, [query]);

  return (
    <>
      <Seo
        title="Frequently Asked Questions"
        path="/faqs"
        description="Frequently asked questions about Digitalness Industries LLP services, digital marketing, advertising, SEO, Google Business Profile, social media, branding, website development and technology solutions."
      />

      <style>{`
        .faq-hero {
          padding: 82px 0 54px;
          background:
            radial-gradient(circle at 82% 16%, rgba(109,93,252,.14), transparent 30%),
            linear-gradient(180deg, #f7f5ff 0%, #ffffff 100%);
        }

        .faq-hero .narrow {
          max-width: 900px;
        }

        .faq-hero h1 {
          margin: 14px 0 18px;
          color: #130150;
          font-size: clamp(2.8rem, 6vw, 5.5rem);
          line-height: .98;
          letter-spacing: -.055em;
        }

        .faq-hero p {
          max-width: 790px;
          color: #5c6273;
          font-size: 1.06rem;
          line-height: 1.85;
        }

        .faq-page {
          padding: 64px 0 96px;
        }

        .faq-shell {
          display: grid;
          grid-template-columns: 240px minmax(0, 1fr);
          gap: 36px;
          align-items: start;
        }

        .faq-side {
          position: sticky;
          top: 108px;
          display: grid;
          gap: 8px;
          padding: 14px;
          border: 1px solid #e5e2f0;
          border-radius: 18px;
          background: #fff;
          box-shadow: 0 16px 44px rgba(19,1,80,.05);
        }

        .faq-side strong {
          padding: 4px 8px 10px;
          color: #130150;
          font-size: .78rem;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .faq-side a {
          padding: 10px 11px;
          border-radius: 10px;
          color: #666b7a;
          font-size: .83rem;
          font-weight: 750;
          line-height: 1.35;
        }

        .faq-side a:hover {
          color: #130150;
          background: #f5f2ff;
        }

        .faq-content {
          min-width: 0;
        }

        .faq-search {
          position: relative;
          margin-bottom: 34px;
        }

        .faq-search svg {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: #6d5dfc;
        }

        .faq-search input {
          width: 100%;
          min-height: 54px;
          padding: 0 18px 0 50px;
          border: 1px solid #ddd9eb;
          border-radius: 15px;
          background: #fff;
          color: #17132f;
          font: inherit;
          outline: none;
        }

        .faq-search input:focus {
          border-color: #6d5dfc;
          box-shadow: 0 0 0 4px rgba(109,93,252,.10);
        }

        .faq-section {
          scroll-margin-top: 120px;
          margin-bottom: 48px;
        }

        .faq-section > h2 {
          margin: 0 0 20px;
          padding-bottom: 13px;
          border-bottom: 1px solid #e8e5f0;
          color: #130150;
          font-size: clamp(1.55rem, 2.8vw, 2.1rem);
          letter-spacing: -.03em;
        }

        .faq-list {
          display: grid;
          gap: 12px;
        }

        .faq-item {
          overflow: hidden;
          border: 1px solid #e6e2ef;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 8px 24px rgba(19,1,80,.035);
        }

        .faq-question {
          width: 100%;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 12px;
          padding: 18px 20px;
          border: 0;
          background: transparent;
          color: #17132f;
          text-align: left;
          cursor: pointer;
          font: inherit;
          font-weight: 800;
        }

        .faq-number {
          color: #6d5dfc;
          font-size: .76rem;
          letter-spacing: .07em;
        }

        .faq-question svg {
          transition: transform .22s ease;
        }

        .faq-item.is-open .faq-question svg {
          transform: rotate(180deg);
        }

        .faq-answer {
          padding: 0 20px 20px 53px;
          color: #606777;
          font-size: .96rem;
          line-height: 1.82;
        }

        .faq-answer p {
          margin: 0 0 12px;
        }

        .faq-answer p:last-child {
          margin-bottom: 0;
        }

        .faq-empty {
          padding: 28px;
          border: 1px solid #e6e2ef;
          border-radius: 16px;
          background: #faf9ff;
          color: #626778;
        }

        .faq-contact {
          margin-top: 36px;
          padding: 24px;
          border-radius: 18px;
          background: #130150;
          color: rgba(255,255,255,.82);
        }

        .faq-contact h3 {
          margin: 0 0 8px;
          color: #fff;
        }

        .faq-contact p {
          margin: 0 0 16px;
          line-height: 1.7;
        }

        .faq-contact a {
          display: inline-flex;
          align-items: center;
          min-height: 44px;
          padding: 0 18px;
          border-radius: 999px;
          background: #fff;
          color: #130150;
          font-weight: 850;
        }

        @media (max-width: 900px) {
          .faq-shell {
            grid-template-columns: 1fr;
          }

          .faq-side {
            position: static;
            display: flex;
            overflow-x: auto;
          }

          .faq-side strong {
            display: none;
          }

          .faq-side a {
            flex: 0 0 auto;
            white-space: nowrap;
          }
        }

        @media (max-width: 650px) {
          .faq-hero {
            padding: 54px 0 38px;
          }

          .faq-page {
            padding: 44px 0 68px;
          }

          .faq-question {
            grid-template-columns: auto 1fr auto;
            padding: 16px;
          }

          .faq-answer {
            padding: 0 16px 17px 45px;
          }
        }
      `}</style>

      <section className="faq-hero">
        <div className="container narrow">
          <span className="eyebrow">Frequently Asked Questions</span>

          <h1>
            Everything you need to know about Digitalness
          </h1>

          <p>
            At Digitalness Industries LLP, we understand that every business has unique goals, requirements and expectations. Whether you are exploring digital marketing for the first time, planning a new website, looking to improve your online visibility or considering technology solutions to simplify your business operations, our Frequently Asked Questions section is designed to help you make informed decisions. We believe in transparent communication, practical guidance and clearly defined service commitments. Below, we address common questions about our capabilities, engagement process, commercial arrangements and technical services.
          </p>
        </div>
      </section>

      <section className="faq-page">
        <div className="container faq-shell">
          <nav className="faq-side" aria-label="FAQ sections">
            <strong>FAQ Categories</strong>

            {FAQ_SECTIONS.map((section, index) => (
              <a
                href={`#faq-section-${index + 1}`}
                key={section.title}
              >
                {section.title}
              </a>
            ))}
          </nav>

          <div className="faq-content">
            <div className="faq-search">
              <Search size={19} />

              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search questions, services or topics..."
                aria-label="Search frequently asked questions"
              />
            </div>

            {filteredSections.length > 0 ? (
              filteredSections.map((section, sectionIndex) => (
                <section
                  className="faq-section"
                  id={`faq-section-${FAQ_SECTIONS.findIndex((item) => item.title === section.title) + 1}`}
                  key={section.title}
                >
                  <h2>{section.title}</h2>

                  <div className="faq-list">
                    {section.items.map((item) => {
                      const id = `${section.title}-${item.number}`;
                      const isOpen = openId === id;

                      return (
                        <article
                          className={`faq-item ${isOpen ? 'is-open' : ''}`}
                          key={id}
                        >
                          <button
                            type="button"
                            className="faq-question"
                            onClick={() => setOpenId(isOpen ? null : id)}
                            aria-expanded={isOpen}
                          >
                            <span className="faq-number">
                              {String(item.number).padStart(2, '0')}
                            </span>

                            <span>{item.question}</span>

                            <ChevronDown size={19} />
                          </button>

                          {isOpen && (
                            <div className="faq-answer">
                              {item.answer.map((paragraph, index) => (
                                <p key={`${item.number}-${index}`}>
                                  {paragraph}
                                </p>
                              ))}
                            </div>
                          )}
                        </article>
                      );
                    })}
                  </div>
                </section>
              ))
            ) : (
              <div className="faq-empty">
                No FAQs match your search. Try a broader keyword.
              </div>
            )}

            <div className="faq-contact">
              <h3>Still have a question?</h3>

              <p>
                Contact Digitalness for clarification about a service,
                proposal, campaign, website or technology requirement.
              </p>

              <a href="mailto:info@digitalness.co.in">
                Contact Digitalness
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
