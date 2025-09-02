import React, { useEffect, useRef, useState } from "react";
import SmoothScrolling from "../components/global/SmoothScrolling";
import { ScrollProvider } from '../components/global/ScrollContext';
import Navbar from '../components/global/Navbar';
import Cursor from '../components/global/Cursor';
import LoaderSecond from '../components/LoaderSecond';

export default function App({ Component, pageProps }) {
  const lenisRef = useRef(null);
  const [isFirstVisit, setIsFirstVisit] = useState(null); // null = pas encore déterminé
  const [showLoader, setShowLoader] = useState(false);

  // Durée de ton loader en ms
  const loaderDuration = 5000;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const firstVisit = !sessionStorage.getItem('isFirstVisit');
      setIsFirstVisit(firstVisit);

      if (firstVisit) {
        sessionStorage.setItem('isFirstVisit', 'false');
        setShowLoader(true);

        // Cacher le loader après la durée définie
        setTimeout(() => setShowLoader(false), loaderDuration);
      }
    }
  }, []);

  if (isFirstVisit === null) return null; // Ne rien rendre tant qu'on ne sait pas

  return (
    <SmoothScrolling lenisRef={lenisRef}>
      <ScrollProvider lenisRef={lenisRef}>
        {/* Loader global */}
        {showLoader && <LoaderSecond />}
        {/* Navbar avec delay seulement si premier chargement */}
        <Navbar delay={isFirstVisit ? 5 : 0} />
        {/* Component avec delayHero passé via props */}
        <Component 
          {...pageProps} 
          delayHero={showLoader ? loaderDuration / 1000 : 0} 
          isFirstVisit={isFirstVisit} 
          showLoader={showLoader} 
          delayPresentation={isFirstVisit ? 5000 : 1000}
        />
        <Cursor />
      </ScrollProvider>
    </SmoothScrolling>
  );
}
