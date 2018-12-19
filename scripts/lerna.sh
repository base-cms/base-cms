#!/bin/bash
scripts/install.sh
docker run \
  --rm \
  --name base-cms_lerna \
  --workdir /base-cms \
  --tty \
  --volume `pwd`:/base-cms:cached \
  --volume `pwd`/node_modules:/base-cms/node_modules:delegated \
  node:10.13-alpine \
  node_modules/.bin/lerna $@
