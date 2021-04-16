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
  minHeight?: string;
  alt?: string | undefined;
  wrapInContainer?: boolean;
  fitWidth?: boolean;
  overlayOpacity?: number;
}

const defaultProps: ParallaxSectionProps = {
  backgroundSource: URL_BG_QUESTION_MARK,
  children: null,
  minHeight: '0',
  alt: 'background',
  wrapInContainer: true,
  overlayOpacity: 0.75,
};

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  backgroundSource: src,
  minHeight,
  alt,
  wrapInContainer,
  overlayOpacity,
}: ParallaxSectionProps) => {
  const themeContext = React.useContext(ThemeContext);

  return (
    <Parallax
      className="text-light"
      bgImage={src}
      bgImageAlt={alt}
      bgImageStyle={{ objectFit: 'cover' }}
      strength={200}
      renderLayer={() => (
        <div
          style={{
            position: 'absolute',
            background: themeContext?.dark,
            left: '0%',
            top: '0%',
            width: '100%',
            height: '100%',
            opacity: overlayOpacity,
          }}
        />
      )}
    >
      {wrapInContainer ? (
        <Container className="align-middle">
          <Row className="align-items-center" style={{ minHeight: minHeight }}>
            <Col className="justify-content-center">{children}</Col>
          </Row>
        </Container>
      ) : (
        <div style={{ minHeight: minHeight }}>{children}</div>
      )}
    </Parallax>
  );
};

ParallaxSection.defaultProps = defaultProps;

export default ParallaxSection;
