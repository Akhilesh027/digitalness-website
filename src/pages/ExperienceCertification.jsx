import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Award, Search, ShieldCheck, CheckCircle2, AlertTriangle, Download, ExternalLink, Loader2 } from 'lucide-react';
import Seo from '../components/Seo';

const teamFeatures = [
  'Employee & Intern ID Verification',
  'Authentic Digital Credentials',
  'Tamper-Proof CRM Records',
  'Instant Online Validation'
];

export default function ExperienceCertification() {
  const [searchParams] = useSearchParams();
  const [employeeId, setEmployeeId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const backendUrl = (
    import.meta.env.VITE_CRM_API_URL ||
    import.meta.env.VITE_API_URL ||
    'https://server.digitalness.co.in'
  ).replace(/\/+$/, '');

  const runVerification = async (idToVerify) => {
    const value = (idToVerify || '').trim();
    if (!value) {
      setErrorMsg('Please enter a Certificate ID or Intern/Employee ID.');
      setResult(null);
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setResult(null);

    try {
      const endpoint = `${backendUrl}/api/certificates/verify/${encodeURIComponent(value)}`;
      const response = await fetch(endpoint, {
        headers: { 'Accept': 'application/json' }
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setResult(data);
      } else {
        setErrorMsg(data.message || `No certificate record found for "${value}".`);
      }
    } catch (err) {
      setErrorMsg('Unable to connect to certificate verification service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const queryId = searchParams.get('id') || searchParams.get('certId');
    if (queryId) {
      setEmployeeId(queryId);
      runVerification(queryId);
    }
  }, [searchParams]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    runVerification(employeeId);
  };

  const getFullFileUrl = (fileUrl) => {
    if (!fileUrl) return '';
    if (fileUrl.startsWith('http://') || fileUrl.startsWith('https://')) return fileUrl;
    return `${backendUrl}${fileUrl.startsWith('/') ? '' : '/'}${fileUrl}`;
  };

  return (
    <>
      <Seo
        title="Experience Certification Verification"
        description="Verify Digitalness internship, training and experience certificate credentials using certificate or employee ID."
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
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          gap: 28px;
          max-width: 1020px;
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
          font-family: inherit;
          font-size: 0.95rem;
          box-sizing: border-box;
        }
        .cert-form button {
          width: fit-content;
          min-height: 46px;
          border: 0;
          border-radius: 12px;
          padding: 0 22px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #130150;
          color: #fff;
          font-weight: 800;
          cursor: pointer;
          transition: background .2s;
        }
        .cert-form button:hover:not(:disabled) {
          background: #25068a;
        }
        .cert-message {
          padding: 12px 14px;
          border-radius: 12px;
          background: #fff1f0;
          color: #cf1322;
          border: 1px solid #ffa39e;
          font-size: .88rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cert-result-box {
          margin-top: 24px;
          border-radius: 18px;
          border: 2px solid #b7eb8f;
          background: #f6ffed;
          padding: 22px;
        }
        .cert-result-box.revoked {
          border-color: #ffa39e;
          background: #fff1f0;
        }
        .cert-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.78rem;
          font-weight: 700;
          background: #d9f7be;
          color: #237804;
          margin-bottom: 12px;
        }
        .cert-badge.revoked {
          background: #ffd666;
          color: #874d00;
        }
        .cert-meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 14px;
          font-size: 0.85rem;
          padding-top: 12px;
          border-top: 1px dashed rgba(0,0,0,0.12);
        }
        .cert-meta-label { color: #64677a; font-size: 0.76rem; text-transform: uppercase; letter-spacing: 0.05em; }
        .cert-meta-val { font-weight: 700; color: #130150; }
        .cert-dl-btn {
          margin-top: 18px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #130150;
          color: #fff;
          text-decoration: none;
          padding: 10px 18px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.85rem;
        }
        .cert-dl-btn:hover {
          background: #2b0c96;
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
          .cert-meta-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="cert-hero">
        <div className="container narrow">
          <span className="eyebrow">Credential Verification</span>
          <h1>Experience & Internship Certification</h1>
          <p>
            Verify authentic certificates issued by Digitalness for interns, team members, and associates.
          </p>
        </div>
      </section>

      <section className="cert-section">
        <div className="container">
          <div className="cert-grid">
            <div className="cert-card">
              <div className="cert-icon">
                <Award size={22} />
              </div>

              <h2>Online Certificate Verification</h2>

              <p>
                Enter your Certificate ID or Intern/Employee ID (e.g. <code>DN-INT-2025-104</code>) to view credential authenticity.
              </p>

              <form className="cert-form" onSubmit={handleFormSubmit}>
                <label>
                  Certificate / Intern ID
                  <input
                    value={employeeId}
                    onChange={(event) => {
                      setEmployeeId(event.target.value);
                      setErrorMsg('');
                    }}
                    placeholder="e.g. DN-INT-2025-104"
                    autoComplete="off"
                  />
                </label>

                <button type="submit" disabled={loading}>
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                  {loading ? 'Verifying...' : 'Verify Certificate'}
                </button>

                {errorMsg && (
                  <div className="cert-message" role="alert">
                    <AlertTriangle size={18} />
                    <span>{errorMsg}</span>
                  </div>
                )}
              </form>

              {result && result.data && (
                <div className={`cert-result-box ${result.isRevoked ? 'revoked' : ''}`}>
                  <div className={`cert-badge ${result.isRevoked ? 'revoked' : ''}`}>
                    {result.isRevoked ? <AlertTriangle size={14} /> : <CheckCircle2 size={14} />}
                    {result.isRevoked ? 'STATUS: REVOKED' : 'OFFICIALLY VERIFIED & AUTHENTIC'}
                  </div>

                  <h3 style={{ margin: '0 0 4px', color: '#130150', fontSize: '1.25rem' }}>
                    {result.data.recipientName}
                  </h3>
                  <div style={{ color: '#4a4370', fontSize: '0.9rem', fontWeight: 600 }}>
                    {result.data.domain} &bull; {result.data.certificateType}
                  </div>

                  <div className="cert-meta-grid">
                    <div>
                      <div className="cert-meta-label">Certificate ID</div>
                      <div className="cert-meta-val" style={{ fontFamily: 'monospace' }}>
                        {result.data.certificateId}
                      </div>
                    </div>
                    <div>
                      <div className="cert-meta-label">Issue Date</div>
                      <div className="cert-meta-val">
                        {result.data.issueDate ? new Date(result.data.issueDate).toLocaleDateString() : '-'}
                      </div>
                    </div>
                    <div>
                      <div className="cert-meta-label">Credential Status</div>
                      <div className="cert-meta-val" style={{ color: result.isRevoked ? '#cf1322' : '#389e0d' }}>
                        {result.data.status}
                      </div>
                    </div>
                    {result.data.validUntil && (
                      <div>
                        <div className="cert-meta-label">Valid Until</div>
                        <div className="cert-meta-val">
                          {new Date(result.data.validUntil).toLocaleDateString()}
                        </div>
                      </div>
                    )}
                  </div>

                  {result.data.fileUrl && !result.isRevoked && (
                    <a
                      href={getFullFileUrl(result.data.fileUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-dl-btn"
                    >
                      <Download size={15} />
                      Download / View Original Certificate
                      <ExternalLink size={13} style={{ opacity: 0.7 }} />
                    </a>
                  )}
                </div>
              )}
            </div>

            <aside className="cert-side">
              <h2>Official Credential Records</h2>

              <p>
                Every certificate issued by Digitalness carries an encrypted or traceable ID indexed in our real-time database. Prospective employers and partners can authenticate all training, internship, and project tenure credentials directly through this portal.
              </p>

              <div className="cert-feature-list">
                {teamFeatures.map((feature) => (
                  <div className="cert-feature" key={feature}>
                    <ShieldCheck size={18} />
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
