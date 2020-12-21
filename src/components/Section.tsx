import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import SectionStyle from '../enums/SectionStyle';
import classnames from 'classnames';

export interface SectionProps {
  heading?: string | undefined;
  blurb?: string | undefined;
  children?: React.ReactNode | null;
  sectionStyle?: SectionStyle;
  backgroundSource?: string | null;
}

const defaultProps: SectionProps = {
  heading: undefined,
  children: null,
  sectionStyle: SectionStyle.Default,
  backgroundSource: null,
};

const Section: React.FC<SectionProps> = ({
  heading,
  blurb,
  children,
  sectionStyle,
  backgroundSource: src,
}: SectionProps) => {
  const isDefault = sectionStyle === SectionStyle.Default;
  const rgb = isDefault ? '255, 228, 121' : '255, 255, 255';
  return (
    <Container
      fluid
      className="section-background d-flex align-items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(${rgb}, 0.9), rgba(${rgb}, 0.9)), url(${src})`,
      }}
    >
      <Container className="section-container align-middle">
        {heading && (
          <Row className="align-items-center">
            <Col sm className="text-center align-self-center">
              <div className={classnames('text-center', 'align-self-center', 'mt-2', 'mb-2', 'p-2')}>
                <h1>{heading}</h1>
                {blurb ? <h4>{blurb}</h4> : null}
              </div>
            </Col>
          </Row>
        )}
        <Row>
          <Col className="d-flex justify-content-center">{children}</Col>
        </Row>
      </Container>
    </Container>
  );
};

Section.defaultProps = defaultProps;

export default Section;
