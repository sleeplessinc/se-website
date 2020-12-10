/* eslint-disable @typescript-eslint/no-explicit-any */
import app from 'firebase/app';
import 'firebase/database';
import 'firebase/functions';
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

interface IUserClaims {
  admin?: boolean;
  editor?: boolean;
}

class Firebase {
  auth: app.auth.Auth;
  provider: app.auth.GoogleAuthProvider;
  functions: app.functions.Functions;

  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.provider = new app.auth.GoogleAuthProvider();
    this.functions = app.functions();
  }

  database(): app.database.Database {
    return app.database();
  }

  signInWithGoogle = async (): Promise<app.auth.UserCredential> => {
    return this.auth.signInWithPopup(this.provider);
  };

  signOut = async (): Promise<void> => {
    return this.auth.signOut();
  };

  assignAdmin = async (email: string): Promise<IUserClaims | undefined> => {
    return this.assignClaim(email, { admin: true });
  };

  revokeAdmin = async (email: string): Promise<IUserClaims | undefined> => {
    return this.assignClaim(email, { admin: false });
  };

  assignEditor = async (email: string): Promise<IUserClaims | undefined> => {
    return this.assignClaim(email, { editor: true });
  };

  revokeEditor = async (email: string): Promise<IUserClaims | undefined> => {
    return this.assignClaim(email, { editor: false });
  };

  private assignClaim = async (email: string, claim: IUserClaims): Promise<IUserClaims | undefined> => {
    return this.functions
      .httpsCallable('setClaim')({ email: email, claim: claim })
      .then((result) => {
        // Read result of the Cloud Function.
        return result.data.claim as IUserClaims;
      })
      .catch((error) => {
        // Getting the Error details.
        // const code = error.code;
        const message = error.message;
        // const details = error.details;
        console.log(message);
        return undefined;
      });
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
  ): () => void {
    return this.subscribeToPath(
      `pages/${pageName}`,
      (snapshot) => snapshot.val() as string,
      callback,
      cancelCallbackOrContext,
    );
  }

  subscribeToPageDetails(
    pageName: string,
    callback: (content: Blog) => void,
    cancelCallbackOrContext?: (error: any) => void,
  ): () => void {
    return this.subscribeToPath(
      `page-details/${pageName}`,
      (snapshot) => deserialize(Blog, snapshot.val()),
      callback,
      cancelCallbackOrContext,
    );
  }

  subscribeToPath<T>(
    path: string,
    converter: (snapshot: any) => T,
    callback: (content: T) => void,
    cancelCallbackOrContext?: (error: any) => void,
  ): () => void {
    const internalCallback = (snapshot) => {
      const content = converter(snapshot);
      callback(content);
    };
    app.database().ref(path).on('value', internalCallback, cancelCallbackOrContext);
    return () => {
      app.database().ref(path).off('value', internalCallback);
    };
  }

  updatePageContent(
    pageName: string,
    content: string,
    callback: () => void,
    errorCallback?: (error: string) => void,
  ): void {
    app
      .database()
      .ref(`pages/${pageName}`)
      .set(content, (error) => {
        if (error && errorCallback) {
          errorCallback(error.message);
          return;
        }

        callback();
      });
  }

  subscribeToBlogs(callback: (blogs: Blog[]) => void, cancelCallbackOrContext?: (error: any) => void): void {
    app
      .database()
      .ref('page-details/blog')
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
