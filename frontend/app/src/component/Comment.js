import React, {useEffect, useState} from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function Comment({user_id, type, title, text, longitude, latitude, page, x, y}) {
  const style = {
    color: "red",
    position: "absolute",
    top: `${y}%`,
    left: `${x}%`,
    cursor: "pointer"
  };

  let icon;
  switch(type) {
    case 'comment': icon = '💬'; break;
    case 'spoiler': icon = '🤐'; break;
    case 'map': icon = '📍'; break;
  }

  // アイコン位置によって吹き出し位置を変える
  let placement = 'bottom';
  if(x <= 20) {
    placement = 'right';
  } else if(x >= 80) {
    placement = 'left';
  } else if(y >= 80) {
    placement = 'top';
  }

  const handleClick = () => {
    console.log({title, text});
  }

  return (
    <div>
      <OverlayTrigger
        trigger="click"
        placement={placement}
        overlay={<Tooltip>{text}</Tooltip>}
      >
        <p onClick={handleClick} style={style}>{icon}</p>
      </OverlayTrigger>
    </div>
  );
}

export default Comment;