// SmoothScrolling.js

import React, { useRef } from 'react';
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";

function SmoothScrolling({ children, infinite }) {
  const lenisRef = useRef(null);

  return (
    <ReactLenis ref={lenisRef} root options={{ lerp: 0.075, duration: 2, smoothTouch: true, infinite: infinite }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;