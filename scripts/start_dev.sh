#!/bin/bash/env

export NVM_DIR=$HOME/.nvm;
source $NVM_DIR/nvm.sh;

PYTHON_PATH=/home/dane/miniforge3/envs/hhpat/bin/python

APP_ROOT=$(dirname $(dirname $(readlink -fm $0)))

cd $APP_ROOT/frontend
nvm use
yarn

cd $APP_ROOT/backend
conda activate hhpat
conda env update --file environment.yml --prune
$PYTHON_PATH manage.py makemigrations
$PYTHON_PATH manage.py migrate

cd $APP_ROOT
npx concurrently "cd backend && $PYTHON_PATH manage.py runserver 0.0.0.0:8080" "cd frontend && yarn start"
