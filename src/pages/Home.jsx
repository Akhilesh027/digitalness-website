import {



  ArrowRight,



  ArrowUpRight,



  BarChart3,



  Braces,



  CheckCircle2,



  Compass,



  Eye,



  Gauge,



  Globe2,



  Layers3,



  LineChart,



  Megaphone,



  MessageSquareText,



  Palette,



  Search,



  ShieldCheck,



  Sparkles,



  Target,



  UsersRound,



  Zap



} from 'lucide-react';



import { motion } from 'framer-motion';



import { Link } from 'react-router-dom';



import Seo from '../components/Seo';



import Reveal from '../components/Reveal';



import SectionTitle from '../components/SectionTitle';



import CTA from '../components/CTA';



import { industries, processSteps, portfolio, blogs } from '../data/site';





const services = [

  {
    title: 'Digital Marketing',

    text:
      'Paid media, social media, lead generation, content distribution and performance strategy designed around customer intent and business goals.',

    icon: Megaphone,

    to: '/services/digital-marketing',

    tag: 'Demand & growth'
  },


  {
    title: 'Web Design & Development',

    text:
      'Fast, responsive and conversion-focused websites, landing pages, e-commerce experiences and custom React applications built to support growth.',

    icon: Braces,

    to: '/services/web-development',

    tag: 'Experience & technology'
  },


  {
    title: 'Branding & Creative',

    text:
      'Brand identity, positioning, visual systems, campaign creative and social content that make your business easier to recognise and trust.',

    icon: Palette,

    to: '/services/branding',

    tag: 'Identity & communication'
  },


  {
    title: 'SEO & Local Visibility',

    text:
      'Technical SEO, on-page structure, content strategy, local SEO and Google Business Profile support to improve how customers discover your business.',

    icon: Search,

    to: '/services/seo-local-visibility',

    tag: 'Search & discovery'
  },


  {
    title: 'Business Solutions',

    text:
      'CRM, IVR, integrations and practical digital workflows that help teams organise leads, communication, reporting and customer follow-up.',

    icon: Layers3,

    to: '/services/business-solutions',

    tag: 'Operations & systems'
  },


  {
    title: 'Analytics & Optimization',

    text:
      'Tracking, funnel analysis, reporting and continuous optimisation that turn digital activity into clearer decisions and better next actions.',

    icon: BarChart3,

    to: '/services/analytics-optimization',

    tag: 'Measurement & improvement'
  }

];







/*



  CLIENT LOGO PATHS



  Add the actual files inside: public/logos/clients/



*/



const clientLogos = [



  { name: 'Srinivasa Furnitures', logo: '/logos/clients/1.png' },



  { name: 'Sri Utsavam Banquets', logo: '/logos/clients/2.png' },


  { name: 'SV Grand', logo: '/logos/clients/3.png' },



  { name: 'Shree Shyam Surgicals', logo: '/logos/clients/4.png' },



  { name: 'Daksha Caterers', logo: '/logos/clients/5.png' },



  { name: "Sarigama's V Banquets", logo: '/logos/clients/6.png' },



  { name: 'Omeetso', logo: '/logos/clients/7.png' },



  { name: 'Remedy Law Firm', logo: '/logos/clients/8.png' },



  { name: 'Hariharan Metal Wardrobes', logo: '/logos/clients/9.png' },



  { name: 'TONI&GUY', logo: '/logos/clients/10.png' },
  { name: 'Srinivasa Furnitures', logo: '/logos/clients/11.png' },
  { name: 'Sri Utsavam Banquets', logo: '/logos/clients/12.png' },
  { name: 'SV Grand', logo: '/logos/clients/13.png' },
  { name: 'Shree Shyam Surgicals', logo: '/logos/clients/14.png' },
  { name: 'Daksha Caterers', logo: '/logos/clients/15.png' },
  { name: "Sarigama's V Banquets", logo: '/logos/clients/16.png' },
  { name: 'Omeetso', logo: '/logos/clients/17.png' },
  { name: 'Remedy Law Firm', logo: '/logos/clients/18.png' },
  { name: 'Hariharan Metal Wardrobes', logo: '/logos/clients/19.png' },
  { name: 'TONI&GUY', logo: '/logos/clients/20.png' }, 
  { name: 'Srinivasa Furnitures', logo: '/logos/clients/21.png' },
  { name: 'Sri Utsavam Banquets', logo: '/logos/clients/22.png' },
  { name: 'SV Grand', logo: '/logos/clients/23.png' },
  { name: 'Shree Shyam Surgicals', logo: '/logos/clients/24.png' },
  { name: 'Daksha Caterers', logo: '/logos/clients/25.png' },
  { name: "Sarigama's V Banquets", logo: '/logos/clients/26.png' },
  { name: 'Omeetso', logo: '/logos/clients/27.png' },
  { name: 'Remedy Law Firm', logo: '/logos/clients/28.png' },   
    { name: 'Hariharan Metal Wardrobes', logo: '/logos/clients/29.png' },
    { name: 'TONI&GUY', logo: '/logos/clients/30.png' },
    { name: 'Srinivasa Furnitures', logo: '/logos/clients/31.png' },
    { name: 'Sri Utsavam Banquets', logo: '/logos/clients/32.png' },
    { name: 'SV Grand', logo: '/logos/clients/33.png' },
    { name: 'Shree Shyam Surgicals', logo: '/logos/clients/34.png' },



];







