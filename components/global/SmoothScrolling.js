import React, { useRef } from 'react';
import { ReactLenis } from "@studio-freight/react-lenis";

console.log('SmoothScrolling component is rendered');

function SmoothScrolling({ children, infinite }) {

  const lenisRef = useRef(null); // Créer une référence au composant Lenis

  return (
    <ReactLenis ref={lenisRef} root options={{ lerp: 0.1, duration: 1.5, smoothTouch: true, infinite: infinite }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
