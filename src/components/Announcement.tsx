import React, { useState } from 'react';
import { Alert, Button, Modal } from 'react-bootstrap';
import { AppSettingsContext } from './AppSettingsProvider';
import parse from 'html-react-parser';
import useStateWithLocalStorage from '../utils/storage';

const Announcement: React.FC = () => {
  const appSettingsContext = React.useContext(AppSettingsContext);
  const [cachedAnnouncement, setCachedAnnouncement] = useStateWithLocalStorage('announcement');
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const announcementDismissed = cachedAnnouncement === appSettingsContext.announcement?.message;

  const handleClose = () => {
    setShowAnnouncement(false);
    setCachedAnnouncement(appSettingsContext.announcement?.message ?? '');
  };

  if (!appSettingsContext.hasAnnouncement() || announcementDismissed) {
    return null;
  }

  return (
    <Modal show={showAnnouncement} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{appSettingsContext.announcement?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant="primary">{parse(appSettingsContext.announcement?.message ?? '')}</Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Dismiss
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Announcement;