/*



  PLATFORM LOGO PATHS



  Add the actual files inside: public/logos/platforms/



*/



const platformLogos = [



  { name: 'Google', logo: '/logos/platforms/google.png' },



  { name: 'Meta', logo: '/logos/platforms/meta.png' },



  { name: 'Microsoft', logo: '/logos/platforms/microsoft.png' },



  { name: 'LinkedIn', logo: '/logos/platforms/linkedin.png' },



  { name: 'Amazon', logo: '/logos/platforms/amazon.png' },



  { name: 'Flipkart', logo: '/logos/platforms/flipkart.png' }



];



/*

  PARTNER LOGO PATHS



  Add your real partner/company logos inside:

  public/logos/partners/



  If your filenames differ, change only this array.

*/

const partnerLogos = [

  { name: 'Partner 01', logo: '/logos/partners/1.png' },

  { name: 'Partner 02', logo: '/logos/partners/2.png' },

  { name: 'Partner 03', logo: '/logos/partners/3.png' },

  { name: 'Partner 04', logo: '/logos/partners/4.png' },

  { name: 'Partner 05', logo: '/logos/partners/5.png' },

  { name: 'Partner 06', logo: '/logos/partners/6.png' },

  { name: 'Partner 07', logo: '/logos/partners/7.png' },

  { name: 'Partner 08', logo: '/logos/partners/8.png' }

];









const connectedSystem = [



  {



    icon: Target,



    step: '01',



    title: 'Find the growth problem',



    text: 'We begin with the audience, offer, customer journey and commercial objective—not with a channel checklist.'



  },



  {



    icon: Sparkles,



    step: '02',



    title: 'Build the right message',



    text: 'Brand, content and creative are shaped around what your market needs to understand, trust and act on.'



  },



  {



    icon: Globe2,



    step: '03',



    title: 'Create the digital experience',



    text: 'Websites, landing pages, local presence and campaign journeys work together instead of operating separately.'



  },



  {



    icon: LineChart,



    step: '04',



    title: 'Measure and improve',



    text: 'Tracking, reporting and ongoing optimisation help the system become clearer and more effective over time.'



  }



];







const whyFeatures = [



  {



    number: '01',



    icon: Compass,



    title: 'Strategy before execution',



    text: 'We define the business objective, audience, offer and customer journey before deciding what should be advertised, designed or developed.'



  },



  {



    number: '02',



    icon: UsersRound,



    title: 'Dedicated specialists, connected as one team',



    text: 'Marketing, creative, web, SEO and technology work from one direction so your customer experience feels consistent across channels.'



  },



  {



    number: '03',



    icon: Eye,



    title: 'Transparent project visibility',



    text: 'Clear communication, structured deliverables and reporting keep the work understandable instead of hiding progress behind activity.'



  },



  {



    number: '04',



    icon: Search,



    title: 'Search and discoverability built in',



    text: 'SEO thinking, local visibility and content structure are considered alongside design and campaigns—not added after everything is finished.'



  },



  {



    number: '05',



    icon: ShieldCheck,



    title: 'Long-term growth partnership',



    text: 'We build systems that can keep improving as your business, market, audience and priorities change over time.'



  },



  {



    number: '06',



    icon: Gauge,



    title: 'Measurable business progress',



    text: 'The goal is not more digital activity. The goal is clearer customer journeys, stronger execution and useful signals that guide the next decision.'



  }



];







const capabilityTicker = [



  'Digital Strategy',



  'Meta Ads',



  'Google Ads',



  'SEO',



  'Web Development',



  'Branding',



  'Content',



  'Google Business Profile',



  'Analytics',



  'CRM',



  'Lead Generation',



  'Creative Production'



];







function FlowLogo({ item, className = '' }) {



  return (



    <div className={`home-logo-item ${className}`} aria-label={item.name}>



      <img



        src={item.logo}



        alt={`${item.name} logo`}



        loading="lazy"



        onError={(event) => {



          event.currentTarget.style.display = 'none';



          const fallback = event.currentTarget.nextElementSibling;



          if (fallback) fallback.style.display = 'inline-flex';



        }}



      />



      <span className="home-logo-fallback">{item.name}</span>



    </div>



  );



}







function LogoFlow({ items, reverse = false, speed = 'normal', ariaLabel }) {



  const repeated = [...items, ...items];







  return (



    <div className="home-logo-marquee" aria-label={ariaLabel}>



      <div



        className={`home-logo-track ${reverse ? 'home-logo-track--reverse' : ''} ${



          speed === 'slow' ? 'home-logo-track--slow' : ''



        }`}



      >



        {repeated.map((item, index) => (



          <FlowLogo key={`${item.name}-${index}`} item={item} />



        ))}



      </div>



    </div>



  );



}







