#!/bin/bash

# Install a later version of pandoc that aptitude doesn't provide.
PANDOC_VERSION=2.7.3
PANDOC_DIR=/tmp/pandoc
PANDOC_DEB=pandoc-${PANDOC_VERSION}-1-amd64.deb
PANDOC_PATH=${PANDOC_DIR}/${PANDOC_DEB}

mkdir -p ${PANDOC_DIR}
cd ${PANDOC_DIR}

# Download pandoc if not cached
if [ ! -f ${PANDOC_PATH} ]; then
    wget https://github.com/jgm/pandoc/releases/download/${PANDOC_VERSION}/${PANDOC_DEB}
fi

sudo dpkg -i ${PANDOC_PATH}
