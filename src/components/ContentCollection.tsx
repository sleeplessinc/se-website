import React, { useEffect, useState } from 'react';
import IconNavigator from './IconNavigator';
import SectionStyle from '../enums/SectionStyle';
import { FirebaseContext } from '../firebase';
import CardDetails from '../models/CardDetails';
import CollectionType from '../enums/CollectionType';

export interface ContentCollectionProps {
  collectionType: CollectionType;
  sectionStyle?: SectionStyle;
  roundCards?: boolean;
}

const ContentCollection: React.FC<ContentCollectionProps> = ({
  collectionType,
  sectionStyle,
  roundCards,
}: ContentCollectionProps) => {
  const firebaseContext = React.useContext(FirebaseContext);
  const [state, setState] = useState<[CardDetails[], boolean]>([[], true]);
  useEffect(() => {
    firebaseContext?.subscribeToCollection(
      collectionType,
      (results) => {
        setState([results, false]);
      },
      (error) => {
        console.log(error);
        setState([[], false]);
      },
    );
  }, [firebaseContext]);

  return (
    <IconNavigator cardDetails={state[0]} sectionStyle={sectionStyle} roundCards={roundCards} isLoading={state[1]} />
  );
};

export default ContentCollection;
