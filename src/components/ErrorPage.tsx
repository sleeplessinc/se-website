import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { URL_IMG_401 } from '../utils/constants';

interface IErrorPageProps {
  title: string;
  message: string;
}

const ErrorPage: React.FC<IErrorPageProps> = ({ title, message }: IErrorPageProps) => {
  return (
    <Container>
      <Row className="align-items-center m-5">
        <Col md={4}>
          <img src={URL_IMG_401} width="100%" height="auto" />
        </Col>
        <Col md={8} className="text-light mb-2 align-self-center">
          <h1>{title}</h1>
          <h4 className="mt-3">
            <p>{message}</p>
          </h4>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorPage;
