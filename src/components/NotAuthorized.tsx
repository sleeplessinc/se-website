import React from 'react';
import ErrorPage from './ErrorPage';

const NotAuthorized: React.FC = () => {
  return (
    <ErrorPage title="401 - Are you supposed to be here?" message="It is important to always respect boundaries." />
  );
};

export default NotAuthorized;
