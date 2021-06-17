import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { FirebaseContext } from '../firebase';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import useStateWithLocalStorage from '../utils/storage';
import PageNotFound from './PageNotFound';
import { Button, Col, Badge, Row, Spinner } from 'react-bootstrap';
import { UserContext } from './UserProvider';
import Blog from '../models/Blog';
import { formatDistance } from 'date-fns';
import * as config from '../config.json';
import ParallaxSection from './ParallaxSection';

interface IContentPageProps {
  path: string;
  showAttribution?: boolean;
}

const defaultProps: IContentPageProps = {
  path: '',
  showAttribution: true,
};

const ContentPage: React.FC<IContentPageProps> = ({ path, showAttribution }: IContentPageProps) => {
  const firebaseContext = React.useContext(FirebaseContext);
  const userContext = React.useContext(UserContext);
  const [details, setDetails] = useState<Blog | undefined>(undefined);
  const [content, setContent] = useStateWithLocalStorage(path);
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
    <div className="bg-dark">
      <Container className="blog bg-light">
        {isLoading ? (
          <div className="text-center">
            <Spinner className="m-5" animation="border" role="status" variant="primary">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            {userContext?.isAdmin ? (
              <Row>1
                <Col />
                <Col sm="auto" className="mt-2">
                  <Link to={`/${path}/edit`}>
                    <Button className="m-2">Edit Page</Button>
                  </Link>
                </Col>
              </Row>
            ) : null}
            <Row>
              <Col className="p-0">
                  {/*backgroundSource={config.googleCloudBaseUrl + config.bannerFolder + path + '.webp'}*/}
                  {/*backgroundSource={'/img/banners/' + path + '.webp'}*/}
                <ParallaxSection
                  backgroundSource={config.googleCloudBaseUrl + config.bannerFolder + path + '.webp'}

                  wrapInContainer={false}
                  overlayOpacity={0}
                >
                  <Container className="align-middle">
                    <Row className="align-items-end " style={{ minHeight: '400px' }}>
                      <Col className="bg-primary text-light px-4 py-2" sm="auto">
                        <h1>{details?.title}</h1>
                      </Col>
                    </Row>
                  </Container>
                  {/* <div className="bg-primary text-light px-4">
                    <h1 className="my-2">{details?.title}</h1>
                  </div> */}
                </ParallaxSection>
              </Col>
            </Row>
            <Row className="px-4 pb-4">
              <Col>
                {!(details && showAttribution) ? null : (
                  <p>
                    by {details?.author}
                    <br />
                    <Badge variant="primary">{details?.category}</Badge>
                    <small>
                      <p>{'Published ' + formatDistance(new Date(details?.published), new Date()) + ' ago'}</p>
                    </small>
                  </p>
                )}
                {parse(content)}
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

ContentPage.defaultProps = defaultProps;

export default ContentPage;
