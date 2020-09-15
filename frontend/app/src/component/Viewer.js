import React, {useState} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import convertToRelativePosition from "../logic/convertToRelativePosition";
import "./Viewer.css";

function Viewer() {
  const [pageNumber, setPageNumber] = useState(0);
  const mangaImageUrl = `https://raw.githubusercontent.com/Seo-4d696b75/MangaNote/frontend_fukazawanatsuki/frontend/app/src/images/comic/${pageNumber}.png`
  const mangaImagesLength = 3;

  const handleClick = (event) => {
    const {pageX, pageY} = event;
    const [x, y] = convertToRelativePosition(pageX, pageY);

    if(x <= 1/2) {
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

  return (
    <div>
      <Container id="mangaContainer">
        <div style={{position: "relative"}}>
          <Image
            id="mangaImage"
            src={mangaImageUrl}
            onClick={handleClick}
          />
        </div>
      </Container>
    </div>
  );
}

export default Viewer;