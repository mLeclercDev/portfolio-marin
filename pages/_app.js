import React, { useEffect, useRef, useState } from "react";
import SmoothScrolling from "../components/global/SmoothScrolling"
import { ScrollProvider } from '../components/global/ScrollContext';
import Navbar from '../components/global/Navbar';
import Cursor from '../components/global/Cursor';

export default function App({ Component, pageProps }) {
  const lenisRef = useRef(null); // Définir la référence Lenis ici

  return (
    <SmoothScrolling lenisRef={lenisRef}>
      <ScrollProvider  lenisRef={lenisRef}>
          <Navbar />
          <Component {...pageProps} />
          <Cursor />
      </ScrollProvider>
    </SmoothScrolling>
  ) 
}
