//import React from 'react';
import React, { useEffect, useState } from 'react';
import ShopSection from './ShopSection';
import ExamplesPage from './ExamplesPage';
import { Button, Col, Container, Row } from 'react-bootstrap';
import ParallaxSection from './ParallaxSection';
import {
  URL_BG_GIRLS_CHATTING_ON_SWING,
  URL_BG_HAND_SHAKE,
  URL_BG_PEDESTRIAN_CROSSING,
  URL_HTHIC,
  URL_IMG_SKETCH_PAD,
  URL_BG_TEAM_WORK,
  URL_SEI,
  URL_SE_PODCAST,
  URL_SE_LATEST_RELEASES,
} from '../utils/constants';
import { ReactComponent as CommunityIcon } from '../images/icon-community.svg';
import { ReactComponent as BookIcon } from '../images/icon-book.svg';
import { ReactComponent as VideoIcon } from '../images/icon-video-camera.svg';
import { ReactComponent as PodcastIcon } from '../images/icon-podcast.svg';
import { ReactComponent as GlobeIcon } from '../images/icon-globe.svg';
import { ReactComponent as SeLogoIcon } from '../images/icon-se-logo-border.svg';
import { ThemeContext } from './ThemeProvider';
import ContentList from './ContentList';
import CollectionType from '../enums/CollectionType';
import { GetSocialMediaIcon } from '../utils/iconSelectors';
import OverlayDisplay from './OverlayDisplay';
import { Link } from 'react-router-dom';

