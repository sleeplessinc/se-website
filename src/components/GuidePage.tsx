import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Section from './Section';
import bg_book from '../images/bg_book.webp';

const GuidePage: React.FC = () => {
  return (
    <Section heading="The Complete SE Guide" backgroundSource={bg_book}>
      <Container>
        <Row>
          <Col md={6}>
            <div className="text-center align-self-center">
              <h4>
                The SE Guide provides distilled advice for all stages of a Street Epistemology dialogue: preparation,
                beginning a dialogue, managing a dialogue, examining epistemology, ending a dialogue, and following up.
              </h4>
            </div>
          </Col>
          <Col md={6} className="text-center mb-2 align-self-center">
            <Button
              className="m-2"
              href="https://docs.google.com/document/export?format=pdf&id=1YOqUGBlTJ6cCnkfZCYN6zV-csG85b_fkIiQAi3EPXSw"
              target="_blank"
            >
              Download PDF ➧
            </Button>
            <Button
              className="m-2"
              href="https://docs.google.com/document/export?format=epub&id=1YOqUGBlTJ6cCnkfZCYN6zV-csG85b_fkIiQAi3EPXSw"
              target="_blank"
            >
              Download EPUB ➧
            </Button>
            <Button
              className="m-2"
              href="https://docs.google.com/document/d/1YOqUGBlTJ6cCnkfZCYN6zV-csG85b_fkIiQAi3EPXSw"
              target="_blank"
            >
              Open with Google Docs ➧
            </Button>
          </Col>
        </Row>
      </Container>
    </Section>
  );
};

export default GuidePage;