function PlatformFlowBoard() {



  const platformRoles = [

    'Search & intent',

    'Social discovery',

    'Business productivity',

    'Professional audiences',

    'Commerce discovery',

    'Commerce conversion'

  ];



  return (

    <div

      className="home-platform-flow-board"

      aria-label="Digitalness platform execution system"

    >



      <div className="home-platform-flow-top">



        <span>Platform layer</span>



        <strong>

          One connected strategy, adapted to the role of each channel.

        </strong>



      </div>



      <div className="home-platform-flow-marquee">
  <div className="home-platform-flow-track">

    {[...platformLogos, ...platformLogos].map((item, index) => {
      const roleIndex = index % platformRoles.length;

      return (
        <div
          className="home-platform-flow-logo"
          key={`${item.name}-${index}`}
        >
          <FlowLogo
            item={item}
            className="home-platform-flow-logo-inner"
          />

          <small>
            {platformRoles[roleIndex]}
          </small>
        </div>
      );
    })}

  </div>
</div>



      <div className="home-platform-integration">



        <div className="home-platform-integration-line" />



        <motion.div

          className="home-platform-integration-core"

          initial={{ scaleX: 0.75, opacity: 0 }}

          whileInView={{ scaleX: 1, opacity: 1 }}

          viewport={{ once: true, amount: 0.5 }}

          transition={{

            duration: 0.75,

            ease: [0.2, 0.75, 0.25, 1]

          }}

        >



          <span>Digitalness integration layer</span>



          <div>

            <b>Strategy</b>

            <i />

            <b>Creative</b>

            <i />

            <b>Landing Experience</b>

            <i />

            <b>Measurement</b>

          </div>



        </motion.div>



      </div>



    </div>

  );

}


