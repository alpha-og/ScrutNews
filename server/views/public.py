import os
from flask import Blueprint, Flask, request, jsonify
from ..model.model import encode_input_data, load_rnn_model
from newsdataapi import NewsDataApiClient

public = Blueprint("public", __name__, url_prefix="/")


model = load_rnn_model(os.path.join(os.getcwd() + "/server/model/saved_model.keras"))
print("model loaded")

news_api = NewsDataApiClient(apikey="pub_37199c2a29d903fcc6895ca7992577b14d45f")


@public.route("/")
def index():
    return "Hello world"


@public.route("/model", methods=["POST"])
def model_in():
    input_ = request.get_json()["text"]
    if type(input_) != list:
        input_ = [input_]
    input_processed = encode_input_data(input_)

    out = model.predict(input_processed)
    print("Input Encoded")
    print(input_processed)
    print("Y_pred")
    print(out)

    out_con = int(out < 0.5)

    return jsonify({"trust_value": out_con})


@public.route("/fetch_news", methods=["GET"])
def fetch_news():
    response = news_api.news_api(q="tech")

    for article in response["results"]:
        try:
            input_ = article["description"]
            if type(input_) != list:
                input_ = [input_]
            input_processed = encode_input_data(input_)
            out = model.predict(input_processed)
            article["cred"] = f"{out[0][0]*100}"
        except Exception:
            article["cred"] = "NotMeasurable"
    return response["results"]
