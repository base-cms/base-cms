#!/bin/bash
docker run \
  --rm \
  --name base-cms_install \
  --workdir /base-cms \
  --tty \
  --env YARN_CACHE_FOLDER=/.yarn-cache \
  --volume base-cms_yarn_cache:/.yarn-cache \
  --volume `pwd`:/base-cms:cached \
  node:10.13-alpine \
  yarn
