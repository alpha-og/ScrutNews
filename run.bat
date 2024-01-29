pip install -r requirements.txt
cd client
npm i
start /b npm run dev
cd ../
set FLASK_APP="server"
set FLASK_DEBUG=1
flask run
