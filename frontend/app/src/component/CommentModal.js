import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function CommentModal({show, handleClose, appendComment}) {
  const [type, setType] = useState("comment");
  const [text, setText] = useState("");

  const handleClick = () => {
    appendComment({type, text});
  }

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>コメントを追加</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>タグ</Form.Label>
            <Form.Control
              as="select"
              onChange={event => {setType(event.target.value)}}
            >
              <option value="comment">💬　コメント</option>
              <option value="spoiler">🤐　ネタバレ</option>
              <option value="map">📍　聖地</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>本文</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              onChange={event => {setText(event.target.value)}}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClick}>
            追加
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CommentModal;