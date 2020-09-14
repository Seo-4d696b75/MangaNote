from flask import jsonify, Blueprint, request
import logging
from app.database import db
from app.models import *

import base64

logger = logging.getLogger('app')
comments = Blueprint('comments', __name__)


@comments.route('/comments')
def get_comments(book_id):
    page = int(request.args.get('page', '-1'))
    limit = int(request.args.get('limit', '1000000'))
    try:
        comments = db.session.query(Comment)\
            .filter(Comment.book_id==book_id,Comment.page>page,Comment.page<page+limit)\
            .all()
        return jsonify(comments)
    except Exception as e:
        message = str(e)
        logger.error(message)
        return jsonify({
            "message": message
        }), 500
