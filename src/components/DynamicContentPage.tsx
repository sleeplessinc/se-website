import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { FirebaseContext } from '../firebase';
import parse from 'html-react-parser';
import useStateWithLocalStorage from '../utils/storage';
import { Spinner } from 'react-bootstrap';

interface DynamicContentPageProps {
  pageName: string;
  title?: string | null;
  backgroundSource?: string | null;
}

const DynamicContentPage: React.FC<DynamicContentPageProps> = ({ pageName, title }: DynamicContentPageProps) => {
  const firebaseContext = React.useContext(FirebaseContext);
  const [content, setContent] = useStateWithLocalStorage(pageName);
  const [isLoading, setIsLoading] = useState(content !== '');
  useEffect(() => {
    firebaseContext?.subscribeToPage(
      pageName,
      (results) => {
        setContent(results);
        setIsLoading(false);
      },
      (error) => {
        console.log(error);
        setIsLoading(false);
      },
    );
  }, [firebaseContext]);

  return (
    <Container>
      {isLoading ? (
        <div className="text-center">
          <Spinner className="m-2" animation="border" role="status" variant="primary">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          {title && <h1 className="text-center m-3">{title}</h1>}
          <div className="text-left">{parse(content)}</div>
        </>
      )}
    </Container>
  );
  return <>{parse(content)}</>;
};

export default DynamicContentPage;
