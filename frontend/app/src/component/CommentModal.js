import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import InputGroup from 'react-bootstrap/InputGroup';
import Map from './LocationSelect';
import '../styles/sass/component/CommentModal.scss'

function CommentModal({show, handleClose, appendComment}) {
  const [text, setText] = useState("");
  const [activeTab, setActiveTab] = useState('comment');
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