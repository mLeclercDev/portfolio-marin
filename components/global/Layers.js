import React from "react";
import Image from 'next/image';

const Layers = () => {
    return (
      <div className="layers">
        <div className="layers__item">
            <Image className='fit-cover' src="/Images/layer-1.png" alt="Mon image" width={1150} height={520} />
        </div>
        <div className="layers__item">
            <Image className='fit-cover' src="/Images/layer-2.png" alt="Mon image" width={1150} height={520} />
        </div>
        <div className="layers__item">
            <Image className='fit-cover' src="/Images/layer-3.png" alt="Mon image" width={1150} height={520} />
        </div>
        <div className="layers__item">
            <Image className='fit-cover' src="/Images/layer-6.png" alt="Mon image" width={1150} height={520} />
        </div>
        <div className="layers__item">
            <Image className='fit-cover' src="/Images/layer-5.png" alt="Mon image" width={1150} height={520} />
        </div>
        <div className="layers__item">
            <Image className='fit-cover' src="/Images/layer-4.png" alt="Mon image" width={1150} height={520} />
        </div>
      </div>
    );
};
  
export default Layers;