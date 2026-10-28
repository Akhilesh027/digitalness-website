import { useParams, Link } from 'react-router-dom';

import {
  ArrowRight,
  Megaphone,
  Braces,
  Palette,
  Search,
  Layers3,
  BarChart3,
  Target,
  Gauge,
  Globe2,
  LineChart,
  UsersRound,
  Sparkles,
  MessageSquareText
} from 'lucide-react';

import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import CTA from '../components/CTA';
import NotFound from './NotFound';

import { services } from '../data/services';


/* ============================================================
   SERVICE CATEGORY PAGE DATA

   Every homepage service card has:
   - unique hero content
   - unique description
   - unique focus topics
   - unique service list
============================================================ */

const categoryPages = {


  /* ==========================================================
     01. DIGITAL MARKETING
  ========================================================== */

  'digital-marketing': {

    title: 'Digital Marketing',

    eyebrow: 'Demand & Growth',

    description:
      'Build a connected marketing system that reaches the right audience, creates demand, captures intent and moves prospects toward meaningful business actions.',

    sectionEyebrow: 'Digital marketing capabilities',

    sectionTitle:
      'Turn attention into structured customer acquisition',

    sectionDescription:
      'Digital marketing works best when audience, offer, media, creative, landing experience and measurement operate as one connected system.',

    icon: Megaphone,

    topics: [

      {
        icon: Target,

        title: 'Paid Advertising',

        text:
          'Google Ads, Meta Ads and performance campaigns structured around intent, audience quality and measurable conversion actions.'
      },

      {
        icon: UsersRound,

        title: 'Social Media',

        text:
          'Content planning, creative production and social communication designed to improve consistency, reach and audience engagement.'
      },

      {
        icon: LineChart,

        title: 'Lead Generation',

        text:
          'Campaigns, landing experiences and qualification workflows designed to generate useful enquiries rather than vanity traffic.'
      }

    ],

    serviceSlugs: [

      'google-ads',

      'meta-ads',

      'social-media-marketing',

      'content-marketing',

      'performance-marketing',

      'lead-generation',

      'marketing-strategy',

      'whatsapp-marketing'

    ]

  },


  /* ==========================================================
     02. WEB DESIGN & DEVELOPMENT
  ========================================================== */

  'web-development': {

    title: 'Web Design & Development',

    eyebrow: 'Experience & Technology',

    description:
      'Design and build responsive digital experiences that combine clear communication, usability, performance and technology around real business requirements.',

    sectionEyebrow: 'Web capabilities',

    sectionTitle:
      'Digital experiences designed around business goals',

    sectionDescription:
      'From business websites to custom applications, we connect interface design, development, performance and conversion thinking into one experience.',

    icon: Braces,

    topics: [

      {
        icon: Globe2,

        title: 'Business Websites',

        text:
          'Professional websites that explain services clearly, strengthen credibility and make customer action easier across devices.'
      },

      {
        icon: Braces,

        title: 'Web Applications',

        text:
          'Custom applications, React interfaces and digital workflows designed around specific operating requirements.'
      },

      {
        icon: Gauge,

        title: 'UX & Performance',

        text:
          'UI/UX design, landing pages, speed improvements and technical optimization that reduce friction across the customer journey.'
      }

    ],

    serviceSlugs: [

      'website-development',

      'business-websites',

      'ecommerce-development',

      'web-applications',

      'react-development',

      'custom-web-development',

      'ui-ux-design',

      'landing-pages',

      'website-maintenance',

      'website-performance-optimization',

      'design-systems'

    ]

  },


  /* ==========================================================
     03. BRANDING & CREATIVE
  ========================================================== */

  'branding': {

    title: 'Branding & Creative',

    eyebrow: 'Identity & Communication',

    description:
      'Build a recognizable brand system that connects positioning, identity, visual communication and creative execution across customer touchpoints.',

    sectionEyebrow: 'Brand capabilities',

    sectionTitle:
      'Create a brand people can understand and recognise',

    sectionDescription:
      'Strong branding connects what the business stands for with how it looks, communicates and presents itself across digital and physical experiences.',

    icon: Palette,

    topics: [

      {
        icon: Sparkles,

        title: 'Brand Identity',

        text:
          'Logo systems, colours, typography and visual rules that create a clear and recognizable identity.'
      },

      {
        icon: Target,

        title: 'Brand Positioning',

        text:
          'Audience, competitor and market insight used to define where the brand should stand and what it should communicate.'
      },

      {
        icon: Palette,

        title: 'Creative Design',

        text:
          'Campaign creatives, social design, illustrations and marketing assets that communicate consistently across channels.'
      }

    ],

    serviceSlugs: [

      'logo-design',

      'brand-identity',

      'brand-guidelines',

      'brand-strategy',

      'market-research',

      'competitor-research',

      'brand-positioning',

      'branding-funnel',

      'graphic-design',

      'custom-illustrations',

      'social-media-creative-design',

      'print-design'

    ]

  },


  /* ==========================================================
     04. SEO & LOCAL VISIBILITY
  ========================================================== */

  'seo-local-visibility': {

    title: 'SEO & Local Visibility',

    eyebrow: 'Search & Discovery',

    description:
      'Improve how customers discover your business across Google Search, local results and useful content with stronger technical, on-page and local visibility foundations.',

    sectionEyebrow: 'Search visibility',

    sectionTitle:
      'Be easier to discover when customers are actively searching',

    sectionDescription:
      'Search visibility depends on technical quality, useful content, local signals, business information and ongoing optimization working together.',

    icon: Search,

    topics: [

      {
        icon: Search,

        title: 'Search Engine Optimization',

        text:
          'Technical SEO, on-page optimization, keyword architecture and content improvements designed around relevant search intent.'
      },

      {
        icon: Globe2,

        title: 'Local SEO',

        text:
          'Local relevance, location signals and business information structured to improve discovery for nearby customers.'
      },

      {
        icon: MessageSquareText,

        title: 'Google Business Profile',

        text:
          'Profile optimization, posts, business information and review workflows that strengthen local search visibility.'
      }

    ],

    serviceSlugs: [

      'seo',

      'google-business-profile',

      'content-marketing',

      'online-reputation-management'

    ]

  },


  /* ==========================================================
     05. BUSINESS SOLUTIONS
  ========================================================== */

  'business-solutions': {

    title: 'Business Solutions',

    eyebrow: 'Operations & Systems',

    description:
      'Connect customer communication, lead management and internal workflows with practical systems that make business operations easier to manage.',

    sectionEyebrow: 'Business technology',

    sectionTitle:
      'Better systems behind better customer experiences',

    sectionDescription:
      'CRM, IVR, integrations and workflow automation can reduce manual work, improve follow-up and create clearer ownership across customer journeys.',

    icon: Layers3,

    topics: [

      {
        icon: UsersRound,

        title: 'CRM Solutions',

        text:
          'Organize enquiries, pipeline stages, ownership and follow-up activity so leads are easier to manage from first contact to conversion.'
      },

      {
        icon: Layers3,

        title: 'Integrations & Automation',

        text:
          'Connect digital tools and automate repetitive workflows so business information moves more reliably between systems.'
      },

      {
        icon: MessageSquareText,

        title: 'Communication Systems',

        text:
          'IVR and WhatsApp workflows that help businesses route, manage and respond to customer communication more effectively.'
      }

    ],

    serviceSlugs: [

      'business-solutions',

      'crm-solutions',

      'ivr-solutions',

      'integration-services',

      'whatsapp-marketing',

      'consulting'

    ]

  },


  /* ==========================================================
     06. ANALYTICS & OPTIMIZATION
  ========================================================== */

  'analytics-optimization': {

    title: 'Analytics & Optimization',

    eyebrow: 'Measurement & Improvement',

    description:
      'Turn campaign, website and funnel activity into useful performance information that helps teams understand what is working and what should improve next.',

    sectionEyebrow: 'Measurement capabilities',

    sectionTitle:
      'Measure what matters and improve what affects growth',

    sectionDescription:
      'Tracking becomes valuable when it helps your team identify opportunities, understand customer behaviour and make clearer marketing decisions.',

    icon: BarChart3,

    topics: [

      {
        icon: BarChart3,

        title: 'Marketing Analytics',

        text:
          'Dashboards, attribution, KPI design and reporting that make marketing and customer acquisition performance easier to understand.'
      },

      {
        icon: LineChart,

        title: 'Campaign Optimization',

        text:
          'Use audience, creative, conversion and acquisition signals to continuously improve campaign performance.'
      },

      {
        icon: Gauge,

        title: 'Website Performance',

        text:
          'Identify speed, experience and conversion friction that can weaken website effectiveness and paid campaign outcomes.'
      }

    ],

    serviceSlugs: [

      'marketing-analytics',

      'performance-marketing',

      'website-performance-optimization',

      'lead-generation',

      'marketing-strategy'

    ]

  },


  /* ==========================================================
     OTHER SERVICES
     This stays available for navbar / other links
  ========================================================== */

  'other-services': {

    title: 'Other Services',

    eyebrow: 'Additional Business Support',

    description:
      'Explore practical communication, production, technology and consulting services that support the wider Digitalness growth system.',

    sectionEyebrow: 'Additional capabilities',

    sectionTitle:
      'Specialized services around practical business requirements',

    sectionDescription:
      'These services complement marketing, websites and branding by supporting communication, content production and business operations.',

    icon: Layers3,

    topics: [

      {
        icon: Layers3,

        title: 'Business Systems',

        text:
          'CRM, IVR and integrations that help organize customer communication and internal workflows.'
      },

      {
        icon: Sparkles,

        title: 'Visual Production',

        text:
          'Photography, videography and drone content for websites, advertising, campaigns and brand communication.'
      },

      {
        icon: Target,

        title: 'Business Support',

        text:
          'Traditional marketing and consulting support structured around specific commercial requirements.'
      }

    ],

    serviceSlugs: [

      'ivr-solutions',

      'crm-solutions',

      'integration-services',

      'photography',

      'videography',

      'drone-shoots',

      'traditional-marketing',

      'business-solutions',

      'consulting'

    ]

  }

};


