#!/bin/bash

# * Make sure NVM install is located in home directory
export NVM_DIR=~/.nvm;
source $NVM_DIR/nvm.sh;

APP_ROOT=$(dirname $(dirname $(readlink -fm $0)))

cd $APP_ROOT
# * Install node version from .nvmrc
nvm install
nvm use
# * Install Yarn
npm install --global yarn
# * Install project dependencies
yarn

cd $APP_ROOT/frontend
# * Install front end dependencies
yarn

cd $APP_ROOT/backend
# * Create virtual environment
python3 -m venv .venv
source .venv/bin/activate
# * Install back end dependencies
pip install --upgrade pip
pip install -r requirements.txt
# * Migrate DB
python3 manage.py makemigrations
python3 manage.py migrate
# * Load dev test data
python3 manage.py loaddata test_data.json

cd $APP_ROOT
# * Run front end and back end
yarn run concurrently --raw "cd backend && python manage.py runserver 0.0.0.0:8080" "cd /home/dane/Code/hhpat-v3/frontend && yarn start"
