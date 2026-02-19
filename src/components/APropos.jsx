import React from 'react';
import './APropos.css';

const APropos = () => {
  return (
    <section className="a-propos" id="a-propos">
      <div className="container">
        <div className="a-propos-content">
          <div className="a-propos-text">
            <span className="section-subtitle">Notre histoire</span>
            <h2 className="section-title">Attitude Voyages,<br />votre partenaire voyage</h2>
            
            <div className="text-content">
              <p className="lead">
                Nos convictions ne sont pas que des mots ; elles sont le fondement de chacune des 
                aventures que nous proposons.
              </p>
              
              <p>
              Grâce à un engagement fort depuis 17 ans maintenant, 
              la durabilité, l'authenticité et la satisfaction du client sont nos maîtres mots. Nous veillons à ce que chaque voyage que vous faites soit à la hauteur de vos rêves.
              </p>
            </div>

            <div className="stats">
              <div className="stat-item">
                <div className="stat-value">17</div>
                <div className="stat-label">Années d'engagement</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">2500+</div>
                <div className="stat-label">Voyageurs accompagnés</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">85+</div>
                <div className="stat-label">Destinations</div>
              </div>
            </div>
          </div>

          <div className="a-propos-images">
            <div className="image-grid image-grid--single">
              <div className="image-wrapper main-image">
                <img 
                  src="https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=2841&auto=format&fit=crop" 
                  alt="Voyage inoubliable - côtes et horizons"
                />
              </div>
            </div>
            <div className="floating-badge">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M20 5L22.8 14.4H32.6L24.9 20.2L27.7 29.6L20 23.8L12.3 29.6L15.1 20.2L7.4 14.4H17.2L20 5Z" fill="currentColor"/>
              </svg>
              <span>Agence de confiance</span>
            </div>
          </div>
        </div>

        <div className="valeurs">
          <h3 className="valeurs-title">Nos engagements</h3>
          <div className="valeurs-grid">
            <div className="valeur-card">
              <div className="valeur-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 4L20 12L28 14L22 20L24 28L16 24L8 28L10 20L4 14L12 12L16 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4>Création de séjours mémorables</h4>
              <p>Nous imaginons chaque voyage comme une expérience unique, conçue pour laisser des souvenirs impérissables.</p>
            </div>

            <div className="valeur-card">
              <div className="valeur-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M4 16L12 8L20 16L28 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 24L12 16L20 24L28 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4>Des aventures qui vous ressemblent</h4>
              <p>Nos itinéraires sont personnalisés selon vos envies et vos rêves, pour que chaque aventure reflète votre personnalité.</p>
            </div>

            <div className="valeur-card">
              <div className="valeur-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 10V16L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h4>Écoute et disponibilité</h4>
              <p>Notre équipe est toujours à votre écoute pour comprendre vos attentes et vous accompagner à chaque étape de votre projet.</p>
            </div>

            <div className="valeur-card">
              <div className="valeur-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 4C16 4 7 8 7 16C7 20.4183 10.5817 24 15 24H17C21.4183 24 25 20.4183 25 16C25 8 16 4 16 4Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 16C17.1046 16 18 15.1046 18 14C18 12.8954 17.1046 12 16 12C14.8954 12 14 12.8954 14 14C14 15.1046 14.8954 16 16 16Z" fill="currentColor"/>
                </svg>
              </div>
              <h4>Respect et authenticité</h4>
              <p>Nous privilégions des rencontres authentiques et un tourisme responsable, dans le respect des cultures et de l'environnement.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default APropos;
