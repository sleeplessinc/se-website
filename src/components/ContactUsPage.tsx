import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import { useEffect, useState } from 'react';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore';

declare global {
  interface Window {
    recaptchaVerifier: app.auth.RecaptchaVerifier;
  }
}

interface Message {
  email: string;
  subject: string;
  body: string;
}

const defaultMessage: Message = {
  email: '',
  subject: '',
  body: '',
};

const ContactUsPage: React.FC = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [message, setMessage] = useState<Message>(defaultMessage);

  const onMessageChange = <P extends keyof Message>(prop: P, value: Message[P]) => {
    setMessage({ ...message, [prop]: value });
  };

  useEffect(() => {
    window.recaptchaVerifier = new app.auth.RecaptchaVerifier('button-submit', {
      size: 'invisible',
    });
    const doVerifyAsync = async () => {
      const result = await verifyAsync();
      setIsVerified(result);
    };
    if (!isVerified) {
      doVerifyAsync();
    }
  });

  const tryToVerifyAsync = async (applicationVerifier: app.auth.ApplicationVerifier) => {
    try {
      const result: string = await applicationVerifier.verify();
      return result ? true : false;
    } catch (error) {
      return false;
    }
  };

  const onSubmitAsync = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const verifyAsync = async () => {
    const mobileVerifier = window.recaptchaVerifier;
    const result = await tryToVerifyAsync(mobileVerifier);
    return result;
  };

  return (
    <Container>
      <div className="mt-3 mb-3">
        <h1>Contact Us</h1>
        You can contact us about anything via email at&nbsp;
        <a id="emaillink" href="mailto:contact@streetepistemology.com">
          contact@streetepistemology.com
        </a>
        &nbsp;or by filling out the form below:
        <hr />
        <form>
          <div className="form-group">
            <label htmlFor="input-email">Your Email address</label>
            <input
              type="email"
              className="form-control"
              id="input-email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={message.email}
              onChange={(e) => {
                onMessageChange('email', e.target.value);
              }}
            />
            <small id="emailHelp" className="form-text text-muted">
              We&apos;ll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="input-subject">Subject</label>
            <input
              className="form-control"
              id="input-subject"
              placeholder="Enter subject"
              value={message.subject}
              onChange={(e) => {
                onMessageChange('subject', e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="input-message">Message</label>
            <textarea
              className="form-control"
              id="input-message"
              rows={5}
              onChange={(e) => {
                onMessageChange('body', e.target.value);
              }}
              value={message.body}
            />
          </div>
          <div id="recaptcha-container" />
          <button
            id="button-submit"
            type="submit"
            className="btn btn-primary"
            onClick={onSubmitAsync}
            disabled={!isVerified}
          >
            Submit
          </button>
        </form>
      </div>
    </Container>
  );
};

export default ContactUsPage;
