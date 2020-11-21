import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';

export interface SectionProps {
  heading: string | undefined;
  children: React.ReactNode | null;
  src: string;
}

const Section = ({ heading, children, src }: SectionProps) => {
  return (
    <div
      className="section-container"
      style={{
        backgroundImage: 'url(' + src + ')',
      }}
    >
      <Container>
        <Row className="justify-content-md-center">
          <Col sm className="text-center align-self-center">
            <div className="slide-text-container text-light mt-3 mb-3">
              <h1>{heading}</h1>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <>{children}</>
        </Row>
      </Container>
    </div>
  );
};

export default Section;
