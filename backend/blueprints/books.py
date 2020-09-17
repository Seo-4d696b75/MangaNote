from flask import jsonify, Blueprint, request
import logging
from app.database import db
from app.models import *
import os
import glob

import base64

logger = logging.getLogger('app')
books = Blueprint('books', __name__)


@books.route('/test')
def index():
    logger.warn('warn')
    logger.error('error')
    logger.critical('critical')
    return jsonify({
        "message": "books_test"
    })


@books.route('/')
def get_list():
    page = request.args.get("page", default=0, type=int)
    limit = request.args.get("limit", default=10, type=int)
    offset = page * limit
    try:
        books = Book.query.limit(limit).offset(offset)
    except Exception as e:
        logger.error(e)
        return jsonify({"status": "Internal server error"}), 500

    result = []
    for book in books:
        result.append({
            "id": book.id,
            "title": book.title,
            "comment_cnt": len(book.comments)
        })
    return jsonify(result)


@books.route('/<int:book_id>')
def get_detail(book_id):
    try:
        book = Book.query.get(book_id)
    except Exception as e:
        logger.error(e)
        return jsonify({"status": "Internal server error"}), 500

    if book is None:
        return jsonify({"status": "Not Found"}), 404

    images = []
    paths = glob.glob(book.path + '*')
    paths.sort()
    for path in paths:
        extention = path.split('.', 1)[1]
        ret = f"data:image/{extention};base64,"
        with open(path, "rb") as f:
            try:
                img_binary = f.read()
            except Exception as e:
                logger.error(e)
                return jsonify({"status": "Internal server error"}), 500

            b64_binary = base64.b64encode(img_binary)
            b64_string = b64_binary.decode('utf-8')
            ret += b64_string
            images.append(ret)

    return jsonify({
        "id": book_id,
        "title": book.title,
        "images": images,
    })
