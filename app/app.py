from flask import Flask

from app.config import FlaskConfig

app = Flask(__name__)

app.config.from_object(FlaskConfig)


# @app.route('/')
# def hello_world():
#     return 'Hello World!'


if __name__ == '__main__':
    app.run()
