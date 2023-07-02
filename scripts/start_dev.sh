#!/bin/bash

export NVM_DIR=$HOME/.nvm;
source $NVM_DIR/nvm.sh;

export PATH=~/.nvm/versions/node/v18.16.1/bin/yarn:$PATH

APP_ROOT=$(dirname $(dirname $(readlink -fm $0)))

cd $APP_ROOT/frontend
nvm install
nvm use
yarn

cd $APP_ROOT/backend
source .venv/bin/activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate

cd $APP_ROOT
npx concurrently --raw "cd backend && python manage.py runserver 0.0.0.0:8080" "cd /home/dane/Code/hhpat-v3/frontend && yarn start"
