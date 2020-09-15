import {getdefault} from "./APIUtils";

export function getBooks(bookid) {
    const res = getdefault(`books/${bookid}`);
    return res;
}


