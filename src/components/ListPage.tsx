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
import classnames from 'classnames';
import Blog from '../models/Blog';

export interface ListPageProps {
  collectionType: CollectionType;
  iconCircle?: boolean;
}

const defaultProps: ListPageProps = {
  collectionType: CollectionType.Communities,
  iconCircle: true,
};

const ListPage: React.FC<ListPageProps> = ({ collectionType, iconCircle }: ListPageProps) => {
  const firebaseContext = React.useContext(FirebaseContext);
  const [collection, setCollection] = useStateWithLocalStorage(collectionType.toString());
  const [isLoading, setIsLoading] = useState(collection !== '');
  const [details, setDetails] = useState<Blog | undefined>(undefined);

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

  useEffect(() => {
    return firebaseContext?.subscribeToCollectionDetails(collectionType, setDetails, console.log);
  }, [firebaseContext]);

  const collectionItems: CardDetails[] = collection ? JSON.parse(collection).sort((a, b) => a.order - b.order) : [];

  const groups: _.Dictionary<CardDetails[]> = _.groupBy(collectionItems, (x) => x.logoUrl ?? '');
  const collectionCards: JSX.Element[] = [];
  for (const key in groups) {
    const cards = groups[key];
    const cardElements = cards.map((card) => {
      return (
        <div key={card.title} className="py-3">
          <a href={card.url} target="blank" className="text-light">
            <h2>
              <strong>{card.title}</strong>
            </h2>
          </a>
          <h5 className="text-light">{card.description}</h5>
        </div>
      );
    });
    const hasOneCard = cardElements.length === 1;
    collectionCards.push(
      <Row className="justify-content-center my-5" key={key}>
        <Col md={2} xs={3} className="align-items-left justify-content-center">
          <a href={hasOneCard ? cards[0].url : ''}>
            <img
              className={classnames('mb-2', {
                'rounded-circle': iconCircle,
                'rounded-xl': !iconCircle,
              })}
              src={key}
              height="auto"
              width="100%"
            />
          </a>
        </Col>
        <Col className="align-items-left align-self-top" xs={9} md={8}>
          <div className="border-bar-top">{cardElements}</div>
        </Col>
      </Row>,
    );
  }

  return (
    <div
      className="bg-dark"
      style={{
        width: '100%',
        minHeight: '100vh',
      }}
    >
      <Container>
        {isLoading ? (
          <div className="text-center text-light">
            <Spinner className="m-5" animation="border" role="status" variant="primary">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            {details && (
              <Row className="justify-content-center">
                <Col md={10} className="text-center mt-5">
                  <h1 className="text-light">{details?.title}</h1>
                  <h4 className="text-light">{details.blurb}</h4>
                </Col>
              </Row>
            )}
            {collectionCards}
          </>
        )}
      </Container>
    </div>
  );
};

ListPage.defaultProps = defaultProps;

export default ListPage;