const homeIntroVideoStyles = `
/* ============================================================
   HOME INTRO VIDEO — RESPONSIVE + NAVBAR SAFE
   This component-level block overrides older global video rules.
============================================================ */

/* Keep the navbar in normal document flow so the video never sits under it. */
.site-header {
  position: sticky !important;
  top: 0 !important;
  z-index: 9999 !important;
}

/* Video section starts after the navbar. */
.home-intro-video-section {
  position: relative !important;
  z-index: 1 !important;
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
  background: #05011f !important;
}

/* Preserve the original landscape video shape. */
.home-intro-video-frame {
  position: relative !important;
  width: 100% !important;
  height: auto !important;
  min-height: 0 !important;
  max-height: none !important;
  aspect-ratio: 16 / 9 !important;
  margin: 0 auto !important;
  padding: 0 !important;
  overflow: hidden !important;
  border-radius: 0 !important;
  background: #05011f !important;
}

/* Show the COMPLETE video instead of zooming/cropping it. */
.home-intro-video {
  position: absolute !important;
  inset: 0 !important;
  display: block !important;
  width: 100% !important;
  height: 100% !important;
  max-width: none !important;
  max-height: none !important;
  object-fit: contain !important;
  object-position: center center !important;
  transform: none !important;
  opacity: 1 !important;
  background: #05011f !important;
}

/* Keep the video clear. */
.home-intro-video-overlay {
  position: absolute !important;
  inset: 0 !important;
  z-index: 2 !important;
  pointer-events: none !important;
  background: linear-gradient(
    180deg,
    rgba(5, 1, 31, 0.01) 0%,
    rgba(5, 1, 31, 0.025) 68%,
    rgba(5, 1, 31, 0.10) 100%
  ) !important;
}

/* The grid should remain subtle and must not cover the video. */
.home-intro-video-grid {
  position: absolute !important;
  inset: 0 !important;
  z-index: 3 !important;
  opacity: 0.06 !important;
  pointer-events: none !important;
}

/* Empty content layer must never block the video. */
.home-intro-video-content {
  position: absolute !important;
  inset: 0 !important;
  z-index: 3 !important;
  pointer-events: none !important;
}

/* Bottom label. */
.home-video-scroll {
  position: absolute !important;
  left: clamp(22px, 6vw, 110px) !important;
  bottom: clamp(18px, 4vw, 48px) !important;
  z-index: 4 !important;
  display: flex !important;
  align-items: center !important;
  gap: 16px !important;
  color: #ffffff !important;
}

.home-video-scroll span {
  color: #ffffff !important;
  font-size: clamp(10px, 0.9vw, 14px) !important;
  font-weight: 800 !important;
  line-height: 1.2 !important;
  letter-spacing: 0.08em !important;
  text-transform: uppercase !important;
}

.home-video-scroll-line {
  position: relative !important;
  width: clamp(52px, 7vw, 110px) !important;
  height: 1px !important;
  overflow: hidden !important;
  background: rgba(255, 255, 255, 0.35) !important;
}

.home-video-scroll-line i {
  position: absolute !important;
  inset: 0 auto 0 0 !important;
  display: block !important;
  width: 38% !important;
  height: 1px !important;
  background: #ffffff !important;
}

/* Large desktop */
@media (min-width: 1500px) {
  .home-intro-video-frame {
    aspect-ratio: 16 / 9 !important;
  }
}

/* Laptop / tablet */
@media (max-width: 1100px) {
  .home-intro-video-section {
    margin-top: 0 !important;
  }

  .home-intro-video-frame {
    aspect-ratio: 16 / 9 !important;
  }

  .home-intro-video {
    object-fit: contain !important;
    object-position: center center !important;
  }

  .home-video-scroll {
    left: 24px !important;
    bottom: 20px !important;
  }
}

/* Mobile */
@media (max-width: 650px) {
  .home-intro-video-section {
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .home-intro-video-frame {
    width: 100% !important;
    height: auto !important;
    min-height: 0 !important;
    aspect-ratio: 16 / 9 !important;
  }

  .home-intro-video {
    width: 100% !important;
    height: 100% !important;
    object-fit: contain !important;
    object-position: center center !important;
  }

  .home-intro-video-overlay {
    background: linear-gradient(
      180deg,
      rgba(5, 1, 31, 0.00),
      rgba(5, 1, 31, 0.055)
    ) !important;
  }

  .home-intro-video-grid {
    opacity: 0.03 !important;
  }

  .home-video-scroll {
    left: 14px !important;
    bottom: 10px !important;
    gap: 9px !important;
  }

  .home-video-scroll span {
    font-size: 8px !important;
    letter-spacing: 0.06em !important;
  }

  .home-video-scroll-line {
    width: 40px !important;
  }
}

/* Very small phones */
@media (max-width: 400px) {
  .home-video-scroll {
    left: 10px !important;
    bottom: 8px !important;
  }

  .home-video-scroll span {
    font-size: 7.5px !important;
  }
}

/* Reduced motion users still see the video frame cleanly. */
@media (prefers-reduced-motion: reduce) {
  .home-intro-video {
    animation: none !important;
  }
}

/* ============================================================
   FINAL MOBILE VIDEO + NAVBAR LOCK
   Keep this LAST inside homeIntroVideoStyles.
============================================================ */

@media (max-width: 650px) {

  body .site-header {
    position: sticky !important;
    top: 0 !important;
    z-index: 9999 !important;
    margin: 0 !important;
    padding: 4px 7px 5px !important;
    background: #ffffff !important;
  }

  body .site-header .nav-shell.container {
    width: calc(100% - 14px) !important;
    min-height: 54px !important;
    height: 54px !important;
    margin: 0 auto !important;
    padding: 0 8px !important;
    gap: 7px !important;
    border-radius: 16px !important;
    background: rgba(238, 239, 245, 0.96) !important;
    box-shadow: 0 7px 22px rgba(19, 1, 80, 0.10) !important;
    backdrop-filter: blur(14px) !important;
    -webkit-backdrop-filter: blur(14px) !important;
  }

  body .site-header .brand-logo {
    width: 125px !important;
    max-width: 40vw !important;
    height: auto !important;
    max-height: 36px !important;
    object-fit: contain !important;
  }

  body .site-header .brand-word {
    display: none !important;
  }

  body .site-header .menu-btn {
    width: 36px !important;
    min-width: 36px !important;
    height: 36px !important;
    padding: 0 !important;
    border-radius: 50% !important;
  }

  body .site-header .menu-btn svg {
    width: 20px !important;
    height: 20px !important;
  }

  body .site-header .nav-cta {
    width: 38px !important;
    min-width: 38px !important;
    height: 38px !important;
    padding: 0 !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    border-radius: 50% !important;
    font-size: 0 !important;
  }

  body .site-header .nav-cta-icon {
    width: 32px !important;
    min-width: 32px !important;
    height: 32px !important;
    flex: 0 0 32px !important;
    margin: 0 !important;
  }

  body .site-header .nav-cta-icon svg {
    width: 18px !important;
    height: 18px !important;
  }

  body .home-intro-video-section {
    position: relative !important;
    z-index: 1 !important;
    display: block !important;
    width: 100% !important;

    /* Force full 16:9 height on mobile */
    height: clamp(200px, 56.25vw, 360px) !important;
    min-height: clamp(200px, 56.25vw, 360px) !important;
    max-height: none !important;

    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
    background: #05011f !important;
  }

  body .home-intro-video-section .home-intro-video-frame {
    position: relative !important;
    display: block !important;
    width: 100% !important;
    height: 100% !important;
    min-height: 100% !important;
    max-height: none !important;
    aspect-ratio: auto !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
    border-radius: 0 !important;
    background: #05011f !important;
  }

  body .home-intro-video-section .home-intro-video-frame .home-intro-video {
    position: absolute !important;
    inset: 0 !important;
    display: block !important;
    width: 100% !important;
    height: 100% !important;
    min-width: 100% !important;
    min-height: 100% !important;
    max-width: none !important;
    max-height: none !important;
    margin: 0 !important;
    padding: 0 !important;
    object-fit: contain !important;
    object-position: center center !important;
    transform: none !important;
    opacity: 1 !important;
    visibility: visible !important;
    background: #05011f !important;
  }

  body .home-intro-video-section .home-intro-video-overlay {
    background: linear-gradient(
      180deg,
      rgba(5, 1, 31, 0.00) 0%,
      rgba(5, 1, 31, 0.01) 72%,
      rgba(5, 1, 31, 0.08) 100%
    ) !important;
  }

  body .home-intro-video-section .home-intro-video-grid {
    opacity: 0.025 !important;
  }

  body .home-intro-video-section .home-video-scroll {
    left: 14px !important;
    bottom: 12px !important;
    gap: 9px !important;
  }

  body .home-intro-video-section .home-video-scroll span {
    font-size: 8px !important;
    line-height: 1.2 !important;
    letter-spacing: 0.06em !important;
  }

  body .home-intro-video-section .home-video-scroll-line {
    width: 40px !important;
  }

  body .home-hero,
  body .home-hero-v3 {
    position: relative !important;
    margin-top: 0 !important;
    z-index: 1 !important;
  }
}

@media (max-width: 400px) {

  body .site-header {
    padding: 3px 6px 4px !important;
  }

  body .site-header .nav-shell.container {
    width: calc(100% - 12px) !important;
    min-height: 50px !important;
    height: 50px !important;
    padding: 0 7px !important;
    border-radius: 14px !important;
  }

  body .site-header .brand-logo {
    width: 112px !important;
    max-height: 32px !important;
  }

  body .site-header .menu-btn {
    width: 34px !important;
    min-width: 34px !important;
    height: 34px !important;
  }

  body .site-header .nav-cta {
    width: 36px !important;
    min-width: 36px !important;
    height: 36px !important;
  }

  body .site-header .nav-cta-icon {
    width: 30px !important;
    min-width: 30px !important;
    height: 30px !important;
    flex-basis: 30px !important;
  }

  body .home-intro-video-section {
    height: clamp(190px, 56.25vw, 225px) !important;
    min-height: clamp(190px, 56.25vw, 225px) !important;
  }

  body .home-intro-video-section .home-video-scroll {
    left: 10px !important;
    bottom: 9px !important;
  }

  body .home-intro-video-section .home-video-scroll span {
    font-size: 7.5px !important;
  }
}

`;


