import React, { useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Blog from '../models/Blog';
import { FirebaseContext } from '../firebase';
import { Jumbotron } from 'react-bootstrap';
import { formatDistance } from 'date-fns';
import useStateWithLocalStorage from '../utils/storage';

const BlogListPage: React.FC = () => {
  const firebaseContext = React.useContext(FirebaseContext);
  const [blogJson, setBlogJson] = useStateWithLocalStorage('blog');

  useEffect(() => {
    firebaseContext?.subscribeToBlogs(
      (results) => {
        setBlogJson(JSON.stringify(results));
      },
      (error) => {
        console.log(error);
      },
    );
  }, [firebaseContext]);

  const blogs: Blog[] = blogJson === '' ? [] : JSON.parse(blogJson);

  const blogCards = blogs?.map((blog) => {
    return (
      <Jumbotron key={blog.path} className="rounded-xl">
        <Container>
          <Row className="justify-content-center">
            <Col sm={4} className="blog-thumb">
              <img src={blog.thumbnail} height="100%" width="auto" />
            </Col>
            <Col sm={8}>
              <h1>{blog.title}</h1>
              <p>{'Published ' + formatDistance(new Date(blog.published), new Date()) + ' ago'}</p>
              <p>{blog.blurb}</p>
              <Button variant="primary" className="align-text-bottom" href={'blog/' + blog.path}>
                Continue
              </Button>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    );
  });

  return <Container>{blogCards}</Container>;
};

export default BlogListPage;
