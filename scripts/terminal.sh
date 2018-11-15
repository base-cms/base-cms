#!/bin/bash
docker run \
  -it \
  --rm \
  --name base-cms_terminal \
  --workdir /base-cms \
  --tty \
  --env YARN_CACHE_FOLDER=/.yarn-cache \
  --volume base-cms_yarn_cache:/.yarn-cache \
  --volume `pwd`:/base-cms:cached \
  node:10.13 \
  /bin/bash
