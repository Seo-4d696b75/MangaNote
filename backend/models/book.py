from app.database import db


class Book(db.Model):
    __tablename__ = 'books'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(64), nullable=False)
    path = db.Column(db.String(64), nullable=False)
    created_by = db.Column(db.String(255), nullable=False)
    created_date = db.Column(
        db.DateTime, server_default=db.func.current_timestamp(), server_onupdate=db.func.current_timestamp(), nullable=False)
    modified_by = db.Column(db.String(255), nullable=False)
    modified_date = db.Column(
        db.DateTime, server_default=db.func.current_timestamp(), server_onupdate=db.func.current_timestamp(), nullable=False)
    comments = db.relationship('Comment', backref='books', cascade="all")

    def __init__(self, title, path, created_by, modified_by):
        self.title = title
        self.path = path
