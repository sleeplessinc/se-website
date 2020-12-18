import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { FirebaseContext } from '../firebase';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import PageNotFound from './PageNotFound';
import { Button, Col, Badge, Row, Spinner } from 'react-bootstrap';
import { UserContext } from './UserProvider';
import Blog from '../models/Blog';
import { formatDistance } from 'date-fns';
import * as config from '../config.json';

interface IContentPageProps {
  path: string;
}

const ContentPage: React.FC<IContentPageProps> = ({ path }: IContentPageProps) => {
  const firebaseContext = React.useContext(FirebaseContext);
  const userContext = React.useContext(UserContext);
  const [details, setDetails] = useState<Blog | undefined>(undefined);
  const [content, setContent] = useState('');
  const [notFound, setnotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(content ? false : true);

  useEffect(() => {
    return firebaseContext?.subscribeToPage(
      path,
      (results) => {
        if (!results || results === '') {
          setnotFound(true);
        } else {
          setContent(results);
          setIsLoading(false);
        }
      },
      (error) => {
        console.log(error);
        setnotFound(true);
      },
    );
  }, [firebaseContext]);

  useEffect(() => {
    return firebaseContext?.subscribeToPageDetails(path, setDetails, console.log);
  }, [firebaseContext]);

  return notFound ? (
    <PageNotFound />
  ) : (
    <Container className="blog">
      {isLoading ? (
        <div className="text-center">
          <Spinner className="m-5" animation="border" role="status" variant="primary">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          {userContext?.isAdmin ? (
            <Row>
              <Col />
              <Col sm="auto" className="mt-2">
                <Link to={`/${path}/edit`}>
                  <Button className="m-2">Edit Page</Button>
                </Link>
              </Col>
            </Row>
          ) : null}
          {details && (
            <Row>
              <Col>
                <img
                  src={config.googleCloudBaseUrl + config.bannerFolder + path + '.webp'}
                  width="100%"
                  height="auto"
                />
                <h1>{details?.title}</h1>
                by {details?.author}
                <br />
                <Badge variant="primary">{details?.category}</Badge>
                <small>
                  <p>{'Published ' + formatDistance(new Date(details?.published), new Date()) + ' ago'}</p>
                </small>
              </Col>
            </Row>
          )}
          <Row>
            <Col>{parse(content)}</Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ContentPage;
