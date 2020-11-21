import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import question_mark from '../images/bg_question_mark.png';
import light_bulb from '../images/bg_light_bulb.png';
import buildings_aerial_view from '../images/bg_buildings_aerial_view.png';
import pedestrian_crossing from '../images/bg_pedestrian_crossing.png';
import pocket_watch from '../images/bg_pocket_watch.png';
import hand_shake from '../images/bg_hand_shake.png';
import Slide from './Slide';

const FaqCarousel: React.FC = () => {
  return (
    <Carousel>
      <Carousel.Item style={{ backgroundImage: 'url(' + question_mark + ')' }}>
        <Carousel.Caption>
          <div className="bg-masked-dark p-2 rounded-xl">
            <h1 className="montserrat">
              <b>What</b> is Street Epistemology?
            </h1>
            <h4>
              While definitions vary, it's generally accepted that Street
              Epistemology is a conversational tool that helps people reflect on
              the quality of their reasons and the reliability of their methods
              used to derive one's confidence level in their deeply-held
              beliefs.
            </h4>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{ backgroundImage: 'url(' + light_bulb + ')' }}>
        <Carousel.Caption>
          <div className="bg-masked-dark p-2 rounded-xl">
            <h1 className="montserrat">
              <b>Why</b> use Street Epistemology?
            </h1>
            <h4>
              Although practitioners' objecives will differ, Street Epistemology
              is generally used to understand a claim, identify the actual
              reasons and reliability of the method supporting the claim, and
              see if one's confidence in their claim is justified.
            </h4>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item
        style={{ backgroundImage: 'url(' + buildings_aerial_view + ')' }}
      >
        <Carousel.Caption>
          <div className="bg-masked-dark p-2 rounded-xl">
            <h1 className="montserrat">
              <b>Where</b> to use Street Epistemology?
            </h1>
            <h4>
              While every venue has pros and cons, Street Epistemology can be
              practiced virtually anywhere, including face-to-face, video chat,
              audio chat, text chat, and social media, just to name a few.
            </h4>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{ backgroundImage: 'url(' + pocket_watch + ')' }}>
        <Carousel.Caption>
          <div className="bg-masked-dark p-2 rounded-xl">
            <h1 className="montserrat">
              <b>When</b> to use Street Epistemology?
            </h1>
            <h4>
              If you have willing participants and applied good judgment of the
              situation, it's probably a great time to use Street Epistemology
              on someone's claim with them.
            </h4>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item
        style={{ backgroundImage: 'url(' + pedestrian_crossing + ')' }}
      >
        <Carousel.Caption>
          <div className="bg-masked-dark p-2 rounded-xl">
            <h1 className="montserrat">
              <b>Who</b> is Street Epistemology for?
            </h1>
            <h4>
              While this method originated in the atheist community, we think
              everyone should learn Street Epistemology, regardless of where
              someone happens to stand on any claim.
            </h4>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{ backgroundImage: 'url(' + hand_shake + ')' }}>
        <Carousel.Caption>
          <div className="bg-masked-dark p-2 rounded-xl">
            <h1 className="montserrat">
              <b>How</b> to use Street Epistemology?
            </h1>
            <h4>
              This website is your entry point to all of the resources and
              communities currently available to help you learn, practice,
              conduct, and improve Street Epistemology, and we're very happy to
              have you here.
            </h4>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default FaqCarousel;
