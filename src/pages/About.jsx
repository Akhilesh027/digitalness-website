import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import CTA from '../components/CTA';

const capabilities = [
  {
    title: 'Marketing',
    text:
      'SEO, Google Ads, Meta Ads, Google Business Profile, local visibility, social media and content planning are connected to the customer-acquisition journey rather than managed as isolated activity.'
  },
  {
    title: 'Creative',
    text:
      'Brand strategy, positioning, graphic design, campaign communication, photography, video and content help businesses communicate clearly and consistently across touchpoints.'
  },
  {
    title: 'Technology',
    text:
      'Business websites, landing pages, web applications, mobile applications, APIs and custom systems are designed around usability, performance, integration and the wider operating model.'
  },
  {
    title: 'Automation',
    text:
      'CRM, WhatsApp workflows, IVR, lead routing, notifications, integrations and practical business automation can reduce repetition and create more structured follow-up and communication.'
  }
];

const industries = [
  'Real Estate',
  'Education',
  'Hospitality & Events',
  'Furniture & Interiors',
  'Healthcare',
  'Professional Services',
  'Retail',
  'Startups',
  'Local Businesses'
];

export default function About() {
  return (
    <>
      <Seo
        title="About Digitalness"
        path="/about"
        description="Digitalness Industries LLP is a Hyderabad-based digital marketing and technology agency connecting marketing, creative, web, CRM and automation around practical business objectives."
      />

      <section className="page-hero">
        <div className="container narrow">
          <span className="eyebrow">About Digitalness</span>
          <h1>Digital growth, connected end to end</h1>
          <p>
            Digitalness Industries LLP is a Hyderabad-based digital marketing
            and technology agency built around a simple idea: businesses get
            better results when marketing, creative communication, websites,
            lead management and automation work as one connected system.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <Reveal>
            <span className="eyebrow">Practical growth</span>
            <h2>We build digital systems, not disconnected activity</h2>

            <p>
              A website, an advertisement, a social post or a CRM can each be
              useful on its own, but the larger opportunity appears when those
              parts support the same customer journey. A customer may discover
              a business through search or social media, evaluate the offer on a
              website, enquire through WhatsApp or a form, enter a structured
              sales process and continue receiving relevant communication after
              the first interaction.
            </p>

            <p>
              Digitalness works across that complete journey. We start with the
              business objective, audience, market, offer, sales process and
              operating constraints before deciding which channels, creative
              assets or technology are actually required. This keeps execution
              practical and helps avoid spending time on digital activity that
              looks busy but does not support the next business step.
            </p>

            <p>
              Our philosophy is therefore not “be online everywhere.” It is
              <strong> Practical Growth. Not Just Online Presence.</strong>
              The work should make the business clearer to customers, easier to
              discover, easier to contact, easier to follow up and easier to
              improve with real performance signals.
            </p>
          </Reveal>

          <Reveal className="info-panel">
            <span className="eyebrow">Connected customer journey</span>
            <h2>Visibility → Enquiry → Conversion → Retention</h2>

            <p>
              We look at visibility, attention, interest, enquiry, follow-up,
              conversion and retention as connected stages. Marketing creates
              demand and captures intent; creative communication explains the
              value; the website gives customers a useful place to evaluate;
              CRM and communication workflows help teams follow up; analytics
              and reporting help decide what should change next.
            </p>

            <p>
              That connected model allows Digitalness to support a business at
              different stages—from launch and local visibility to lead
              generation, website modernization, custom systems, CRM
              implementation and automation.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">One partner, multiple capabilities</span>
            <h2>Marketing, creativity, technology and automation</h2>
            <p>
              The company profile organizes Digitalness around four capability
              areas. They can be delivered separately, but the stronger model
              is to connect them around one business objective and one customer
              journey.
            </p>
          </Reveal>

          <div className="card-grid four">
            {capabilities.map((item) => (
              <Reveal className="mini-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <Reveal>
            <span className="eyebrow">How we work</span>
            <h2>Strategy before execution, improvement after launch</h2>

            <p>
              The working cycle is straightforward: understand the business,
              define priorities, create the required marketing or technology
              assets, launch carefully, measure meaningful indicators, improve
              weak points and scale what is proving useful. This applies to
              campaigns as much as it does to websites, CRM workflows and
              communication systems.
            </p>

            <p>
              Reporting is intended to support decisions, not simply list
              activity. Depending on the work, relevant signals may include
              reach, impressions, clicks, engagement, leads, search visibility,
              website traffic, enquiries, follow-up activity and conversion
              movement. The purpose is to understand what happened, what is
              working, what needs attention and what should be tested next.
            </p>

            <p>
              We also avoid unrealistic promises. Search platforms,
              advertising platforms, market conditions, customer behaviour,
              budgets, offers and client-side follow-up can all affect results.
              Our commitment is to build systems that can be measured,
              improved and scaled—not to promise outcomes that no agency can
              responsibly guarantee.
            </p>
          </Reveal>

          <Reveal className="info-panel">
            <span className="eyebrow">Who we support</span>
            <h2>Built for businesses at different growth stages</h2>

            <p>
              Digitalness can support new businesses establishing their first
              digital foundation, established local businesses improving
              visibility and enquiries, and growing organizations that need
              better websites, lead systems, CRM workflows, automation or
              integrated marketing.
            </p>

            <div className="tag-list">
              {industries.map((industry) => (
                <span key={industry}>{industry}</span>
              ))}
            </div>

            <p>
              The exact scope depends on the business model, geography,
              audience, regulatory environment, current systems, internal team
              capacity and available resources. Project-specific deliverables,
              responsibilities, commercial terms and third-party costs are
              confirmed in the relevant proposal or agreement.
            </p>
          </Reveal>
        </div>
      </section>

      <CTA />
    </>
  );
}
