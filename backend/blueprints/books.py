from flask import jsonify, Blueprint
import logging
from app.database import db
from app.models import *

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
