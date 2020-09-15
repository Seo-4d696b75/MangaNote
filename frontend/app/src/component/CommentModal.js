import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function CommentModal({show, handleClose}) {
  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>コメントを追加</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          タグを選ぶ
          本文を書く
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            閉じる
          </Button>
          <Button variant="primary" onClick={handleClose}>
            追加
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CommentModal;