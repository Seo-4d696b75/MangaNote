import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

import Comment from './Comment';
import Menu from './Menu';

import getComments from '../api/getComments';
import convertToRelativePosition from '../logic/convertToRelativePosition';
import "./Viewer.css";

function Viewer() {
  const [pageNumber, setPageNumber] = useState(0);
  const [comments, setComments] = useState([]);
  const [isMenuAppear,setisMenuAppear] = useState(false);
  const [isCommentAppear,setisCommentAppear] = useState(true);
  const mangaImageUrl = `https://raw.githubusercontent.com/Seo-4d696b75/MangaNote/frontend_fukazawanatsuki/frontend/app/src/images/comic/${pageNumber}.png`
  const mangaImagesLength = 3;

  useEffect(() => {
    // 初回だけ実行される処理
    const bookId = 0;
    setComments(getComments(bookId));
  }, []);

  const handleClick = (event) => {
    const {pageX, pageY} = event;
    const [x, y] = convertToRelativePosition(pageX, pageY);

    if(x <= 100/3) { // 左側をクリック
      setPageNumber(Math.max(pageNumber-1, 0));
    } else if(x >= 200/3) { // 右側をクリック
      setPageNumber(Math.min(pageNumber+1, mangaImagesLength-1))
    } else { //中央をクリック
      setisMenuAppear(!(isMenuAppear));
    }
  }

  const commentChange= () => {
    setisCommentAppear(!(isCommentAppear));
    console.log("comment",isCommentAppear);
  }

  const menuChange = () => {
    setisMenuAppear(!(isMenuAppear));
  }

  const userChange = () => {
    
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
            onClick={handleClick}
          />
          {commentList}
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