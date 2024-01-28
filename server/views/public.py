from flask import Blueprint, Flask, request, jsonify
from ..model.random_forests.model_rf import load_rf_model, encodeData
from newsdataapi import NewsDataApiClient

public = Blueprint("public", __name__, url_prefix="/")

news_api = NewsDataApiClient(apikey="pub_37199c2a29d903fcc6895ca7992577b14d45f")

model = load_rf_model()


@public.route("/")
def index():
    return "Hello world"


@public.route("/model", methods=["GET"])
def model_in():
    input_ = request.get_json()["text"]
    if type(input_) != list:
        input_ = [input_]
    X = encodeData(input_)
    y_pred = model.predict(X)
    print("Y_pred")
    print(y_pred)

    # out_con = int(out < 0.5)
    return y_pred[0][0]
    # return jsonify({"trust_value": out_con})


@public.route("/fetch_news", methods=["GET"])
def fetch_news():
    response = news_api.news_api(q="tech")

    for article in response["results"]:
        try:
            input_ = article["title"]
            if type(input_) != list:
                input_ = [input_]
            X = encodeData(input_)
            y_pred = model.predict(X)
            article["cred"] = y_pred[0][0]
        except Exception:
            article["cred"] = "NotMeasurable"
    return response["results"]


@public.route("/fetch_news_scroll", methods=["GET"])
def fetch_news_scroll():
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
