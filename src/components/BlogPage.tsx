import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { FirebaseContext } from '../firebase';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';
import useStateWithLocalStorage from '../utils/storage';
import PageNotFound from './PageNotFound';
import { Button, Spinner } from 'react-bootstrap';
import { UserContext } from './UserProvider';

const BlogPage: React.FC = () => {
  const firebaseContext = React.useContext(FirebaseContext);
  const userContext = React.useContext(UserContext);
  const { id } = useParams();
  const path = `blog/${id}`;
  const [content, setContent] = useStateWithLocalStorage(path);
  const [notFound, setnotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(content !== '');
  useEffect(() => {
    firebaseContext?.subscribeToPage(
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

  return notFound ? (
    <PageNotFound />
  ) : (
    <Container>
      {isLoading ? (
        <div className="text-center">
          <Spinner className="m-5" animation="border" role="status" variant="primary">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className="blog">
          {userContext?.isAdmin ? <Button className="position-absolute m-2">Edit Page</Button> : null}
          {parse(content)}
        </div>
      )}
    </Container>
  );
};

export default BlogPage;
