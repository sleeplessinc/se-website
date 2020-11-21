import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

export interface SlideProps {
  background: string;
  title: string;
  description: string;
}

const Slide: React.FC<SlideProps> = ({ background, title, description }) => {
  return (
    <Carousel.Item style={{ backgroundImage: background }}>
      <Carousel.Caption>
        <div className="bg-masked p-2 rounded-xl">
          <h1 className="montserrat">{title}</h1>
          <h4>{description}</h4>
        </div>
      </Carousel.Caption>
    </Carousel.Item>
  );
};

export default Slide;
