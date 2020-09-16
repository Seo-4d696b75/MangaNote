// TODO: APIからコメントを取得
import {getdefault} from "../api/APIUtils";
/* mangaId -> API -> コメント一覧 */

function getComments(mangaId,params) {
  
  const res = getdefault(`books/${mangaId}/comments`,params);
  return res;
  /*
  const dummyData = [
    {
      user_id: 0,
      type: 'comment',
      title: 'コメントのタイトルです00',
      text: 'ここにコメントを入力。ここにコメントを入力。',
      longitude: 0,
      latitude: 0,
      page: 0,
      x: 50,
      y: 50,
      is_liked: false
    },
    {
      user_id: 1,
      type: 'spoiler',
      title: 'ネタバレコメントのタイトルです',
      text: 'ここにネタバレコメントを入力。',
      longitude: 0,
      latitude: 0,
      page: 1,
      x: 20,
      y: 40,
      is_liked: true
    },
    {
      user_id: 2,
      type: 'map',
      title: '聖地コメントのタイトルです',
      text: 'ここに聖地コメントを入力。',
      longitude: 139.640845,
      latitude: 35.559509,
      page: 2,
      x: 30,
      y: 50,
      is_liked: false
    },
    {
      user_id: 3,
      type: 'comment',
      title: 'コメントのタイトルです',
      text: 'ここにコメントを入力。ここにコメントを入力。',
      longitude: 0,
      latitude: 0,
      page: 2,
      x: 10,
      y: 80,
      is_liked: false
    }
  ]
  return dummyData;
  */
}

export default getComments;