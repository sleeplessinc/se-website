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

const defaultSettings: AppSettings = {
  contactAddress: 'contact@streetepistemologyinternational.org',
  featuredVideo: {
    author: 'Street Epistemology',
    channelUrl: 'https://www.youtube.com/user/StreetEpistemologist',
    videoId: 'r1e4HZfHSRQ',
  },
  shopUrl: 'https://www.evolvefish.com/Street-Epistemology_c_143.html',
};

export const AppSettingsContext = React.createContext<AppSettings>(defaultSettings);

const AppSettingsProvider: React.FC<AppSettingsProps> = ({ children }: AppSettingsProps) => {
  const firebaseContext = React.useContext(FirebaseContext);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  useEffect(() => {
    return firebaseContext?.subscribeToAppSettings(setSettings, alertify.error);
  }, [firebaseContext]);

  console.info('Setting loaded');
  return <AppSettingsContext.Provider value={settings}>{children}</AppSettingsContext.Provider>;
};

AppSettingsProvider.defaultProps = defaultProps;

export default AppSettingsProvider;
