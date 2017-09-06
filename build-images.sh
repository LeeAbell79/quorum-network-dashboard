#!/usr/bin/env bash
set -e
set -x

cd ./backend
docker build --tag=nd-backend .
cd ../ui
docker build --tag=nd-ui .
