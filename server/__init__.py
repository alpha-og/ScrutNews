from flask import Flask
import os


def create_app():
    app = Flask(__name__)
    from .views import public

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    app.register_blueprint(public.public)

    return app
