import pandas as pd
import numpy as np

# import matplotlib.pyplot as plt
import seaborn as sns
import nltk
import re
from nltk.corpus import stopwords

# nltk.download('stopwords')
from nltk.stem.porter import PorterStemmer
import tensorflow as tf
from tensorflow import keras
import os
from tensorflow.keras.layers import Embedding
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.preprocessing.text import one_hot
from tensorflow.keras.optimizers.legacy import Adam


# path = "./datasets/train.csv"
# checkpoint_path = "training_1/checkpoints"
def processData(path):
    df = pd.read_csv(path)

    split = 0.8
    df = df.sample(frac=1).dropna()
    train = df[: int(0.8 * df.shape[0])]
    test = df[int(0.8 * df.shape[0]) :]

    x_train, y_train = train["title"], train["label"]
    x_test, y_test = test["title"], test["label"]

    x_train_enc = [one_hot(words, 10000) for words in x_train]
    x_test_enc = [one_hot(words, 10000) for words in x_test]

    sent_length = 10
    x_train_enc_padded = pad_sequences(x_train_enc, padding="pre", maxlen=sent_length)

    x_test_enc_padded = pad_sequences(x_test_enc, padding="pre", maxlen=sent_length)
    return x_train, y_train, x_test, y_test


def process_web(text):
    x_train_enc = [one_hot(text, 10000)]

    sent_length = 10
    x_train = pad_sequences(x_train_enc, padding="pre", maxlen=sent_length)

    return x_train


def create_model():
    model = tf.keras.Sequential(
        [
            keras.layers.Dense(512, activation="sigmoid", input_shape=(10,)),
            keras.layers.Dropout(0.2),
            keras.layers.Dense(1),
        ]
    )
    model.compile(
        optimizer=Adam(lr=1e-3),
        loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
        metrics=[tf.keras.metrics.SparseCategoricalAccuracy()],
    )
    return model


def train(create_model, checkpoint_path, x_train, y_train, x_test, y_test):
    model = create_model()
    model.summary()

    cp_callback = tf.keras.callbacks.ModelCheckpoint(
        filepath=checkpoint_path, save_weights_only=True, verbose=1
    )

    model.fit(
        x_train,
        y_train,
        epochs=20,
        validation_data=(x_test, y_test),
        callbacks=[cp_callback],
    )
    return model


def evaluate(model, x_test, y_test):
    loss, acc = model.evaluate(x_test, y_test, verbose=2)
    print(f"Model, accuracy: {100*acc:5.2f}%")


def load_model(checkpoint_path):
    checkpoint_dir = os.path.dirname(checkpoint_path)
    model_loaded = create_model()
    model_loaded.load_weights(checkpoint_path)
    return model_loaded
