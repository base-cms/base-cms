#!/bin/bash
docker-compose run \
  --rm \
  --no-deps \
  --entrypoint sh \
  commands
