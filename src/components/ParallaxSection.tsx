import React from 'react';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import { Parallax } from 'react-parallax';
import { URL_BG_QUESTION_MARK } from '../utils/constants';
import { ThemeContext } from './ThemeProvider';

export interface ParallaxSectionProps {
  backgroundSource?: string | undefined;
  children?: React.ReactNode | null;
  alt?: string | undefined;
}

const defaultProps: ParallaxSectionProps = {
  backgroundSource: URL_BG_QUESTION_MARK,
  children: null,
  alt: 'background',
};

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  backgroundSource: src,
  alt: alt,
}: ParallaxSectionProps) => {
  const themeContext = React.useContext(ThemeContext);

  return (
    <Parallax
      className="text-light"
      bgImage={src}
      bgImageAlt={alt}
      strength={200}
      renderLayer={() => (
        <div
          style={{
            position: 'absolute',
            background: themeContext?.primary,
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
