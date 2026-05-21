import React, { lazy, Suspense, useEffect, useRef, useState } from "react";

// Le widget Calendly (~40 Ko) et son iframe externe sont chargés uniquement
// quand l'utilisateur approche du composant, pour ne pas bloquer le LCP.
const InlineWidgetLazy = lazy(() =>
  import("react-calendly").then((mod) => ({ default: mod.InlineWidget }))
);

const LazyCalendly = ({ url, styles, locale = "fr", rootMargin = "200px" }) => {
  const containerRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (!url) return;
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [url, rootMargin]);

  return (
    <div
      ref={containerRef}
      style={{ minHeight: styles?.minHeight || "850px", width: "100%" }}
    >
      {shouldLoad && url ? (
        <Suspense fallback={<div aria-busy="true" aria-live="polite" />}>
          <InlineWidgetLazy url={url} styles={styles} locale={locale} />
        </Suspense>
      ) : null}
    </div>
  );
};

export default LazyCalendly;
