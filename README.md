# ScrutNews

News filtering and analysis tool that leverages machine learning

https://github.com/alpha-og/ScrutNews/assets/76057001/b826c4be-906a-45c0-bf9a-13dc5f71c538

## Features

### Credibility Analysis of News

The system evaluates the authenticity of a given news article to determine whether it's fake or legitimate. It utilizes machine learning algorithms and natural language processing techniques to analyze various features of the news content, such as language style, source credibility, factual consistency, and sentiment analysis.

### News Feed

The tool provides a live news feed feature to keep users updated with the latest news. It fetches news articles from reliable sources in real-time, ensuring users have access to up-to-date information.

### News Summarisation

News Summary Generation: Users can provide a link to a news article, and the system generates a concise summary of the article's content. This functionality utilizes web scraping techniques to extract relevant information from the provided link and then applies text summarization algorithms to condense the content into a brief summary.

## Project Architecture
```
.
├── client
│   ├── public
│   └── src
│       ├── assets
│       ├── components
│       │   └── ui
│       ├── lib
│       └── pages
├── instance
└── server
    ├── model
    │   ├── datasets
    │   ├── random_forests
    │   └── rnn
    └── views
```

## Getting Started

To set up and run the project locally, begin by cloning this repository to your local machine using `git clone https://github.com/alpha-og/ScrutNews/`.

In addition to the steps below, please make sure the `BASE_URL` in the `constants.ts` file located in the assets directory of the client folder matches the IP and  of the server (the default is `127.0.0.1:8080`)

### Quickstart

Execute the shell script `run.sh`/ `run.bat` from the project root directory, depending on your OS:

-   Linux/ Macos: `chmod +x run.sh;./run.sh`
-   Windows: `./run.bat` (not properly tested)

### Manual Setup

If you'd like to run the client and server instances manually, you can use these steps:

-   **Client** — navigate to the client folder and execute the command `npm install && npm run dev`
-   **Server** — from the root directory of the project, execute the following commands (in the same sequence):
    1. Export the path variables for flask — `export FLASK_APP=server && export FLASK_DEBUG=1`
    2. Run the server — `flask run`

## Client

The frontend that enables interaction with the API is primarily composed of three components:

1. React JS
2. [tailwindcss](https://tailwindcss.com/)
3. [shadcn](https://ui.shadcn.com/)

We've used react as the foundation for the website UI. Tailwindcss and Shadcn enhance the overall aesthetics and UX of the design, making use of utility classes and flexible components.

## Server

The server uses a flask server as backend which connects the model and various api's, with the frontend(react js)

### Routes:

1. `/api` : This route when given text data(news) returns 1 or 0 according to the credibility of the news given
2. `/api/news` : Used to fetch news articles from newsdataapi
3. `/api/summary` : Used to fetch summary of a news article link.

### Libraries Used

1. Flask
2. Pandas
3. Numpy
4. Scikit
5. Regex
6. os
7. nltk

### ML Model

The ML model used in this project is the Random Forest Classification model since the goal of the project is to classify input data (news). We opted for the random forest model due to its ability to produce models with low bias and low variance (which is extremely difficult to obtain in traditional models).

The random forest model is an ensemble machine learning model which helps reduce variance while keeping bias low by splitting the input data amongst a variety of different models (each often having a low bias but high variance). Since the data is split apart, the high variance introduced by each model is diluted, ultimately producing a model with low bias and low variance.

**Encoding**: The text data is encoded using the `bag of words` technique (scikit-learn provides an abstraction which simplifies this process)

**Model Training**: We used the `fake-news` dataset from kaggle for training the Random Forests classification model after preprocessing the data to remove non-alphabetic characters and stop words.

**Evaluation**: The trained model's performance is evaluated using the `accuracy_score` function from scikit-learn by comparing its predictions against the ground truth labels.

**Saving and Loading**: The model is stored in binary using `joblib.dump()` after training. The model is loaded using `joblib.load()` when the server instance is initiated.

## Contributors

1. Roshin R - [@RoshinR2005](https://github.com/RoshinR2005)
2. Athul Anoop - [@alpha-og](https://github.com/alpha-og)
3. Sharon P Shajan - [@Sharon218](https://github.com/Sharon218)

## Acknowledgments

We would like to express our gratitude to the following resources and individuals for their contributions and inspiration:

1. IEEE SB CET coordinators for their unwaivering support
2. Kaggle Datasets- [Fake News dataset by William Lifferth](https://www.kaggle.com/competitions/fake-news)
   [Fake News Classification dataset by Saurabh Shahane](https://www.kaggle.com/datasets/saurabhshahane/fake-news-classification)
3. API's used:
    - NewsFeed: https://newsdata.io/
    - Summarization: https://www.meaningcloud.com/developer/summarization
