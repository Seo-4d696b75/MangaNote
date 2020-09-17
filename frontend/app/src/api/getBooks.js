import {getdefault} from "./APIUtils";

export function getBooks(bookId) {
    const res = getdefault(`books/${bookId}`);
    return res;
}


