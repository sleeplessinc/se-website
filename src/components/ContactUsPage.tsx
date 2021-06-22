import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import { useEffect, useState } from 'react';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Button, Col, Badge, Row, Spinner } from 'react-bootstrap';
import ParallaxSection from './ParallaxSection';
import * as config from '../config.json';


const ContactUsPage: React.FC = () => {
  return (
    <>
      <Container className="blog bg-light">
          <>
            <Row>
              <Col className="p-0">
                <ParallaxSection
                  backgroundSource={config.googleCloudBaseUrl + config.bannerFolder + 'contact.webp'}
                  wrapInContainer={false}
                  overlayOpacity={0}
                >
                  <Container className="align-middle">
                    <Row className="align-items-end " style={{ minHeight: '400px' }}>
                      <Col className="bg-primary text-light px-4 py-2" sm="auto">
                        <h1>Contact Us</h1>
                      </Col>
                    </Row>
                  </Container>
                </ParallaxSection>
              </Col>
            </Row>
            <Row className="px-4 pb-4">
              <Col>
			  	<br/>
			  	<br/>
				  You can contact us about anything via email at&nbsp;
				  <a id="emaillink" href="mailto:contact@streetepistemology.com">
					contact@streetepistemology.com
				  </a>
			  	<br/>
			  	<br/>
			  	<br/>
			  	<br/>
              </Col>
            </Row>
          </>
      </Container>

    </>
  );
};

export default ContactUsPage;
