import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import { useEffect, useState } from 'react';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { Alert, Button, Modal, Spinner } from 'react-bootstrap';
import { FirebaseContext } from '../firebase';
import * as alertify from 'alertifyjs';
import { useHistory } from 'react-router-dom';

declare global {
  interface Window {
    recaptchaVerifier: app.auth.RecaptchaVerifier;
  }
}

const ContactUsPage: React.FC = () => {
  const history = useHistory();
  const firebaseContext = React.useContext(FirebaseContext);
  const [showModal, setShowModal] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    setIsSending(true);
    const result = await verifyAsync();
    if (!result) {
      return;
    }

    firebaseContext?.sendMail(
      data,
      () => {
        setShowModal(true);
        setIsSending(false);
      },
      (error) => {
        console.log(error);
        setIsSending(false);
        alertify.error('Could not send email');
      },
    );
  };

  const handleClose = () => history.goBack();

  useEffect(() => {
    window.recaptchaVerifier = new app.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
    });
  });

  const tryToVerifyAsync = async (applicationVerifier: app.auth.ApplicationVerifier) => {
    try {
      const result: string = await applicationVerifier.verify();
      return result ? true : false;
    } catch (error) {
      return false;
    }
  };

  const verifyAsync = async () => {
    const mobileVerifier = window.recaptchaVerifier;
    const result = await tryToVerifyAsync(mobileVerifier);
    return result;
  };

  return (
    <>
      <Container>
        <div className="mt-3 mb-3">
          <h1>Contact Us</h1>
          You can contact us about anything via email at&nbsp;
          <a id="emaillink" href="mailto:contact@streetepistemology.com">
            contact@streetepistemology.com
          </a>
          &nbsp;or by filling out the form below:
          <hr />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="input-email">Email *</label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="input-email"
                placeholder="Enter email"
                ref={register({ pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i, required: true })}
              />
              {errors.email && (
                <small id="email" className="form-text text-danger">
                  Please enter a valid email address.
                </small>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="input-subject">Subject *</label>
              <input
                className="form-control"
                name="subject"
                id="input-subject"
                placeholder="Enter subject"
                ref={register({ required: true, minLength: 5, maxLength: 100 })}
              />
              {errors.subject && (
                <small id="subject" className="form-text text-danger">
                  Please enter a subject that has between 5 and 100 characters.
                </small>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="input-message">Message *</label>
              <textarea
                className="form-control"
                name="message"
                id="input-message"
                rows={5}
                placeholder="Enter message"
                ref={register({ required: true, minLength: 50 })}
              />
              {errors.message && (
                <small id="message" className="form-text text-danger">
                  Please enter a message that is at least 50 characters long.
                </small>
              )}
            </div>
            <Button id="button-submit" type="submit" className="btn btn-primary" disabled={isSending}>
              {isSending ? (
                <Spinner className="mr-2" as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              ) : null}
              Submit
            </Button>
          </form>
          <div id="recaptcha-container" />
        </div>
      </Container>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thanks for reaching out!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="success">
            Your email message was sent succesfully. You can expect a reply within a couple of days.
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ContactUsPage;
