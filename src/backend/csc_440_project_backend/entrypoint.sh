#!/bin/bash

BASE=/src/
PYTHON=/usr/bin/python3.7
GUNICORN=/usr/local/bin/gunicorn

export PYTHONPATH=${BASE}:${PYTHONPATH}

# Migrate any schema changes
echo "Applying database migrations"
${PYTHON} ${BASE}manage.py migrate

# Start the gunicorn server
echo "Starting Gunicorn server"
${GUNICORN} -c ${GUNICORN_CONFIG} csc_440_project_backend.wsgi:application
