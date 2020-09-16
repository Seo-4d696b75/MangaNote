import click
from flask.cli import with_appcontext
from .models import *
from .database import db
import random


@click.command('seed')
@click.argument('arg')
@with_appcontext
def seed(arg):
    if arg == 'all':
        seed_comment_type()
        seed_user()
        seed_book()
        seed_comment_normal()
        seed_comment_place()
        seed_comment_secret()
        seed_like()

    if arg == 'comment-type':
        seed_comment_type()
    if arg == 'user':
        seed_user()
    if arg == 'book':
        seed_book()
    if arg == 'comment_normal':
        seed_comment_normal()
    if arg == 'comment_place':
        seed_comment_place()
    if arg == 'comment_secret':
        seed_comment_secret()
    if arg == 'comment_all':
        seed_comment_normal()
        seed_comment_place()
        seed_comment_secret()
    if arg == 'like':
        seed_like()


def commit_all(objects):
    try:
        db.session.add_all(objects)
        db.session.commit()
    except Exception as e:
        print(e)
        db.session.rollback()


def seed_comment_type():
    comment_types = []
    comment_types.append(CommentType('normal', 'seeder', 'seeder'))
    comment_types.append(CommentType('place', 'seeder', 'seeder'))
    comment_types.append(CommentType('secret', 'seeder', 'seeder'))
    commit_all(comment_types)


def seed_user():
    users = [User(name=f'sample{i}', created_by='seeder',
                  modified_by='seeder') for i in range(10)]
    commit_all(users)


# [ToDo] 本のデータを複数用意する
def seed_book():
    books = [Book(title=f'sample{i}', path=f'/app/books/1/',
                  created_by='seeder', modified_by='seeder') for i in range(10)]
    commit_all(books)


# [ToDo] 本のページ数を取得してコメントの位置を割り当てる
def seed_comment_normal():
    comment_list = ["wwww", "ここすき", "!?", "知ってた",
                    "すごい", "面白い", "かわいい", "草", "8888"]
    comment_num = len(comment_list)
    comments = [Comment(text=comment_list[random.randint(0, comment_num-1)],
                        book_id=i//10+1, user_id=i % 10+1, type_id=1,
                        page=random.randint(0, 2), x=random.random(), y=random.random(),
                        created_by='seeder', modified_by='seeder') for i in range(100)]
    commit_all(comments)


def seed_comment_place():
    comments = [Comment(text=f'sample{i%10}', book_id=i//10+1, user_id=i % 10+1, type_id=2,
                        page=random.randint(0, 2), x=random.random(), y=random.random(), title=f'sample_title{i%10}',
                        longitude=random.random()*360-180, latitude=random.random()*180-90,
                        created_by='seeder', modified_by='seeder') for i in range(100)]
    commit_all(comments)


def seed_comment_secret():
    comments = [Comment(text=f'sample{i%10}', book_id=i//10+1, user_id=i % 10+1, type_id=3,
                        page=random.randint(0, 2), x=random.random(), y=random.random(),
                        created_by='seeder', modified_by='seeder') for i in range(100)]
    commit_all(comments)


def seed_like():
    likes = [Like(user_id=i % 10+1, comment_id=random.randint(1, 300), created_by="seeder",
                  modified_by="seeder") for i in range(1000)]
    commit_all(likes)


def register_command(app):
    app.cli.add_command(seed)
