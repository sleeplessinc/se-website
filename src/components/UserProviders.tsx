import React, { useEffect, useState } from 'react';
import { FirebaseContext } from '../firebase';
import app from 'firebase/app';

export interface UserProviderProps {
  children?: React.ReactNode | null;
}

const defaultProps: UserProviderProps = {
  children: null,
};

export const UserContext = React.createContext<app.User | null>(null);

const UserProvider: React.FC<UserProviderProps> = ({ children }: UserProviderProps) => {
  const firebaseContext = React.useContext(FirebaseContext);
  const [user, setUser] = useState<app.User | null>(null);
  useEffect(() => {
    firebaseContext?.auth.onAuthStateChanged((userAuth) => {
      setUser(userAuth);
    });
  }, [firebaseContext]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

UserProvider.defaultProps = defaultProps;

export default UserProvider;
