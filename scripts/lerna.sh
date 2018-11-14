#!/bin/bash
scripts/install.sh
docker run \
  --rm \
  --name base-cms_lerna \
  --workdir /base-cms \
  --tty \
  --volume `pwd`:/base-cms:cached \
  --volume base-cms_node_modules:/base-cms/node_modules \
  node:10.13 \
  node_modules/.bin/lerna $@
