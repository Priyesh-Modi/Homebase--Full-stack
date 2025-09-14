import React, { useState } from "react";
import "./slider.scss";

interface SliderProps {
  images: string[];
}

const Slider: React.FC<SliderProps> = ({ images }) => {
  const [imageIndex, setImageIndex] = useState<number>(0);  // Default index is 0

  const changeSlide = (direction: "left" | "right"): void => {
    setImageIndex((prevIndex) => {
      const validIndex = prevIndex ?? 0;  // If prevIndex is null, set it to 0

      if (direction === "left") {
        return validIndex === 0 ? images.length - 1 : validIndex - 1;
      } else {
        return validIndex === images.length - 1 ? 0 : validIndex + 1;
      }
    });
  };

  return (
      <div className="slider">
        {imageIndex !== null && (
            <div className="fullSlider">
              <div className="arrow" onClick={() => changeSlide("left")}>
                <img src="/arrow.png" alt="" />
              </div>
              <div className="imgContainer">
                <img src={images[imageIndex]} alt="" />
              </div>
              <div className="arrow" onClick={() => changeSlide("right")}>
                <img src="/arrow.png" className="right" alt="" />
              </div>
              <div className="close" onClick={() => setImageIndex(-1)}>
                X
              </div>
            </div>
        )}
        <div className="bigImage">
          <img src={images[0]} alt="" onClick={() => setImageIndex(0)} />
        </div>
        <div className="smallImages">
          {images.slice(1).map((image, index) => (
              <img
                  src={image}
                  alt=""
                  key={index}
                  onClick={() => setImageIndex(index + 1)}
              />
          ))}
        </div>
      </div>
  );
};

export default Slider;
