from flask import jsonify, Blueprint, request
import logging
from app.database import db
from app.models import User, Comment

logger = logging.getLogger('app')
users = Blueprint('users', __name__)


@users.route('/<int:id>', methods=['GET'])
def user_info(id):
    try:
        user = User.query.get(id)
    except Exception as e:
        logger.error(e)
        return jsonify({"status": "Internal server error"}), 500

    if user is None:
        return jsonify({"status": "User not Found"}), 404

    return jsonify({
        'id': user.id,
        'user_name': user.name
    })


@users.route('/<int:id>/comments',  methods=['GET'])
def comments(id):
    try:
        user = User.query.get(id)
    except Exception as e:
        logger.error(e)
        return jsonify({"status": "Internal server error"}), 500

    if user is None:
        return jsonify({"status": "User not Found"}), 404

    comments = Comment.query.filter_by(user_id=id)

    result = {}
    for comment in comments:
        comment_obj = {
            'id': comment.id,
            'type': comment.type_id,
            'user_id': comment.user_id,
            'title': comment.title,
            'text': comment.text,
            'longitude': comment.longitude,
            'latitude': comment.latitude,
            'page': comment.page,
            'x': comment.x,
            'y': comment.y,
            'user_name': comment.created_by,
            'date': comment.created_date,
            'like_cnt': len(comment.likes)
        }

        if result.get(comment.book_id) is None:
            result[comment.book_id] = [comment_obj]
        else:
            result[comment.book_id].append(comment_obj)

    return jsonify(result), 200
