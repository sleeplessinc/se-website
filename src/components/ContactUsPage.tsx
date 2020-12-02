import React from 'react';
import Container from 'react-bootstrap/esm/Container';

const ContactUsPage: React.FC = () => {
  return (
    <Container>
      <div className="mt-3 mb-3">
        <h1>Contact Us</h1>
        <p>
          You can contact us about anything via email at&nbsp;
          <a id="emaillink" href="mailto:contact@streetepistemology.com">
            contact@streetepistemology.com
          </a>
          &nbsp;or by filling out the form below:
          <hr />
          <form>
            <div className="form-group">
              <label htmlFor="inputEmail">Your Email address</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <small id="emailHelp" className="form-text text-muted">
                We&apos;ll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="inputSubject">Subject</label>
              <input type="email" className="form-control" id="inputSubject" placeholder="Enter subject" />
            </div>
            <div className="form-group">
              <label htmlFor="inputMessage">Message</label>
              <textarea className="form-control" id="inputMessage" rows={5}></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </p>
      </div>
    </Container>
  );
};

export default ContactUsPage;