const MainPage: React.FC = () => {
  const themeContext = React.useContext(ThemeContext);

  useEffect(() => {
  	let hash = document.location.hash;
	if( hash ) {
		let qsa = document.querySelectorAll( hash );
		let el = qsa[ 0 ];
		if( el ) {
			console.log( "Scrolling to "+hash );
			el.scrollIntoView( true );
		}
	}
  });


  return (
    <div className="container-fluid p-0">
      <ParallaxSection backgroundSource={URL_BG_GIRLS_CHATTING_ON_SWING} minHeight="400px">
        <div className="text-center">
          <SeLogoIcon width="300" height="auto" className="m-3" />
          <h1>The World Needs Better Conversations</h1>
          <h4 className="my-4">
            <span className="text-logo">Street Epistemology</span> is a set of tools that helps you have better
            conversations about difficult topics.
          </h4>
        </div>
      </ParallaxSection>
      <div className="bg-dark text-light p-5">
        <Container>
          <Row>
            <Col md>
              <h4 className="text-center border-bar-top pt-2">
                <span className="text-logo">What</span> is the benefit of <span className="text-logo">SE</span>?
              </h4>
              <p>
                <span className="text-logo">SE</span> gives you tools to discuss the most difficult topics that mean a
                lot to you and the people around you. It helps you to better understand the views of others, and maybe
                change a mind or two along the way.
              </p>
            </Col>
            <Col md>
              <h4 className="text-center border-bar-top pt-2">
                <span className="text-logo">Who</span> is <span className="text-logo">SE</span> for?
              </h4>
              <p>
                <span className="text-logo">SE</span> is great for anyone who cares about understanding other people and
                having productive conversations about things you may differ on. <span className="text-logo">SE</span>{' '}
                does not aim to do any one thing and can be adapted to your own goals.
              </p>
            </Col>
            <Col md>
              <h4 className="text-center border-bar-top pt-2">
                <span className="text-logo">How</span> do I learn <span className="text-logo">SE</span>?
              </h4>
              <p>
                This website is your entry point to all of the resources and communities currently available to help you
                learn, practice, conduct, and improve <span className="text-logo">SE</span>, and we &#39;re very happy
                to have you here.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="bg-light">
        <Container>
          <OverlayDisplay imageSrc={URL_BG_HAND_SHAKE} overlap={0.05}>
            <div className="my-5 p-0 overlay-foreground">
              {/* style={{ marginLeft: '-50px' }} */}
              <div className="bg-primary text-light p-4">
                <h2 className="text-center">
                  <strong>The Road to Better Conversations</strong>
                </h2>
                <p>
                  <span className="text-logo">Street Epistemology</span> started life as a method to discuss religious
                  belief in the 2013 book <i>A Manual for Creating Atheists</i>. The book motivated many to apply the
                  techniques in their conversations, with some recording their interactions and making these recordings
                  available online for others to study and critique. This drove innovation in the method — most
                  importantly motivating people to apply it to more than just religion.
                </p>
                <p>
                  Today the method has a life of its own, driven by a community of people interested in discussing
                  difficult topics, seeking truth and reflecting on the methods we use to arrive at our deep
                  convictions. The community promotes the method as a way of creating understanding, combatting
                  tribalism and improving public dialogue in general, irrespective of someone&#39;s political leanings,
                  religious background or other convictions.
                </p>
              </div>
            </div>
          </OverlayDisplay>
        </Container>
        <div id="examples" className="bg-dark">
          <ExamplesPage />
        </div>
      </div>
      <div className="bg-secondary">
        <Container className="py-5">
          <Row className="text-center">
            <Col>
              <h2 className="text-primary">
                <strong>There are many ways to learn</strong>
              </h2>
            </Col>
          </Row>
          <Row>
            <Col md className="text-center my-2">
              <a href={URL_SE_LATEST_RELEASES} target="blank" className="text-primary text-decoration-none">
                <div>
                  <VideoIcon className="mb-2" width="100" height="auto" />
                </div>
                <h4 className="text-logo">Video Examples</h4>
                <h5>Watch SE in action with examples from various practitioners from around the world.</h5>
              </a>
            </Col>
            <Col md className="text-center my-2">
              <a href={URL_HTHIC} target="blank" className="text-primary text-decoration-none">
                <div>
                  <BookIcon className="mb-2" width="100" height="auto" />
                </div>
                <h4 className="text-logo">Books</h4>
                <h5>
                  Read the official manual, blog posts or the book &quot;How to have Impossible Conversations&quot;.
                </h5>
              </a>
            </Col>
            <Col md className="text-center my-2">
              <a href={URL_SE_PODCAST} target="blank" className="text-primary text-decoration-none">
                <div>
                  <PodcastIcon className="mb-2" width="100" height="auto" />
                </div>
                <h4 className="text-logo">Podcast</h4>
                <h5>Listen to SE interviews, discussions, breakdowns and reviews on the official podcast.</h5>
              </a>
            </Col>
            <Col md className="text-center my-2">
              <Link to="/community" className="text-primary text-decoration-none">
                <div>
                  <CommunityIcon className="mb-2" width="100" height="auto" />
                </div>
                <h4 className="text-logo">Community</h4>
                <h5>Meet other people interested in SE in one of the many online communities.</h5>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
      <div id="community">
        <ParallaxSection backgroundSource={URL_BG_PEDESTRIAN_CROSSING}>
          <Container className="py-5 text-center">
            <h1>Get Involved</h1>
            <h4 className="my-2">Join the community on your favorite platform</h4>
            <div className="py-4">
              <ContentList
                key="community"
                collectionType={CollectionType.Communities}
                iconSelector={(card, iconSize) => GetSocialMediaIcon(card, iconSize, themeContext?.light)}
                groupSelector={(card) => card.logoUrl ?? ''}
              />
            </div>
          </Container>
        </ParallaxSection>
      </div>
      <div className="bg-primary" id="guide">
        <Container className="px-0">
          <OverlayDisplay imageSrc={URL_IMG_SKETCH_PAD} overlap={0.05}>
            <div className="bg-dark text-light p-4 my-5">
              <h2 className="text-center">
                <strong>Read the Guide</strong>
              </h2>
              <Container>
                <Row>
                  <Col md={7}>
                    <div className="text-left align-self-center">
                      <h5>
                        The SE Guide provides distilled advice for all stages of a dialogue. It covers both basic and
                        advanced topics, making it great for beginners and advanced practitioners alike!
                      </h5>
                    </div>
                  </Col>
                  <Col md={5} className="text-center mb-2 align-self-center">
                    <Button
                      className="m-2"
                      variant="secondary"
                      href="https://docs.google.com/document/export?format=pdf&id=1YOqUGBlTJ6cCnkfZCYN6zV-csG85b_fkIiQAi3EPXSw"
                      target="_blank"
                    >
                      Download PDF
                    </Button>
                    <Button
                      className="m-2"
                      variant="secondary"
                      href="https://docs.google.com/document/export?format=epub&id=1YOqUGBlTJ6cCnkfZCYN6zV-csG85b_fkIiQAi3EPXSw"
                      target="_blank"
                    >
                      Download EPUB
                    </Button>
                    <Button
                      className="m-2"
                      variant="secondary"
                      href="https://docs.google.com/document/d/1YOqUGBlTJ6cCnkfZCYN6zV-csG85b_fkIiQAi3EPXSw"
                      target="_blank"
                    >
                      Open with Google Docs
                    </Button>
                  </Col>
                </Row>
              </Container>
            </div>
          </OverlayDisplay>
        </Container>
      </div>
      <div id="creators" className="bg-dark text-light">
        <Container className="py-5 text-center">
          <h1>Explore SE Content</h1>
          <h4 className="my-2">
            There is a wealth of <span className="text-logo">SE</span> content available online. Here are some of our
            favorites.
          </h4>
          <div className="py-4">
            <ContentList collectionType={CollectionType.Creators} itemsPerPage={8} />
          </div>
        </Container>
      </div>
      <div id="support">
        <ParallaxSection backgroundSource={URL_BG_TEAM_WORK}>
          <Container className="py-5 text-center">
            <h1>
              Support <span className="text-logo">Street Epistemology</span>
            </h1>
            <h4 className="my-2">
              <span className="text-logo">Street Epistemology International</span> is a non-profit organization that
              supports the development and promotion of <span className="text-logo">SE</span>.
            </h4>
            <div>
              <GlobeIcon width="160px" height="160px" fill={themeContext?.light} className="my-4" />
            </div>
            <Button variant="primary" href={URL_SEI}>
              Find Out More
            </Button>
          </Container>
        </ParallaxSection>
      </div>

      <div className="bg-secondary text-primary" id="shop">
        <Container className="px-0">
          <ShopSection />
        </Container>
      </div>
    </div>
  );
};

export default MainPage;
