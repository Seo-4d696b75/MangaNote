from .base import BaseTestCase

import json
from app.models import Book
from app.database import db
from app.app import app


class TestBooksAPI(BaseTestCase):

  # 何も入っていない
  def test_get_books_no_data(self):
    response = self.app.get('/api/books/')
    self.assert_200(response)
    assert(
      json.loads(response.get_data()) == []
    )

  def test_get_books_one_data(self):
    book = Book(title='test', path='', created_by='test', modified_by='test')
    db.session.add(book)
    db.session.commit()

    response = self.app.get('/api/books/')
    self.assert_200(response)
    data = json.loads(response.get_data())
    assert(len(data) == 1)
    assert(data[0]['title'] == 'test')
    assert(data[0]['id'] == 1)
    assert(data[0]['comment_cnt'] == 0)
