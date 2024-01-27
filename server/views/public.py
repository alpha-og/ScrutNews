import os
from flask import Blueprint, Flask, request, jsonify
from ..model.model import process_web, load_model

public = Blueprint("public", __name__, url_prefix="/")

model = load_model(os.path.join(os.getcwd() + "/server/model/training_1/checkpoints"))


@public.route("/")
def index():
    return "Hello world"


@public.route("/model")
def model_in():
    input_ = request.get_json()
    print(input_)

    input_proces = process_web(input_["text"])

    out = model.predict(input_proces)

    print(out)

    out_con = out > 0.5

    return jsonify({"trust_value": out_con})
