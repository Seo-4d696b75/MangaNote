import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import InputGroup from 'react-bootstrap/InputGroup';

function CommentModal({show, handleClose, appendComment}) {
  const [type, setType] = useState(1);
  const [text, setText] = useState("");

  const handleClick = () => {
    appendComment({type, text});
  }

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          <Tabs>
            <Tab eventKey="comment" title="コメント">
              <Form.Group>
                <Form.Control
                  placeholder="コメントを入力してください"
                  as="textarea"
                  rows="3"
                  onChange={event => {setText(event.target.value)}}
                />
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Checkbox />
                  </InputGroup.Prepend>
                  <span>ネタバレコメントに設定する</span>
                </InputGroup>
              </Form.Group>
            </Tab>
            <Tab eventKey="map" title="聖地">
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            キャンセル
          </Button>
          <Button variant="primary" onClick={handleClick}>
            投稿
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CommentModal;