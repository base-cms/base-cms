#!/bin/bash
set -x
scripts/install.sh
docker-compose \
  --file docker-compose.yml \
  --file "packages/$1/docker-compose.yml" \
  --project-name base-cms \
  run \
    --rm \
    --name "base-cms_dev_$1" \
    -e NODE_ENV=development $1
