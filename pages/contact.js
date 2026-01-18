import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    // For now, just show success - you can integrate with Formspree, EmailJS, or your own API
    // Example: https://formspree.io/ (free tier: 50 submissions/month)
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Head>
        <title>Contact Us - Indian Stock Market Heat Map</title>
        <meta name="description" content="Contact Indian Stock Market Heat Map for support, feedback, or business inquiries" />
      </Head>

      <div className="page">
        <Header />

        <main className="content">
          <h1>Contact Us</h1>
          <p className="subtitle">Have questions or feedback? We'd love to hear from you.</p>

          <div className="contact-grid">
            <div className="contact-info">
              <div className="info-card">
                <h3>General Inquiries</h3>
                <p>support@indianstockheatmap.com</p>
              </div>

              <div className="info-card">
                <h3>Business & Partnerships</h3>
                <p>business@indianstockheatmap.com</p>
              </div>

              <div className="info-card">
                <h3>Advertising</h3>
                <p>ads@indianstockheatmap.com</p>
              </div>

              <div className="social-links">
                <h3>Follow Us</h3>
                <div className="socials">
                  <a href="https://twitter.com/stockheatmapIN" target="_blank" rel="noopener noreferrer">Twitter</a>
                  <a href="https://t.me/indianstockheatmap" target="_blank" rel="noopener noreferrer">Telegram</a>
                  <a href="https://youtube.com/@indianstockheatmap" target="_blank" rel="noopener noreferrer">YouTube</a>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a topic</option>
                  <option value="feedback">Feedback</option>
                  <option value="bug">Report a Bug</option>
                  <option value="feature">Feature Request</option>
                  <option value="business">Business Inquiry</option>
                  <option value="advertising">Advertising</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <p className="success-msg">Thank you! We'll get back to you soon.</p>
              )}
            </form>
          </div>
        </main>

        <Footer />
      </div>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: #fafafa;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .header {
          display: flex;
          align-items: center;
          padding: 16px 24px;
          background: white;
          border-bottom: 1px solid #e0e0e0;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: inherit;
        }

        .logo-icon {
          font-size: 24px;
        }

        .logo-text {
          font-size: 18px;
          font-weight: 700;
          color: #333;
        }

        .content {
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 24px;
        }

        h1 {
          font-size: 32px;
          color: #333;
          margin-bottom: 8px;
        }

        .subtitle {
          color: #666;
          margin-bottom: 40px;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 48px;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .info-card {
          background: white;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
        }

        .info-card h3 {
          font-size: 14px;
          color: #666;
          margin-bottom: 8px;
        }

        .info-card p {
          font-size: 16px;
          color: #333;
          font-weight: 500;
        }

        .social-links h3 {
          font-size: 14px;
          color: #666;
          margin-bottom: 12px;
        }

        .socials {
          display: flex;
          gap: 16px;
        }

        .socials a {
          color: #1976d2;
          text-decoration: none;
          font-weight: 500;
        }

        .socials a:hover {
          text-decoration: underline;
        }

        .contact-form {
          background: white;
          padding: 32px;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
        }

        .form-group {
          margin-bottom: 20px;
        }

        label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #333;
          margin-bottom: 6px;
        }

        input, select, textarea {
          width: 100%;
          padding: 12px;
          font-size: 16px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-family: inherit;
        }

        input:focus, select:focus, textarea:focus {
          outline: none;
          border-color: #1976d2;
          box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
        }

        button {
          width: 100%;
          padding: 14px;
          background: #1976d2;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        button:hover {
          background: #1565c0;
        }

        button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .success-msg {
          color: #2e7d32;
          text-align: center;
          margin-top: 16px;
          font-weight: 500;
        }

        .footer {
          display: flex;
          justify-content: center;
          gap: 24px;
          padding: 24px;
          background: white;
          border-top: 1px solid #e0e0e0;
        }

        .footer :global(a) {
          color: #666;
          text-decoration: none;
        }

        .footer :global(a:hover) {
          color: #333;
        }

        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
      `}</style>
    </>
  );
}
