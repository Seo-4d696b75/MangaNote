import React, {useEffect, useState} from "react";
import "../styles/sass/component/Comment.scss";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import MiniMap from './MiniMap';
import Popover from 'react-bootstrap/Popover';
import { TwitterShareButton, TwitterIcon} from 'react-share';

import heart from '../images/comic/heart.svg';
import heartFill from '../images/comic/heart-fill.svg';

import put_good from '../api/putGood';
import delete_good from '../api/deleteGood';

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
    const current_liked = isLiked;
    const before_cnt = like_cnt;
    const after_cnt = before_cnt + (current_liked ? -1 : 1);
    setIsLiked(!current_liked);
    setLikeCnt(after_cnt);
    if ( !current_liked ){
      // animation for 0.2 sec
      setLikeAnimated(true);
      setTimeout(() => {
        setLikeAnimated(false);
      }, 200);
    }
    var res = (current_liked ? 
      await delete_good(props.book_id, id, props.user_id) :
      await put_good(props.book_id, id, props.user_id)
    );
    if ( res.status === 204 ){
      console.log('success to put/delete like', res);
      props.callback(id, !current_liked, after_cnt);
    } else {
      console.log('fail to put/delete like', res);
      setIsLiked(current_liked);
      setLikeCnt(before_cnt);
    }
  }


  return (
    <div>
      <OverlayTrigger
        trigger="click"
        placement={placement}

        overlay={ type === 2 ? (
          <Popover className='map-popover'>
            <Popover.Title as='h3'>
              <a target='_blank' href={`https://www.google.com/maps/search/?api=1&query=${latitude.toFixed(5)},${longitude.toFixed(5)}`}>
                {title}
              </a>
            </Popover.Title>
            <Popover.Content>
              <div className='place-content'>
                <MiniMap lat={latitude} lng={longitude}></MiniMap>
                <div className='place-comment-container'>
                  <div className='place-coordinate'>
                    {`座標：${latitude>0 ? 'N':'S'}${Math.abs(latitude).toFixed(4)} ${longitude>0 ? 'E':'W'}${Math.abs(longitude).toFixed(4)}`}
                  </div>
                </div>
              </div>
              </Popover.Content>
            </Popover>
          ) : (
          <Popover className='comment'>
            <div className='comment__container'>
              <p className='comment__text'>{text}</p>
              <div className='comment__footer'>
                <img
                  className={`comment-like-icon ${like_animated ? 'animated' : ''}`}
                  src={isLiked ? heartFill : heart}
                  onClick={onLikeClicked}
                />
                <div 
                  className='comment-like-cnt'
                  style={{color: isLiked ? 'red':'black'}}>
                  {like_cnt}
                </div>
                <TwitterShareButton 
                  className='comment-sns-button'
                  url={'https://url-to-image/or/page-has-thumbnail'} 
                  title={`MangaNoteより\nコメントにいいね！しました\n「${text}」`}>
                  <TwitterIcon size='36' round={true} bgStyle={{fill:'transparent'}} iconFillColor='#1DA1F2'/>
                </TwitterShareButton>
              </div>
            </div>
          </Popover>
        )}>
        <p onClick={handleClick} style={style}>
          {icon}
        </p>
      </OverlayTrigger>
    </div>
  );
}

export default Comment;