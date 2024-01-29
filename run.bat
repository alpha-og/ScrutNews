pip install -r requirements.txt
start /b flask --app=server run --port=8080
cd client
start /b npm i
start /b npm run dev
