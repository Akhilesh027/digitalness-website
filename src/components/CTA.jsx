import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import { company } from '../data/company';

export default function CTA({
  title = 'Build the digital system around your business goal',
  text = 'Whether the next step is visibility, enquiries, a stronger website, better lead management or smarter automation, Digitalness can help connect the right marketing, creative and technology capabilities around the objective.'
}) {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="cta-panel">
          <div>
            <span className="eyebrow">Start a conversation</span>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>

          <div className="cta-actions">
            <Link className="btn btn-light" to="/contact">
              Discuss your requirement
            </Link>

            <a
              className="btn btn-ghost-light"
              href={company.whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
