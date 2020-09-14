import datetime
from flask import Flask, jsonify
from flask_cors import CORS
from .database import init_db
from .models import *

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
app.config.from_object('app.config.Config')
CORS(app)


init_db(app)


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
