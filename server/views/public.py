from flask import Blueprint, Flask

public = Blueprint("public", __name__, url_prefix="/")


@public.route("/")
def index():
    return "Hello world"


@public.route("/model", methods=["GET"])
def model_in():
    return "Hi"
