import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import question_mark from '../images/bg_question_mark.webp';
import light_bulb from '../images/bg_light_bulb.webp';
import buildings_aerial_view from '../images/bg_buildings_aerial_view.webp';
import pedestrian_crossing from '../images/bg_pedestrian_crossing.webp';
import pocket_watch from '../images/bg_pocket_watch.webp';
import hand_shake from '../images/bg_hand_shake.webp';
import Slide from './Slide';

const FaqCarousel: React.FC = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <Slide background={question_mark}>
          <h1>
            <span className="highlight">What</span> is Street Epistemology?
          </h1>
          <h4>
            While definitions vary, it&lsquo;s generally accepted that Street Epistemology is a conversational tool that
            helps people reflect on the quality of their reasons and the reliability of their methods used to derive
            one&lsquo;s confidence level in their deeply-held beliefs.
          </h4>
        </Slide>
      </Carousel.Item>
      <Carousel.Item style={{ backgroundImage: 'url(' + light_bulb + ')' }}>
        <Slide background={light_bulb}>
          <h1>
            <span className="highlight">Why</span> use Street Epistemology?
          </h1>
          <h4>
            Although practitioners&lsquo; objecives will differ, Street Epistemology is generally used to understand a
            claim, identify the actual reasons and reliability of the method supporting the claim, and see if
            one&lsquo;s confidence in their claim is justified.
          </h4>
        </Slide>
      </Carousel.Item>
      <Carousel.Item style={{ backgroundImage: 'url(' + buildings_aerial_view + ')' }}>
        <Slide background={buildings_aerial_view}>
          <h1>
            <span className="highlight">Where</span> to use Street Epistemology?
          </h1>
          <h4>
            While every venue has pros and cons, Street Epistemology can be practiced virtually anywhere, including
            face-to-face, video chat, audio chat, text chat, and social media, just to name a few.
          </h4>
        </Slide>
      </Carousel.Item>
      <Carousel.Item style={{ backgroundImage: 'url(' + pocket_watch + ')' }}>
        <Slide background={pocket_watch}>
          <h1>
            <span className="highlight">When</span> to use Street Epistemology?
          </h1>
          <h4>
            If you have willing participants and applied good judgment of the situation, it is probably a great time to
            use Street Epistemology on someone&lsquo;s claim with them.
          </h4>
        </Slide>
      </Carousel.Item>
      <Carousel.Item style={{ backgroundImage: 'url(' + pedestrian_crossing + ')' }}>
        <Slide background={pedestrian_crossing}>
          <h1>
            <span className="highlight">Who</span> is Street Epistemology for?
          </h1>
          <h4>
            While this method originated in the atheist community, we think everyone should learn Street Epistemology,
            regardless of where someone happens to stand on any claim.
          </h4>
        </Slide>
      </Carousel.Item>
      <Carousel.Item style={{ backgroundImage: 'url(' + hand_shake + ')' }}>
        <Slide background={hand_shake}>
          <h1>
            <span className="highlight">How</span> to use Street Epistemology?
          </h1>
          <h4>
            This website is your entry point to all of the resources and communities currently available to help you
            learn, practice, conduct, and improve Street Epistemology, and we&lsquo;re very happy to have you here.
          </h4>
        </Slide>
      </Carousel.Item>
    </Carousel>
  );
};

export default FaqCarousel;
