#!/bin/bash
docker-compose build commands
docker-compose run \
  --rm \
  --no-deps \
  --entrypoint yarn \
  commands \
  install
