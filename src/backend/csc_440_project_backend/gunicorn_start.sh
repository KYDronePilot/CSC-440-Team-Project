#!/bin/bash

BASE=/src/
export PYTHONPATH=$BASE:$PYTHONPATH

gunicorn -c ${BASE}gunicorn_config.py csc_440_project_backend.wsgi:application
