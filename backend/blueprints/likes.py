from flask import jsonify, Blueprint
import logging
from app.database import db
from app.models import *

import base64

logger = logging.getLogger('app')
likes = Blueprint('likes', __name__)


@likes.route('/test')
def index(book_id, comment_id):
    logger.warn('warn')
    logger.error('error')
    logger.critical('critical')
    return jsonify({
        "book_id": book_id,
        "comment_id": comment_id,
        "message": "likes_test"
    })

@likes.route('/likes/<int:user_id>',  methods=['PUT'])
def like(book_id, comment_id, user_id):
    exist_likes = db.session.query(Like).filter(Like.user_id == user_id, Like.comment_id == comment_id).first()
    if exist_likes is not None:
        return jsonify({"status": "Bad Request", "message": "Already liked this comment."}), 400
    
    try:
        (user_name, ) = db.session.query(User.name).filter(User.id == user_id).one()
    except:
        return jsonify({"status": "Not Found", "message": "User does not exist."}), 404

    like = Like(user_id, comment_id, user_name, user_name)
    db.session.add(like)

    try:
        db.session.commit()
    except:
        db.session.rollback()
        return jsonify({"status": "Internal Server Error"}), 500

    return '', 204

@likes.route('/likes/<int:user_id>',  methods=['DELETE'])
def unlike(book_id, comment_id, user_id):
    exist_likes = db.session.query(Like).filter(Like.user_id == user_id, Like.comment_id == comment_id).first()
    if exist_likes is None:
        return jsonify({"status": "Bad Request", "message": "Does not like this comment."}), 400
    else:
        db.session.delete(exist_likes)

    try:
        db.session.commit()
    except:
        db.session.rollback()
        return jsonify({"status": "Internal Server Error"}), 500

    return '', 204