/* ============================================================
   SERVICE CATEGORY COMPONENT
============================================================ */

export default function ServiceCategory() {

  const { category } = useParams();


  /* ----------------------------------------------------------
     GET CURRENT CATEGORY

     IMPORTANT:
     No Digital Marketing fallback anymore.
  ---------------------------------------------------------- */

  const page =
    categoryPages[category];


  if (!page) {

    return <NotFound />;

  }


  /* ----------------------------------------------------------
     GET SERVICES RELEVANT TO CURRENT CATEGORY
  ---------------------------------------------------------- */

  const categoryServices =
    page.serviceSlugs
      .map(
        (slug) =>
          services.find(
            (service) =>
              service.slug === slug
          )
      )
      .filter(Boolean);


  const PageIcon =
    page.icon;


  return (
    <>

      {/* =====================================================
          SEO
      ===================================================== */}

      <Seo
        title={page.title}
        description={page.description}
        path={`/services/${category}`}
      />


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="page-hero">

        <div className="container narrow">

          <Reveal>

            <span className="eyebrow">

              {page.eyebrow}

            </span>


            <div
              style={{

                width: 54,

                height: 54,

                display: 'grid',

                placeItems: 'center',

                marginBottom: 24,

                borderRadius: 16,

                color: '#130150',

                background:
                  'rgba(19, 1, 80, 0.07)'

              }}
            >

              <PageIcon size={24} />

            </div>


            <h1>

              {page.title}

            </h1>


            <p>

              {page.description}

            </p>

          </Reveal>

        </div>

      </section>


      {/* =====================================================
          UNIQUE CATEGORY TOPICS
      ===================================================== */}

      <section className="section section-soft">

        <div className="container">

          <Reveal>

            <span className="eyebrow">

              {page.sectionEyebrow}

            </span>


            <h2>

              {page.sectionTitle}

            </h2>


            <p
              className="muted"
              style={{

                maxWidth: 760,

                marginTop: 14

              }}
            >

              {page.sectionDescription}

            </p>

          </Reveal>


          <div
            className="card-grid three"
            style={{
              marginTop: 38
            }}
          >

            {page.topics.map(
              (
                topic,
                index
              ) => {

                const TopicIcon =
                  topic.icon;


                return (

                  <Reveal
                    key={topic.title}
                    className="mini-card"
                    delay={
                      index * 0.05
                    }
                  >

                    <div
                      style={{

                        width: 46,

                        height: 46,

                        display: 'grid',

                        placeItems: 'center',

                        marginBottom: 28,

                        borderRadius: 13,

                        color: '#130150',

                        background:
                          'rgba(19, 1, 80, 0.07)'

                      }}
                    >

                      <TopicIcon
                        size={20}
                      />

                    </div>


                    <h3>

                      {topic.title}

                    </h3>


                    <p>

                      {topic.text}

                    </p>

                  </Reveal>

                );

              }
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          SERVICES FOR CURRENT CATEGORY
      ===================================================== */}

      <section className="section">

        <div className="container">

          <Reveal>

            <span className="eyebrow">

              Our services

            </span>


            <h2>

              Explore {page.title}

            </h2>


            <p
              className="muted"
              style={{

                maxWidth: 720,

                marginTop: 12

              }}
            >

              Choose the service that matches
              your current business requirement.

            </p>

          </Reveal>


          <div
            className="card-grid three"
            style={{
              marginTop: 38
            }}
          >

            {categoryServices.map(
              (
                service,
                index
              ) => (

                <Reveal
                  key={
                    service.slug
                  }
                  delay={
                    index * 0.035
                  }
                >

                  <Link
                    className="service-card tall"
                    to={
                      `/service/${service.slug}`
                    }
                  >

                    <span
                      className="service-index"
                    >

                      {String(
                        index + 1
                      ).padStart(
                        2,
                        '0'
                      )}

                    </span>


                    <h3>

                      {service.name}

                    </h3>


                    <p>

                      {service.focus
                        .charAt(0)
                        .toUpperCase() +

                        service.focus
                          .slice(1)}

                      .

                    </p>


                    <span>

                      View service

                      <ArrowRight
                        size={15}
                      />

                    </span>

                  </Link>

                </Reveal>

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
          `Need help with ${page.title}?`
        }

        text={
          `Tell us what you want to improve. Digitalness can help identify the right ${page.title.toLowerCase()} services and build a practical plan around your business.`
        }

      />

    </>
  );

}