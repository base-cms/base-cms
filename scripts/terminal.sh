#!/bin/bash
docker-compose run \
  --rm \
  --no-deps \
  --entrypoint /bin/bash \
  commands
