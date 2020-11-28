import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { FirebaseContext } from '../firebase';
import parse from 'html-react-parser';

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
  const [content, setContent] = useState<string>('');
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
      <Container className="section-background align-items-center">
        {title && (
          <Row className="align-items-center">
            <Col sm className="text-center align-self-center">
              <div className={'align-self-center p-3 text-light bg-masked-dark rounded-xl'}>
                <h1>{title}</h1>
                <div className="text-left">{parse(content)}</div>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
  return <>{parse(content)}</>;
};

export default DynamicContentPage;
