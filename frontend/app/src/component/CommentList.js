import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import {getdefault} from '../api/APIUtils';

import heart from '../images/comic/heart.svg';
import heartFill from '../images/comic/heart-fill.svg';

/**
 * コメントを一覧表示するモーダル
 * isActive: モーダルが表示状態か否か
 * userId: 対象となるユーザー
 * bookId: 対象となる本
 * handleClose: モーダルを閉じる時の処理
*/
function CommentList(props) {
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    async function fetchCommentList() {
      const userId = props.userId;
      const commentLists = await getdefault(`users/${userId}/comments`);
      if(props.bookId in commentLists) {
        setCommentList(commentLists[props.bookId]);
      }
    }
    fetchCommentList();
  }, [props.userId]);

  const commentListElement = commentList.map(comment => {
    if(comment.type == 2) return;　// 聖地コメントは除外
    return (
      <div className="py-2 border-bottom">
        <strong className="d-block">{comment.user_name}</strong>
        {comment.text}
        <div className="like" style={{width: "30px"}}>
          <img
            className='like__icon'
            src={comment.is_liked ? heartFill : heart}
          />
          <div className={`like__cnt${comment.is_liked ? "--islinked" : ""}`}>
            {comment.like_cnt}
          </div>
        </div>
      </div>
    )
  });

  return (
    <div>
      <Modal
        show={props.isActive}
        onHide={props.handleClose}
        scrollable
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>コメント一覧</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {commentListElement}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CommentList;