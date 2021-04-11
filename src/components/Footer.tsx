import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Col, Container, Nav } from 'react-bootstrap';
import { ReactComponent as FacebookIcon } from '../images/icon-facebook.svg';
import { ReactComponent as RedditIcon } from '../images/icon-reddit.svg';
import { ReactComponent as TwitterIcon } from '../images/icon-twitter.svg';
import { ReactComponent as DiscordIcon } from '../images/icon-discord.svg';
import { ThemeContext } from './ThemeProvider';

const Footer: React.FC = () => {
  const themeContext = React.useContext(ThemeContext);
  const iconSize = '32px';
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="footer">
      <Container fluid>
        <Col md={3} className="text-center m-1">
          <Nav className="mr-auto">
            <Nav.Link href="/contact">Contact Us</Nav.Link>
          </Nav>
        </Col>
        <Col md className="text-center m-1">
          <Nav.Link href="https://discordapp.com/invite/sKap3zM" target="blank" className="d-inline">
            <DiscordIcon width={iconSize} height={iconSize} fill={themeContext?.light} />
          </Nav.Link>
          <Nav.Link href="https://www.facebook.com/StreetEpistemology/" target="blank" className="d-inline">
            <FacebookIcon width={iconSize} height={iconSize} fill={themeContext?.light} />
          </Nav.Link>
          <Nav.Link href="https://www.reddit.com/r/StreetEpistemology/" target="blank" className="d-inline">
            <RedditIcon width={iconSize} height={iconSize} fill={themeContext?.light} />
          </Nav.Link>
          <Nav.Link href="https://twitter.com/StEpistemology" target="blank" className="d-inline">
            <TwitterIcon width={iconSize} height={iconSize} fill={themeContext?.light} />
          </Nav.Link>
        </Col>
        <Col md={3} className="text-center m-1">
          <small className="d-block d-md-inline-block align-middle m-2 pr-2 text-light font-weight-light">
            Copyright &copy; {new Date().getFullYear()}
            <br />
            Street Epistemology International
          </small>
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
