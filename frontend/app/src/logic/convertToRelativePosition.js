/* ブラウザ座標 -> 正規座標 */
const convertToRelativePosition = (pageX, pageY) => {
  const mangaImage = document.getElementById('mangaImage');
  const clientRect = mangaImage.getBoundingClientRect();
  const {left, right, top, bottom} = clientRect;
  const x = (pageX - left) / (right - left) * 100;
  const y = (pageY - top) / (bottom - top) * 100;
  return [x, y];
}

export default convertToRelativePosition;