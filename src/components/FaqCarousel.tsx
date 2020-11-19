import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import question_mark from '../images/bg_question_mark.png';

const FaqCarousel: React.FC = () => {
  return (
    <Carousel>
      <Carousel.Item className="carousel-item">
        <img
          className="d-block w-100"
          src={question_mark}
          alt="First slide"
          height="auto"
          width="100%"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="carousel-item">
        <img
          className="d-block w-100"
          src={question_mark}
          alt="Third slide"
          height="auto"
          width="100%"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="carousel-item">
        <img
          className="d-block w-100"
          src={question_mark}
          alt="Third slide"
          height="auto"
          width="100%"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default FaqCarousel;
