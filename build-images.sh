#!/usr/bin/env bash
set -e
set -x

(cd api/ && docker build --tag=nd-api .)
(cd ui/ && docker build --tag=nd-ui .)
