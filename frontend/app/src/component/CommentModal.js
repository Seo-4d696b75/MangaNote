import React, {useState} from "react";
<<<<<<< HEAD
import {Modal, Button, Form, Image, InputGroup, ToggleButton, ButtonGroup} from 'react-bootstrap';

import "../styles/sass/component/CommentModal.scss";
import comment_edit_svg from "../images/icon/comment_edit.svg";
import pin_edit_svg from "../images/icon/pin_edit.svg";
=======
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import InputGroup from 'react-bootstrap/InputGroup';
import Map from './LocationSelect';
import '../styles/sass/component/CommentModal.scss'
>>>>>>> frontend

function CommentModal({show, handleClose, appendComment}) {
  const [text, setText] = useState("");
  const [activeTab, setActiveTab] = useState('comment');
<<<<<<< HEAD
  const [checked, setChecked] = useState(false);
=======
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState({ lat: 35.681236, lng: 139.767125 });
>>>>>>> frontend

  const handleClick = () => {
    let type;
    if(activeTab === 'comment') {
      const isSpoiler = document.getElementById('isSpoiler').checked;
      type = isSpoiler ? 3 : 1;
      appendComment({type, text});
    } else {
      type = 2;
      const longitude = location.lng;
      const latitude = location.lat;
      appendComment({type, text, title, longitude, latitude});
    }
  }


  return (
    <div>
<<<<<<< HEAD
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
=======
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
                <div className='map-selector-location'>
                  スポットを選択してください：{location.lat>0 ? 'N':'S'}{Math.abs(location.lat).toFixed(4)}{location.lng>0 ? 'E':'W'}{Math.abs(location.lng).toFixed(4)}
                </div>
                  <Map 
                    callback={pos => {setLocation(pos)}}
                    init_location={location}></Map>
                <Form.Control
                  placeholder="タイトルを入力してください"
                  as="textarea"
                  rows="1"
                  onChange={event => {setTitle(event.target.value)}}
                />
                <Form.Control
                  placeholder="聖地の説明を入力してください"
                  as="textarea"
                  rows="3"
                  onChange={event => {setText(event.target.value)}}
                />
            </Tab>
          </Tabs>
>>>>>>> frontend
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
<<<<<<< HEAD
            onClick={handleClick}
            className="btn-post"
          >
            投 稿
=======
            disabled={!text.length}
            onClick={handleClick}
          >
            投稿
>>>>>>> frontend
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CommentModal;