/* eslint-disable @typescript-eslint/no-explicit-any */
import app from 'firebase/app';
import 'firebase/database';
import { deserialize } from 'json-typescript-mapper';
import CollectionType from '../enums/CollectionType';
import Blog from '../models/Blog';
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
  auth: app.auth.Auth;
  provider: app.auth.GoogleAuthProvider;

  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.provider = new app.auth.GoogleAuthProvider();
  }

  database(): app.database.Database {
    return app.database();
  }

  signInWithGoogle = async (): Promise<void> => {
    await this.auth.signInWithPopup(this.provider);
  };

  signOut = async (): Promise<void> => {
    await this.auth.signOut();
  };

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
          const collection = Object.keys(val).map((key) => {
            const session = mapper.mapAnyToCardDetails(val[key]);
            return session;
          });
          callback(collection);
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

  subscribeToBlogs(callback: (blogs: Blog[]) => void, cancelCallbackOrContext?: (error: any) => void): void {
    app
      .database()
      .ref(`blog`)
      .on(
        'value',
        (snapshot) => {
          const val = snapshot.val();
          const blogs = Object.keys(val)
            .map((key) => {
              const blog = deserialize(Blog, val[key]);
              blog.path = key;
              return blog;
            })
            .sort(
              (first: Blog, second: Blog) => new Date(second.published).getTime() - new Date(first.published).getTime(),
            );
          callback(blogs);
        },
        cancelCallbackOrContext,
      );
  }
}

export default Firebase;
