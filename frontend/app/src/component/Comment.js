import React, {useEffect, useState} from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import MiniMap from './MiniMap';
import Popover from 'react-bootstrap/Popover';
import './Comment.css';
import { TwitterShareButton, TwitterIcon} from 'react-share';

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
    case 'comment':
      icon = '💬'; 
      break;
    case 'spoiler': 
      icon = '🤐'; 
      break;
    case 'map': 
      icon = '📍'; 
      break;
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
        overlay={ type === 'map' ? (
          
          <Popover className='Map-popover'>
            <Popover.Title as='h3'>
              <a target='_blank' href={`https://www.google.com/maps/search/?api=1&query=${latitude.toFixed(5)},${longitude.toFixed(5)}`}>
                {title}
              </a>
            </Popover.Title>
            <Popover.Content >
              <div className='Place-content'>
                <MiniMap lat={latitude} lng={longitude}></MiniMap>
                <div className='Place-comment-container'>
                  <div className='Place-coordinate'>
                    {`座標：${latitude>0 ? 'N':'S'}${Math.abs(latitude).toFixed(4)} ${longitude>0 ? 'E':'W'}${Math.abs(longitude).toFixed(4)}`}
                  </div>
                  <p>{text}</p>
                </div>
              </div>
            </Popover.Content>
    
          </Popover>
        ) : (
          <Tooltip>
            <div className='Comment-container'>
              <p className='Comment-text'>{text}</p>
              <div className='Action-container'>
                <TwitterShareButton 
                  url={'https://url-to-image/or/page-has-thumbnail'} 
                  title={`MangaNoteより\nコメントにいいね！しました\n「${text}」`}>
                  <TwitterIcon size='36' round={true} bgStyle={{fill:'transparent',filter:'drop-shadow(10px 10px 10px rgba(1,1,1,0.6))'}} iconFillColor='#1DA1F2'/>
                </TwitterShareButton>
              </div>
            </div>
          </Tooltip>
        )}
      >
        <p onClick={handleClick} style={style}>{icon}</p>
      </OverlayTrigger>
    </div>
  );
}

export default Comment;