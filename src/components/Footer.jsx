import { Link } from 'react-router-dom';

import {
  Globe,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp
} from 'react-icons/fa';

import { company } from '../data/company';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link
            to="/"
            className="brand brand-footer"
            aria-label="Digitalness home"
          >
            <span className="brand-word">
              Digitalness<span>.</span>
            </span>
          </Link>

          <p>
            Digitalness connects marketing, creative communication,
            web and application development, CRM and automation
            around practical business objectives. We help businesses
            build digital systems that can be measured, improved and
            scaled over time.
          </p>

          <div className="social-row">
            <a
              href="https://www.facebook.com/share/p/1VM94FUC2U/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Digitalness on Facebook"
              title="Facebook"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.instagram.com/digitalness.co.in?psln=ZGJnYWd6Zm93NDN1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Digitalness on Instagram"
              title="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="https://youtube.com/@digitalness-india?si=WhPX0KP9io9i0N9J"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Digitalness on YouTube"
              title="YouTube"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        <div>
          <h4>Services</h4>

          <Link to="/services/digital-marketing">
            Digital Marketing
          </Link>

          <Link to="/services/web-development">
            Web Development
          </Link>

          <Link to="/services/branding">
            Branding
          </Link>

          <Link to="/service/seo">
            SEO
          </Link>

          <Link to="/services/other-services">
            CRM & Automation
          </Link>
        </div>

        <div>
          <h4>Resources</h4>

          <Link to="/blogs">
            Blogs & Insights
          </Link>

          <Link to="/portfolio">
            Portfolio
          </Link>

          <Link to="/case-studies">
            Case Studies
          </Link>

          <a href="https://digitalness.co.in/testimonials">
            Testimonials
          </a>

          <Link to="/tools">
            Free Tools
          </Link>

          <Link to="/faqs">
            FAQs
          </Link>
        </div>

        <div>
          <h4>Company</h4>

          <Link to="/about">
            About Digitalness
          </Link>

          <Link to="/careers">
            Careers
          </Link>

          <Link to="/certifications">
            Experience Certification
          </Link>

          <Link to="/contact">
            Contact
          </Link>

          <Link to="/privacy-policy">
            Privacy Policy
          </Link>

          <Link to="/terms-conditions">
            Terms & Conditions
          </Link>
        </div>

        <div>
          <h4>Contact</h4>

          <div className="footer-contact-list">
            <a
              href={company.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-contact-item"
            >
              <span className="footer-contact-icon">
                <Globe />
              </span>

              <span className="footer-contact-text">
                {company.website}
              </span>
            </a>

            <a
              href={company.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-contact-item"
            >
              <span className="footer-contact-icon whatsapp-icon">
                <FaWhatsapp />
              </span>

              <span className="footer-contact-text">
                {company.whatsappDisplay}
              </span>
            </a>

            <a
              href={`tel:${company.supportTel}`}
              className="footer-contact-item"
            >
              <span className="footer-contact-icon">
                <Phone />
              </span>

              <span className="footer-contact-text">
                {company.supportDisplay}
              </span>
            </a>

            <a
              href={`mailto:${company.email}`}
              className="footer-contact-item"
            >
              <span className="footer-contact-icon">
                <Mail />
              </span>

              <span className="footer-contact-text">
                {company.email}
              </span>
            </a>

            <div className="footer-contact-item footer-address">
              <span className="footer-contact-icon">
                <MapPin />
              </span>

              <span className="footer-contact-text">
                {company.address}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </span>

        <span>
          Practical Growth • Connected Systems • Continuous Improvement
        </span>
      </div>
    </footer>
  );
}
