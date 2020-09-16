import React, {useEffect, useState} from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import MiniMap from './MiniMap';
import Popover from 'react-bootstrap/Popover';
import './Comment.css';
import { TwitterShareButton, TwitterIcon} from 'react-share';

import heart from '../images/comic/heart.svg';
import heartFill from '../images/comic/heart-fill.svg';

import put_good from '../api/putGood';

function Comment(props) {
  const {id, type, title, text, longitude, latitude, x, y} = props.commentData;
  const [isLiked, setIsLiked] = useState(props.commentData.is_liked);
  const [like_cnt, setLikeCnt] = useState(props.commentData.like_cnt);
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

  const onLikeClicked = async () => {
    //TODO call API
    const before_cnt = like_cnt;
    if ( isLiked ){
      setIsLiked(false);
    } else {
      // animate like icon for 0.2 sec
      setIsLiked(true);
      setLikeAnimated(true);
      setTimeout(() => {
        setLikeAnimated(false);
      }, 200);
      setLikeCnt(before_cnt + 1);
      var res = await put_good(props.book_id, id, props.user_id);
      if ( res.status === 204 ){
        // success
        console.log('success to put like!', res.url);
        props.callback(id, true, before_cnt + 1);
      } else {
        // failure
        console.log('fail')
        setIsLiked(false);
        setLikeCnt(before_cnt);
      }
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
        <p onClick={handleClick} style={style}>{icon}</p>
      </OverlayTrigger>
    </div>
  );
}

export default Comment;