import React from "react";
import { motion } from "framer-motion";
import { aggregateRating } from "../data/temoignages";
import "./AvisGoogle.css";

const StarRating = ({ note }) => {
  const full = Math.floor(note);
  const hasHalf = note - full >= 0.25 && note - full < 0.75;
  return (
    <span
      className="avis-google-stars"
      aria-label={`Note ${note.toFixed(1)} sur 5`}
      role="img"
    >
      {Array.from({ length: 5 }).map((_, i) => {
        let fill = "none";
        if (i < full) fill = "currentColor";
        else if (i === full && hasHalf) fill = "url(#avis-half)";
        return (
          <svg
            key={i}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={fill}
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            {i === 0 && (
              <defs>
                <linearGradient id="avis-half">
                  <stop offset="50%" stopColor="currentColor" />
                  <stop offset="50%" stopColor="transparent" />
                </linearGradient>
              </defs>
            )}
            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        );
      })}
    </span>
  );
};

const GoogleLogo = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 48 48"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
    />
    <path
      fill="#FF3D00"
      d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l.001-.001 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
    />
  </svg>
);

const AvisGoogle = ({ variant = "default", className = "" }) => {
  const { noteMoyenne, nombreAvis, sourceLabel, sourceUrl } = aggregateRating;
  return (
    <motion.aside
      className={`avis-google avis-google--${variant} ${className}`.trim()}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      aria-label={`Avis ${sourceLabel}`}
    >
      <div className="avis-google-source">
        <GoogleLogo />
        <span>Avis vérifiés {sourceLabel}</span>
      </div>
      <div className="avis-google-score">
        <strong>{noteMoyenne.toFixed(1).replace(".", ",")}</strong>
        <span className="avis-google-slash">/5</span>
        <StarRating note={noteMoyenne} />
      </div>
      <p className="avis-google-count">
        Note moyenne sur{" "}
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="avis-google-link"
        >
          {nombreAvis}&nbsp;avis clients {sourceLabel}
          <span className="visually-hidden"> (nouvelle fenêtre)</span>
        </a>
      </p>
    </motion.aside>
  );
};

export default AvisGoogle;
