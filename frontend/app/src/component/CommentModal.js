import React, {useState} from "react";
import {Modal, Button, Form, Image, InputGroup, ToggleButton, ButtonGroup} from 'react-bootstrap';

import "../styles/sass/component/CommentModal.scss";
import comment_edit_svg from "../images/icon/comment_edit.svg";
import pin_edit_svg from "../images/icon/pin_edit.svg";

function CommentModal({show, handleClose, appendComment}) {
  const [text, setText] = useState("");
  const [activeTab, setActiveTab] = useState('comment');
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    let type;
    if(activeTab === 'comment') {
      const isSpoiler = document.getElementById('isSpoiler').checked;
      type = isSpoiler ? 3 : 1;
      appendComment({type, text});
    } else {
      type = 2;
      const title = "ダミー病院"
      const longitude = 0;
      const latitude = 0;
      appendComment({type, title, longitude, latitude});
    }
  }

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered id="edit">
        <div id="tabs">
          <Button eventKey="comment" className="tab--active">
            <Image
              src={comment_edit_svg}
              roundedCircle
              className="icon--active"
            />
            <span className="title--active">コメント</span>
          </Button>
          <Button className="tab">
            <Image src={pin_edit_svg} roundedCircle className="icon"/>
            <span className="title">聖 地</span>
          </Button>
        </div>
        <Modal.Body className="body">
          <Form.Group>
            <Form.Control
              placeholder="コメントを入力してください"
              as="textarea"
              rows="3"
              onChange={(event) => {
                setText(event.target.value);
              }}
              className="comment-area"
            />
            <InputGroup id="netabare" className="mb-3">
              <InputGroup.Prepend className="wrapper">
                <InputGroup.Checkbox id="isSpoiler" checked={checked} />
              </InputGroup.Prepend>
            </InputGroup>
            <div>
              <ButtonGroup toggle className="mb-2">
                <ToggleButton
                  type="checkbox"
                  variant="secondary"
                  checked={checked}
                  value="1"
                  id="isNetabare"
                  onChange={(e) => setChecked(e.currentTarget.checked)}
                  className={`toggle${checked ? "--active" : ""}`}
                ></ToggleButton>
              </ButtonGroup>
              <span>ネタバレコメントに設定する</span>
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="footer">
          <Button
            variant="secondary"
            onClick={handleClose}
            className="btn-cancel"
          >
            キャンセル
          </Button>
          <Button
            variant="primary"
            onClick={handleClick}
            className="btn-post"
          >
            投 稿
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CommentModal;