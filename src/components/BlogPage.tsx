import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { FirebaseContext } from '../firebase';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';
import useStateWithLocalStorage from '../utils/storage';
import PageNotFound from './PageNotFound';

const BlogPage: React.FC = () => {
  const firebaseContext = React.useContext(FirebaseContext);
  const { id } = useParams();
  const path = `blog/${id}`;
  const [content, setContent] = useStateWithLocalStorage(path);
  const [notFound, setnotFound] = useState(false);
  useEffect(() => {
    firebaseContext?.subscribeToPage(
      path,
      (results) => {
        if (!results || results === '') {
          setnotFound(true);
        } else {
          setContent(results);
        }
      },
      (error) => {
        setnotFound(true);
        console.log(error);
      },
    );
  }, [firebaseContext]);
  console.log(content);
  return notFound ? <PageNotFound /> : <Container>{parse(content)}</Container>;
};

export default BlogPage;
