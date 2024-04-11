import React from "react";
import Image from 'next/image';

const Layers = () => {

    return (
      <div className="layers">
        <div className="layers__item">
            <Image className='fit-cover' src="/Images/cover-image-1.png" alt="Mon image" width={1149} height={520} />
        </div>
        <div className="layers__item">
            <Image className='fit-cover' src="/Images/cover-image-2.png" alt="Mon image" width={1149} height={520} />
        </div>
        <div className="layers__item">
            <Image className='fit-cover' src="/Images/cover-image-3.png" alt="Mon image" width={1149} height={520} />
        </div>
        <div className="layers__item">
            <Image className='fit-cover' src="/Images/cover-image-6.png" alt="Mon image" width={1149} height={520} />
        </div>
        <div className="layers__item">
            <Image className='fit-cover' src="/Images/cover-image-5.png" alt="Mon image" width={1149} height={520} />
        </div>
        <div className="layers__item">
            <Image className='fit-cover' src="/Images/cover-image-4.png" alt="Mon image" width={1149} height={520} />
        </div>
      </div>
    );
};
  
export default Layers;