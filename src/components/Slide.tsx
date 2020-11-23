import React from 'react';
import { Container, Row } from 'react-bootstrap';

export interface SlideProps {
  background: string;
  title: string;
  description: string;
}

const Slide: React.FC<SlideProps> = ({ background, title, description }: SlideProps) => {
  return (
    <Container
      fluid
      className="d-flex align-items-center carousel-slide text-light text-center"
      style={{ backgroundImage: 'url(' + background + ')' }}
    >
      <Container>
        <Row>
          <div className="bg-masked-dark p-2 rounded-xl">
            <h1 className="montserrat">{title}</h1>
            <h4>{description}</h4>
          </div>
        </Row>
      </Container>
    </Container>
  );
};

export default Slide;
