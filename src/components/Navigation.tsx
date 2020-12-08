import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';
import { UserContext } from './UserProvider';
import { FirebaseContext } from '../firebase';
import { Link } from 'react-router-dom';

interface ScrollState {
  prevScrollpos: number;
  visible: boolean;
}

const Navigation: React.FC = () => {
  const [scrollState, setScrollState] = useState<ScrollState>({
    prevScrollpos: window.pageYOffset,
    visible: true,
  });
  const user = React.useContext(UserContext);
  const firebase = React.useContext(FirebaseContext);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setScrollState({
      prevScrollpos: currentScrollPos,
      visible: scrollState.prevScrollpos > currentScrollPos,
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const isTop = window.pageYOffset === 0;
  const location: 'top' | undefined = isTop ? undefined : 'top';
  const handleSignIn = async () => {
    if (!user) {
      await firebase?.signInWithGoogle();
    } else {
      await firebase?.signOut();
    }
  };

  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      fixed={location}
      className={classnames('navbar-animated', {
        'navbar-hidden': !scrollState.visible,
      })}
    >
      <Navbar.Brand as={Link} to="/" className="montserrat">
        <img
          alt=""
          src={process.env.PUBLIC_URL + '/img/logo_app.webp'}
          width="55"
          height="auto"
          className="d-inline-block align-middle mr-2"
        />
        <div className="d-inline">
          <span className="d-none d-sm-inline-block">Street Epistemology</span>
        </div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/faq">
            FAQ
          </Nav.Link>
          <Nav.Link as={Link} to="/#examples">
            Examples
          </Nav.Link>
          <Nav.Link as={Link} to="/#resources">
            Resources
          </Nav.Link>
          <Nav.Link as={Link} to="/#communities">
            Communities
          </Nav.Link>
          <Nav.Link as={Link} to="/#creators">
            Creators
          </Nav.Link>
          <Nav.Link as={Link} to="/#shop">
            Shop
          </Nav.Link>
          <Nav.Link as={Link} to="/#guide">
            Guide
          </Nav.Link>
          <Nav.Link as={Link} to="/blog">
            Blog
          </Nav.Link>
          <Nav.Link onClick={handleSignIn}>{user ? 'Sign Out' : 'Sign In'}</Nav.Link>
          <Nav.Link as={Link} to="/admin">
            Admin
          </Nav.Link>
          {user?.isAdmin ? <Link to="/admin">Admin</Link> : null}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
