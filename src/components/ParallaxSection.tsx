import React from 'react';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import { Parallax } from 'react-parallax';

export interface ParallaxSectionProps {
  children?: React.ReactNode | null;
  backgroundSource?: string | undefined;
  alt?: string | undefined;
}

const defaultProps: ParallaxSectionProps = {
  children: null,
  backgroundSource: undefined,
  alt: 'background',
};

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  backgroundSource: src,
  alt: alt,
}: ParallaxSectionProps) => {
  const style = getComputedStyle(document.body);
  const primary = style.getPropertyValue('--primary');
  return (
    <Parallax
      bgImage={src}
      bgImageAlt={alt}
      strength={200}
      renderLayer={() => (
        <div
          style={{
            position: 'absolute',
            background: primary,
            left: '0%',
            top: '0%',
            width: '100%',
            height: '100%',
            opacity: '0.75',
          }}
        />
      )}
    >
      <Container className="section-container align-middle">
        <Row className="align-items-center">
          <Col className="d-flex justify-content-center">{children}</Col>
        </Row>
      </Container>
    </Parallax>
  );
};

ParallaxSection.defaultProps = defaultProps;

export default ParallaxSection;
