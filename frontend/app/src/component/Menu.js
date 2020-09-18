import React, { useState } from "react";

import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/DropdownItem';

import "../styles/sass/component/Menu.scss";
import comment_toggle_svg from "../images/icon/comment_toggle.svg";

function Menu(props) {
  



  const handleCommentChange = () => {
    props.commentChange();
    // 表示・非表示の切り替えはしばらくボタンを表示したままにする
    //checkTimeOut();
    props.menuChange();
  }

  const handleUserChange = (eventKey) => {
    //console.log(eventKey);
    props.userChange(eventKey);
    //console.log(props.selectedUser);
    props.menuChange();
  }

  const userDropdown = props.users.map((user) => {
    return (
      <DropdownItem eventKey={user.user_id}>{user.user_id}</DropdownItem>
    )
  }
  )


  return (
    <div className={`menu-container ${props.animation}`}>
      <Button
        variant={`outline-${
          props.isCommentAppear ? "success" : "secondary"
          }`}
        onClick={handleCommentChange}
        id="menu"
        className={`rounded-circle p-0 comment-menu${
          props.isCommentAppear ? "--appear" : ""
          }`}
      >
        {props.isCommentAppear ? (
          <div className="comment-menu__container">
            <svg className="comment-menu__icon">
              <line
                x1="5"
                y1="5"
                x2="44"
                y2="44"
                stroke="#000"
                className="comment-menu__line"
              ></line>
            </svg>
            <span className="comment-menu__text">非表示</span>
          </div>

        ) : (
            <div className="comment-menu__container">
              <img
                src={comment_toggle_svg}
                className="comment-menu__icon--appear"
              ></img>
              <span className="comment-menu__text">表 示</span>
            </div>
          )}
      </Button>

      <DropdownButton
        key="down"
        title={props.selectedUser}
        variant="secondary"
        onSelect={(eventKey) => handleUserChange(eventKey)}
      >
        {userDropdown}
      </DropdownButton>
    </div>
  );
}

export default Menu;