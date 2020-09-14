from flask import jsonify, Blueprint
import logging
from app.database import db
from app.models import *

import base64

logger = logging.getLogger('app')
comments = Blueprint('comments', __name__)


@comments.route('/test')
def index(book_id):
    logger.warn('warn')
    logger.error('error')
    logger.critical('critical')
    return jsonify({
        "book_id": book_id,
        "message": "comments_test"
    })
