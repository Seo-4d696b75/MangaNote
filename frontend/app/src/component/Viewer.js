import React, {useState, useEffect} from "react";
import Comment from './Comment';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import getComments from '../api/getComments';
import convertToRelativePosition from '../logic/convertToRelativePosition';
import "./Viewer.css";

function Viewer() {
  const [pageNumber, setPageNumber] = useState(0);
  const [comments, setComments] = useState([]);
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

    if(x <= 50) {
      // 左半分をクリック
      setPageNumber(pageNumber ? pageNumber - 1 : 0);
    } else {
      // 右半分をクリック
      if(pageNumber + 1 >= mangaImagesLength) {
        setPageNumber(mangaImagesLength - 1);
      } else {
        setPageNumber(pageNumber + 1)
      }
    }
  }

  let commentList = comments.map((comment, key) => {
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
        </div>
      </Container>
    </div>
  );
}

export default Viewer;