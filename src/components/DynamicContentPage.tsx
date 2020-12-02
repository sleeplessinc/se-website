import React, { useEffect } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { FirebaseContext } from '../firebase';
import parse from 'html-react-parser';
import useStateWithLocalStorage from '../utils/storage';

interface DynamicContentPageProps {
  pageName: string;
  title?: string | null;
  backgroundSource?: string | null;
}

const DynamicContentPage: React.FC<DynamicContentPageProps> = ({ pageName, title }: DynamicContentPageProps) => {
  const firebaseContext = React.useContext(FirebaseContext);
  const [content, setContent] = useStateWithLocalStorage(pageName);
  useEffect(() => {
    firebaseContext?.subscribeToPage(
      pageName,
      (results) => {
        setContent(results);
      },
      (error) => {
        console.log(error);
      },
    );
  }, [firebaseContext]);
  return (
    <Container>
      {title && <h1 className="text-center m-3">{title}</h1>}
      <div className="text-left">{parse(content)}</div>
    </Container>
  );
  return <>{parse(content)}</>;
};

export default DynamicContentPage;
