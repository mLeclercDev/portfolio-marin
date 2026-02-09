import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import SmoothScrolling from "../components/global/SmoothScrolling";
import { ScrollProvider } from '../components/global/ScrollContext';
import Navbar from '../components/global/Navbar';
import Cursor from '../components/global/Cursor';
import { animatePageIn } from "../utils/animations";
import '../styles/globals.scss';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const lenisRef = useRef(null);
  // Plus de loader, affichage direct
  
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

  return (
    <SmoothScrolling lenisRef={lenisRef}>
      <ScrollProvider lenisRef={lenisRef}>
        {/* Navbar sans délai */}
        <Navbar delay={0} />
        {/* Component avec delayHero à 0 */}
        <Component
          {...pageProps}
          delayHero={0} 
          isFirstVisit={false} 
          showLoader={false} 
          delayPresentation={1000} // On garde un petit délai pour la présentation si nécessaire, ou on peut le réduire
        />
        <Cursor />
      </ScrollProvider>
    </SmoothScrolling>
  );
}
