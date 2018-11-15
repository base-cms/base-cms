#!/bin/bash
scripts/install.sh
docker run \
  --rm \
  --name base-cms_lerna \
  --workdir /base-cms \
  --tty \
  --volume `pwd`:/base-cms:cached \
  node:10.13 \
  node_modules/.bin/lerna $@
