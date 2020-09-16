// TODO: APIからコメントを取得
import {getdefault} from "../api/APIUtils";
/* mangaId -> API -> コメント一覧 */

function getComments(mangaId,params) {
  const res = getdefault(`books/${mangaId}/comments`,params);
  return res;
}

export default getComments;