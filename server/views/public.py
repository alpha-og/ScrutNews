import os
from flask import Blueprint, Flask, request, jsonify
from ..model.model import process_web, load_model

public = Blueprint("public", __name__, url_prefix="/")


@public.route("/")
def index():
    return "Hello world"


@public.route("/model", methods=["GET"])
def model_in():
    model = load_model(
        os.path.join(os.getcwd() + "/server/model/training_1/checkpoints")
    )
    input_ = request.json()

    input_proces = process_web(input_)

    out = model.predict(input_proces)

    print(out)

    return "hi"
