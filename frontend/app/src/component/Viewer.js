import React, {useState} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import "./Viewer.css"

function Viewer() {
  const [pageNumber, setPageNumber] = useState(0);
  const mangaImageUrl = `https://raw.githubusercontent.com/Seo-4d696b75/MangaNote/frontend_fukazawanatsuki/frontend/app/src/images/comic/${pageNumber}.png`
  const mangaImagesLength = 3;

  const handleClick = (event) => {
    const {pageX, pageY} = event;
    const [x, y] = normalCoordinate(pageX, pageY);

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
      <Container>
        <Row>
          <Col>
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

// TODO: 以下の関数を適切な場所に移動
// ブラウザ座標 -> 正規座標
const normalCoordinate = (pageX, pageY) => {
  const mangaImage = document.getElementById('mangaImage');
  const clientRect = mangaImage.getBoundingClientRect();
  const {left, right, top, bottom} = clientRect;
  const x = (pageX - left) / (right - left);
  const y = (pageY - top) / (bottom - top);
  return [x, y];
}

// 正規座標 -> ブラウザ座標
const pageCoordinate = (x, y) => {
  const mangaImage = document.getElementById('mangaImage');
  const clientRect = mangaImage.getBoundingClientRect();
  const {left, right, top, bottom} = clientRect;
  const pageX = (right - left) * x + left;
  const pageY = (top - bottom) * y + bottom;
  return [pageX, pageY];
}

export default Viewer;