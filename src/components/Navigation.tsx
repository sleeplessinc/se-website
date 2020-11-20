import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../images/se_logo_wide.png';

interface ScrollState {
  prevScrollpos: number;
  visible: boolean;
}

const Navigation: React.FC = () => {
  const [scrollState, setScrollState]: [
    ScrollState,
    (value: ScrollState) => void
  ] = useState<ScrollState>({
    prevScrollpos: window.pageYOffset,
    visible: true,
  });

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

  return (
    <Navbar
      bg="dark"
      variant="dark"
      className={classnames(
        'navbar',
        'navbar-expand-lg',
        'navbar-light',
        'bg-light',
        {
          'navbar-hidden': !scrollState.visible,
        }
      )}
    >
      <Navbar.Brand href="#home" className="montserrat">
        <img
          alt=""
          src={logo}
          width="55"
          height="30"
          className="d-inline-block align-middle mr-2"
        />{' '}
        Street Epistemology
      </Navbar.Brand>
    </Navbar>
  );
};

export default Navigation;