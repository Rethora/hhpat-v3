# Backend

## Prerequisites

- Docker
- Python3.10
- Conda(optional)
- Bash

## Setup

- $ cd backend

### With Conda

- $ conda env create -f environment.yml

### Without Conda

- $ python3 -m venv .venv
- $ pip install -r requirements.txt

### Universal

- $ bash ../scripts/create_test_users.sh
- $ python3 makemigrations & python3 migrate
- $ python3 runserver 0.0.0.0:8000 *or* use debug launch task
