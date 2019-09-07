#!/bin/bash

SCRIPT=`realpath ${0}`
SCRIPTPATH=`dirname ${SCRIPT}`
DOCS_ROOT=${SCRIPTPATH}/../docs
ARTIFACTS=/tmp/artifacts/docs

# Ensure artifact directory exists and is clean
mkdir -p ${ARTIFACTS}
rm -rf ${ARTIFACTS}/*

# Paths to all doc makefiles
makefiles=()
for makefile in `find ${DOCS_ROOT} | grep Makefile`; do
    makefiles+=(`realpath ${makefile}`)
done

# Build each doc in the doc tree
for makefile in ${makefiles[@]}; do
    cd `dirname ${makefile}`
    make build-ci CI_DIST=${ARTIFACTS} ${makefile}
done
