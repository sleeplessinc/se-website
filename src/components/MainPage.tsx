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
import ContentCollection from './ContentCollection';
import CollectionType from '../enums/CollectionType';

const MainPage: React.FC = () => {
  return (
    <div className="container-fluid p-0">
      <div id="faq">
        <FaqCarousel />
      </div>
      <div id="examples">
        <Section backgroundSource={video_camera} sectionStyle={SectionStyle.Light}>
          <ExamplesPage />
        </Section>
      </div>
      <div id="resources">
        <Section
          heading="Resources"
          blurb="Information, tips and tricks to help you learn more about or become better at Street Epistemology."
          backgroundSource={bg_tools}
        >
          <ContentCollection collectionType={CollectionType.Resources} />
        </Section>
      </div>
      <div id="communities">
        <Section
          heading="Communities"
          blurb="Street Epistemology is worldwide. Interact with others learning and practicing the method."
          backgroundSource={bg_community}
          sectionStyle={SectionStyle.Light}
        >
          <ContentCollection
            collectionType={CollectionType.Communities}
            sectionStyle={SectionStyle.Light}
            roundCards={true}
          />
        </Section>
      </div>
      <div id="creators">
        <Section
          heading="Content Creators"
          blurb="Street Epistemology made its mark when people started making video examples. This is a list of some of our favorites."
          backgroundSource={bg_filming}
        >
          <ContentCollection collectionType={CollectionType.Creators} roundCards={true} />
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
