from flask import Blueprint, Flask, request, jsonify
from ..model.random_forests.model_rf import load_rf_model, encodeData
from newsdataapi import NewsDataApiClient

public = Blueprint("public", __name__, url_prefix="/api")

news_api = NewsDataApiClient(apikey="pub_37199c2a29d903fcc6895ca7992577b14d45f")

model = load_rf_model()


@public.route("/", methods=["POST"])
def model_in():
    input_ = request.get_json()["text"]
    if type(input_) != list:
        input_ = [input_]
    X = encodeData(input_)
    y_pred = model.predict(X)

    # out_con = int(out < 0.5)
    # return y_pred[0][0]
    return jsonify({"trust_value": int(y_pred[0])})


@public.route("/news", methods=["GET"])
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
