import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import CardDetails from '../models/CardDetails';
import classnames from 'classnames';
import SectionStyle from '../enums/SectionStyle';

export interface IconNavigatorProps {
  heading: string | undefined;
  cardDetails: CardDetails[] | undefined;
  sectionStyle?: SectionStyle;
  roundCards?: boolean;
}

const defaultProps: IconNavigatorProps = {
  heading: undefined,
  cardDetails: undefined,
  sectionStyle: SectionStyle.Default,
  roundCards: false,
};

const IconNavigator: React.FC<IconNavigatorProps> = ({ cardDetails, sectionStyle, roundCards }: IconNavigatorProps) => {
  const [selectedCard, setSelectedCard]: [CardDetails | undefined, (card: CardDetails) => void] = useState<
    CardDetails | undefined
  >(cardDetails ? cardDetails[0] : undefined);

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

  return (
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
            <Button className="m-2" href={selectedCard?.url} target="_blank">
              Continue ➧
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

IconNavigator.defaultProps = defaultProps;

export default IconNavigator;
