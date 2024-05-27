import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { SplitText } from "@cyriacbr/react-split-text";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import '../styles/components/works.scss'

const Works = () => {
  const [isRendered, setIsRendered] = useState(false);

  return (
    <section className="works">
        <div className='container'>
            <h2>
                Works
            </h2>
{/*             <div class="parent">
                <div style={{ '--row': '1' }} class="div div-1">
                    <a href='eurosport.fr'>
                        <Image className='fit-cover' src="/Images/layer-1.png" alt="Mon image" width={1150} height={520} />
                    </a>
                </div>
                <div style={{ '--row': '2' }} class="div div-2">
                    <a href='eurosport.fr'>
                        <Image className='fit-cover' src="/Images/layer-1.png" alt="Mon image" width={1150} height={520} />
                    </a>
                </div>
                <div style={{ '--row': '3' }} class="div div-3">
                    <a href='eurosport.fr'>
                        <Image className='fit-cover' src="/Images/layer-1.png" alt="Mon image" width={1150} height={520} />
                    </a>
                </div>
            </div> */}
        </div>
    </section>
  );
};

export default Works;