#!/bin/bash
docker-compose run \
  --rm \
  --no-deps \
  --entrypoint node_modules/.bin/lerna \
  commands \
  $@
