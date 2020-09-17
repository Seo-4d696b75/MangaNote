from .base import BaseTestCase

import json
from .utils import *
from app.app import app


class TestCommentsAPI(BaseTestCase):

    # 何も入っていない
    def test_get_comments_no_data(self):
        create_users(1)
        create_books(10)
        response = self.app.get('/api/books/1/comments?user_id=1')
        self.assert_status(response, 200)
        assert(
            json.loads(response.get_data()) == []
        )

        response = self.app.get('/api/books/12/comments?user_id=1')
        self.assert_status(response, 404)

    def test_get_comments_one_data(self):
        create_users(1)
        create_books(10)

        post_params = {
            "user_id": 1,
            "text": "test",
            "page": 0,
            "x": 10,
            "y": 10,
            "type": 1
        }
        response = self.app.post('/api/books/1/comments',
                                 data=json.dumps(post_params),
                                 content_type='application/json'
                                 )
        self.assert_status(response, 201)


        response = self.app.get('/api/books/1/comments?user_id=1')
        self.assert_status(response, 200)
        assert(len(json.loads(response.get_data())) == 1)

    def test_get_comments_filter(self):
        create_users(1)
        create_books(10)
        create_comments(1, 1, 1, 10, 0)
        create_comments(1, 1, 1, 20, 1)

        response = self.app.get('/api/books/1/comments?user_id=1&page=0&limit=1')
        self.assert_status(response, 200)
        assert(len(json.loads(response.get_data())) == 10)

        response = self.app.get('/api/books/1/comments?user_id=1&page=0&limit=2')
        self.assert_status(response, 200)
        assert(len(json.loads(response.get_data())) == 30)