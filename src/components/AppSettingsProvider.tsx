import React, { useEffect, useState } from 'react';
import { FirebaseContext } from '../firebase';
import app from 'firebase/app';
import * as alertify from 'alertifyjs';
import AppSettings from '../models/AppSettings';

export interface AppSettingsProps {
  children?: React.ReactNode | null;
}

export interface IUser {
  user: app.User;
  isAdmin: boolean;
  isEditor: boolean;
}

const defaultProps: AppSettingsProps = {
  children: null,
};

export const AppSettingsContext = React.createContext<AppSettings | null>(null);

const AppSettingsProvider: React.FC<AppSettingsProps> = ({ children }: AppSettingsProps) => {
  const firebaseContext = React.useContext(FirebaseContext);
  const [settings, setSettings] = useState<AppSettings | null>(null);

  useEffect(() => {
    return firebaseContext?.subscribeToAppSettings(setSettings, alertify.error);
  }, [firebaseContext]);

  return <AppSettingsContext.Provider value={settings}>{children}</AppSettingsContext.Provider>;
};

AppSettingsProvider.defaultProps = defaultProps;

export default AppSettingsProvider;
