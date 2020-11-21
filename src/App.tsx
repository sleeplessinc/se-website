import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Iframe from 'react-iframe';
import './App.css';
import FaqCarousel from './components/FaqCarousel';
import Navigation from './components/Navigation';
import video_camera from './images/video-camera.png';
import bg_tools from './images/bg_tools.png';
import bg_filming from './images/bg_filming.png';
import bg_community from './images/bg_community.png';
import img_shirt from './images/shirt.png';
import { resources, communities, creators } from './data';
import IconNavigator from './components/IconNavigator';
import Section from './components/Section';
import SectionStyle from './enums/SectionStyle';
import { Button } from 'react-bootstrap';
import ShopSection from './components/ShopSection';

function App() {
  return (
    <div className="App">
      <header>
        <Navigation />
      </header>
      <div className="container-fluid p-0">
        <FaqCarousel />
        <Section
          backgroundSource={video_camera}
          sectionStyle={SectionStyle.Light}
        >
          <Container>
            <Row>
              <Col lg={6} className="align-self-center">
                <div className="text-center m-3">
                  <h1>Video Examples</h1>
                  <h4>
                    One of the best ways to learn the techniques used in Street
                    Epistemology is to see them in action. The SE Latest
                    Releases playlist provides is the best place to find new
                    content and see how SE is progressing.
                  </h4>
                </div>
              </Col>
              <Col lg={6} className="align-self-center">
                <div className="text-center m-3">
                  <div className="embed-responsive embed-responsive-16by9">
                    <Iframe
                      className="embed-responsive-item"
                      title="SE Latest Releases"
                      src="https://www.youtube.com/embed/videoseries?list=PLfb-sNm-sTE0fZQkynr-qTu6krq68S-po&border=0&modestbranding=1"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      frameBorder="0"
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Section>
        <Section heading="Resources" backgroundSource={bg_tools}>
          <IconNavigator heading={undefined} cardDetails={resources} />
        </Section>
        <Section
          heading="Communities"
          backgroundSource={bg_community}
          sectionStyle={SectionStyle.Light}
        >
          <IconNavigator
            heading={undefined}
            cardDetails={communities}
            sectionStyle={SectionStyle.Light}
            roundCards={true}
          />
        </Section>
        <Section heading="Content Creators" backgroundSource={bg_filming}>
          <IconNavigator
            heading={undefined}
            cardDetails={creators}
            roundCards={true}
          />
        </Section>
        <ShopSection />
      </div>
    </div>
  );
}

export default App;
