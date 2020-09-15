import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

import Comment from './Comment';
import Menu from './Menu';

import getComments from '../api/getComments';
import convertToRelativePosition from '../logic/convertToRelativePosition';
import useLongPress from '../logic/useLongPress';
import "./Viewer.css";

function Viewer() {
  const [pageNumber, setPageNumber] = useState(0);
  const [comments, setComments] = useState([]);
  const [isMenuAppear,setIsMenuAppear] = useState(false);
  const [isCommentAppear,setIsCommentAppear] = useState(true);
  const [selectedUser,setSelectedUser] = useState(1);
  const user = [{username:"太郎",user_id:1},{username:"次郎",user_id:2},{username:"三郎",user_id:3}];
  const mangaImageUrl = `https://raw.githubusercontent.com/Seo-4d696b75/MangaNote/frontend_fukazawanatsuki/frontend/app/src/images/comic/${pageNumber}.png`
  const mangaImagesLength = 3;

  useEffect(() => {
    // 初回だけ実行される処理
    const bookId = 0;
    setComments(getComments(bookId));
  }, []);

  const handleLongPress = (event) => {
    console.log("LongPress");
  }

  const handleClick = (event) => {
    const {pageX, pageY} = event;
    const [x, y] = convertToRelativePosition(pageX, pageY);

    if(x <= 100/3) { // 左側をクリック
      setPageNumber(Math.max(pageNumber-1, 0));
    } else if(x >= 200/3) { // 右側をクリック
      setPageNumber(Math.min(pageNumber+1, mangaImagesLength-1))
    } else { //中央をクリック
      setIsMenuAppear(!(isMenuAppear));
    }
  }

  const defaultOptions = {shouldPreventDefault: true, delay: 500,};

  const longPressEvent = useLongPress(handleLongPress, handleClick, defaultOptions);

  const commentChange= () => {
    setIsCommentAppear(!(isCommentAppear));
    //console.log("comment",isCommentAppear);
  }

  const menuChange = () => {
    setIsMenuAppear(!(isMenuAppear));
  }
  const userChange = (user_id) =>{
    setSelectedUser(+user_id);
    
  }
  
  const commentList = comments.map((comment, key) => {
    if(comment.page != pageNumber) return;
    return <Comment key={key} {...comment} />;
  });

  return (
    <div>
      <Container id="mangaContainer">
        <div style={{position: "relative"}}>
          <Image
            id="mangaImage"
            src={mangaImageUrl}
            {...longPressEvent}
          />
          {isCommentAppear
            ? commentList
            : null
          }
          {isMenuAppear
            ? <Menu
                userChange = {userChange}
                commentChange = {commentChange}
                menuChange = {menuChange}
              />
            : null
          }
        </div>
      </Container>
    </div>
  );
}

export default Viewer;