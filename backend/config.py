import os


class DevelopmentConfig:

    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{user}:{password}@{host}/{db_name}?charset=utf8'.format(
        **{
            'user': os.environ['APP_DATABASE_USER'],
            'password': os.environ['APP_DATABASE_PASSWORD'],
            'host': os.environ['APP_DATABASE_HOST'],
            'db_name': os.environ['APP_DATABASE_NAME']
        }
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class TestConfig:

  SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
  SQLALCHEMY_TRACK_MODIFICATIONS = False
  SQLALCHEMY_ECHO = False

Config = DevelopmentConfig
