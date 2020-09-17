import datetime
from flask import Flask, jsonify
from flask_cors import CORS
from .database import init_db
from .models import *
from .blueprints import *
from .seeder import register_command

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
app.config.from_object('app.config.Config')
CORS(app)

app.register_blueprint(users, url_prefix="/api/users")
app.register_blueprint(books, url_prefix="/api/books")
app.register_blueprint(comments, url_prefix="/api/books/<int:book_id>")
app.register_blueprint(
    likes, url_prefix="/api/books/<int:book_id>/comments/<int:comment_id>")
init_db(app)
register_command(app)


@app.route('/')
def index():
    app.logger.warn('warn')
    app.logger.error('error')
    app.logger.critical('critical')
    return jsonify({
        "message": "test"
    })


if __name__ == '__main__':
    app.run()
