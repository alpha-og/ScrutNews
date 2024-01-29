#!/bin/bash
pip install -r requirements.txt
cd client
npm i
npm run dev &
cd ../
export FLASK_APP=server
export FLASK_DEBUG=1
flask run
