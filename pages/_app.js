import React, { useEffect, useRef, useState } from "react";
import SmoothScrolling from "../components/global/SmoothScrolling";
import { ScrollProvider } from '../components/global/ScrollContext';
import Navbar from '../components/global/Navbar';
import Cursor from '../components/global/Cursor';

export default function App({ Component, pageProps }) {
  const lenisRef = useRef(null);
  const [isFirstVisit, setIsFirstVisit] = useState(null); // null = pas encore déterminé
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const firstVisit = !sessionStorage.getItem('isFirstVisit');
      setIsFirstVisit(firstVisit);

      if (firstVisit) {
        sessionStorage.setItem('isFirstVisit', 'false');
        setShowLoader(true);
      }
    }
  }, []);

  if (isFirstVisit === null) return null; // ne rien rendre tant qu'on ne sait pas

  return (
    <SmoothScrolling lenisRef={lenisRef}>
      <ScrollProvider lenisRef={lenisRef}>
        <Navbar delay={isFirstVisit ? 5 : 0} />
        <Component {...pageProps} isFirstVisit={isFirstVisit} showLoader={showLoader} />
        <Cursor />
      </ScrollProvider>
    </SmoothScrolling>
  );
}
