import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import CardDetails from '../models/CardDetails';
import classnames from 'classnames';
import SectionStyle from '../enums/SectionStyle';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

export interface IconNavigatorProps {
  cardDetails: CardDetails[] | undefined;
  sectionStyle?: SectionStyle;
  roundCards?: boolean;
  isLoading: boolean;
}

const defaultProps: IconNavigatorProps = {
  cardDetails: undefined,
  sectionStyle: SectionStyle.Default,
  roundCards: false,
  isLoading: false,
};

const IconNavigator: React.FC<IconNavigatorProps> = ({
  cardDetails,
  sectionStyle,
  roundCards,
  isLoading,
}: IconNavigatorProps) => {
  const [selectedCard, setSelectedCard] = useState<CardDetails | undefined>(cardDetails ? cardDetails[0] : undefined);

  const handleLogoClick = (card: CardDetails) => {
    setSelectedCard(card);
  };

  if (!selectedCard && cardDetails && cardDetails.length > 0) {
    setSelectedCard(cardDetails[0]);
  }

  const cards = cardDetails?.map((card) => {
    return (
      <img
        src={process.env.PUBLIC_URL + '/img/' + card.logo + '.webp'}
        key={card.title}
        onClick={() => handleLogoClick(card)}
        className={classnames('logo', 'm-2', {
          selected: card === selectedCard,
          'rounded-circle': roundCards,
        })}
        height="75px"
        width="75px"
        alt={card.title}
        title={card.title}
      />
    );
  });

  const isDefault = sectionStyle === SectionStyle.Default;
  const isSectionRef = selectedCard && selectedCard.url.startsWith('/#');
  const isLocalLink = selectedCard && selectedCard.url.startsWith('/') && !isSectionRef;

  return isLoading ? (
    <Spinner className="m-2" animation="border" role="status" variant="primary">
      <span className="sr-only">Loading...</span>
    </Spinner>
  ) : (
    <Container>
      <Row>
        <Col md={6} className="text-center mb-2">
          {cards}
        </Col>
        <Col md={6}>
          <div
            className={classnames('text-center', 'align-self-center', {
              'text-light': isDefault,
              'bg-masked-dark mt-2 mb-2 p-2 rounded-xl': isDefault,
            })}
          >
            <h2>{selectedCard?.title}</h2>
            <p>{selectedCard?.description}</p>
            {isLocalLink ? (
              <Link to={selectedCard?.url}>
                <Button className="m-2">Continue ➧</Button>
              </Link>
            ) : (
              <Button className="m-2" href={selectedCard?.url} target={isSectionRef ? '' : '_blank'}>
                Continue ➧
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

IconNavigator.defaultProps = defaultProps;

export default IconNavigator;
