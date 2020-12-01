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

const DynamicContentPage: React.FC<DynamicContentPageProps> = ({
  pageName,
  title,
  backgroundSource,
}: DynamicContentPageProps) => {
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
    <div
      style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        overflow: 'scroll',
        backgroundImage: 'url(' + backgroundSource + ')',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <Container
        style={{
          height: '100%',
        }}
      >
        {title && (
          <Row
            className="align-items-center"
            style={{
              height: '100%',
            }}
          >
            <Col className="text-center align-self-center p-3 text-light bg-masked-dark rounded-xl">
              <h1>{title}</h1>
              <div className="text-left">{parse(content)}</div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
  return <>{parse(content)}</>;
};

export default DynamicContentPage;
