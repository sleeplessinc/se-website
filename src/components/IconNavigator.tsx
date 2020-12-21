import React, { useState, useEffect } from 'react';
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

const fallbackLogo = 'https://storage.googleapis.com/se-website-fe4a4.appspot.com/images/logos/se-logo-small.webp';

const IconNavigator: React.FC<IconNavigatorProps> = ({
  cardDetails,
  sectionStyle,
  roundCards,
  isLoading,
}: IconNavigatorProps) => {
  const [state, setState] = useState<{ selectedCard: CardDetails | undefined; isStopped: boolean }>({
    selectedCard: cardDetails ? cardDetails[0] : undefined,
    isStopped: false,
  });
  let timer: NodeJS.Timeout | undefined = undefined;
  const cycleSelection = () => {
    if (!cardDetails || cardDetails.length === 0 || state.isStopped) return;

    if (!state.selectedCard) {
      setState({
        selectedCard: cardDetails[0],
        isStopped: false,
      });
      return;
    }

    const index = cardDetails?.indexOf(state.selectedCard);
    const selectedCard = index < 0 || index === cardDetails.length - 1 ? cardDetails[0] : cardDetails[index + 1];
    setState({
      selectedCard: selectedCard,
      isStopped: false,
    });
  };

  useEffect(() => {
    timer = setInterval(cycleSelection, 5000);
    return () => {
      if (timer) clearInterval(timer);
    };
  });

  const handleLogoClick = (card: CardDetails) => {
    setState({
      selectedCard: card,
      isStopped: true,
    });
  };

  if (!state.selectedCard && cardDetails && cardDetails.length > 0) {
    setState({
      selectedCard: cardDetails[0],
      isStopped: false,
    });
  }

  const cards = cardDetails?.map((card) => {
    return (
      <img
        src={card.logoUrl ?? fallbackLogo}
        key={card.title}
        onClick={() => handleLogoClick(card)}
        className={classnames('logo', 'm-2', {
          selected: card === state.selectedCard,
          'rounded-circle': roundCards,
        })}
        height="75px"
        width="75px"
        alt={card.title}
        title={card.title}
      />
    );
  });

  const selectedCard = state.selectedCard;
  const isDefault = sectionStyle === SectionStyle.Default;
  const isSectionRef = state && selectedCard?.url.startsWith('/#');
  const isLocalLink = state && selectedCard?.url.startsWith('/') && !isSectionRef;

  return isLoading ? (
    <Spinner className="m-5" animation="border" role="status" variant="primary">
      <span className="sr-only">Loading...</span>
    </Spinner>
  ) : (
    <Container>
      <Row className="align-items-center">
        <Col md={6} className="text-center mb-2">
          {cards}
        </Col>
        <Col className="d-flex align-items-center justify-content-center" style={{ minHeight: '350px' }} md={6}>
          <div
            className={classnames('text-center', 'align-self-center', {
              'text-light': isDefault,
              'bg-masked-dark mt-2 mb-2 p-2 rounded-xl': isDefault,
            })}
          >
            <h2>{selectedCard?.title}</h2>
            <p>{selectedCard?.description}</p>
            {isLocalLink ? (
              <Link to={selectedCard?.url ?? ''}>
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
