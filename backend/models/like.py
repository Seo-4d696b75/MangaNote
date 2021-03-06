from app.database import db


class Like(db.Model):
    __tablename__ = 'likes'
    id = db.Column(db.Integer,
                   primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id', ondelete="cascade", onupdate="cascade"), nullable=False)
    comment_id = db.Column(db.Integer, db.ForeignKey(
        'comments.id', ondelete="cascade", onupdate="cascade"), nullable=False)
    created_by = db.Column(db.String(255), nullable=False)
    created_date = db.Column(
        db.DateTime, server_default=db.func.current_timestamp(), server_onupdate=db.func.current_timestamp(), nullable=False)
    modified_by = db.Column(db.String(255), nullable=False)
    modified_date = db.Column(
        db.DateTime, server_default=db.func.current_timestamp(), server_onupdate=db.func.current_timestamp(), nullable=False)

    def __init__(self, user_id, comment_id, created_by, modified_by):
        self.user_id = user_id
        self.comment_id = comment_id
        self.created_by = created_by
        self.modified_by = modified_by
