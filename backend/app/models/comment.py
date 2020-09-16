from app.database import db

class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer,
                   primary_key=True, autoincrement=True)
    book_id = db.Column(db.Integer, db.ForeignKey(
        'books.id', ondelete="cascade", onupdate="cascade"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id', ondelete="cascade", onupdate="cascade"), nullable=False)
    type_id = db.Column(db.Integer, db.ForeignKey(
        'comment_types.id', ondelete="cascade", onupdate="cascade"), nullable=False)
    title = db.Column(db.String(64))
    text = db.Column(db.Text, nullable=False)
    longitude = db.Column(db.Float)
    latitude = db.Column(db.Float)
    page = db.Column(db.Integer, nullable=False)
    x = db.Column(db.Float, nullable=False)
    y = db.Column(db.Float, nullable=False)
    created_by = db.Column(db.String(255), nullable=False)
    created_date = db.Column(
        db.DateTime, server_default=db.func.current_timestamp(), server_onupdate=db.func.current_timestamp(), nullable=False)
    modified_by = db.Column(db.String(255), nullable=False)
    modified_date = db.Column(
        db.DateTime, server_default=db.func.current_timestamp(), server_onupdate=db.func.current_timestamp(), nullable=False)
    likes = db.relationship(
        'Like', backref='comments', cascade="all")

    def __init__(self, user_id, book_id, type_id, text, page, x, y, created_by, modified_by, title=None, longitude=None, latitude=None):
        self.user_id = user_id
        self.book_id = book_id
        self.type_id = type_id
        self.text = text
        self.page = page
        self.x = x
        self.y = y
        self.created_by = created_by
        self.modified_by = modified_by
        self.title = title
        self.latitude = latitude
        self.longitude = longitude
