from app.database import db


class Types(db.Model):
    __tablename__ = 'types'
    id = db.Column(db.Integer,
                   primary_key=True, autoincrement=True)
    name = db.Column(db.String(16), nullable=False)
    created_by = db.Column(db.String(255), nullable=False)
    created_date = db.Column(
        db.DateTime, server_default=db.func.current_timestamp(), server_onupdate=db.func.current_timestamp(), nullable=False)
    modified_by = db.Column(db.String(255), nullable=False)
    modified_date = db.Column(
        db.DateTime, server_default=db.func.current_timestamp(), server_onupdate=db.func.current_timestamp(), nullable=False)
    comments = db.relationship(
        'Comment', backref='comments', cascade="all")

    def __init__(self, name, created_by, modified_by):
        self.name = name
        self.created_by = created_by
        self.modified_by = modified_by
