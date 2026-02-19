import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import DestinationsPage from "./pages/DestinationsPage";
import AProposPage from "./pages/AProposPage";
import ContactPage from "./pages/ContactPage";
import OffreDetailPage from "./pages/OffreDetailPage";
import AgenceVillePage from "./pages/AgenceVillePage";
import NotFoundPage from "./pages/NotFoundPage";
import CGVPage from "./pages/CGVPage";
import MentionsLegalesPage from "./pages/MentionsLegalesPage";
import PolitiqueConfidentialitePage from "./pages/PolitiqueConfidentialitePage";
import FAQPage from "./pages/FAQPage";
import "./index.css";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.VITE_BASENAME || ""}>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="destinations" element={<DestinationsPage />} />
          <Route path="a-propos" element={<AProposPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="offre/:slug" element={<OffreDetailPage />} />
          <Route path="agence-voyages/:villeSlug" element={<AgenceVillePage />} />
          <Route path="cgv" element={<CGVPage />} />
          <Route path="mentions-legales" element={<MentionsLegalesPage />} />
          <Route path="politique-confidentialite" element={<PolitiqueConfidentialitePage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
