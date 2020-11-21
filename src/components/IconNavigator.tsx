import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import CardDetails from '../models/CardDetails';
import classnames from 'classnames';

export interface IconNavigatorProps {
  heading: string | undefined;
  cardDetails: CardDetails[] | undefined;
}

const IconNavigator = ({ heading, cardDetails }: IconNavigatorProps) => {
  const [selectedCard, setSelectedCard]: [
    CardDetails | undefined,
    (card: CardDetails) => void
  ] = useState<CardDetails | undefined>(
    cardDetails ? cardDetails[0] : undefined
  );

  const handleLogoClick = (card: CardDetails) => {
    setSelectedCard(card);
  };

  const cards = cardDetails?.map((card) => {
    return (
      <img
        src={process.env.PUBLIC_URL + '/img/' + card.logo + '.png'}
        key={card.title}
        onClick={() => handleLogoClick(card)}
        className={classnames('logo', 'm-2', {
          selected: card === selectedCard,
        })}
        height="75px"
        width="75px"
        alt={card.title}
        title={card.title}
      />
    );
  });

  return (
    <Container>
      <Row>
        <Col md={6} className="text-center mb-2">
          {cards}
        </Col>
        <Col md={6}>
          <div className="slide-text-container text-light text-center align-self-center">
            <h2>{selectedCard?.title}</h2>
            <p>{selectedCard?.description}</p>
            <Button className="m-2">Continue ➧</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default IconNavigator;
