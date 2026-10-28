import Seo from '../components/Seo';

const caseStudies = [
  {
    number: '01',
    client: 'Sri Utsavam Banquets',
    category: 'Hospitality & Event Marketing',
    title: 'Creating a Stronger Digital Presence for Celebrations',
    image:
      'https://images.openai.com/static-rsc-4/Xt0x4nAkiDnSa2_l5HCyywYGR-B0cwf-b9fUxz1U8uyHw5J2FVA7wSmTtzvu9UhdvDe3orhab0bVUogSb7bggEcmEYH6va_oB06rMSFYSB8UEY9haeEba4SFR22JnuM9Q-kFccBQPT82Pl1JH3iCW0eXnCwhqqzV-W-MGyFlsOY?purpose=inline',
    paragraphs: [
      'Digitalness supported the venue through Meta advertising, social media content, Google Business Profile activity and local search initiatives. The communication approach focused on reaching audiences exploring venues for weddings, receptions, family functions and other planned celebrations.',
      'The strategy connected attractive venue presentation with location-oriented discovery and customer enquiry opportunities.'
    ]
  },
  {
    number: '02',
    client: 'Srinivasa Furnitures',
    category: 'Furniture Retail & Creative Marketing',
    title: 'Transforming Furniture Collections Into Visual Experiences',
    image:
      'https://images.openai.com/static-rsc-4/tUU7MHDgl8weTnzaMB5HrXOOxOLtP7YWSGaQcQQ3r_WMB5VDi2JFn01-BZRdJfpDbBQiPh6Rhsgadp7cdwe0oj2qn-M22O8-z34EIOsGg643c3fXkagGe4mznwbaq6b9jaQ1kiZ2omMWvkTKnphmaJRIg0vbh6Rvd4OUyLxuRug?purpose=inline',
    paragraphs: [
      'Digitalness developed product-oriented social media creatives and promotional communication for sofas, wardrobes, beds, dining collections and other furniture categories.',
      'The approach emphasised accurate product representation, appealing lifestyle settings, seasonal campaigns and consistent brand presentation to support product discovery and showroom interest.'
    ]
  },
  {
    number: '03',
    client: 'TONI&GUY essensuals',
    category: 'Beauty & Personal Care Advertising',
    title: 'Connecting Salon Services With Local Audiences',
    image:
      'https://images.openai.com/static-rsc-4/zd8Llrb3wisqMF5LVFIqf7J3v6LCVT30FdoMPqvVX_a2sTFF6H2b2jC_90DwcX-STcQcop2Crli9Idk6KYrRTK6rBG4brBxuoG16DxxW7q9OG_FHuZeS2Rsq2pCBYJzBdQWkmWvnLmzXbROVT-eBNR_crm8qbjPkoFLbWFkuXNM?purpose=inline',
    paragraphs: [
      'For the Ameenpur and Bachupally markets, Digitalness supported Meta and Google advertising activities.',
      'The marketing approach considered geographic relevance, promotional messaging, campaign performance and the importance of connecting interested local customers with salon services.'
    ]
  },
  {
    number: '04',
    client: 'AHA Group — AIIMS Serene City–II',
    category: 'Real Estate & Property Marketing',
    title: 'Presenting Property Opportunities Through Digital Campaigns',
    image:
      'https://images.openai.com/static-rsc-4/MHAVvNE67x1r4wVZ6JqnJ3C5hBA9i2kS1f7g8BNT4CEdd1i0coZBY30jgoS-DHrxewloSrZfmd7Rh7pFEaVWMCySUGgnGV20X-egYb0gRhyT_EIXOV8ZZ0Yqj4j2XONkF_78c7vVG2XoJQFxDEimqFn3R6CfI4GS1d-rYgZClXA?purpose=inline',
    paragraphs: [
      'Digitalness developed real estate-focused creatives and promotional content highlighting the project’s location, connectivity and buyer enquiry opportunities.',
      'The communication strategy balanced visual appeal with relevant project information, recognising that property buyers require accurate details and opportunities for further verification.'
    ]
  },
  {
    number: '05',
    client: 'Lepakshi Furniture & Interiors',
    category: 'Branding & Product Advertising',
    title: 'Building Premium Furniture Campaign Communication',
    image:
      'https://images.openai.com/static-rsc-4/BAEq-BlQ0VY_QF1iwi1JVwo62spFvRvzvttEyJPfCcYOTSrRyQqr_J-C_LmkEj1z3gMbEleHsTIlt7yvFFhF_7VZNLefKi1_xwJuMtCRP0_w3GA8Z5N7PBAUQyFxvCZiQXMi5RLE3gEYEi0g2vRIOXMGzkZeaqaPAOExwKx85kQ?purpose=inline',
    paragraphs: [
      'Digitalness developed product posters, promotional designs, festival campaigns and print-oriented creatives.',
      'The creative approach focused on preserving furniture design details while using sophisticated layouts, suitable typography and visually attractive backgrounds to communicate product value.'
    ]
  },
  {
    number: '06',
    client: 'The Interior Park',
    category: 'Web Development & UI/UX',
    title: 'Preserving Design Quality Through Website Development',
    image:
      'https://images.openai.com/static-rsc-4/BWJ01nlZRuX3qk3zpqXLaN9-lhOtr89OWFDLev0cYCv8Q9gRA1TvzuQR_WTKw7ovr5SUbbGYEDdC52lRUQrZSuhAKVHLXq8g8jVlxpeYnv2zLihvSrBuxP1uUovZCs5pEwa3PVo63j0flkM9VwJ0Z9WhhNYhgRTIaDWIjFJIKz4?purpose=inline',
    paragraphs: [
      'This project involved frontend conversion and refinement of a premium furniture website, including requirements to preserve existing layouts and functionality while adjusting responsive elements, branding and product-image management.',
      'The work illustrates the importance of balancing design consistency, technical implementation and long-term website maintainability.'
    ]
  }
];

