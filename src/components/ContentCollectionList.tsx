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
import { ReactComponent as FacebookIcon } from '../images/icon-facebook.svg';
import { ReactComponent as DiscordIcon } from '../images/icon-discord.svg';
import { ReactComponent as RedditIcon } from '../images/icon-reddit.svg';
import { ReactComponent as TwitterIcon } from '../images/icon-twitter.svg';
import { ReactComponent as YoutubeIcon } from '../images/icon-youtube.svg';
import { ThemeContext } from './ThemeProvider';

export interface Props {
  collectionType: CollectionType;
  iconSize?: number;
}

const defaultProps: Props = {
  collectionType: CollectionType.Communities,
  iconSize: 80,
};

const ContentCollectionList: React.FC<Props> = ({ collectionType, iconSize }: Props) => {
  const firebaseContext = React.useContext(FirebaseContext);
  const themeContext = React.useContext(ThemeContext);
  const [collection, setCollection] = useStateWithLocalStorage(collectionType.toString());
  const [isLoading, setIsLoading] = useState(collection !== '');
  const icons = {
    facebook: <FacebookIcon className="mb-2" width={iconSize} height={iconSize} fill={themeContext?.light} />,
    discord: <DiscordIcon className="mb-2" width={iconSize} height={iconSize} fill={themeContext?.light} />,
    reddit: <RedditIcon className="mb-2" width={iconSize} height={iconSize} fill={themeContext?.light} />,
    twitter: <TwitterIcon className="mb-2" width={iconSize} height={iconSize} fill={themeContext?.light} />,
    youtube: <YoutubeIcon className="mb-2" width={iconSize} height={iconSize} fill={themeContext?.light} />,
  };

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
          className={classnames('text-left', 'd-flex', 'flex-column', {
            'mb-4': index + 1 != cards.length,
          })}
        >
          <a href={card.url} target="blank" style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <h5>{card.title}</h5>
            <small>{card.description}</small>
          </a>
        </div>
      );
    });
    const hasOneCard = cardElements.length === 1;
    const collectionCard = (
      <Container fluid={true} key={key} className="text-light mb-4 d-flex">
        <Row className="justify-content-center c-avoid-break">
          <Col xs={2} className="d-flex justify-content-center align-items-top border-bar-right pr-5">
            <a href={hasOneCard ? cards[0].url : ''}>{icons[cards[0].logo?.substring(5) ?? 'facebook']}</a>
          </Col>
          <Col className="d-flex align-items-start justify-content-start flex-column pr-0" xs={8}>
            {cardElements}
          </Col>
        </Row>
      </Container>
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

ContentCollectionList.defaultProps = defaultProps;

export default ContentCollectionList;
