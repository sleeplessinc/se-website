import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface ScrollState {
  prevScrollpos: number;
  visible: boolean;
}

const Navigation: React.FC = () => {
  const [scrollState, setScrollState]: [ScrollState, (value: ScrollState) => void] = useState<ScrollState>({
    prevScrollpos: window.pageYOffset,
    visible: true,
  });

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    console.log(
      `Visible: ${scrollState.prevScrollpos > currentScrollPos}, Prev: ${
        scrollState.prevScrollpos
      }, Current: ${currentScrollPos}`,
    );
    setScrollState({
      prevScrollpos: currentScrollPos,
      visible: scrollState.prevScrollpos > currentScrollPos,
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      fixed="top"
      className={classnames('navbar-animated', {
        'navbar-hidden': !scrollState.visible,
      })}
    >
      <Link to="/">
        <Navbar.Brand href="/" className="montserrat">
          <img
            alt=""
            src={process.env.PUBLIC_URL + '/img/logo_app.webp'}
            width="55"
            height="auto"
            className="d-inline-block align-middle mr-2"
          />{' '}
          Street Epistemology
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/faq">FAQ</Nav.Link>
          <Nav.Link href="/#examples">Examples</Nav.Link>
          <Nav.Link href="/#resources">Resources</Nav.Link>
          <Nav.Link href="/#communities">Communities</Nav.Link>
          <Nav.Link href="/#creators">Creators</Nav.Link>
          <Nav.Link href="/#shop">Shop</Nav.Link>
          <Nav.Link href="/#guide">Guide</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
