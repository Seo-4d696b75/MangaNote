import {deletedefault} from '../api/APIUtils';

function deleteGood(bookid,commentid,userid){
    const res = deletedefault("books",bookid,commentid,userid);
    return res;
}
export default deleteGood;