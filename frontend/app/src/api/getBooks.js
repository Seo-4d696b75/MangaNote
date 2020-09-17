import { getdefault } from "./APIUtils";

// ダミー
const getFromGithub = async (bookId, mangaImagesLength) => {
  const baseurl =
    "https://raw.githubusercontent.com/Seo-4d696b75/MangaNote/deploy/backend/app/books/";
    
  const result = {
    id: bookId,
    title: `ブラックジャックによろしく_1_${bookId}_佐藤秀峰`,
    images: [],
  };
  for (let i = 0; i < mangaImagesLength; i++) {
    result.images.push(baseurl + bookId + "/" + (i+1) + ".jpeg");
  }

  return result;
};

export function getBooks(bookId) {
  //   const res = getdefault(`books/${bookId}`);
  //   return res;
  return getFromGithub(bookId, 10);
}
