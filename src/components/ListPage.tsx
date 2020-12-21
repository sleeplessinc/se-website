import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { FirebaseContext } from '../firebase';
import { Spinner } from 'react-bootstrap';
import useStateWithLocalStorage from '../utils/storage';
import CollectionType from '../enums/CollectionType';
import CardDetails from '../models/CardDetails';
import * as _ from 'lodash';
import { URL_BG_HAND_SHAKE } from '../utils/constants';
import classnames from 'classnames';

export interface ListPageProps {
  collectionType: CollectionType;
  backgroundUrl?: string;
  iconSize?: number;
  iconCircle?: boolean;
}

const defaultProps: ListPageProps = {
  collectionType: CollectionType.Communities,
  backgroundUrl: URL_BG_HAND_SHAKE,
  iconSize: 150,
  iconCircle: true,
};

const ListPage: React.FC<ListPageProps> = ({ collectionType, backgroundUrl, iconSize, iconCircle }: ListPageProps) => {
  const firebaseContext = React.useContext(FirebaseContext);
  const [collection, setCollection] = useStateWithLocalStorage(collectionType.toString());
  const [isLoading, setIsLoading] = useState(collection !== '');

  useEffect(() => {
    return firebaseContext?.subscribeToCollection(
      collectionType,
      (results) => {
        setCollection(JSON.stringify(results));
        setIsLoading(false);
      },
      (error) => {
        console.log(error);
        setIsLoading(false);
      },
    );
  }, [firebaseContext]);

  const collectionItems: CardDetails[] = collection
    ? JSON.parse(collection).sort((a, b) => {
        const aVal = a.logoUrl ?? '';
        const bVal = b.logoUrl ?? '';
        if (aVal > bVal) {
          return 1;
        }
        if (aVal < bVal) {
          return -1;
        }

        return 0;
      })
    : [];
  const groups: _.Dictionary<CardDetails[]> = _.groupBy(collectionItems, (x) => x.logoUrl ?? '');
  const collectionCards: JSX.Element[] = [];
  let isFirst = true;
  for (const key in groups) {
    const cards = groups[key];
    const cardElements = cards.map((card) => {
      return (
        <div key={card.title} className="py-5 text-center d-flex flex-column">
          <a href={card.url} target="blank" style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <h1>{card.title}</h1>
            <p>{card.description}</p>
          </a>
        </div>
      );
    });
    const hasOneCard = cardElements.length === 1;
    collectionCards.push(
      <div key={key}>
        {isFirst ? null : (
          <Row className="justify-content-center">
            <Col sm={10}>
              <hr className="my-5" />
            </Col>
          </Row>
        )}
        <Container fluid={true}>
          <Row className="justify-content-center">
            <Col md={2} className="d-flex justify-content-center align-items-center">
              <a href={hasOneCard ? cards[0].url : ''}>
                <img
                  className={classnames('my-5', {
                    'rounded-circle': iconCircle,
                    'rounded-xl': !iconCircle,
                  })}
                  src={key}
                  height={`${iconSize}px`}
                  width={`${iconSize}px`}
                />
              </a>
            </Col>
            <Col className="d-flex align-items-center justify-content-center flex-column" md={8}>
              {cardElements}
            </Col>
          </Row>
        </Container>
      </div>,
    );
    isFirst = false;
  }

  return (
    <div
      style={{
        width: '100%',
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${backgroundUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        minHeight: '100vh',
      }}
    >
      <Container>
        {isLoading ? (
          <div className="text-center">
            <Spinner className="m-5" animation="border" role="status" variant="primary">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <div className="py-5">{collectionCards}</div>
        )}
      </Container>
    </div>
  );
};

ListPage.defaultProps = defaultProps;

export default ListPage;
