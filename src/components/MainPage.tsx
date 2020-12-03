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
      <a id="faq">
        <FaqCarousel />
      </a>
      <a id="examples">
        <Section backgroundSource={video_camera} sectionStyle={SectionStyle.Light}>
          <ExamplesPage />
        </Section>
      </a>
      <a id="resources">
        <Section heading="Resources" backgroundSource={bg_tools}>
          <ContentCollection collectionType={CollectionType.Resources} />
        </Section>
      </a>
      <a id="communities">
        <Section heading="Communities" backgroundSource={bg_community} sectionStyle={SectionStyle.Light}>
          <ContentCollection
            collectionType={CollectionType.Communities}
            sectionStyle={SectionStyle.Light}
            roundCards={true}
          />
        </Section>
      </a>
      <a id="creators">
        <Section heading="Content Creators" backgroundSource={bg_filming}>
          <ContentCollection collectionType={CollectionType.Creators} roundCards={true} />
        </Section>
      </a>
      <a id="shop">
        <ShopSection />
      </a>
      <a id="guide">
        <GuidePage />
      </a>
    </div>
  );
};

export default MainPage;
