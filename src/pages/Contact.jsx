import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { company } from '../data/company';

export default function Contact() {
  const [state, setState] = useState({
    loading: false,
    message: ''
  });

  async function submit(event) {
    event.preventDefault();

    const form = Object.fromEntries(
      new FormData(event.currentTarget)
    );

    setState({
      loading: true,
      message: ''
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error();
      }

      event.currentTarget.reset();

      setState({
        loading: false,
        message:
          'Thanks. Your enquiry has been recorded and can be reviewed by the Digitalness team.'
      });
    } catch {
      setState({
        loading: false,
        message:
          `The online form is currently unavailable. You can contact us on WhatsApp ${company.whatsappDisplay}, support ${company.supportDisplay}, or ${company.email}.`
      });
    }
  }

  return (
    <>
      <Seo
        title="Contact Digitalness"
        path="/contact"
        description="Contact Digitalness Industries LLP in Hyderabad for digital marketing, web development, branding, SEO, CRM, automation and technology requirements."
      />

      <section className="page-hero">
        <div className="container narrow">
          <span className="eyebrow">Contact Digitalness</span>
          <h1>Tell us the business problem you want to improve</h1>
          <p>
            Share the objective, current setup, service requirement and what a
            useful result should look like. We use that context to frame a more
            practical conversation rather than recommending channels or
            technology before understanding the requirement.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <form className="form-card" onSubmit={submit}>
            <div className="form-grid">
              <label>
                Name
                <input required name="name" autoComplete="name" />
              </label>

              <label>
                Email
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                />
              </label>

              <label>
                Phone
                <input
                  required
                  name="phone"
                  autoComplete="tel"
                />
              </label>

              <label>
                Company
                <input name="company" autoComplete="organization" />
              </label>

              <label>
                Service required
                <select name="service">
                  <option>Digital Marketing</option>
                  <option>Web Development</option>
                  <option>Branding & Creative</option>
                  <option>SEO & Local Visibility</option>
                  <option>CRM & Automation</option>
                  <option>Mobile / Web Application</option>
                  <option>Business Solutions</option>
                  <option>Not sure yet</option>
                </select>
              </label>

              <label>
                Budget
                <select name="budget">
                  <option>Not decided</option>
                  <option>Under ₹25,000</option>
                  <option>₹25,000–₹50,000</option>
                  <option>₹50,000–₹1,00,000</option>
                  <option>₹1,00,000+</option>
                </select>
              </label>
            </div>

            <label>
              Business requirement
              <textarea
                name="message"
                rows="7"
                required
                placeholder="Tell us what you are trying to improve, your current setup, location/market, timeline and any existing website, campaign or CRM."
              />
            </label>

            <label
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start',
                margin: '16px 0'
              }}
            >
              <input
                required
                type="checkbox"
                name="contactConsent"
                value="yes"
                style={{
                  width: 'auto',
                  marginTop: '4px'
                }}
              />

              <span
                style={{
                  fontSize: '.82rem',
                  lineHeight: 1.6
                }}
              >
                I agree that Digitalness may use the information submitted here
                to respond to this enquiry and manage related business
                communication. See the{' '}
                <Link to="/privacy-policy">Privacy Policy</Link>.
              </span>
            </label>

            <button
              className="btn btn-primary"
              disabled={state.loading}
            >
              {state.loading
                ? 'Sending…'
                : 'Send enquiry'}
            </button>

            {state.message && (
              <p className="form-note">
                {state.message}
              </p>
            )}
          </form>

          <aside className="contact-card">
            <span className="eyebrow">Direct contact</span>
            <h2>{company.name}</h2>

            <p>
              For project enquiries, service discussions and general business
              communication, use the channels below. Promotional communication
              preferences and consent should be respected separately from a
              service enquiry.
            </p>

            <a
              href={company.websiteUrl}
              target="_blank"
              rel="noreferrer"
            >
              Website: {company.website}
            </a>

            <a
              href={company.whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp: {company.whatsappDisplay}
            </a>

            <a href={`tel:${company.supportTel}`}>
              Support: {company.supportDisplay}
            </a>

            <a href={`mailto:${company.email}`}>
              Email: {company.email}
            </a>

            <p>{company.address}</p>

            <a
              className="btn btn-secondary"
              href={company.whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open WhatsApp
            </a>

            <a
              className="text-link"
              target="_blank"
              rel="noreferrer"
              href="https://www.google.com/maps/search/?api=1&query=11%2F1%20Main%20Rd%20Prashanthinagar%20Uppal%20Hyderabad%20500039"
            >
              View location on Google Maps →
            </a>
          </aside>
        </div>
      </section>
    </>
  );
}
