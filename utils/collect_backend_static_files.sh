#!/bin/bash

BACKEND_ROOT=$1
STATIC_DUMP_DIR=/tmp/django_static_files/
LOCAL_STATIC_DIR=./static/

# Install python TODO: Don't do this!
sudo apt-get update
sudo apt-get install -y python3 python3-dev python3-pip python3-setuptools

# Install, setup Django
pip3 install wheel
pip3 install -r ${BACKEND_ROOT}/requirements.txt
cp ${BACKEND_ROOT}/base.env ${BACKEND_ROOT}/.env

# Collect static files
mkdir -p ${STATIC_DUMP_DIR}
PYTHONPATH=${BACKEND_ROOT} python3 ${BACKEND_ROOT}/manage.py collectstatic

# Copy to a local static directory
mkdir -p ${LOCAL_STATIC_DIR}
cp -r ${STATIC_DUMP_DIR}* ${LOCAL_STATIC_DIR}
