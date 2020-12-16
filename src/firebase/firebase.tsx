/* eslint-disable @typescript-eslint/no-explicit-any */
import app from 'firebase/app';
import 'firebase/database';
import 'firebase/functions';
import { deserialize } from 'json-typescript-mapper';
import CollectionType from '../enums/CollectionType';
import Blog from '../models/Blog';
import CardDetails from '../models/CardDetails';
import * as firebaseConfig from '../firebase-config.json';
import AppSettings from '../models/AppSettings';

interface IUserClaims {
  admin?: boolean;
  editor?: boolean;
}

interface IEmail {
  email: string;
  subject: string;
  message: string;
}

class Firebase {
  auth: app.auth.Auth;
  provider: app.auth.GoogleAuthProvider;
  functions: app.functions.Functions;

  constructor() {
    app.initializeApp(firebaseConfig.config);
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

  sendMail = async (email: IEmail, callback: () => void, errorCallback: (error: any) => void): Promise<void> => {
    return this.functions
      .httpsCallable('sendMail')(email)
      .then((result) => {
        console.log(result);
        if ('error' in result.data) {
          errorCallback(result.data.error);
          return;
        }

        callback();
      })
      .catch(errorCallback);
  };

  subscribeToPath<T>(
    path: string,
    converter: (snapshot: any) => T,
    callback: (content: T) => void,
    cancelCallbackOrContext?: (error: any) => void,
  ): () => void {
    const internalCallback = (snapshot) => {
      if (!snapshot || !snapshot.val()) {
        if (cancelCallbackOrContext) cancelCallbackOrContext('Not found');
        return;
      }

      const content = converter(snapshot);
      callback(content);
    };
    app.database().ref(path).on('value', internalCallback, cancelCallbackOrContext);
    return () => {
      app.database().ref(path).off('value', internalCallback);
    };
  }

  subscribeToBlogs(callback: (blogs: Blog[]) => void, cancelCallbackOrContext?: (error: any) => void): () => void {
    const converter = (snapshot) => {
      const val = snapshot.val();
      return Object.keys(val)
        .map((key) => {
          const blog = deserialize(Blog, val[key]);
          blog.path = key;
          return blog;
        })
        .sort(
          (first: Blog, second: Blog) => new Date(second.published).getTime() - new Date(first.published).getTime(),
        );
    };
    return this.subscribeToPath(`page-details/blog`, converter, callback, cancelCallbackOrContext);
  }

  subscribeToCollection(
    collectionType: CollectionType,
    callback: (sessions: CardDetails[]) => void,
    cancelCallbackOrContext?: (error: any) => void,
  ): () => void {
    const path = CollectionType[collectionType].toLowerCase();
    const converter = (snapshot) => {
      const val = snapshot.val();
      return Object.keys(val).map((key) => {
        const session = deserialize(CardDetails, val[key]);
        return session;
      });
    };

    return this.subscribeToPath(path, converter, callback, cancelCallbackOrContext);
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

  subscribeToAppSettings(
    callback: (value: AppSettings) => void,
    cancelCallbackOrContext?: (error: any) => void,
  ): () => void {
    return this.subscribeToPath(
      `settings`,
      (snapshot) => deserialize(AppSettings, snapshot.val()),
      callback,
      cancelCallbackOrContext,
    );
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
}

export default Firebase;
