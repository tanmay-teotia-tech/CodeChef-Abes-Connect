// src/components/ScrollToTop.jsx
// Scrolls the window to the top whenever the route changes.
// Must be placed inside <BrowserRouter> so it can access location.

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  // This component renders nothing — it only has a side effect
  return null;
}
