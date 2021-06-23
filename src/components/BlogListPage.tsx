import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Blog from '../models/Blog';
import { FirebaseContext } from '../firebase';
import { Badge, Jumbotron, Spinner } from 'react-bootstrap';
import { formatDistance } from 'date-fns';
import useStateWithLocalStorage from '../utils/storage';
import * as config from '../config.json';
import { Link } from 'react-router-dom';
import CollectionType from '../enums/CollectionType';

export interface BlogListPageProps {
  collectionType: CollectionType.Blog;
}

const BlogListPage: React.FC<BlogListPageProps> = ({ collectionType }: BlogListPageProps) => {
  const firebaseContext = React.useContext(FirebaseContext);
  const [blogJson, setBlogJson] = useStateWithLocalStorage('blog');
  const [isLoading, setIsLoading] = useState(blogJson !== '');
  const [details, setDetails] = useState<Blog | undefined>(undefined);

  useEffect(() => {
    return firebaseContext?.subscribeToBlogs(
      (results) => {
        setBlogJson(JSON.stringify(results));
        setIsLoading(false);
      },
      (error) => {
        console.log(error);
        setIsLoading(false);
      },
    );
  }, [firebaseContext]);

  useEffect(() => {
    return firebaseContext?.subscribeToCollectionDetails(collectionType, setDetails, console.log);
  }, [firebaseContext]);

  const blogs: Blog[] = blogJson ? JSON.parse(blogJson) : [];
  const blogCards = blogs?.map((blog) => {
    const url = 'blog/' + blog.path;
    return (
      <Jumbotron key={blog.path} className="rounded-xl bg-transparent p-0 my-5 text-light">
        <Container>
          <Row className="justify-content-center">
            <Col md={4}>
              <Link to={url}>
                <div
                  className="blog-img-container"
                  style={{
                    background: `url(${
                      config.googleCloudBaseUrl + config.thumbFolder + 'blog/' + blog.path + '.webp'
                    })`,
                    backgroundSize: '100% auto',
                    backgroundRepeat: 'no-repeat',
                    backgroundPositionY: 'center',
                  }}
                />
              </Link>
            </Col>
            <Col md={8}>
              <div className="border-bar-top py-3">
                <Link to={url} className="text-light">
                  <h1>{blog.title}</h1>
                </Link>
                by {blog.author}
                <br />
                <Badge variant="primary">{blog.category}</Badge>
                <small>
                  <p>{'Published ' + formatDistance(new Date(blog.published), new Date()) + ' ago'}</p>
                </small>
                <p>{blog.blurb}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    );
  });

  return (
    <div className="bg-dark" style={{ minHeight: '100vh' }}>
      <Container>
        {isLoading ? (
          <div className="text-center">
            <Spinner className="m-5" animation="border" role="status" variant="primary">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            {true && (
              <Row className="justify-content-center">
                <Col md={10} className="text-center mt-5">
                  <h1 className="text-light">The Official Street Epistemology Blog</h1>
                  <h4 className="text-light">We welcome thoughtful and relevant blog submissions from the SE community.</h4>
				  <a className="text-secondary" href="/blog-submission-process" title="Link to information about submitting blog articles">How to submit a blog article.</a>
                </Col>
              </Row>
            )}
          	{ blogCards }
          </>
        )}
      </Container>
    </div>
  );
};
/* "We welcome thoughtful and relevant blog submissions from the SE community. &nbsp; <a href=\"/publications/street_epistemology_blog_submission_process\" title=\"Link to information about submitting blog articles\">How to submit a blog article.</a>" */
/* We welcome thoughtful and relevant blog submissions from the SE community.  How to submit a blog article. */

export default BlogListPage;
