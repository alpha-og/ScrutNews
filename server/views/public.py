from flask import Blueprint, request, jsonify
from ..model.random_forests.model_rf import load_rf_model, encodeData
from newsdataapi import NewsDataApiClient
import requests

public = Blueprint("public", __name__, url_prefix="/api")

news_api = NewsDataApiClient(apikey="pub_37199c2a29d903fcc6895ca7992577b14d45f")

model = load_rf_model()


def predict_model(input_):
    if type(input_) != list:
        input_ = [input_]
    X = encodeData(input_)
    y_pred = model.predict(X)
    return int(y_pred[0])


@public.route("/", methods=["POST"])
def model_in():
    input_ = request.get_json()["text"]
    return jsonify({"trust_value": predict_model(input_)})


@public.route("/news", methods=["GET"])
def fetch_news():
    response = news_api.news_api(q="tech")

    for article in response["results"]:
        try:
            input_ = article["title"]
            article["cred"] = predict_model(input_)
        except Exception:
            article["cred"] = "NotMeasurable"
    return response["results"]


@public.route("/summary", methods=["POST"])
def summary():
    url = "https://api.meaningcloud.com/summarization-1.0"
    link = request.get_json()["url"]

    payload = {
        "key": "72930a5997ec94b82db5e0d47ca1eec8",
        "url": link,
        "sentences": 10,
    }

    response = requests.post(url, data=payload)

    payload_ = {
        "key": "72930a5997ec94b82db5e0d47ca1eec8",
        "url": link,
        "sentences": 1,
    }

    one_liner = requests.post(url, data=payload_).json()["summary"]

    return jsonify(
        {"summary": response.json()["summary"], "cred": predict_model(one_liner)}
    )
