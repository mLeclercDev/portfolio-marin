import React from "react";
import Image from 'next/image';
import '../../styles/components/global/layer.scss'

const Layer = () => {
    return (
      <div className="layers-wrapper">
        <div className="layers__items first"></div>
        <div className="layers__items second"></div>
      </div>
    );
};
  
export default Layer;