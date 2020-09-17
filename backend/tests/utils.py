from app.database import db
from app.models import *


def create_users(num=1):
    users = [User(name=f"test{i}", created_by="test",
                  modified_by="test") for i in range(num)]
    db.session.add_all(users)
    db.session.commit()


def create_books(num=1):
    books = [Book(title=f"test{i}", path="", created_by="test",
                  modified_by="test") for i in range(num)]
    db.session.add_all(books)
    db.session.commit()


def create_comments(user_id, book_id, type_id, num=1, page=1):
    comments = [Comment(title=f"test{i}", user_id=user_id, book_id=book_id, type_id=type_id, text="test{i}", page=page, x=10, y=10, latitude=0, longitude=0, created_by="test",
                        modified_by="test") for i in range(num)]
    db.session.add_all(comments)
    db.session.commit()
