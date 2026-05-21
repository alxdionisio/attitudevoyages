import React, { useEffect, useRef } from "react";
import { getBaseUrl } from "../config/site";
import { aggregateRating } from "../data/temoignages";

const StructuredDataGlobal = () => {
  const ref = useRef([]);

  useEffect(() => {
    const baseUrl = getBaseUrl();
    if (!baseUrl) return;

    const orgId = `${baseUrl}/#organization`;

    const travelAgency = {
      "@context": "https://schema.org",
      "@type": ["TravelAgency", "LocalBusiness"],
      "@id": orgId,
      name: "Attitude Voyages",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo-attitude-voyages.png`,
        width: 512,
        height: 512,
      },
      image: `${baseUrl}/logo-attitude-voyages.png`,
      telephone: "+33 4 66 37 48 63",
      email: "contact@attitude-voyages.fr",
      priceRange: "€€",
      currenciesAccepted: "EUR",
      paymentAccepted: "Cash, Credit Card, Bank Transfer",
      description:
        "Agence de voyage à Caveirac, près de Nîmes. Voyages sur mesure, circuits et séjours d'exception depuis 2009.",
      foundingDate: "2009",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1 Rue des Rolliers",
        addressLocality: "Caveirac",
        postalCode: "30820",
        addressRegion: "Occitanie",
        addressCountry: "FR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 43.826,
        longitude: 4.266,
      },
      areaServed: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 43.836,
          longitude: 4.36,
        },
        geoRadius: "40000",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:30",
          closes: "12:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "14:00",
          closes: "18:00",
        },
      ],
      sameAs: [
        "https://www.facebook.com/attitudevoyages/",
        "https://www.instagram.com/attitudevoyages/",
      ],
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Licence",
          recognizedBy: { "@type": "Organization", name: "Atout France" },
          name: "IM 030 100 020",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: aggregateRating.noteMoyenne,
        reviewCount: aggregateRating.nombreAvis,
        bestRating: 5,
        worstRating: 1,
      },
    };

    const website = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      name: "Attitude Voyages",
      url: baseUrl,
      description:
        "Agence de voyage à Caveirac. Voyages sur mesure, circuits et séjours d'exception.",
      publisher: { "@id": orgId },
      inLanguage: "fr-FR",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${baseUrl}/destinations?tag={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    };

    ref.current.forEach((s) => s.remove());
    ref.current = [];

    [travelAgency, website].forEach((data) => {
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
