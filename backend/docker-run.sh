#!/usr/bin/env bash
set -e
set -x

# TODO: sleep until 'curl postgres:5432' exit code = 52
sleep 3

#export SERVER=generated
#
#if [ ! -f "server/config/generated.deploy.yaml" ]
#then
#  # First container run -> run init deploy script
#  if [ -z ${STRATO_URL+x} ];
#  then
#    echo "Please provide the STRATO_URL variable with the STRATO instance URL"
#    exit 1
#  fi
#  cp server/config/template.config.yaml server/config/generated.config.yaml
#  sed -i "s|<STRATO_URL_placeholder>|$STRATO_URL|g" server/config/generated.config.yaml
#  cp -f server/config/generated.config.yaml ./config.yaml
#  npm run deploy
#fi

npm start