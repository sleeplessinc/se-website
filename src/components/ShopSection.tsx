import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import img_shirt from '../images/shirt.webp';
import { Button } from 'react-bootstrap';
import { FirebaseContext } from '../firebase';
import * as alertify from 'alertifyjs';

const ShopSection: React.FC = () => {
  const firebaseContext = React.useContext(FirebaseContext);
  const [shopUrl, setShopUrl] = useState('');

  useEffect(() => {
    return firebaseContext?.subscribeToAppSettings(
      (result) => {
        if (result?.shopUrl) {
          setShopUrl(result.shopUrl);
        }
      },
      (error) => {
        console.log(error);
        alertify.error(`Error loading shop URL`);
      },
    );
  }, [firebaseContext]);

  const text = (
    <div className="text-center m-1 bg-masked-light p-2 rounded-xl">
      <h1>Shop</h1>
      <h4>Looking for Street Epistemology-themed merch? Browse our selection here.</h4>
      <Button className="m-2" href={shopUrl} target="blank" disabled={!shopUrl}>
        Continue ➧
      </Button>
    </div>
  );

  const image = <img src={img_shirt} title="Street Epistemology t shirt" alt="Street Epistemology t shirt" />;

  return (
    <>
      <Container fluid className="d-none d-lg-block section-background">
        <Container>
          <Row>
            <Col className="align-self-center">{text}</Col>
            <Col className="align-self-center">{image}</Col>
          </Row>
        </Container>
      </Container>
      <Container
        fluid
        className="d-flex d-lg-none section-background align-items-center"
        style={{
          backgroundImage: 'url(' + img_shirt + ')',
        }}
      >
        <Container>
          <Row>{text}</Row>
        </Container>
      </Container>
    </>
  );
};

export default ShopSection;
