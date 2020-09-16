import os


class DevelopmentConfig:

    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
    SQLALCHEMY_TRACK_MODIFICATIONS = False


Config = DevelopmentConfig
