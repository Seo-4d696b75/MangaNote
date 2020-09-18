import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

import Comment from './Comment';
import Menu from './Menu';
import CommentModal from './CommentModal';

import getComments from '../api/getComments';
import { getBooks } from "../api/getBooks";
import postComment from "../api/postComment";

import convertToRelativePosition from '../logic/convertToRelativePosition';
import useLongPress from '../logic/useLongPress';
import "../styles/sass/component/Viewer.scss";


function Viewer() {
  const [pageNumber, setPageNumber] = useState(0);
  const [comments, setComments] = useState([]);
  const [mangaImage,setMangaImage] = useState([]);
  const [isMenuAppear,setIsMenuAppear] = useState(false);
  const [isCommentAppear,setIsCommentAppear] = useState(true);
  const [selectedUser,setSelectedUser] = useState(1);
  const [show, setShow] = useState(false);
  const [animatedCommentID, setAnimatedCommentID] = useState(-1);
  const bookId = 1;
  const users = [];
  for (let i = 1;i < 10;i++){
      users.push({user_id:i});
  }
  const mangaImagesLength = 10;

  useEffect(() => {
    async function fetchBooks() {
      const books = await getBooks(bookId);
      setMangaImage(books.images);
    }
    fetchBooks();
  }, []);

  useEffect(() => {
    async function fetchComments(){
      const params = {
        user_id: selectedUser,
        page: 0,
        limit: mangaImagesLength
      };
      const list = await getComments(bookId, params);
      setComments(list);
    }
    fetchComments();
  }, [selectedUser]);

  const handleLongPress = (event) => {
    const {pageX, pageY} = event;
    const [x, y] = convertToRelativePosition(pageX, pageY);
    const newComment = {
      user_id: selectedUser, 
      type: 1, 
      page: pageNumber, 
      x, 
      y,
      animation: 'blink'
    };
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
    console.log(`user changed ${selectedUser} > ${parseInt(user_id)}`);
    setSelectedUser(+user_id);
  }

  // コメント追加
  const appendComment = async (commentData) => {
    const {type, text, title, longitude, latitude} = commentData;
    console.log('post a comment', text);
    setShow(false);    
    var newComment = comments[comments.length-1];
    newComment = {...newComment, type, text, title, longitude, latitude};
    var res = await postComment(bookId, newComment);
    const comment_id = res.comment_id;
    if ( comment_id ){
      newComment.id = comment_id;
      newComment.animation = 'appeal'
      console.log('success to post a comment', newComment);
      comments.pop();
      setComments([...comments, newComment]);
      setAnimatedCommentID(comment_id);
      setTimeout(() => {
        newComment.animation = undefined;
      }, 300);
    }
  }

  const handleModalClose = () => {
    comments.pop();
    setComments(comments);
    setShow(false);
  }

  // Commentコンポーネントでデータに変更（いいね！）あったとき反映する
  const onLikeChanged = (comment_id, is_liked, like_cnt) => {
    setComments(comments.map( comment => {
      if ( comment.id === comment_id ){
        comment.is_liked = is_liked;
        comment.like_cnt = like_cnt;
      }
      return comment;
    }));
  }
  
  const commentList = comments.map( comment => {
    if(comment.page != pageNumber) return;
    return <Comment 
      animation={comment.animation}
      key={comment.id} 
      user_id={selectedUser}
      book_id={bookId} 
      commentData={comment}
      callback={onLikeChanged} />;
  });

  return (
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
            ? 
              <Menu
                userChange = {userChange}
                commentChange = {commentChange}
                menuChange = {menuChange}
                isCommentAppear = {isCommentAppear}
                isMenuAppear = {isMenuAppear}
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
  );
}

export default Viewer;