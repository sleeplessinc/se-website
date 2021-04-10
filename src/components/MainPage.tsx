import React from 'react';
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
import {
  URL_LOGO_SE_WHITE,
  URL_BG_GIRLS_CHATTING_ON_SWING,
  URL_BG_HAND_SHAKE,
  URL_BG_STUDY_GROUP,
  URL_BG_PEDESTRIAN_CROSSING,
  URL_BG_BOOK,
  URL_IMG_SKETCH_PAD,
} from '../utils/constants';
import { ReactComponent as CommunityIcon } from '../images/icon-community.svg';
import { ReactComponent as BookIcon } from '../images/icon-book.svg';
import { ReactComponent as VideoIcon } from '../images/icon-video-camera.svg';
import { ReactComponent as PodcastIcon } from '../images/icon-podcast.svg';
import { ReactComponent as HandShakeIcon } from '../images/icon-hand-shake.svg';
import { ThemeContext } from './ThemeProvider';
import ContentList from './ContentList';
import CollectionType from '../enums/CollectionType';
import ContentCreatorList from './ContentCreatorList';
import CardDetails from '../models/CardDetails';
import { GetSocialMediaIcon } from '../utils/iconSelectors';

const MainPage: React.FC = () => {
  const themeContext = React.useContext(ThemeContext);
  return (
    <div className="container-fluid p-0">
      <ParallaxSection backgroundSource={URL_BG_GIRLS_CHATTING_ON_SWING} minHeight="400px">
        <div className="text-center">
          <img alt="" src={URL_LOGO_SE_WHITE} width="300" height="auto" className="d-inline-block align-middle mr-2" />
          <h1>The World Needs Better Conversations</h1>
          <h4 className="my-4">
            <span className="text-logo">Street Epistemology</span> is a set of tools that helps you have better
            conversations about difficult topics.
          </h4>
        </div>
      </ParallaxSection>
      <div className="bg-dark text-light p-5">
        <Container className="py-5">
          <Row>
            {/* <Col className="bg-secondary d-flex justify-content-center align-items-center" md>
              <img alt="" src={LOGO_SE} width="300" height="auto" className="d-inline-block align-middle mr-2" />
            </Col> */}
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
              <div>
                <VideoIcon className="mb-2" width="100" height="auto" fill={themeContext?.primary} />
              </div>
              <h4 className="text-logo text-primary">Video Examples</h4>
              <h5>Watch SE in action with examples from various practitioners from around the world.</h5>
            </Col>
            <Col md className="text-center my-2">
              <div>
                <BookIcon className="mb-2" width="100" height="auto" fill={themeContext?.primary} />
              </div>
              <h4 className="text-logo text-primary">Books</h4>
              <h5>
                Read the official manual, blog posts or the book &quot;How to have Impossible Conversations&quot;.
              </h5>
            </Col>
            <Col md className="text-center my-2">
              <div>
                <PodcastIcon className="mb-2" width="100" height="auto" fill={themeContext?.primary} />
              </div>
              <h4 className="text-logo text-primary">Podcast</h4>
              <h5>Listen to SE interviews, discussions, breakdowns and reviews on the official podcast.</h5>
            </Col>
            <Col md className="text-center my-2">
              <div>
                <CommunityIcon className="mb-2" width="100" height="auto" fill={themeContext?.primary} />
              </div>
              <h4 className="text-logo text-primary">Community</h4>
              <h5>Meet other people interested in SE in one of the many online communities.</h5>
            </Col>
          </Row>
        </Container>
      </div>
      <div id="community">
        <ParallaxSection backgroundSource={URL_BG_PEDESTRIAN_CROSSING}>
          <Container className="py-5 text-center">
            <h1>Get Involved</h1>
            <h4 className="my-2">Join the community on your favorite platform</h4>
            <div className="col-d-2 py-4">
              <ContentList
                key="community"
                collectionType={CollectionType.Communities}
                iconSelector={(card: CardDetails, iconSize: number) =>
                  GetSocialMediaIcon(card, iconSize, themeContext?.light)
                }
              />
            </div>
          </Container>
        </ParallaxSection>
      </div>
      <div className="bg-primary" id="guide">
        <Container className="px-0 py-4">
          <div className="overlay-container">
            <div
              className="overlay-background"
              style={{
                overflow: 'hidden',
                background: `url(${URL_IMG_SKETCH_PAD})`,
                backgroundSize: 'auto 100%',
                backgroundPositionY: 'top',
                backgroundPositionX: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <div className="my-5 p-0 overlay-foreground">
              {/* style={{ marginLeft: '-50px' }} */}
              <div className="bg-dark text-light p-4">
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
            </div>
          </div>
        </Container>
      </div>
      <div id="creators" className="bg-dark text-light">
        <Container className="py-5 text-center">
          <h1>Explore SE Content</h1>
          <h4 className="my-2">
            There is a wealth of <span className="text-logo">SE</span> content available online. Here are some of our
            favorites.
          </h4>
          <div className="col-d-2 py-4">
            <ContentList collectionType={CollectionType.Creators} />
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
      <div id="shop">
        <ShopSection />
      </div>
    </div>
  );
};

export default MainPage;
