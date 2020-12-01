import React, { useEffect } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { FirebaseContext } from '../firebase';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';
import useStateWithLocalStorage from '../utils/storage';

const BlogPage: React.FC = () => {
  const firebaseContext = React.useContext(FirebaseContext);
  const { id } = useParams();
  const path = `blog/${id}`;
  const [content, setContent] = useStateWithLocalStorage(path);
  useEffect(() => {
    firebaseContext?.subscribeToPage(
      path,
      (results) => {
        setContent(results);
      },
      (error) => {
        console.log(error);
      },
    );
  }, [firebaseContext]);
  console.log('Content: ' + content);
  return (
    <div
      style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        overflow: 'scroll',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <Container
        style={{
          height: '100%',
        }}
      >
        <div className="text-left">{parse(content)}</div>
      </Container>
    </div>
  );
};

export default BlogPage;
