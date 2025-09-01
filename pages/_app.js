import React, { useEffect, useRef, useState } from "react";
import SmoothScrolling from "../components/global/SmoothScrolling";
import { ScrollProvider } from '../components/global/ScrollContext';
import Navbar from '../components/global/Navbar';
import Cursor from '../components/global/Cursor';

export default function App({ Component, pageProps }) {
  const lenisRef = useRef(null);
  const [isFirstVisit, setIsFirstVisit] = useState(false); // false par défaut
  const [hydrated, setHydrated] = useState(false); // pour ne rendre Navbar qu'après hydratation

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const firstVisit = !sessionStorage.getItem('isFirstVisit');

      if (firstVisit) {
        sessionStorage.setItem('isFirstVisit', 'false');
      }

      setIsFirstVisit(firstVisit);
      setHydrated(true);
    }
  }, []);

  if (!hydrated) return null; // rien rendre côté serveur

  return (
    <SmoothScrolling lenisRef={lenisRef}>
      <ScrollProvider lenisRef={lenisRef}>
        <Navbar delay={isFirstVisit ? 5 : 0} />
        <Component {...pageProps} isFirstVisit={isFirstVisit} />
        <Cursor />
      </ScrollProvider>
    </SmoothScrolling>
  );
}
