import React, {useEffect, useState} from "react";
import "../styles/sass/component/Comment.scss";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import MiniMap from './MiniMap';
import Popover from 'react-bootstrap/Popover';
import { TwitterShareButton, TwitterIcon} from 'react-share';

import heart from '../images/comic/heart.svg';
import heartFill from '../images/comic/heart-fill.svg';

function Comment({commentData}) {
  const {type, title, text, longitude, latitude, x, y, like_cnt} = commentData;
  const [isLiked, setIsLiked] = useState(commentData.is_liked);
  const [like_animated, setLikeAnimated] = useState(false);
  const max_font_size = 3;
  const min_font_size = 1;
  const font_size = min_font_size + (max_font_size - min_font_size) * (1.0 - Math.exp(-like_cnt/40.0));
  const style = {
    color: "red",
    position: "absolute",
    top: `${y}%`,
    left: `${x}%`,
    cursor: "pointer",
    fontSize: `${font_size.toFixed(1)}rem`
  };

  let icon;
  switch(type) {
    case 1:
      icon = '💬'; 
      break;
    case 2:
      icon = '📍'; 
      break;
    case 3:
      icon = '🤐'; 
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

  const onLikeClicked = () => {
    //TODO call API
    if ( isLiked ){
      setIsLiked(false);
    } else {
      // animate like icon for 0.2 sec
      setIsLiked(true);
      setLikeAnimated(true);
      setTimeout(() => {
        setLikeAnimated(false);
      }, 200);
    }
  }


  return (
    <div>
      <OverlayTrigger
        trigger="click"
        placement={placement}
        overlay={ type === 2 ? (
          
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
                </div>
              </Popover.Content>
            </Popover>
          ) : (
            <Popover className="comment">
              <div className="comment__container">
                <p className="comment__text">{text}</p>
                <div className="comment__footer">
                  <img
                    src={isLiked ? heartFill : heart}
                    onClick={() => setIsLiked(!isLiked)}
                  />
                  <TwitterShareButton
                    url={"https://url-to-image/or/page-has-thumbnail"}
                    title={`MangaNoteより\nコメントにいいね！しました\n「${text}」`}
                  >
                    <TwitterIcon
                      size="36"
                      round={true}
                      bgStyle={{
                        fill: "transparent",
                        filter: "drop-shadow(10px 10px 10px rgba(1,1,1,0.6))",
                      }}
                      iconFillColor="#1DA1F2"
                    />
                  </TwitterShareButton>
                </div>
              </div>
            </Popover.Content>
    
          </Popover>
        ) : (
          <Tooltip>
            <div className='Comment-container'>
              <p className='Comment-text'>{text}</p>
              <div className='Action-container'>
                <img
                  className={`Comment-like-icon ${like_animated ? 'animated' : ''}`}
                  src={isLiked ? heartFill : heart}
                  onClick={onLikeClicked}
                />
                <div 
                  className='Comment-like-cnt'
                  style={{color: isLiked ? 'red':'white'}}>
                  {like_cnt}
                </div>
                <TwitterShareButton 
                  className='Comment-sns-button'
                  url={'https://url-to-image/or/page-has-thumbnail'} 
                  title={`MangaNoteより\nコメントにいいね！しました\n「${text}」`}>
                  <TwitterIcon size='36' round={true} bgStyle={{fill:'transparent'}} iconFillColor='#1DA1F2'/>
                </TwitterShareButton>
              </div>
            </div>
          </Tooltip>
        )}
      >
        <p onClick={handleClick} style={style}>
          {icon}
        </p>
      </OverlayTrigger>
    </div>
  );
}

export default Comment;