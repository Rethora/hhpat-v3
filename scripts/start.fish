#!/bin/fish

set APP_ROOT /home/dane/Code/hhpat-v3

cd $APP_ROOT/backend
python3 -m venv .venv
source .venv/bin/activate.fish
pip install --upgrade pip
pip install -r requirements.txt
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py loaddata test_data.json

cd $APP_ROOT/frontend
nvm install
nvm use

npm -g i yarn
yarn

npx concurrently --raw "cd $APP_ROOT/backend && python manage.py runserver 0.0.0.0:8080" "cd $APP_ROOT/frontend && yarn start"
