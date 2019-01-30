#!/bin/bash
docker-compose run \
  --rm \
  --no-deps \
  --workdir /base-cms/services/manage \
  --entrypoint /base-cms/node_modules/.bin/ember \
  manage \
  $@