import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Col, Container, Nav } from 'react-bootstrap';
import icon_facebook from '../images/icon-facebook.svg';
import icon_reddit from '../images/icon-reddit.svg';
import icon_twitter from '../images/icon-twitter.svg';
import icon_discord from '../images/icon-discord.svg';

const Footer: React.FC = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="bottom">
      <Container fluid>
        <Col md={3} className="text-center m-1">
          <Nav className="mr-auto">
            <Nav.Link href="/contact">Contact Us</Nav.Link>
          </Nav>
        </Col>
        <Col md className="text-center m-1">
          <Nav.Link href="https://discordapp.com/invite/sKap3zM" className="d-inline">
            <img src={icon_discord} width="30px" height="30px" />
          </Nav.Link>
          <Nav.Link href="https://www.facebook.com/StreetEpistemology/" className="d-inline">
            <img src={icon_facebook} width="30px" height="30px" />
          </Nav.Link>
          <Nav.Link href="https://www.reddit.com/r/StreetEpistemology/" className="d-inline">
            <img src={icon_reddit} width="30px" height="30px" />
          </Nav.Link>
          <Nav.Link href="https://twitter.com/StEpistemology" className="d-inline">
            <img src={icon_twitter} width="30px" height="30px" />
          </Nav.Link>
        </Col>
        <Col md={3} className="text-center m-1">
          <div className="d-inline-block align-middle mr-2 pr-2 text-light font-weight-light text-right">
            Copyright &copy; {new Date().getFullYear()}
            <br />
            Street Epistemology International
          </div>
          <a href="https://streetepistemologyinternational.org/" target="blank">
            <img
              alt=""
              src={process.env.PUBLIC_URL + '/img/logo_app.webp'}
              width="65"
              height="auto"
              className="d-inline-block align-middle mr-2"
            />
          </a>
        </Col>
      </Container>
    </Navbar>
  );
};

export default Footer;
