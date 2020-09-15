import React, {useState} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import "./Viewer.css";

import Menu from './Menu';


function Viewer() {
  const [pageNumber, setPageNumber] = useState(0);
  const [isMenuAppear,setisMenuAppear] = useState(false);
  const [isCommentAppear,setisCommentAppear] = useState(true);
  const mangaImageUrl = `https://raw.githubusercontent.com/Seo-4d696b75/MangaNote/frontend_fukazawanatsuki/frontend/app/src/images/comic/${pageNumber}.png`
  const mangaImagesLength = 3;

  const handleClick = (event) => {
    const {screenX, screenY} = event;
    const mangaImage = event.target;
    const clientRect = mangaImage.getBoundingClientRect();
    const {left, right, top, bottom} = clientRect;

    if(screenX <= (left + right) / 3) {
      // 左側をクリック
      setPageNumber(pageNumber ? pageNumber - 1 : 0);
    } else if(screenX >= 2*(left + right) / 3)
     {
      // 右側をクリック
      if(pageNumber + 1 >= mangaImagesLength) {
        setPageNumber(mangaImagesLength - 1);
      } else {
        setPageNumber(pageNumber + 1)
      }
    }
    else{
    　//中央をクリック
        setisMenuAppear(!(isMenuAppear));
        //console.log("click",isMenuAppear);
    }
  }
  const commentChange= () =>{
    setisCommentAppear(!(isCommentAppear));
    console.log("comment",isCommentAppear);
  }
  const menuChange = () =>{
    setisMenuAppear(!(isMenuAppear));
  }
  const userChange = () =>{
    
  }
  

  return (
    <div>
      <Container>
        <Row>
          <Col>
          {isMenuAppear 
            ? <Menu 
                userChange = {userChange}
                commentChange = {commentChange}
                menuChange = {menuChange}
              /> 
            : null 
          }
            <Image
              id="mangaImage"
              className="mx-auto d-block"
              src={mangaImageUrl}
              onClick={handleClick}
            />
          </Col>
        
        </Row>
      </Container>
    </div>
  );
}

export default Viewer;