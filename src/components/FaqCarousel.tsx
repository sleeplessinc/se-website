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
      <Carousel.Item>
        <Slide
          title="What is Street Epistemology?"
          description="
                  While definitions vary, it's generally accepted that Street
                  Epistemology is a conversational tool that helps people
                  reflect on the quality of their reasons and the reliability of
                  their methods used to derive one's confidence level in their
                  deeply-held beliefs."
          background={question_mark}
        />
      </Carousel.Item>
      <Carousel.Item style={{ backgroundImage: 'url(' + light_bulb + ')' }}>
        <Slide
          title="Why use Street Epistemology?"
          description="
          Although practitioners' objecives will differ, Street Epistemology
          is generally used to understand a claim, identify the actual
          reasons and reliability of the method supporting the claim, and
          see if one's confidence in their claim is justified."
          background={light_bulb}
        />
      </Carousel.Item>
      <Carousel.Item style={{ backgroundImage: 'url(' + buildings_aerial_view + ')' }}>
        <Slide
          title="Where to use Street Epistemology?"
          description="
        While every venue has pros and cons, Street Epistemology can be
        practiced virtually anywhere, including face-to-face, video chat,
        audio chat, text chat, and social media, just to name a few."
          background={buildings_aerial_view}
        />
      </Carousel.Item>
      <Carousel.Item style={{ backgroundImage: 'url(' + pocket_watch + ')' }}>
        <Slide
          title="When to use Street Epistemology?"
          description="
          If you have willing participants and applied good judgment of the
          situation, it's probably a great time to use Street Epistemology
          on someone's claim with them."
          background={pocket_watch}
        />
      </Carousel.Item>
      <Carousel.Item style={{ backgroundImage: 'url(' + pedestrian_crossing + ')' }}>
        <Slide
          title="Who is Street Epistemology for?"
          description="
        While this method originated in the atheist community, we think
        everyone should learn Street Epistemology, regardless of where
        someone happens to stand on any claim."
          background={pedestrian_crossing}
        />
      </Carousel.Item>
      <Carousel.Item style={{ backgroundImage: 'url(' + hand_shake + ')' }}>
        <Slide
          title="How to use Street Epistemology?"
          description="
          This website is your entry point to all of the resources and
          communities currently available to help you learn, practice,
          conduct, and improve Street Epistemology, and we're very happy to
          have you here."
          background={hand_shake}
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default FaqCarousel;
