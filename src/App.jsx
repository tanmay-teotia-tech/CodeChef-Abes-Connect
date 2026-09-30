// src/App.jsx
// Root component: sets up routing and wraps pages in Navbar + Footer.

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Register from "./pages/Register";

export default function App() {
  return (
    <BrowserRouter>
      {/* ScrollToTop must be inside BrowserRouter so it can access the location */}
      <ScrollToTop />

      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />

        {/* All page routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/register" element={<Register />} />
          {/* Catch-all: redirect unknown paths to home */}
          <Route path="*" element={<Home />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
