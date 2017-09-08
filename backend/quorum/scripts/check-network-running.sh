#!/usr/bin/env bash

#TODO: find the better way
(cd quorum/ && docker-compose ps | grep _node1_)
