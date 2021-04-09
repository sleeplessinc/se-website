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
      <div className="bg-light">
        <Container className="px-0 py-4">
          <div className="overlay-container">
            <div
              className="overlay-background"
              style={{
                overflow: 'hidden',
                background: `url(${URL_BG_HAND_SHAKE})`,
                backgroundSize: 'auto 100%',
                backgroundPositionY: 'top',
                backgroundPositionX: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <div className="my-5 p-0 overlay-foreground">
              {/* style={{ marginLeft: '-50px' }} */}
              <div className="bg-primary text-light p-4">
                <h2 className="text-center">
                  <strong>The Evolution of Better Conversations</strong>
                </h2>
                <p>
                  <span className="text-logo">Street Epistemology</span> started life as a method to discuss religious
                  belief in the 2013 book <i>A Manual for Creating Atheists</i>. The book motivated many to apply the
                  techniques in their conversations, with some recording their interactions and making these recordings
                  available online for others to study and critique. This drove innovation in the method - most
                  importantly motivating people to apply it to more than just religion.
                </p>
                <p>
                  Today the method has a life of its own, driven by a community of people interested in discussing
                  difficult topics, seeking truth and reflecting on the methods we use to arrive at our deep
                  convictions. The community promotes the method as a way of creating understanding, combatting
                  tribalism and improving public dialogue in general, irrespective of someone politcal leanings,
                  religious background or other convitions.
                </p>
              </div>
            </div>
          </div>
        </Container>
        <Container className="bg-secondary" style={{ height: '10px' }} />
        <div id="examples">
          <ExamplesPage />
        </div>
      </div>
      <div className="bg-dark text-light">
        <Container className="py-5 text-center">
          <h1>Get Involved</h1>
          <h4 className="my-2">Join the community on your favorite platform</h4>
          <div className="col-d-2 py-4">
            <ContentCollectionList key="community" collectionType={CollectionType.Communities} />
          </div>
        </Container>
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
