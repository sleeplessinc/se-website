import React, { useState } from 'react';
import { FirebaseContext } from '../firebase';
import { UserContext } from './UserProvider';
import { useHistory } from 'react-router-dom';
import { Button, Container, Spinner } from 'react-bootstrap';
import * as alertify from 'alertifyjs';

const Login: React.FC = () => {
  const history = useHistory();
  const userContext = React.useContext(UserContext);
  const firebaseContext = React.useContext(FirebaseContext);
  const alreadySignedIn: boolean = userContext !== null && userContext.user !== undefined;
  const [isBusy, setIsBusy] = useState(false);

  const handleClick = () => {
    setIsBusy(true);
    firebaseContext
      ?.signInWithGoogle()
      .catch((error) => {
        console.log('Log in error', error);
        alertify.error('Log in failed');
      })
      .finally(() => setIsBusy(false));
  };

  if (alreadySignedIn) {
    history.push('/');
  }

  return (
    <Container>
      <div className="text-center">
        {!isBusy ? (
          <Button className="m-2" onClick={handleClick}>
            Sign in with Google
          </Button>
        ) : (
          <Spinner className="m-5" animation="border" role="status" variant="primary">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
      </div>
    </Container>
  );
};

export default Login;
