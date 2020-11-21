import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';

export interface SectionProps {
  heading?: string | undefined;
  children?: React.ReactNode | null;
  src?: string | null;
}

const defaultProps: SectionProps = {
  heading: undefined,
  children: null,
  src: null,
};

const Section = ({ heading, children, src }: SectionProps) => {
  return (
    <div
      className="section-container"
      style={{
        backgroundImage: 'url(' + src + ')',
      }}
    >
      <Container>
        {heading && (
          <Row className="justify-content-md-center">
            <Col sm className="text-center align-self-center">
              <div className="bg-masked p-2 rounded-xl text-light mt-3 mb-3">
                <h1>{heading}</h1>
              </div>
            </Col>
          </Row>
        )}
        <Row className="justify-content-md-center">
          <>{children}</>
        </Row>
      </Container>
    </div>
  );
};

Section.defaultProps = defaultProps;

export default Section;
