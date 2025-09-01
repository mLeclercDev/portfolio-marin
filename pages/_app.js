import React, { useEffect, useRef, useState } from "react";
import SmoothScrolling from "../components/global/SmoothScrolling"
import { ScrollProvider } from '../components/global/ScrollContext';
import Navbar from '../components/global/Navbar';
import Cursor from '../components/global/Cursor';

export default function App({ Component, pageProps }) {
  const lenisRef = useRef(null); // Définir la référence Lenis ici
  const [delayNav, setDelayNav] = useState(null);

  useEffect(() => {
      const isFirstVisit = sessionStorage.getItem('isFirstVisit');
  
      if (!isFirstVisit) {
        sessionStorage.setItem('isFirstVisit', 'false');
        setDelayNav(5); // animation retardée
      } else {
        setDelayNav(0); // animation immédiate
      }
    }, []);

  return (
    <SmoothScrolling lenisRef={lenisRef}>
      <ScrollProvider  lenisRef={lenisRef}>
          {delayNav !== null && <Navbar delay={delayNav} />}
          <Component {...pageProps} />
          <Cursor />
      </ScrollProvider>
    </SmoothScrolling>
  ) 
}
