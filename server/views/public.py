import os
from flask import Blueprint, Flask, request, jsonify
from ..model.model import encode_input_data, load_rnn_model

public = Blueprint("public", __name__, url_prefix="/")


model = load_rnn_model(os.path.join(os.getcwd() + "/server/model/saved_model.keras"))
print("model loaded")

@public.route("/")
def index():
    return "Hello world"


@public.route("/model")
def model_in():
    input_ = request.get_json()["text"]
    if type(input_)!=list:
        input_ = [input_]
    input_processed = encode_input_data(input_)
    
    out = model.predict(input_processed)
    print("Input Encoded")
    print(input_processed)
    print("Y_pred")
    print(out)

    out_con = int(out < 0.5)

    return jsonify({"trust_value": out_con})
    # return "hi"