export default function Home() {



  return (



    <>



      <Seo description="Digitalness is a Hyderabad digital growth agency combining digital marketing, web development, branding, SEO, analytics and business solutions into one connected growth system." />

      <style>{homeIntroVideoStyles}</style>







            {/* =========================================================

          DIGITALNESS INTRO VIDEO

      \========================================================= */}



      <section
        className="home-intro-video-section"
        aria-label="Digitalness introduction video"
      >
        <div className="home-intro-video-frame">
          <video
            className="home-intro-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Digitalness brand introduction"
          >
            <source
              src="/videos/digitalness-intro.mp4"
              type="video/mp4"
            />

            Your browser does not support the video tag.
          </video>

          <div
            className="home-intro-video-overlay"
            aria-hidden="true"
          />

          <div
            className="home-intro-video-grid"
            aria-hidden="true"
          />

          <div
            className="home-intro-video-content"
            aria-hidden="true"
          />

          <div
            className="home-video-scroll"
            aria-hidden="true"
          >
            <span>Discover Digitalness</span>

            <div className="home-video-scroll-line">
              <i />
            </div>
          </div>
        </div>
      </section>


      {/* HERO */}



      <section className="home-hero home-hero-v3">



        <div className="home-hero-glow home-hero-glow--one" />



        <div className="home-hero-glow home-hero-glow--two" />



        <div className="home-hero-gridline" />







        <div className="container home-hero-layout">



          <Reveal className="home-hero-copy">



            <div className="home-hero-pill">



              <span className="home-hero-pill-dot" />



              Digital strategy · creative · technology · growth



            </div>







            <h1>



              Build a stronger digital presence. Turn it into <em>measurable growth.</em>



            </h1>







            <p className="home-hero-lead">



              Digitalness brings marketing, websites, branding, SEO, content, analytics and business technology together as one connected system. Instead of managing scattered vendors and disconnected activity, your business gets a clearer strategy, consistent execution and a digital journey designed to improve over time.



            </p>







            <div className="home-hero-actions">



              <Link className="btn btn-primary home-primary-cta" to="/contact">



                Start your growth plan <ArrowRight size={17} />



              </Link>



              <Link className="btn btn-secondary" to="/services/digital-marketing">



                Explore our capabilities



              </Link>



            </div>







            <div className="home-hero-proof home-hero-proof-v3">



              <div>



                <strong>Strategy first</strong>



                <span>Business context before channel activity</span>



              </div>



              <div>



                <strong>One connected team</strong>



                <span>Marketing, creative, web and systems together</span>



              </div>



              <div>



                <strong>Built to improve</strong>



                <span>Measurement and optimisation in the workflow</span>



              </div>



            </div>



          </Reveal>







          <Reveal className="home-hero-stage" delay={0.12}>



            <div className="home-stage-orbit home-stage-orbit--outer" />



            <div className="home-stage-orbit home-stage-orbit--inner" />







            <div className="home-stage-core">



              <span>Digitalness</span>



              <strong>Growth System</strong>



              <small>Strategy → Experience → Demand → Measurement</small>



            </div>







            <div className="home-stage-node home-stage-node--one">



              <Megaphone size={19} />



              <span>Performance Marketing</span>



            </div>







            <div className="home-stage-node home-stage-node--two">



              <Braces size={19} />



              <span>Web Experiences</span>



            </div>







            <div className="home-stage-node home-stage-node--three">



              <Sparkles size={19} />



              <span>Brand & Creative</span>



            </div>







            <div className="home-stage-node home-stage-node--four">



              <BarChart3 size={19} />



              <span>Analytics</span>



            </div>







            <div className="home-stage-pulse home-stage-pulse--one" />



            <div className="home-stage-pulse home-stage-pulse--two" />



          </Reveal>



        </div>



      </section>







      {/* CAPABILITY TICKER — A DIFFERENT MOTION STYLE */}



      <section className="home-capability-ticker" aria-label="Digitalness capabilities">



        <div className="home-capability-track">



          {[...capabilityTicker, ...capabilityTicker].map((item, index) => (



            <span key={`${item}-${index}`}>



              {item}



              <i />



            </span>



          ))}



        </div>



      </section>







      {/* INTRO / POSITIONING */}



      <section className="section home-intro-section home-intro-v3">



        <div className="container home-intro-grid">



          <Reveal className="home-intro-heading">



            <span className="eyebrow">About Digitalness</span>



            <h2>A digital growth team built to connect the work that customers experience as one journey.</h2>



          </Reveal>







          <Reveal className="home-intro-copy" delay={0.08}>



            <p className="home-intro-lead">



              Your customer does not experience your ad, website, brand, search result and follow-up process as separate services. They experience one business. Digitalness is structured around that reality.



            </p>



            <p>



              We help businesses connect strategy, paid media, organic visibility, content, creative, websites, landing pages, CRM workflows and measurement so each part strengthens the next. The result is a digital presence that feels more consistent to customers and gives your team a clearer path for improving performance.



            </p>



            <p>



              Whether you need one focused service or an integrated growth system, our work starts with the business problem, customer journey and desired outcome—not with a generic package.



            </p>



            <Link className="text-link home-intro-link" to="/about">



              Discover Digitalness <ArrowUpRight size={16} />



            </Link>



          </Reveal>



        </div>



      </section>







      {/* CLIENT LOGOS — SEPARATE PLACEMENT, NO CARDS */}



      <section className="home-clients-section">



        <div className="container home-clients-head">



          <Reveal>



            <span className="eyebrow">Growing alongside businesses</span>



            <h2>Trusted across different industries, customer journeys and growth stages.</h2>



            <p>



              From local visibility and lead generation to websites, brand communication and ongoing marketing execution, we adapt the digital system around each business rather than forcing every client into the same template.



            </p>



          </Reveal>



        </div>



        <LogoFlow items={clientLogos} ariaLabel="Selected Digitalness client logos" />



      </section>



      {/* SERVICES */}



      <section className="section home-services-section home-services-v3">



        <div className="container">



          <Reveal>



            <SectionTitle



              eyebrow="What we do"



              title="The capabilities to move from visibility to experience, conversion and retention"



              text="Work with Digitalness on one focused requirement or combine services into a coordinated digital growth system built around your audience, goals and current stage."



            />



          </Reveal>







          <div className="home-services-grid">



            {services.map((service, index) => {



              const Icon = service.icon;



              return (



                <Reveal key={service.title} delay={index * 0.045}>



                  <Link className="home-service-card home-service-card-v3" to={service.to}>



                    <div className="home-service-topline">



                      <span>{service.tag}</span>



                      <ArrowUpRight size={18} />



                    </div>



                    <div className="home-service-icon"><Icon size={23} /></div>



                    <h3>{service.title}</h3>



                    <p>{service.text}</p>



                    <div className="home-service-index">0{index + 1}</div>



                  </Link>



                </Reveal>



              );



            })}



          </div>



        </div>



      </section>



      {/* PLATFORM ECOSYSTEM — UNIQUE HORIZONTAL EXECUTION BOARD */}



      <section className="section home-platform-section home-platform-section-v4">



        <div className="container">



          <div className="home-platform-v4-header">



            <Reveal>



              <span className="eyebrow">

                Platforms & ecosystems

              </span>



              <h2>

                One strategy. Different platform roles. A connected customer journey.

              </h2>



            </Reveal>



            <Reveal delay={0.08}>



              <p>

                Every platform serves a different purpose. Search captures intent,

                social creates discovery, professional networks build credibility,

                and commerce platforms support product consideration and conversion.

                Digitalness connects those roles into one coordinated system instead

                of treating every channel as a separate campaign.

              </p>



            </Reveal>



          </div>



          <Reveal delay={0.06}>



            <PlatformFlowBoard />



          </Reveal>



          <div className="home-platform-v4-outcomes">



            {[

              {

                number: '01',

                title: 'Audience direction',

                text: 'Channel decisions begin with who needs to be reached, what they are trying to solve and where intent is strongest.'

              },

              {

                number: '02',

                title: 'Creative adaptation',

                text: 'The core brand message stays consistent while format, pacing and visual treatment adapt to each platform.'

              },

              {

                number: '03',

                title: 'Experience continuity',

                text: 'Ads, content and search activity connect to landing experiences that continue the same promise and customer context.'

              },

              {

                number: '04',

                title: 'Measurement loop',

                text: 'Performance signals are brought back into strategy so the next campaign, page and creative decision becomes clearer.'

              }

            ].map((item, index) => (



              <motion.article

                className="home-platform-v4-outcome"

                key={item.number}

                initial={{ opacity: 0, y: 28 }}

                whileInView={{ opacity: 1, y: 0 }}

                viewport={{ once: true, amount: 0.3 }}

                transition={{

                  duration: 0.5,

                  delay: index * 0.06,

                  ease: [0.2, 0.75, 0.25, 1]

                }}

              >



                <span>{item.number}</span>



                <h3>{item.title}</h3>



                <p>{item.text}</p>



              </motion.article>



            ))}



          </div>



        </div>



      </section>







      {/* CONNECTED SYSTEM */}



      <section className="section home-system-section">



        <div className="container">



          <div className="home-system-head">



            <Reveal>



              <span className="eyebrow">The Digitalness approach</span>



              <h2>We build around the customer journey—not around disconnected service lists.</h2>



            </Reveal>



            <Reveal delay={0.08}>



              <p>



                A useful digital strategy connects what people see, what they understand, where they click, what they experience next, how the business follows up and how the result is measured. Our approach keeps those pieces connected from the beginning.



              </p>



            </Reveal>



          </div>







          <div className="home-system-grid">



            {connectedSystem.map((item, index) => {



              const Icon = item.icon;



              return (



                <Reveal className="home-system-step" key={item.step} delay={index * 0.05}>



                  <div className="home-system-step-head">



                    <span>{item.step}</span>



                    <Icon size={21} />



                  </div>



                  <h3>{item.title}</h3>



                  <p>{item.text}</p>



                </Reveal>



              );



            })}



          </div>



        </div>



      </section>







      {/* WHY DIGITALNESS — INSPIRED BY THE PROVIDED REFERENCE VIDEO */}



      <section className="section home-why-v3-section">



        <div className="container">



          <Reveal className="home-why-v3-heading">



            <span className="eyebrow">Why choose Digitalness</span>



            <h2>A growth partner that works with clarity, care and strategy.</h2>



            <p>



              We combine the thinking, specialists and execution needed to make digital growth easier to understand, easier to manage and more consistent across the customer journey.



            </p>



          </Reveal>







          <div className="home-why-v3-layout">



            <aside className="home-why-v3-sticky">



              <motion.div



                className="home-why-v3-profile"



                initial={{ opacity: 0, y: 35 }}



                whileInView={{ opacity: 1, y: 0 }}



                viewport={{ once: true, amount: 0.2 }}



                transition={{ duration: 0.7, ease: [0.2, 0.75, 0.25, 1] }}



              >



                <div className="home-why-v3-media">

                  {/* Full background video */}
                  <video
                    className="home-why-v3-bg-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label="Digitalness brand video"
                  >
                    <source
                      src="/videos/dlns.mp4"
                      type="video/mp4"
                    />

                    Your browser does not support the video tag.
                  </video>

                  {/* Brand overlay */}
                  <div className="home-why-v3-video-overlay" />

                  {/* Existing decorative grid */}
                  <div className="home-why-v3-media-grid" />

                  {/* Existing Digitalness logo */}
                  <img
                    src="/digitalness-logo.png"
                    alt="Digitalness"
                    className="home-why-v3-overlay-logo"
                  />

                  {/* Existing tagline */}
                  <span className="home-why-v3-overlay-tagline">
                    Strategy · Creative · Technology · Growth
                  </span>

                </div>







                <div className="home-why-v3-profile-copy">



                  <span className="home-why-v3-mini-label">A connected team for connected growth</span>



                  <h3>Real collaboration behind every digital touchpoint.</h3>



                  <p>



                    Digitalness brings strategy, advertising, design, development, SEO, content and measurement into one coordinated workflow. That means fewer hand-offs, clearer accountability and a customer experience that feels like one brand rather than several disconnected vendors.



                  </p>







                  <div className="home-why-v3-signals">



                    <div><strong>One direction</strong><span>Shared strategy across services</span></div>



                    <div><strong>Clear ownership</strong><span>Less fragmentation between teams</span></div>



                    <div><strong>Continuous learning</strong><span>Insights feed the next cycle</span></div>



                  </div>







                  <div className="home-why-v3-checks">



                    <span><CheckCircle2 size={17} /> Business goals before channel tactics</span>



                    <span><CheckCircle2 size={17} /> Creative and technology connected</span>



                    <span><CheckCircle2 size={17} /> Clear communication throughout delivery</span>



                    <span><CheckCircle2 size={17} /> Performance thinking built into execution</span>



                  </div>







                  <div className="home-why-v3-cta-strip">



                    <div>



                      <small>Need a clearer digital growth plan?</small>



                      <strong>Let’s map the next stage together.</strong>



                    </div>



                    <Link to="/contact" aria-label="Talk to Digitalness">



                      <ArrowUpRight size={20} />



                    </Link>



                  </div>



                </div>



              </motion.div>



            </aside>







            <div className="home-why-v3-list">



              {whyFeatures.map((item, index) => {



                const Icon = item.icon;



                return (



                  <motion.article



                    className="home-why-v3-card"



                    key={item.number}



                    initial={{ opacity: 0, x: 42, y: 10 }}



                    whileInView={{ opacity: 1, x: 0, y: 0 }}



                    viewport={{ once: true, amount: 0.35 }}



                    transition={{ duration: 0.55, delay: index * 0.035, ease: [0.2, 0.75, 0.25, 1] }}



                    whileHover={{ y: -5 }}



                  >



                    <div className="home-why-v3-icon"><Icon size={20} /></div>



                    <div>



                      <h3>{item.title}</h3>



                      <p>{item.text}</p>



                    </div>



                    <span className="home-why-v3-number">{item.number}</span>



                  </motion.article>



                );



              })}



            </div>



          </div>



        </div>



      </section>







      {/* INDUSTRIES */}



      <section className="section home-industries-section">



        <div className="container">



          <Reveal>



            <SectionTitle



              eyebrow="Industries"



              title="Different businesses need different digital journeys"



              text="We adapt the strategy around the category, sales cycle, location, audience behaviour and level of consideration involved in the buying decision."



            />



          </Reveal>



          <Reveal className="pill-cloud home-industry-cloud" delay={0.05}>



            {industries.map((industry) => <span key={industry}>{industry}</span>)}



          </Reveal>



        </div>



      </section>







      {/* PROCESS */}



      <section className="section section-dark home-process-section home-process-v3">



        <div className="container">



          <Reveal>



            <SectionTitle



              eyebrow="How we work"



              title="A clear operating loop from discovery to growth"



              text="Each stage builds on the previous one so execution stays connected to the original business objective and every new insight has somewhere useful to go."



            />



          </Reveal>







          <div className="home-process-grid">



            {processSteps.map(([number, title, text], index) => (



              <Reveal key={number} className="home-process-card" delay={index * 0.035}>



                <span className="home-process-number">{number}</span>



                <h3>{title}</h3>



                <p>{text}</p>



              </Reveal>



            ))}



          </div>



        </div>



      </section>







      {/* PORTFOLIO */}



      <section className="section home-work-section">



        <div className="container">



          <div className="section-row">



            <Reveal>



              <SectionTitle



                eyebrow="Selected work"



                title="Digital systems built around real business requirements"



                text="A sample of how marketing, web, brand and measurement can be organised around different growth problems."



              />



            </Reveal>



            <Link to="/portfolio" className="text-link">



              View portfolio <ArrowRight size={15} />



            </Link>



          </div>







         <div className="portfolio-grid">
  {portfolio.slice(0, 4).map((project, index) => (
    <Reveal
      key={project.title}
      className="project-card home-project-card"
      delay={index * 0.05}
    >
      <div className="project-art home-project-art">

        {project.image && (
          <img
            src={project.image}
            alt={project.alt || project.title}
            loading="lazy"
            className="project-art-image"
          />
        )}

        <div className="project-art-overlay" />

        <span>{project.industry}</span>

        <b>{project.category}</b>

      </div>

      <h3>{project.title}</h3>

      <p>{project.result}</p>

      <small>{project.tech}</small>
    </Reveal>
  ))}
</div>



        </div>



      </section>







      {/* INSIGHTS */}



      <section className="section section-soft home-insights-section">



        <div className="container">



          <div className="section-row">



            <Reveal>



              <SectionTitle



                eyebrow="Insights"



                title="Practical thinking for stronger digital decisions"



                text="Ideas across marketing, branding, advertising, websites, search visibility and growth systems."



              />



            </Reveal>



            <Link to="/blogs" className="text-link">



              All articles <ArrowRight size={15} />



            </Link>



          </div>







          <div className="card-grid two">



            {blogs.slice(0, 2).map((blog, index) => (



              <Reveal key={blog.slug} delay={index * 0.06}>



                <Link to={`/blog/${blog.slug}`} className="blog-card home-blog-card">



                  <span>{blog.category}</span>



                  <h3>{blog.title}</h3>



                  <p>{blog.excerpt}</p>



                  <b>Read article <ArrowRight size={15} /></b>



                </Link>



              </Reveal>



            ))}



          </div>



        </div>



      </section>







      <CTA



        title="Ready to build a stronger digital growth system?"



        text="Tell us where your business is today, what you want to improve and which digital challenges are slowing you down. Digitalness can help map the right combination of strategy, marketing, web, brand and technology for the next stage."



      />



    </>



  );



}
