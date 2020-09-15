import React, {useEffect, useState} from "react";

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

  const handleClick = () => {
    console.log({title, text});
  }

  return (
    <div>
      <p onClick={handleClick} style={style}>{icon}</p>
    </div>
  );
}

export default Comment;