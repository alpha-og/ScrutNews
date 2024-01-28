import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

import nltk
from nltk.corpus import stopwords
# nltk.download('stopwords')
import re

import joblib
import os
import pickle

cwd = os.getcwd()

df = pd.read_csv(f"{os.getcwd()}/server/model/datasets/train.csv").dropna()
df["title"]=df["title"].apply(lambda x: re.sub("[^a-zA-Z\u00C0-\u017F]"," ",x))
df["title"]=df["title"].apply(lambda x: x.lower())

X = df["title"]
y = df["label"]
X_train,X_test,y_train,y_test = train_test_split(X,y,test_size=0.2)

def createEncoder(X_train):
    cv = CountVectorizer(max_features=17000)
    # create encoding using bag of words methods
    X_train_bow = cv.fit_transform(X_train).toarray()
    # cache encode
    joblib.dump(cv, f"{cwd}/server/model/random_forests/encoder.joblib")
    return X_train_bow

def train_rf_model(X_train, y_train):
    X_train_bow = createEncoder(X_train)
    rf = RandomForestClassifier(verbose=3)
    # train random forest classifier
    print("Training model...")
    rf.fit(X_train_bow,y_train)
    print("Completed training model")
    return rf

def save_rf_model(rf):
    print("Saving model...")
    joblib.dump(rf, f"{cwd}/server/model/random_forests/random_forests.joblib")
    print(f"Successfully saved to random_forest.joblib")

def load_rf_model():
    print("Loading saved model...")
    loaded_rf = joblib.load(f"{cwd}/server/model/random_forests/random_forests.joblib")
    return loaded_rf

# evaluate the model
def evaluate_rf_model(y_test, y_pred):
    accuracy = accuracy_score(y_test,y_pred)
    print("Accuracy:",accuracy)

def encodeData(X_test):
    cv = joblib.load(f"{cwd}/server/model/random_forests/encoder.joblib")
    X_test_bow = cv.transform(X_test).toarray()
    return X_test_bow


# rf = train_rf_model(X_train,y_train)
X_test_bow = encodeData(X_test)
# y_pred = rf.predict(X_test_bow)
# evaluate_rf_model(y_test,y_pred)
# save_rf_model(rf)


# print("Loading model...")
# loaded = load_rf_model()
# y_pred_loaded = loaded.predict(X_test_bow)
# evaluate_rf_model(y_test,y_pred_loaded)
