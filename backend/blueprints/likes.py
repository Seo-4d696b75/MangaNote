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
