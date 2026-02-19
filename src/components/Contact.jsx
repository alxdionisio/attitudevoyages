import React, { useState } from 'react';
import { FORMSPREE_ENDPOINT } from '../config/contact';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!FORMSPREE_ENDPOINT) {
      setSubmitStatus('error');
      setSubmitError('Formulaire de contact non configuré.');
      return;
    }
    setSubmitStatus('loading');
    setSubmitError('');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: formData.nom,
          email: formData.email,
          _subject: formData.sujet,
          message: formData.message,
        }),
      });
      if (res.ok) {
        setSubmitStatus('success');
        setFormData({ nom: '', email: '', sujet: '', message: '' });
      } else {
        const data = await res.json().catch(() => ({}));
        setSubmitStatus('error');
        setSubmitError(data.error || "L'envoi a échoué. Réessayez plus tard.");
      }
    } catch (err) {
      setSubmitStatus('error');
      setSubmitError('Erreur réseau. Vérifiez votre connexion et réessayez.');
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-header">
          <span className="section-subtitle">Contactez-nous</span>
          <h2 className="section-title">Une question ?<br />Parlons-en !</h2>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              {submitStatus === 'success' ? (
                <div className="contact-form-success">
                  <div className="contact-form-success-icon" aria-hidden="true">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h3>Message envoyé</h3>
                  <p className="contact-form-success-text">
                    Merci pour votre message ! Nous vous répondrons à l'adresse indiquée.
                  </p>
                </div>
              ) : (
                <>
                  <h3>Nous écrire</h3>
                  <p>Posez-nous toutes vos questions, nous vous répondrons rapidement.</p>
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                      <input
                        type="text"
                        name="nom"
                        placeholder="Votre nom *"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        placeholder="Votre email *"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="sujet"
                        placeholder="Sujet *"
                        value={formData.sujet}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        name="message"
                        placeholder="Votre message *"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="btn-send" disabled={submitStatus === 'loading'}>
                      {submitStatus === 'loading' ? 'Envoi en cours…' : 'Envoyer'}
                      {submitStatus !== 'loading' && (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M18 2L9 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M18 2L12 18L9 11L2 8L18 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                    {submitStatus === 'error' && submitError && (
                      <p className="contact-form-message contact-form-message--error">{submitError}</p>
                    )}
                  </form>
                </>
              )}
            </div>

            
          </div>

          <div className="contact-map">
            <div className="map-placeholder">
              <iframe
                src="https://www.google.com/maps?q=1+Rue+des+Rolliers,+30820+Caveirac,+France&z=15&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '20px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Carte Attitude Voyages - 1 Rue des Rolliers, 30820 Caveirac"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
