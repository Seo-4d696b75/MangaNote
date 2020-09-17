from flask import jsonify, Blueprint, request
import logging
from app.database import db
from app.models import *
from sqlalchemy import func

import base64

logger = logging.getLogger('app')
comments = Blueprint('comments', __name__)


@comments.route('/comments', methods=['GET'])
def get_comments(book_id):
    user_id = request.args.get('user_id')
    page = request.args.get('page')
    limit = request.args.get('limit')
    if user_id is None:
        return jsonify({'message':'query "user_id" missing'}), 400
    user_id = int(user_id)
    page = 0 if page is None else int(page)
    limit = 10000 if limit is None else max(1,int(limit))
    try:
        comments = db.session.query(Comment)\
            .filter(
                Comment.book_id == book_id,
                Comment.page >= page,
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
            'page': c.page,
            'x': c.x,
            'y': c.y,
            'user_name': c.created_by,
            'date': c.created_date,
            'is_liked': len(list(filter(lambda like: like.user_id == user_id, c.likes))) > 0,
            'like_cnt': len(c.likes)
        }, comments))
        return jsonify(comments)
    except Exception as e:
        message = str(e)
        logger.error(message)
        return jsonify({
            "message": message
        }), 500


@comments.route('/comments', methods=['POST'])
def post_comment(book_id):
    try:
        # check existance of the book
        if db.session.query(func.count(Book.id)).filter(Book.id == book_id).scalar() == 0:
            return jsonify({'message':'no book found'}), 400
        data = request.get_json()
        # get user
        user_id = data.get('user_id', None)
        if user_id is None:
            return jsonify({'message':'user id missing'}), 400
        user = db.session.query(User).filter(User.id == user_id).first()
        if user is None:
            return jsonify({'message':'no user found'}), 400
        # init comment
        comment = None
        type_id = data['type']
        if type_id < 1 or type_id > 3:
            return jsonify({'message':'invalid type value'}), 400
        elif type_id == 2 and any( e is None for e in (
            data.get('title'), 
            data.get('longitude'), 
            data.get('latitude') )):
            return jsonify({'message':'comment of spot needs extra fields'}), 400
        try:
            comment = Comment(
                book_id = book_id,
                user_id = user_id,
                type_id = type_id,
                title = data.get('title', None),
                text = data['text'],
                longitude = data.get('longitude', None),
                latitude = data.get('latitude', None),
                page = data['page'],
                x = data['x'],
                y = data['y'],
                created_by = user.name,
                modified_by = user.name
            )
        except KeyError as key_err:
            return jsonify({'message':'param missing > ' + str(key_err)}), 400
        db.session.add(comment)
        db.session.commit()
        return jsonify({
            'message': 'success to post a comment',
            'data': data
        }), 201
    except Exception as e:
        message = str(e)
        logger.error(message)
        db.session.rollback()
        return jsonify({
            "message": message
        }), 500
