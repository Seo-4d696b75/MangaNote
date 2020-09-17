from .base import BaseTestCase

import json
from .utils import *
from app.app import app


class TestCommentsAPI(BaseTestCase):

    # 何も入っていない
    def test_get_comments_no_data(self):
        create_users(1)
        create_books(10)

        # user_idがないと400
        response = self.app.get('/api/books/1/comments')
        self.assert_status(response, 400)

        response = self.app.get('/api/books/1/comments?user_id=1')
        self.assert_status(response, 200)
        assert(
            json.loads(response.get_data()) == []
        )

        response = self.app.get('/api/books/12/comments?user_id=1')
        self.assert_status(response, 404)

    def test_post_comments_one_data(self):
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

        # 本が存在しない
        response = self.app.post('/api/books/11/comments',
                                 data=json.dumps(post_params),
                                 content_type='application/json'
                                 )
        self.assert_status(response, 400)

        # user_idがない
        response = self.app.post('/api/books/1/comments',
                                 data=json.dumps({}),
                                 content_type='application/json'
                                 )
        self.assert_status(response, 400)

        # userが存在しない
        response = self.app.post('/api/books/1/comments',
                                 data=json.dumps({"user_id": 10}),
                                 content_type='application/json'
                                 )
        self.assert_status(response, 400)

        # コメントのタイプがおかしい
        response = self.app.post('/api/books/1/comments',
                                 data=json.dumps({"user_id": 1, "type": 10}),
                                 content_type='application/json'
                                 )
        self.assert_status(response, 400)

        # 正しいパラメータ
        response = self.app.post('/api/books/1/comments',
                                 data=json.dumps(post_params),
                                 content_type='application/json'
                                 )
        self.assert_status(response, 201)

        response = self.app.get('/api/books/1/comments?user_id=1')
        self.assert_status(response, 200)
        assert(len(json.loads(response.get_data())) == 1)

    def test_post_map_comment(self):
        create_users(1)
        create_books(10)

        invalid_post_params = {
            "user_id": 1,
            "text": "test",
            "page": 0,
            "x": 10,
            "y": 10,
            "type": 2
        }
        
        response = self.app.post('/api/books/1/comments',
                                 data=json.dumps(invalid_post_params),
                                 content_type='application/json'
                                 )
        self.assert_status(response, 400)

        valid_post_params = invalid_post_params
        valid_post_params["latitude"]= 0
        valid_post_params["longitude"]= 0
        valid_post_params["title"]= "test_place"
        # 正しいパラメータ
        response = self.app.post('/api/books/1/comments',
                                 data=json.dumps(valid_post_params),
                                 content_type='application/json'
                                 )
        self.assert_status(response, 201)

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
