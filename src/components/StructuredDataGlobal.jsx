import React, { useEffect, useRef } from "react";
import { getBaseUrl } from "../config/site";

/**
 * Données structurées globales (Organization + WebSite), injectées une fois.
 */
const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Attitude Voyages",
  url: null,
  telephone: "+33 4 66 37 48 63",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1 Rue des Rolliers",
    addressLocality: "Caveirac",
    postalCode: "30820",
    addressCountry: "FR",
  },
};

const WEBSITE = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Attitude Voyages",
  url: null,
  description: "Agence de voyage à Caveirac. Voyages sur mesure, circuits et séjours d'exception.",
  publisher: { "@id": null },
};

const StructuredDataGlobal = () => {
  const ref = useRef([]);

  useEffect(() => {
    const baseUrl = getBaseUrl();
    if (!baseUrl) return;

    const org = { ...ORGANIZATION, url: baseUrl };
    const web = {
      ...WEBSITE,
      url: baseUrl,
      publisher: { "@id": `${baseUrl}/#organization` },
    };
    org["@id"] = `${baseUrl}/#organization`;

    ref.current.forEach((s) => s.remove());
    ref.current = [];

    [org, web].forEach((data) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
      ref.current.push(script);
    });

    return () => {
      ref.current.forEach((s) => s.remove());
      ref.current = [];
    };
  }, []);

  return null;
};

export default StructuredDataGlobal;
