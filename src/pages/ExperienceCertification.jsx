import { useState } from 'react';
import { Award, Search, ShieldCheck } from 'lucide-react';
import Seo from '../components/Seo';

const teamFeatures = [
  'Employee ID Verification',
  'Internship Certificate Access',
  'CRM Integration Ready',
  'Secure Certificate Records'
];

export default function ExperienceCertification() {
  const [employeeId, setEmployeeId] = useState('');
  const [message, setMessage] = useState('');

  function verifyCertificate(event) {
    event.preventDefault();

    const value = employeeId.trim();

    if (!value) {
      setMessage('Please enter your Employee ID or Intern ID.');
      return;
    }

    setMessage(
      'Certificate lookup is ready for CRM/database integration. No certificate record is being claimed until the verification database is connected.'
    );
  }

  return (
    <>
      <Seo
        title="Experience Certification"
        description="Employees and interns can access Digitalness experience certificate verification using their employee or intern ID."
        path="/certifications"
      />

      <style>{`
        .cert-hero {
          padding: 72px 0 52px;
          text-align: center;
          background:
            radial-gradient(circle at 72% 35%, rgba(109,93,252,.12), transparent 34%),
            linear-gradient(180deg, #fbfbff 0%, #f2f0ff 100%);
          border-bottom: 1px solid #ece9f8;
        }
        .cert-hero h1 {
          margin: 0;
          font-size: clamp(2.4rem, 5vw, 4.5rem);
          line-height: 1;
          letter-spacing: -.05em;
          color: #130150;
        }
        .cert-hero p {
          max-width: 690px;
          margin: 18px auto 0;
          color: #64677a;
          line-height: 1.7;
        }
        .cert-section { padding: 64px 0 84px; background: #f5f4ff; }
        .cert-grid {
          display: grid;
          grid-template-columns: minmax(0, .95fr) minmax(0, 1.05fr);
          gap: 24px;
          max-width: 980px;
          margin: 0 auto;
        }
        .cert-card, .cert-side {
          border-radius: 24px;
          padding: clamp(24px, 4vw, 38px);
        }
        .cert-card {
          background: #fff;
          border: 1px solid #e5e2f0;
          box-shadow: 0 18px 50px rgba(19,1,80,.06);
        }
        .cert-side { background: #130150; color: #fff; }
        .cert-icon {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          background: #130150;
          color: #fff;
          margin-bottom: 18px;
        }
        .cert-form { display: grid; gap: 14px; }
        .cert-form input {
          width: 100%;
          margin-top: 8px;
          padding: 14px 15px;
          border-radius: 12px;
          border: 1px solid #d8d4e8;
        }
        .cert-form button {
          width: fit-content;
          min-height: 44px;
          border: 0;
          border-radius: 12px;
          padding: 0 18px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #130150;
          color: #fff;
          font-weight: 800;
          cursor: pointer;
        }
        .cert-message {
          padding: 12px 14px;
          border-radius: 12px;
          background: #f2f0ff;
          color: #4a4370;
          font-size: .82rem;
        }
        .cert-side h2 { color: #fff; }
        .cert-side p { color: rgba(255,255,255,.76); line-height: 1.7; }
        .cert-feature-list { display: grid; gap: 11px; margin-top: 20px; }
        .cert-feature {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 13px;
          border-radius: 12px;
          background: rgba(255,255,255,.10);
        }
        @media (max-width: 760px) {
          .cert-grid { grid-template-columns: 1fr; }
          .cert-form button { width: 100%; justify-content: center; }
        }
      `}</style>

      <section className="cert-hero">
        <div className="container narrow">
          <span className="eyebrow">Digitalness Team</span>
          <h1>Experience Certification</h1>
          <p>
            Employees and interns can verify their Digitalness experience
            certificate using their employee or intern ID.
          </p>
        </div>
      </section>

      <section className="cert-section">
        <div className="container">
          <div className="cert-grid">
            <div className="cert-card">
              <div className="cert-icon">
                <Award size={21} />
              </div>

              <h2>Verify Certificate</h2>

              <p>
                Enter your employee ID or intern ID to access your Digitalness
                experience certificate. This interface is prepared for
                connection to the approved CRM or certificate database.
              </p>

              <form className="cert-form" onSubmit={verifyCertificate}>
                <label>
                  Employee / Intern ID
                  <input
                    value={employeeId}
                    onChange={(event) => {
                      setEmployeeId(event.target.value);
                      setMessage('');
                    }}
                    placeholder="Enter Employee / Intern ID"
                    autoComplete="off"
                  />
                </label>

                <button type="submit">
                  <Search size={16} />
                  Verify Certificate
                </button>

                {message && (
                  <p className="cert-message" role="status">
                    {message}
                  </p>
                )}
              </form>
            </div>

            <aside className="cert-side">
              <h2>For Digitalness Team Members</h2>

              <p>
                The verification area is intended for employees, interns and
                trainees whose records have been approved by Digitalness. Once
                connected to the certificate database, only authorized records
                should be returned.
              </p>

              <div className="cert-feature-list">
                {teamFeatures.map((feature) => (
                  <div className="cert-feature" key={feature}>
                    <ShieldCheck size={17} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
