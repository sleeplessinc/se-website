import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { FirebaseContext } from '../firebase';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';
import useStateWithLocalStorage from '../utils/storage';
import PageNotFound from './PageNotFound';
import { Spinner } from 'react-bootstrap';

const BlogPage: React.FC = () => {
  const firebaseContext = React.useContext(FirebaseContext);
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
        setnotFound(true);
        console.log(error);
      },
    );
  }, [firebaseContext]);
  console.log(content);
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
        <div className="text-justify">{parse(content)}</div>
      )}
    </Container>
  );
};

export default BlogPage;
