import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import ConsentBanner from "./ConsentBanner";
import StructuredDataGlobal from "./StructuredDataGlobal";
import { pushPageView, getPageTitleFromPath } from "../utils/tracking";
import { sendPageView } from "../utils/ga4";

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
};

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    const title = getPageTitleFromPath(location.pathname);
    pushPageView(location.pathname, title);
    sendPageView(location.pathname, title);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <StructuredDataGlobal />
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={pageTransition.initial}
            animate={pageTransition.animate}
            exit={pageTransition.exit}
            transition={pageTransition.transition}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <ConsentBanner />
    </div>
  );
};

export default Layout;
