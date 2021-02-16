import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const ImageCarousel = () => {
  return (
    <Carousel
      useKeyboardArrows
      showThumbs={false}
      dynamicHeight={false}
      swipeable
      emulateTouch
      autoPlay={false}
    >
      <div className="image-div">
        <img
          className="cover"
          src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
          alt="test"
        />
      </div>
      <div className="image-div">
        <img
          className="cover"
          src="https://static01.nyt.com/images/2019/11/05/science/28TB-SUNSET1/merlin_163473282_fe17fc6b-78b6-4cdd-b301-6f63e6ebdd7a-superJumbo.jpg"
          alt="test"
        />
      </div>
      <div className="image-div">
        <img
          className="cover"
          src="https://i.pinimg.com/originals/83/f9/37/83f937b69f30bb886ab8a03390da6771.jpg"
          alt="test"
        />
      </div>
      <div className="image-div">
        <img
          className="cover"
          src="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png"
          alt="test"
        />
      </div>
      <div className="image-div">
        <img
          className="cover"
          src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
          alt="test"
        />
      </div>
      <div className="image-div">
        <img
          className="cover"
          src="http://webmeup.com/upload/blog/lead-image-105.png"
          alt="test"
        />
      </div>
      <div className="image-div">
        <img
          className="cover"
          src="https://www.pics4learning.com/images/pics-banner1-1300.jpg"
          alt="test"
        />
      </div>
    </Carousel>
  );
};

export default ImageCarousel;
