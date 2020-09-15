from flask import jsonify, Blueprint, request
import logging
from app.database import db
from app.models import *
from sqlalchemy import func

import base64

logger = logging.getLogger('app')
comments = Blueprint('comments', __name__)


@comments.route('/comments')
def get_comments(book_id):
    user_id = int(request.args.get('user_id', '0'))
    page = int(request.args.get('page', '-1'))
    limit = int(request.args.get('limit', '1000000'))
    try:
        comments = db.session.query(Comment)\
            .filter(
                Comment.book_id == book_id,
                Comment.page > page,
                Comment.page < page+limit )\
            .order_by(Comment.page)\
            .all()
        comments = list(map(lambda c: {
            'id': c.id,
            'type': c.type_id,
            'user_id': c.user_id,
            'title': c.title,
            'text': c.text,
            'longitude': c.longitude,
            'latitude': c.latitude,
            'x': c.x,
            'y': c.y,
            'is_liked': db.session.query(func.count(Like.user_id))\
                .filter(Like.user_id == user_id, Like.comment_id == c.id).scalar() > 0,
            'like_cnt': db.session.query(func.count(Like.user_id))\
                .filter(Like.comment_id == c.id ).scalar()
        }, comments))
        return jsonify(comments)
    except Exception as e:
        message = str(e)
        logger.error(message)
        return jsonify({
            "message": message
        }), 500
