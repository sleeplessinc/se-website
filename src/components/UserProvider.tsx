import React, { useEffect, useState } from 'react';
import { FirebaseContext } from '../firebase';
import app from 'firebase/app';
import * as alertify from 'alertifyjs';

export interface UserProviderProps {
  children?: React.ReactNode | null;
}

export interface IUser {
  user: app.User;
  isAdmin: boolean;
  isEditor: boolean;
}

const defaultProps: UserProviderProps = {
  children: null,
};

export const UserContext = React.createContext<IUser | null>(null);

const UserProvider: React.FC<UserProviderProps> = ({ children }: UserProviderProps) => {
  const firebaseContext = React.useContext(FirebaseContext);
  const [user, setUser] = useState<IUser | null>(null);
  useEffect(() => {
    const setState = async (user: app.User | null) => {
      if (!user) {
        alertify.success('Logged out');
        setUser(null);
        return;
      }

      let isAdmin = false;
      let isEditor = false;

      try {
        const token = await firebaseContext?.auth.currentUser?.getIdTokenResult();
        isAdmin = token?.claims['admin'];
        isEditor = token?.claims['editor'];
      } catch {
        alertify.error('Could not retrieve token');
      } finally {
        alertify.success('Logged in');
        setUser({ user: user, isAdmin: isAdmin, isEditor: isEditor });
      }
    };

    firebaseContext?.auth.onAuthStateChanged((userAuth) => {
      setState(userAuth);
    });
  }, [firebaseContext]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

UserProvider.defaultProps = defaultProps;

export default UserProvider;
