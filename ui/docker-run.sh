#!/usr/bin/env bash
set -e
set -x

sed -i "s|__API_URL__|http://$HOST_NAME|g" build/index.html

serve build