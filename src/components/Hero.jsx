import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';

/* 6 séquences : effet voyage – lieux iconiques, aurores, savane, trek. */
const HERO_VIDEOS = [
  {
    src: 'https://assets.mixkit.co/videos/4646/4646-720.mp4',
    alt: 'Canal de Venise la nuit',
  },
  {
    src: 'https://assets.mixkit.co/videos/5371/5371-720.mp4',
    alt: 'Côte et plage vue du ciel',
  },
  {
    src: 'https://assets.mixkit.co/videos/4999/4999-720.mp4',
    alt: 'Coucher de soleil sur une baie',
  },
  {
    src: 'https://assets.mixkit.co/videos/4040/4040-720.mp4',
    alt: 'Aurores boréales à l\'aube',
  },
  {
    src: 'https://assets.mixkit.co/videos/3661/3661-720.mp4',
    alt: 'Éléphant dans la savane',
  },
  {
    src: 'https://assets.mixkit.co/videos/3128/3128-720.mp4',
    alt: 'Coucher de soleil en montagne',
  },
];

const VIDEO_DISPLAY_MS = 2800; /* ~2–3 secondes par séquence */

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRefs = useRef([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_VIDEOS.length);
    }, VIDEO_DISPLAY_MS);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const current = videoRefs.current[currentSlide];
    const others = videoRefs.current.filter((_, i) => i !== currentSlide);
    if (current) {
      current.play().catch(() => {});
    }
    others.forEach((el) => {
      if (el) {
        el.pause();
        el.currentTime = 0;
      }
    });
  }, [currentSlide]);

  const scrollToOffers = () => {
    const element = document.getElementById('offres');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="accueil" aria-label="Section d'accueil">
      <div className="hero-background">
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-slider">
          {HERO_VIDEOS.map((video, index) => (
            <video
              key={video.src}
              ref={(el) => { videoRefs.current[index] = el; }}
              src={video.src}
              className={`hero-video ${index === currentSlide ? 'hero-video-active' : ''}`}
              muted
              loop
              playsInline
              preload={index === 0 ? 'auto' : 'metadata'}
              aria-hidden="true"
              tabIndex={-1}
            />
          ))}
        </div>
      </div>

      <div className="hero-content">
        <div className="container">
          <div className="hero-text">
            <span className="hero-subtitle fade-in">Votre agence de voyages à Caveirac</span>
            <h2 className="hero-title fade-in-up">
              Explorez le monde,<br />
              vivez l'inoubliable
            </h2>
            <p className="hero-description fade-in-up">
              Nous créons des voyages sur mesure
              qui transforment vos rêves d'évasion <br /> en expériences inoubliables.
            </p>
            <div className="hero-buttons fade-in-up">
              <button onClick={scrollToOffers} className="btn-primary">
                Découvrir nos offres
              </button>
              <button onClick={() => document.getElementById('rendez-vous')?.scrollIntoView({ behavior: 'smooth' })} className="btn-secondary">
                Prendre rendez-vous
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
