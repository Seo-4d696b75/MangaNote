import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import InputGroup from 'react-bootstrap/InputGroup';

function CommentModal({show, handleClose, appendComment}) {
  const [text, setText] = useState("");
  const [activeTab, setActiveTab] = useState('comment');

  const handleClick = () => {
    let type;
    if(activeTab === 'comment') {
      const isSpoiler = document.getElementById('isSpoiler').checked;
      type = isSpoiler ? 3 : 1;
      appendComment({type, text});
    } else {
      type = 2;
      const title = "ダミースーパーマーケット"
      const text = "海の上のスーパーマーケットです"
      const longitude = 0;
      const latitude = 0;
      appendComment({type, text, title, longitude, latitude});
    }
  }

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
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
                    <InputGroup.Checkbox id="isSpoiler" />
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