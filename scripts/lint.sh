#!/bin/bash
docker-compose run \
  --rm \
  --no-deps \
  --entrypoint node_modules/.bin/eslint \
  commands \
  packages services \
    --ext .js \
    --ext .jsx
