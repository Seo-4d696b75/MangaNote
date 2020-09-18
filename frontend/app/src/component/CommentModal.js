import React, {useState} from "react";

import {Modal, Button, Form, Image, InputGroup, ToggleButton, ButtonGroup} from 'react-bootstrap';

import Map from "./LocationSelect";

import "../styles/sass/component/CommentModal.scss";
import comment_edit_svg from "../images/icon/comment_edit.svg";
import pin_edit_svg from "../images/icon/pin_edit.svg";

function CommentModal({show, handleClose, appendComment}) {
  const [text, setText] = useState("");
  const [activeTab, setActiveTab] = useState('comment');
  const [checked, setChecked] = useState(false);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState({ lat: 35.681236, lng: 139.767125 });


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

  const commentTab = (
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
  );

  const mapTab = (
    <div eventKey="map" title="聖地">
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
    </div> 
  );


  return (
    <div>
      <Modal show={show} onHide={handleClose} centered id="edit">
        <div id="tabs">
          <Button
            className={`tab${activeTab === 'comment' ? '--active' : ''}`}
            onClick={()  =>  setActiveTab('comment')}
          >
            <Image
              src={comment_edit_svg}
              roundedCircle
              className={`icon${activeTab === 'comment' ? '--active' : ''}`}
            />
            <span className="title--active">コメント</span>
          </Button>
          <Button
            className={`tab${activeTab === 'map' ? '--active' : ''}`}
            onClick={()  =>  setActiveTab('map')}
          >
            <Image
              src={pin_edit_svg}
              roundedCircle
              className={`icon${activeTab === 'map' ? '--active' : ''}`}
            />
            <span className="title">聖 地</span>
          </Button>
        </div>
        <Modal.Body className="body">
          {activeTab === "comment" ? commentTab : mapTab}
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
            disabled={!text.length}
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