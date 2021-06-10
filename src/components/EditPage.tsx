import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { FirebaseContext } from '../firebase';
import { Redirect } from 'react-router-dom';
import useStateWithLocalStorage from '../utils/storage';
import PageNotFound from './PageNotFound';
import { Button, Col, Modal, Row, Spinner } from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import * as alertify from 'alertifyjs';
import { UserContext } from './UserProvider';
import NotAuthorized from './NotAuthorized';

const getInitialEditorState = (content: string): EditorState => {
  const contentBlock = htmlToDraft(content);
  let initialEditorState: EditorState | undefined = undefined;
  if (contentBlock) {
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    initialEditorState = EditorState.createWithContent(contentState);
  } else {
    initialEditorState = EditorState.createEmpty();
  }

  return initialEditorState;
};

interface IEditPageProps {
  path: string;
}

const EditPage: React.FC<IEditPageProps> = ({ path }: IEditPageProps) => {
	/*
  const firebaseContext = React.useContext(FirebaseContext);
  const userContext = React.useContext(UserContext);

  const [content, setContent] = useStateWithLocalStorage(path);
  const [notFound, setnotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(content !== '');
  const [editorState, setEditorState] = useState(getInitialEditorState(content));
  const [showConfirm, setShowConfirm] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  if (!userContext?.isAdmin) {
    return <NotAuthorized />;
  }

  useEffect(() => {
    return firebaseContext?.subscribeToPage(
      path,
      (results) => {
        if (!results || results === '') {
          setnotFound(true);
        } else {
          setContent(results);
          setIsLoading(false);
        }
      },
      (error) => {
        console.log(error);
        setnotFound(true);
      },
    );
  }, [firebaseContext]);

  const handleSubmit = () => {
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    firebaseContext?.updatePageContent(
      path,
      html,
      () => {
        console.log('Save successful');
        setCancelled(true);
      },
      (error) => {
        alertify.error(error);
      },
    );
  };

  const handleCancel = () => {
    setShowConfirm(true);
  };

  const handleCancelConfirm = () => {
    setShowConfirm(false);
  };

  const handleConfirm = () => {
    setCancelled(true);
  };

  if (notFound) return <PageNotFound />;
  if (cancelled) return <Redirect push to={'/' + path} />;

  return (
    <>
      <Container>
        {isLoading ? (
          <div className="text-center">
            <Spinner className="m-5" animation="border" role="status" variant="primary">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <Row>
            <Col className="mt-3 mb-3 p-0">
              <Container className="p-0">
                <Row>
                  <Col>
                    <Editor
                      editorState={editorState}
                      onEditorStateChange={setEditorState}
                      toolbarClassName="editor-toolbar"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col />
                  <Col sm="auto" className="mt-2">
                    <Button variant="secondary" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button className="ml-2" variant="primary" onClick={handleSubmit}>
                      Save
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        )}
      </Container>

      <Modal show={showConfirm} onHide={handleCancelConfirm}>
        <Modal.Body>
          <strong>All unsaved changes will be lost. Continue?</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelConfirm}>
            No
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  */
  return (
  	<>
	</>
  );
};

export default EditPage;
