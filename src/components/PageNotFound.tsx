import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import pup_401 from '../images/401-pup.webp';

const PageNotFound: React.FC = () => {
  return (
    <Container>
      <Row className="align-items-center m-5">
        <Col md={4}>
          <img src={pup_401} width="100%" height="auto" />
        </Col>
        <Col md={8} className="text-secondary mb-2 align-self-center">
          <h1>404 - Could you repeat that?</h1>
          <h4 className="mt-3">
            <p>Sometimes when you can&apos;t find the answer you are looking for, you are asking the wrong question.</p>
          </h4>
        </Col>
      </Row>
    </Container>
  );
};

export default PageNotFound;
