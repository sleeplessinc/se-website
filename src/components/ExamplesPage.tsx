import React, { useState } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Iframe from 'react-iframe';
import { FirebaseContext } from '../firebase';
import * as alertify from 'alertifyjs';
import { AppSettingsContext } from './AppSettingsProvider';
import { UserContext } from './UserProvider';
import { Button, Card, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { IVideoReference } from '../models/interfaces';
import * as lodash from 'lodash';

const ExamplesPage: React.FC = () => {
  console.info('Examples page refreshed');
  const firebaseContext = React.useContext(FirebaseContext);
  const appSettingsContext = React.useContext(AppSettingsContext);
  const userContext = React.useContext(UserContext);
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const featuredVideo = appSettingsContext.featuredVideo;
  const { register, handleSubmit, errors } = useForm<IVideoReference>();

  const onSubmit = async (data: IVideoReference) => {
    setIsSaving(true);
    if (!appSettingsContext) {
      alertify.error('Could not read app settings');
      return;
    }

    const newSettings = lodash.cloneDeep(appSettingsContext);
    newSettings.featuredVideo = data;
    firebaseContext?.updateAppSettings(
      newSettings,
      () => {
        alertify.success('Video details updated');
        setIsSaving(false);
        setIsUpdating(false);
      },
      (error) => {
        console.log(error);
        setIsSaving(false);
        alertify.error('Could not update details');
      },
    );
  };

  const embed = (videoId: string) => {
    const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
    return (
      <div className="embed-responsive embed-responsive-16by9">
        <Iframe
          className="embed-responsive-item"
          title="SE Latest Releases"
          src={embedUrl}
          url={embedUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          frameBorder={0}
        />
      </div>
    );
  };

  const editForm = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="input-video-id">Video ID *</label>
          <input
            className="form-control"
            name="videoId"
            id="input-video-id"
            placeholder="e.g. By6OBNMT0XY"
            defaultValue={featuredVideo.videoId}
            ref={register({ required: true })}
          />
          {errors.videoId && (
            <small id="videoId" className="form-text text-danger">
              Please enter a video ID.
            </small>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="input-author">Author *</label>
          <input
            className="form-control"
            name="author"
            id="input-author"
            placeholder="e.g. Anthony Magnabosco"
            defaultValue={featuredVideo.author}
            ref={register({ required: true, minLength: 5, maxLength: 100 })}
          />
          {errors.author && (
            <small id="author" className="form-text text-danger">
              Please enter a author name that has between 5 and 100 characters.
            </small>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="input-channel-url">Channel URL *</label>
          <input
            className="form-control"
            name="channelUrl"
            id="input-channel-url"
            placeholder="e.g. https://www.youtube.com/user/StreetEpistemologist"
            defaultValue={featuredVideo.channelUrl}
            ref={register({ required: true, minLength: 10 })}
          />
          {errors.channelUrl && (
            <small id="channel-url" className="form-text text-danger">
              Please enter a valid Youtube channel URL.
            </small>
          )}
        </div>
        <Button
          id="button-cancel"
          className="btn btn-secondary mr-2"
          disabled={isSaving}
          onClick={() => {
            setIsUpdating(false);
          }}
        >
          Cancel
        </Button>
        <Button id="button-submit" type="submit" className="btn btn-primary" disabled={isSaving}>
          {isSaving ? (
            <Spinner className="mr-2" as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          ) : null}
          Save
        </Button>
      </form>
    );
  };

  return (
    <Container>
      <Row>
        <Col lg={6} className="align-self-center">
          <div className="text-center m-3">
            <h1>Video Examples</h1>
            <h4>
              One of the best ways to learn the techniques used in Street Epistemology is to see them in action.
              The&nbsp;
              <a href={'https://www.youtube.com/playlist?list=PLfb-sNm-sTE0fZQkynr-qTu6krq68S-po'} target="blank">
                SE Latest Releases playlist
              </a>
              &nbsp;is the best place to find new content and see how SE is progressing.
            </h4>
          </div>
        </Col>
        <Col lg={6} className="align-self-center">
          <div className="text-center m-3">
            {isUpdating ? (
              <Card>
                <div className="card-img-top">{embed(featuredVideo.videoId)}</div>
                <Card.Body>
                  <Card.Title>Featured Video</Card.Title>
                  {editForm()}
                </Card.Body>
              </Card>
            ) : (
              <>
                {embed(featuredVideo.videoId)}
                {userContext?.isAdmin && (
                  <Button
                    className="btn btn-primary float-r"
                    onClick={() => {
                      setIsUpdating(true);
                    }}
                  >
                    Edit
                  </Button>
                )}
                <div className="d-none d-sm-block">
                  <p className="badge badge-dark p-2 m-2">
                    Video of the Month courtesy of&nbsp;
                    <a href={featuredVideo.channelUrl} target="blank">
                      {featuredVideo.author}
                    </a>
                  </p>
                </div>
                <div className="d-flex d-sm-none justify-content-center">
                  <p className="badge badge-dark p-2 m-2">
                    Video of the Month <br />
                    Courtesy of&nbsp;
                    <a href={featuredVideo.channelUrl} target="blank">
                      {featuredVideo.author}
                    </a>
                  </p>
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ExamplesPage;
