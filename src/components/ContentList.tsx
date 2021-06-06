import React, { useEffect, useState } from 'react';
import { FirebaseContext } from '../firebase';
import { Button, Spinner } from 'react-bootstrap';
import useStateWithLocalStorage from '../utils/storage';
import CollectionType from '../enums/CollectionType';
import CardDetails from '../models/CardDetails';
import * as _ from 'lodash';
import classnames from 'classnames';
import { GetUrlIcon } from '../utils/iconSelectors';

export interface Props {
  collectionType: CollectionType;
  iconSelector?: (card: CardDetails, iconSize: number) => React.ReactNode;
  groupSelector?: (card: CardDetails) => string;
  iconSize?: number;
  itemsPerPage?: number;
}

const defaultItemsPerPage = 8;

const defaultProps: Props = {
  collectionType: CollectionType.Communities,
  iconSelector: (card: CardDetails, iconSize: number) => GetUrlIcon(card, iconSize, 'rounded d-inline-block'),
  groupSelector: undefined,
  iconSize: 80,
  itemsPerPage: undefined,
};

const ContentList: React.FC<Props> = ({
  collectionType,
  iconSelector,
  groupSelector,
  iconSize,
  itemsPerPage,
}: Props) => {
  const firebaseContext = React.useContext(FirebaseContext);
  const [collection, setCollection] = useStateWithLocalStorage(collectionType.toString());
  const [isLoading, setIsLoading] = useState(collection !== '');
  const [displayCount, setDisplayCount] = useState(itemsPerPage ?? 100);

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

  const onShowLessClick = () => {
    setDisplayCount(
      Math.max(
        Math.min(itemsPerPage ?? defaultItemsPerPage, displayCount - (itemsPerPage ?? defaultItemsPerPage)),
        itemsPerPage ?? defaultItemsPerPage,
      ),
    );
  };

  const onShowMoreClick = () => {
    setDisplayCount(
      Math.min(Math.max(displayCount, displayCount + (itemsPerPage ?? defaultItemsPerPage)), collectionItems.length),
    );
  };

  if (!iconSelector || !iconSize) {
    throw 'No iconSelecter specified.';
  }

  const cardElements = groupSelector
    ? getGroupedCardElements(collectionItems, iconSelector, iconSize, groupSelector)
    : getCardElements(collectionItems, displayCount, iconSelector, iconSize);

  const CardGroups: JSX.Element[] = [];
  for (let i = 0; i * (itemsPerPage ?? 100) < collectionItems.length; i++) {
    CardGroups.push(
      <div className="col-d-2">{cardElements.slice(i * (itemsPerPage ?? 100), (i + 1) * (itemsPerPage ?? 100))}</div>,
    );
  }

  return isLoading ? (
    <div className="text-center">
      <Spinner className="m-5" animation="border" role="status" variant="primary">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  ) : (
    <>
      {CardGroups}
      {itemsPerPage && displayCount < collectionItems.length ? (
        <Button onClick={onShowMoreClick}>Show more</Button>
      ) : null}
      {itemsPerPage && itemsPerPage < displayCount ? <Button onClick={onShowLessClick}>Show less</Button> : null}
    </>
  );
};

ContentList.defaultProps = defaultProps;

export default ContentList;

const getGroupedCardElements = (
  collectionItems: CardDetails[],
  iconSelector: (card: CardDetails, iconSize: number) => React.ReactNode,
  iconSize: number,
  groupSelector: (card: CardDetails) => string,
) => {
  const groups: _.Dictionary<CardDetails[]> = _.groupBy(collectionItems, (x) => groupSelector(x));
  const result: JSX.Element[] = [];
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

    result.push(collectionCard);
  }

  return result;
};

const getCardElements = (
  collectionItems: CardDetails[],
  displayCount: number,
  iconSelector: (card: CardDetails, iconSize: number) => React.ReactNode,
  iconSize: number,
) => {
  return _.take(collectionItems, displayCount).map((item, index) => {
    return (
      <div key={index} className="d-flex flex-row c-avoid-break mb-4">
        <div className="d-inline-flex mr-3">
          <a href={item.url}>{iconSelector(item, iconSize)}</a>
        </div>
        <div className="d-inline-flex flex-column border-bar-left pl-3">
          <div
            key={item.title}
            className={classnames('text-left', 'pr-3', {
              'mb-3': index + 1 != collectionItems.length,
            })}
          >
            <a href={item.url} target="blank" className="text-secondary">
              <h5>{item.title}</h5>
            </a>
            {item.description}
          </div>
        </div>
      </div>
    );
  });
};
