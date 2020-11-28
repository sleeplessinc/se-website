import React, { useEffect, useState } from 'react';
import './App.css';
import FaqCarousel from './components/FaqCarousel';
import Navigation from './components/Navigation';
import video_camera from './images/bg_video_camera.webp';
import bg_tools from './images/bg_tools.webp';
import bg_filming from './images/bg_filming.webp';
import bg_community from './images/bg_community.webp';
import IconNavigator from './components/IconNavigator';
import Section from './components/Section';
import SectionStyle from './enums/SectionStyle';
import ShopSection from './components/ShopSection';
import { FirebaseContext } from './firebase';
import CardDetails from './models/CardDetails';
import CollectionType from './enums/CollectionType';
import ExamplesPage from './components/ExamplesPage';

const App: React.FC = () => {
  const firebaseContext = React.useContext(FirebaseContext);
  const [communities, setCommunities] = useState<CardDetails[]>([]);
  const [resources, setResources] = useState<CardDetails[]>([]);
  const [creators, setCreators] = useState<CardDetails[]>([]);
  useEffect(() => {
    firebaseContext?.subscribeToCollection(
      CollectionType.Communities,
      (results) => {
        setCommunities(results);
      },
      (error) => {
        console.log(error);
      },
    );
    firebaseContext?.subscribeToCollection(
      CollectionType.Resources,
      (results) => {
        setResources(results);
      },
      (error) => {
        console.log(error);
      },
    );
    firebaseContext?.subscribeToCollection(
      CollectionType.Creators,
      (results) => {
        setCreators(results);
      },
      (error) => {
        console.log(error);
      },
    );
  }, [firebaseContext]);

  return (
    <div className="App">
      <Navigation />
      <div className="container-fluid p-0 mt-5">
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
            <IconNavigator heading={undefined} cardDetails={resources} />
          </Section>
        </a>
        <a id="communities">
          <Section heading="Communities" backgroundSource={bg_community} sectionStyle={SectionStyle.Light}>
            <IconNavigator
              heading={undefined}
              cardDetails={communities}
              sectionStyle={SectionStyle.Light}
              roundCards={true}
            />
          </Section>
        </a>
        <a id="creators">
          <Section heading="Content Creators" backgroundSource={bg_filming}>
            <IconNavigator heading={undefined} cardDetails={creators} roundCards={true} />
          </Section>
        </a>
        <a id="shop">
          <ShopSection />
        </a>
      </div>
    </div>
  );
};

export default App;