const approachSteps = [
  [
    '01',
    'Business Discovery',
    'Understand the client’s industry, objectives, target audience, current digital presence and operational needs.'
  ],
  [
    '02',
    'Strategy Development',
    'Identify suitable channels, campaign priorities, communication requirements and technical solutions.'
  ],
  [
    '03',
    'Creative & Technical Execution',
    'Develop agreed advertisements, content, websites, interfaces, integrations or automation workflows.'
  ],
  [
    '04',
    'Campaign Implementation',
    'Launch approved activities and coordinate relevant digital touchpoints.'
  ],
  [
    '05',
    'Reporting & Evaluation',
    'Review relevant metrics, delivery progress and available customer-response information.'
  ],
  [
    '06',
    'Continuous Improvement',
    'Refine strategies and execution based on performance information, changing requirements and agreed priorities.'
  ]
];

export default function CaseStudies() {
  return (
    <>
      <Seo
        title="Case Studies"
        path="/case-studies"
        description="Explore Digitalness Industries LLP case studies across hospitality, furniture, beauty, real estate, branding, web development and digital growth."
      />

      <style>{`
        .case-hero {
          padding: 82px 0 58px;
          background:
            radial-gradient(circle at 85% 18%, rgba(109,93,252,.14), transparent 30%),
            linear-gradient(180deg, #f7f5ff 0%, #fff 100%);
        }

        .case-hero .narrow {
          max-width: 950px;
        }

        .case-hero h1 {
          margin: 14px 0 18px;
          color: #130150;
          font-size: clamp(2.8rem, 6vw, 5.7rem);
          line-height: .97;
          letter-spacing: -.055em;
        }

        .case-hero h1 span {
          display: block;
          color: #6d5dfc;
        }

        .case-hero p {
          max-width: 850px;
          color: #5d6374;
          font-size: 1.06rem;
          line-height: 1.84;
        }

        .case-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 24px;
        }

        .case-tags span {
          padding: 9px 13px;
          border: 1px solid #ddd8ed;
          border-radius: 999px;
          background: rgba(255,255,255,.8);
          color: #3e3760;
          font-size: .82rem;
          font-weight: 800;
        }

        .case-page {
          padding: 66px 0 96px;
        }

        .case-section-head {
          max-width: 760px;
          margin-bottom: 30px;
        }

        .case-section-head h2 {
          margin: 0 0 12px;
          color: #130150;
          font-size: clamp(2rem, 4vw, 3.25rem);
          letter-spacing: -.04em;
        }

        .case-section-head p {
          margin: 0;
          color: #626978;
          line-height: 1.8;
        }

        .case-grid {
          display: grid;
          grid-template-columns: repeat(2,minmax(0,1fr));
          gap: 22px;
        }

        .case-card {
          overflow: hidden;
          border: 1px solid #e5e1ef;
          border-radius: 22px;
          background: #fff;
          box-shadow: 0 16px 46px rgba(19,1,80,.05);
        }

        .case-card-media {
          position: relative;
          height: 280px;
          overflow: hidden;
          background: #171d34;
        }

        .case-card-media img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center;
        }

        .case-card-media::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(10,8,32,0) 45%,
            rgba(10,8,32,.68) 100%
          );
        }

        .case-card-badge {
          position: absolute;
          left: 18px;
          bottom: 18px;
          z-index: 2;
          padding: 7px 10px;
          border-radius: 999px;
          background: rgba(255,255,255,.16);
          color: #fff;
          font-size: .76rem;
          font-weight: 800;
          backdrop-filter: blur(10px);
        }

        .case-card-number {
          position: absolute;
          right: 18px;
          bottom: 18px;
          z-index: 2;
          color: #fff;
          font-size: .8rem;
          font-weight: 900;
          letter-spacing: .08em;
        }

        .case-card-copy {
          padding: 24px;
        }

        .case-card-copy h3 {
          margin: 0 0 7px;
          color: #17132f;
          font-size: 1.28rem;
        }

        .case-card-copy h4 {
          margin: 0 0 15px;
          color: #6d5dfc;
          font-size: .98rem;
          line-height: 1.45;
        }

        .case-card-copy p {
          margin: 0 0 12px;
          color: #616777;
          font-size: .95rem;
          line-height: 1.78;
        }

        .case-illustrative {
          margin-top: 18px;
          padding: 13px 16px;
          border: 1px solid #e5e1ef;
          border-radius: 13px;
          background: #faf9ff;
          color: #6c7080;
          font-size: .82rem;
          line-height: 1.6;
        }

        .case-approach {
          margin-top: 76px;
          padding: 54px 0;
          background: #130150;
        }

        .case-approach .case-section-head h2,
        .case-approach .case-section-head p {
          color: #fff;
        }

        .case-approach .case-section-head p {
          color: rgba(255,255,255,.72);
        }

        .case-steps {
          display: grid;
          grid-template-columns: repeat(3,minmax(0,1fr));
          gap: 14px;
        }

        .case-step {
          padding: 22px;
          border: 1px solid rgba(255,255,255,.14);
          border-radius: 18px;
          background: rgba(255,255,255,.06);
        }

        .case-step span {
          color: #b9adff;
          font-size: .78rem;
          font-weight: 900;
          letter-spacing: .08em;
        }

        .case-step h3 {
          margin: 10px 0 8px;
          color: #fff;
          font-size: 1.02rem;
        }

        .case-step p {
          margin: 0;
          color: rgba(255,255,255,.72);
          font-size: .9rem;
          line-height: 1.7;
        }

        .case-longform {
          padding: 70px 0 0;
        }

        .case-longform-grid {
          display: grid;
          grid-template-columns: repeat(2,minmax(0,1fr));
          gap: 24px;
        }

        .case-info-card {
          padding: 26px;
          border: 1px solid #e6e2ef;
          border-radius: 19px;
          background: #fff;
        }

        .case-info-card h2 {
          margin: 0 0 14px;
          color: #130150;
          font-size: 1.55rem;
        }

        .case-info-card p {
          margin: 0 0 13px;
          color: #626878;
          line-height: 1.8;
        }

        .case-cta {
          margin-top: 58px;
          padding: 32px;
          border-radius: 22px;
          background: #f5f2ff;
          border: 1px solid #e4def7;
        }

        .case-cta h2 {
          margin: 0 0 11px;
          color: #130150;
          font-size: 1.9rem;
        }

        .case-cta p {
          max-width: 820px;
          margin: 0 0 20px;
          color: #616777;
          line-height: 1.8;
        }

        .case-contact {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 20px;
          color: #4e5364;
          font-weight: 750;
        }

        .case-disclaimer {
          margin-top: 26px;
          padding: 18px 20px;
          border-left: 4px solid #6d5dfc;
          border-radius: 0 14px 14px 0;
          background: #faf9ff;
          color: #676b79;
          font-size: .88rem;
          line-height: 1.7;
        }

        @media (max-width: 900px) {
          .case-grid,
          .case-longform-grid {
            grid-template-columns: 1fr;
          }

          .case-steps {
            grid-template-columns: repeat(2,minmax(0,1fr));
          }
        }

        @media (max-width: 650px) {
          .case-hero {
            padding: 54px 0 40px;
          }

          .case-page {
            padding: 46px 0 68px;
          }

          .case-grid,
          .case-steps {
            grid-template-columns: 1fr;
          }

          .case-card-media {
            height: 220px;
          }

          .case-card-copy {
            padding: 19px;
          }

          .case-approach {
            margin-top: 54px;
            padding: 42px 0;
          }
        }
      `}</style>

      <section className="case-hero">
        <div className="container narrow">
          <span className="eyebrow">Case Studies — Digitalness Industries LLP</span>

          <h1>
            Real Businesses. Real Challenges.
            <span>Strategic Digital Solutions.</span>
          </h1>

          <p>
            At Digitalness Industries LLP, we believe every successful digital
            project begins with understanding a business beyond its immediate
            marketing requirements. Different industries have different
            customers, operational challenges, purchasing behaviours and growth
            objectives. Our responsibility is to connect the right combination
            of digital marketing, creative communication and technology to those
            requirements.
          </p>

          <div className="case-tags">
            <span>Digital Marketing</span>
            <span>Branding</span>
            <span>Performance Advertising</span>
            <span>Website Development</span>
            <span>CRM & Automation</span>
          </div>
        </div>
      </section>

      <section className="case-page">
        <div className="container">
          <div className="case-section-head">
            <span className="eyebrow">Featured Case Studies</span>
            <h2>Work shaped around real business requirements</h2>
            <p>
              Our case studies highlight how Digitalness approaches business
              challenges, develops practical strategies and implements digital
              solutions across hospitality, furniture and interiors, beauty and
              personal care, real estate, professional services and technology.
            </p>
          </div>

          <div className="case-grid">
            {caseStudies.map((study) => (
              <article className="case-card" key={study.client}>
                <div className="case-card-media">
                  <img
                    src={study.image}
                    alt={`Illustrative visual for ${study.client} case study`}
                    loading="lazy"
                  />

                  <span className="case-card-badge">
                    {study.category}
                  </span>

                  <span className="case-card-number">
                    {study.number}
                  </span>
                </div>

                <div className="case-card-copy">
                  <h3>{study.client}</h3>
                  <h4>{study.title}</h4>

                  {study.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="case-illustrative">
            Images are illustrative examples and are not presented as verified
            photographs of the named client projects.
          </div>
        </div>

        <section className="case-approach">
          <div className="container">
            <div className="case-section-head">
              <span className="eyebrow">Our approach</span>
              <h2>How Digitalness approaches every project</h2>
              <p>
                Rather than focusing only on campaigns, we consider the complete
                customer journey—from discovering a business to evaluating its
                offerings, making an enquiry and engaging with its team.
              </p>
            </div>

            <div className="case-steps">
              {approachSteps.map(([number, title, description]) => (
                <article className="case-step" key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="container case-longform">
          <div className="case-longform-grid">
            <article className="case-info-card">
              <h2>Additional Industries We Support</h2>

              <p>
                Digitalness&apos;s broader client work also includes legal
                services, education and training, farmland development,
                healthcare, retail and other business categories. Each requires
                a different balance of content, advertising, local visibility,
                customer communication and regulatory awareness.
              </p>

              <p>
                For legal and healthcare communication, accuracy and applicable
                professional advertising restrictions are especially important.
                For real estate, approval details and property information must
                be verified. For education, admissions communication should
                accurately represent available programmes and avoid unsupported
                guarantees.
              </p>
            </article>

            <article className="case-info-card">
              <h2>Why Our Work Matters</h2>

              <p>
                A website alone does not create a complete customer acquisition
                system. A successful advertisement does not automatically
                produce a sale. Social media activity does not replace effective
                customer service, and a CRM system cannot compensate for poor
                follow-up practices without suitable workflows and team
                adoption.
              </p>

              <p>
                Digitalness approaches these different elements as parts of a
                connected business ecosystem. Our services are intended to help
                businesses create stronger digital foundations, improve their
                communication and make more informed decisions about their
                online activities.
              </p>

              <p>
                Our approach is built around practical strategy, consistent
                execution, professional communication and measurable
                improvement—not unrealistic promises.
              </p>
            </article>
          </div>

          <div className="case-cta">
            <h2>Start Your Next Digital Project</h2>

            <p>
              Whether your business requires targeted advertising, brand
              development, professional content, website development or connected
              CRM solutions, Digitalness can help evaluate the requirements and
              develop an appropriate proposal.
            </p>

            <div className="case-contact">
              <span>digitalness.co.in</span>
              <span>WhatsApp: +91 9989329642</span>
              <span>Support: +91 404 5369584</span>
              <span>info@digitalness.co.in</span>
            </div>
          </div>

          <div className="case-disclaimer">
            For publication, client project names, approved visuals, actual
            campaigns, testimonials and performance figures should be verified
            and authorised. The narratives above describe known project
            activities and strategic approaches, not independently verified
            sales or revenue outcomes.
          </div>
        </div>
      </section>
    </>
  );
}
