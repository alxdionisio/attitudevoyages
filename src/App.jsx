import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import "./index.css";

// Routes secondaires chargées à la demande (code-splitting par route)
const DestinationsPage = lazy(() => import("./pages/DestinationsPage"));
const AProposPage = lazy(() => import("./pages/AProposPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const OffreDetailPage = lazy(() => import("./pages/OffreDetailPage"));
const AgenceVillePage = lazy(() => import("./pages/AgenceVillePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const CGVPage = lazy(() => import("./pages/CGVPage"));
const MentionsLegalesPage = lazy(() => import("./pages/MentionsLegalesPage"));
const PolitiqueConfidentialitePage = lazy(() => import("./pages/PolitiqueConfidentialitePage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));

// Back-office admin (chunks séparés)
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminBookings = lazy(() => import("./pages/admin/AdminBookings"));
const AdminMessages = lazy(() => import("./pages/admin/AdminMessages"));
const AdminAvailability = lazy(() => import("./pages/admin/AdminAvailability"));

/** Basename au runtime : si on est à la racine (ex. preview GH Pages), ne pas utiliser le basename. */
function getBasename() {
  const buildBase = import.meta.env.VITE_BASENAME || "";
  if (!buildBase) return "";
  const path = window.location.pathname;
  if (path === buildBase || path.startsWith(buildBase + "/")) return buildBase;
  return "";
}

function RouteFallback() {
  return (
    <div style={{ minHeight: "60vh" }} aria-busy="true" aria-live="polite" />
  );
}

function App() {
  return (
    <BrowserRouter basename={getBasename()}>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            path="/"
            element={<HomePage />}
          />
          <Route
            path="destinations"
            element={
              <Suspense fallback={<RouteFallback />}>
                <DestinationsPage />
              </Suspense>
            }
          />
          <Route
            path="a-propos"
            element={
              <Suspense fallback={<RouteFallback />}>
                <AProposPage />
              </Suspense>
            }
          />
          <Route
            path="contact"
            element={
              <Suspense fallback={<RouteFallback />}>
                <ContactPage />
              </Suspense>
            }
          />
          <Route
            path="offre/:slug"
            element={
              <Suspense fallback={<RouteFallback />}>
                <OffreDetailPage />
              </Suspense>
            }
          />
          <Route
            path="agence-voyages/:villeSlug"
            element={
              <Suspense fallback={<RouteFallback />}>
                <AgenceVillePage />
              </Suspense>
            }
          />
          <Route
            path="cgv"
            element={
              <Suspense fallback={<RouteFallback />}>
                <CGVPage />
              </Suspense>
            }
          />
          <Route
            path="mentions-legales"
            element={
              <Suspense fallback={<RouteFallback />}>
                <MentionsLegalesPage />
              </Suspense>
            }
          />
          <Route
            path="politique-confidentialite"
            element={
              <Suspense fallback={<RouteFallback />}>
                <PolitiqueConfidentialitePage />
              </Suspense>
            }
          />
          <Route
            path="faq"
            element={
              <Suspense fallback={<RouteFallback />}>
                <FAQPage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<RouteFallback />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Route>

        {/* ─── Back-office admin (hors Layout public) ─── */}
        <Route
          path="admin/login"
          element={
            <Suspense fallback={<RouteFallback />}>
              <AdminLogin />
            </Suspense>
          }
        />
        <Route
          path="admin"
          element={
            <Suspense fallback={<RouteFallback />}>
              <AdminLayout />
            </Suspense>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="availability" element={<AdminAvailability />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
