import React from 'react';
import FaqCarousel from './FaqCarousel';
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
import { Button } from 'react-bootstrap';

const MainPage: React.FC = () => {
  return (
    <div className="container-fluid p-0">
      <div id="faq">
        <FaqCarousel />
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
