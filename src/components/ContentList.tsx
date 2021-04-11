import React, { useEffect, useState } from 'react';
import { FirebaseContext } from '../firebase';
import { Spinner } from 'react-bootstrap';
import useStateWithLocalStorage from '../utils/storage';
import CollectionType from '../enums/CollectionType';
import CardDetails from '../models/CardDetails';
import * as _ from 'lodash';
import classnames from 'classnames';
import { GetUrlIcon } from '../utils/iconSelectors';

export interface Props {
  collectionType: CollectionType;
  iconSelector?: (card: CardDetails, iconSize: number) => React.ReactNode;
  iconSize?: number;
}

const defaultProps: Props = {
  collectionType: CollectionType.Communities,
  iconSelector: (card: CardDetails, iconSize: number) => GetUrlIcon(card, iconSize, 'rounded d-inline-block'),
  iconSize: 80,
};

const ContentList: React.FC<Props> = ({ collectionType, iconSelector, iconSize }: Props) => {
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

  const collectionItems: CardDetails[] = collection ? JSON.parse(collection).sort((a, b) => a.order - b.order) : [];

  const groups: _.Dictionary<CardDetails[]> = _.groupBy(collectionItems, (x) => x.logoUrl ?? '');
  const collectionCards: JSX.Element[] = [];
  for (const key in groups) {
    const cards = groups[key];
    const cardElements = cards.map((card, index) => {
      return (
        <div
          key={card.title}
          className={classnames('text-left', 'pr-3', {
            'mb-3': index + 1 != cards.length,
          })}
        >
          <a href={card.url} target="blank" className="text-secondary">
            <h5>{card.title}</h5>
          </a>
          {card.description}
        </div>
      );
    });

    if (!iconSelector || !iconSize) {
      throw 'No iconSelecter specified.';
    }

    const hasOneCard = cardElements.length === 1;
    const logoElement = iconSelector(cards[0], iconSize);
    const collectionCard = (
      <div className="d-flex flex-row c-avoid-break mb-4">
        <div className="d-inline-flex mr-3">
          {hasOneCard ? <a href={hasOneCard ? cards[0].url : ''}>{logoElement}</a> : logoElement}
        </div>
        <div className="d-inline-flex flex-column border-bar-left pl-3">{cardElements}</div>
      </div>
    );

    collectionCards.push(collectionCard);
  }

  return isLoading ? (
    <div className="text-center">
      <Spinner className="m-5" animation="border" role="status" variant="primary">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  ) : (
    <>{collectionCards}</>
  );
};

ContentList.defaultProps = defaultProps;

export default ContentList;
