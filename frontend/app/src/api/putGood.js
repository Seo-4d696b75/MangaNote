import {putdefault} from '../api/APIUtils';

function putGood(bookid,commentid,userid){
    const res = putdefault("books",bookid,commentid,userid);
    return res;
}
export default putGood;