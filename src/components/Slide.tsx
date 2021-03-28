import React from 'react';
import { Container } from 'react-bootstrap';

export interface SlideProps {
  background: string;
  children?: React.ReactNode | null;
}

const Slide: React.FC<SlideProps> = ({ background, children }: SlideProps) => {
  return (
    <Container
      fluid
      className="d-flex align-items-center carousel-slide text-light text-center"
      style={{ backgroundImage: 'url(' + background + ')' }}
    >
      <Container className="bg-masked-dark p-2 rounded-xl">{children}</Container>
    </Container>
  );
};

export default Slide;
