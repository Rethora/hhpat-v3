#!/usr/bin/env bash

APP_ROOT="$(dirname "$(dirname "$(readlink -fm "$0")")")"

cd $APP_ROOT/backend
source .venv/bin/activate

# * super admin
echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('superadmin@email.com', 'superadmin@email.com', 'password')" | ./manage.py shell

# * regular admin
echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_user('admin@email.com', 'admin@email.com', 'password', is_staff=True)" | ./manage.py shell

# * regular user
echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_user('user@email.com', 'user@email.com', 'password')" | ./manage.py shell
