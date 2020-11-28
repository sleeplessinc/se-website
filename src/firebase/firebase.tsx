/* eslint-disable @typescript-eslint/no-explicit-any */
import app from 'firebase/app';
import 'firebase/database';
import CollectionType from '../enums/CollectionType';
import CardDetails from '../models/CardDetails';
import * as mapper from '../utils/mapper';

const config = {
  apiKey: 'AIzaSyBBmfx-gBbK-zr2S2aVN5cJeTXo1BrX1OI',
  authDomain: 'se-website-fe4a4.firebaseapp.com',
  databaseURL: 'https://se-website-fe4a4.firebaseio.com',
  projectId: 'se-website-fe4a4',
  storageBucket: 'se-website-fe4a4.appspot.com',
  messagingSenderId: '46383537676',
  appId: '1:46383537676:web:9dacd993f857c3cec1d829',
};

class Firebase {
  constructor() {
    app.initializeApp(config);
  }
  database(): app.database.Database {
    return app.database();
  }

  subscribeToCollection(
    collectionType: CollectionType,
    callback: (sessions: CardDetails[]) => void,
    cancelCallbackOrContext?: (error: any) => void,
  ): void {
    app
      .database()
      .ref(CollectionType[collectionType].toLowerCase())
      .on(
        'value',
        (snapshot) => {
          const val = snapshot.val();
          const sessions = Object.keys(val).map((key) => {
            const session = mapper.mapAnyToCardDetails(val[key]);
            return session;
          });
          callback(sessions);
        },
        cancelCallbackOrContext,
      );
  }

  subscribeToPage(
    pageName: string,
    callback: (content: string) => void,
    cancelCallbackOrContext?: (error: any) => void,
  ): void {
    app
      .database()
      .ref(`pages/${pageName}`)
      .on(
        'value',
        (snapshot) => {
          const content = snapshot.val() as string;
          callback(content);
        },
        cancelCallbackOrContext,
      );
  }
}

export default Firebase;
