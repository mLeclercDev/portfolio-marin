import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import SmoothScrolling from "../components/global/SmoothScrolling";
import { ScrollProvider } from '../components/global/ScrollContext';
import Navbar from '../components/global/Navbar';
import Cursor from '../components/global/Cursor';
import LoaderSecond from '../components/LoaderSecond';
import { animatePageIn } from "../utils/animations";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const lenisRef = useRef(null);
  const [isFirstVisit, setIsFirstVisit] = useState(null); // null = pas encore déterminé
  const [showLoader, setShowLoader] = useState(false);

  // Durée de ton loader en ms
  const loaderDuration = 5000;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isHome = window.location.pathname === "/"; // true si on est sur la homepage
      const firstVisit = !sessionStorage.getItem('isFirstVisit');
      setIsFirstVisit(firstVisit);

      if (firstVisit && isHome) {
        sessionStorage.setItem('isFirstVisit', 'false');
        setShowLoader(true);

        // Cacher le loader après la durée définie
        setTimeout(() => setShowLoader(false), loaderDuration);
      }
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      animatePageIn();
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    // première entrée
    animatePageIn();

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  if (isFirstVisit === null) return null; // Ne rien rendre tant qu'on ne sait pas

  return (
    <SmoothScrolling lenisRef={lenisRef}>
      <ScrollProvider lenisRef={lenisRef}>
        {/* Loader global */}
        {/* Navbar avec delay seulement si premier chargement */}
        <Navbar delay={showLoader ? 5 : 0} />
        {/* Component avec delayHero passé via props */}
        <Component
          {...pageProps}
          delayHero={showLoader ? loaderDuration / 1000 : 0}
          isFirstVisit={isFirstVisit}
          showLoader={showLoader}
          delayPresentation={showLoader ? loaderDuration + 1000 : 1000}
        />
        <Cursor />
      </ScrollProvider>
    </SmoothScrolling>
  );
}
