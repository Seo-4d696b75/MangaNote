import {postdefault} from "./APIUtils";
/*params example
    const params = {
      user_id:1,
      type:1,
      title:null,
      text:"test",
      longitude:null,
      latitude:null,
      page:0,
      x:10,
      y:10
    }
*/
function postComment(bookId,params) {
    const res = postdefault(`books/${bookId}/comments`,params);
    return res;
}

export default postComment;