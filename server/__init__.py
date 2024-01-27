from flask import Flask
import os
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    from .views import public

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    app.register_blueprint(public.public)
    CORS(app)
    return app
