#!/usr/bin/env bash

APP_ROOT="$(dirname "$(dirname "$(readlink -fm "$0")")")"

cd $APP_ROOT/backend

# * super admin
echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('superadmin', 'superadmin@email.com', 'password')" | ./manage.py shell

# * regular admin
# TODO: add permissions
echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_user('admin', 'admin@email.com', 'password')" | ./manage.py shell

# * regular user
echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_user('user', 'user@email.com', 'password')" | ./manage.py shell
