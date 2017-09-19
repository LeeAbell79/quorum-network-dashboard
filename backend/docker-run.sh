#!/usr/bin/env bash
set -e
set -x

# TODO: sleep until 'curl postgres:5432' exit code = 52
sleep 3

npm start