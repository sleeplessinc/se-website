import React from 'react';
import video_camera from '../images/bg_video_camera.webp';
import bg_tools from '../images/bg_tools.webp';
import bg_filming from '../images/bg_filming.webp';
import bg_community from '../images/bg_community.webp';
import Section from './Section';
import SectionStyle from '../enums/SectionStyle';
import ShopSection from './ShopSection';
import ExamplesPage from './ExamplesPage';
import GuidePage from './GuidePage';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import ParallaxSection from './ParallaxSection';
import { LOGO_SE_WHITE, URL_BG_THINKING } from '../utils/constants';

const MainPage: React.FC = () => {
  return (
    <div className="container-fluid p-0">
      <ParallaxSection backgroundSource={URL_BG_THINKING}>
        <div className="my-5 py-5 text-center">
          <h1>The World Needs Better Conversations</h1>
          <h4 className="my-4">
            <span className="text-logo">Street Epistemology</span> is a set of tools that helps you have better
            conversations about difficult topics.
          </h4>
          <h4 className="my-4">
            It has the power to change minds (even your own) by making us think deeply about the way in which we reach
            conclusions.
          </h4>
          <Button variant="primary">Find Out More</Button>
        </div>
      </ParallaxSection>
      <div className="bg-dark text-light">
        <Container className="py-5">
          <Row>
            {/* <Col className="bg-secondary d-flex justify-content-center align-items-center" md>
              <img alt="" src={LOGO_SE} width="300" height="auto" className="d-inline-block align-middle mr-2" />
            </Col> */}
            <Col md>
              <div style={{ height: '10px' }} className="bg-secondary mb-2" />
              <h4 className="text-center">
                <span className="text-logo">What</span> is the benefit of <span className="text-logo">SE</span>?
              </h4>
              <p>
                <span className="text-logo">SE</span> gives you tools to discuss the most difficult topics that mean a
                lot to you and the people around you. It helps you to better understand the views of others, and maybe
                change a mind or two along the way.
              </p>
            </Col>
            <Col md>
              <div style={{ height: '10px' }} className="bg-secondary mb-2" />
              <h4 className="text-center">
                <span className="text-logo">Who</span> is <span className="text-logo">SE</span> for?
              </h4>
              <p>
                <span className="text-logo">SE</span> is great for anyone who cares about understanding other people and
                having productive conversations about things you may differ on. <span className="text-logo">SE</span>{' '}
                does not aim to do any one thing and can be adapted to your own goals.
              </p>
            </Col>
            <Col md>
              <div style={{ height: '10px' }} className="bg-secondary mb-2" />
              <h4 className="text-center">
                <span className="text-logo">How</span> do I learn <span className="text-logo">SE</span>?
              </h4>
              <p>
                This website is your entry point to all of the resources and communities currently available to help you
                learn, practice, conduct, and improve <span className="text-logo">SE</span>, and we &#39;re very happy
                to have you here.
              </p>
            </Col>
          </Row>
          <Row className="pt-3">
            <Col className="d-flex justify-content-center align-items-center" md>
              <img alt="" src={LOGO_SE_WHITE} width="300" height="auto" className="d-inline-block align-middle mr-2" />
            </Col>
          </Row>
        </Container>
      </div>
      <div id="examples">
        <Section backgroundSource={video_camera}>
          <ExamplesPage />
        </Section>
      </div>
      <div id="resources">
        <Section
          heading="Resources"
          blurb="The best resources available today for learning more about Street Epistemology have been gathered for you here."
          backgroundSource={bg_tools}
          sectionStyle={SectionStyle.Light}
        >
          <Link to="/resources">
            <Button variant="primary">Read More</Button>
          </Link>
        </Section>
      </div>
      <div id="community">
        <Section
          heading="Community"
          blurb="Looking for other people who are interested in Street Epistemology? There are a variety of active fan-managed communities waiting for you."
          backgroundSource={bg_community}
        >
          <Link to="/community">
            <Button variant="primary">Read More</Button>
          </Link>
        </Section>
      </div>
      <div id="creators">
        <Section
          heading="Content Creators"
          blurb="People are coming up with all sorts of creative ways to demonstrate Street Epistemology. Here are some of the most prolific."
          backgroundSource={bg_filming}
          sectionStyle={SectionStyle.Light}
        >
          <Link to="/creators">
            <Button variant="primary">Read More</Button>
          </Link>
        </Section>
      </div>
      <div id="guide">
        <GuidePage />
      </div>
      <div id="shop">
        <ShopSection />
      </div>
    </div>
  );
};

export default MainPage;
