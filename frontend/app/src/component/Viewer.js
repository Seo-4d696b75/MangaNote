import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

import Comment from './Comment';
import Menu from './Menu';
import CommentModal from './CommentModal';

import getComments from '../api/getComments';
import { getBooks } from "../api/getBooks";

import convertToRelativePosition from '../logic/convertToRelativePosition';
import useLongPress from '../logic/useLongPress';
import "./Viewer.css";


function Viewer() {
  const [pageNumber, setPageNumber] = useState(0);
  const [comments, setComments] = useState([]);
  const [mangaImage,setMangaImage] = useState([]);
  const [isMenuAppear,setIsMenuAppear] = useState(false);
  const [isCommentAppear,setIsCommentAppear] = useState(true);
  const [selectedUser,setSelectedUser] = useState(1);
  const [show, setShow] = useState(false);
  const bookId = 1;

  const users = [];
  for (let i = 1;i < 10;i++){
      users.push({user_id:i});
  }
  
  const mangaImagesLength = 10;

  useEffect(() => {
    async function fetchData(){

      // 初回だけ実行される処理
      const params = {
        user_id: selectedUser,
        page: 0,
        limit: mangaImagesLength - 1
      };
      var [comments, books] = await Promise.all([
        getComments(bookId, params),
        getBooks(bookId),
      ]);
      setComments(comments);
      setMangaImage(books.images);
    }
    fetchData();
  }, [selectedUser]);

  const handleLongPress = (event) => {
    const {pageX, pageY} = event;
    const [x, y] = convertToRelativePosition(pageX, pageY);
    const newComment = {x, y, type: "comment", page: pageNumber};
    setComments([...comments, newComment]);
    setShow(true);
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

  const defaultOptions = {shouldPreventDefault: true, delay: 500};

  const longPressEvent = useLongPress(handleLongPress, handleClick, defaultOptions);

  const commentChange= () => {
    setIsCommentAppear(!(isCommentAppear));
  }

  const menuChange = () => {
    setIsMenuAppear(!(isMenuAppear));
  }
  const userChange = (user_id) =>{
    setSelectedUser(+user_id);
  }

  const appendComment = (commentData) => {
    const {type, text} = commentData;
    console.log(text);
    let newComment = comments.pop();
    newComment = {...newComment, type, text};
    setComments([...comments, newComment]);
    setShow(false);
  }

  const handleModalClose = () => {
    comments.pop();
    setComments(comments);
    setShow(false);
  }
  
  const commentList = comments.map((comment, key) => {
    if(comment.page != pageNumber) return;
    return <Comment 
      key={key} 
      user_id={selectedUser}
      book_id={bookId} 
      commentData={comment} />;
  });

  return (
    <div>
      <Container id="mangaContainer">
        <div style={{position: "relative"}}>
          <Image
            id="mangaImage"
            src={mangaImage[pageNumber]}
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
                users = {users}
              />
            : null
          }
        </div>
        <CommentModal
          show={show}
          handleClose={handleModalClose}
          appendComment={appendComment}
        ></CommentModal>
      </Container>
    </div>
  );
}

export default Viewer;