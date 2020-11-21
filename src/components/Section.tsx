import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import SectionStyle from '../enums/SectionStyle';
import classnames from 'classnames';

export interface SectionProps {
  heading?: string | undefined;
  children?: React.ReactNode | null;
  sectionStyle?: SectionStyle;
  src?: string | null;
}

const defaultProps: SectionProps = {
  heading: undefined,
  children: null,
  sectionStyle: SectionStyle.Default,
  src: null,
};

const Section = ({ heading, children, sectionStyle, src }: SectionProps) => {
  const isDefault = sectionStyle === SectionStyle.Default;

  return (
    <Container
      fluid
      className="section-background d-flex align-items-center"
      style={{
        backgroundImage:
          (isDefault
            ? ''
            : 'linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), ') +
          'url(' +
          src +
          ')',
      }}
    >
      <Container className="section-container align-middle">
        {heading && (
          <Row className="align-items-center">
            <Col sm className="text-center align-self-center">
              <div
                className={classnames(
                  'text-center',
                  'align-self-center',
                  'mt-2',
                  'mb-2',
                  'p-2',
                  {
                    'text-light': isDefault,
                    'bg-masked rounded-xl': isDefault,
                  }
                )}
              >
                <h1>{heading}</h1>
              </div>
            </Col>
          </Row>
        )}
        <Row className="justify-content-md-center">
          <>{children}</>
        </Row>
      </Container>
    </Container>
  );
};

Section.defaultProps = defaultProps;

export default Section;
