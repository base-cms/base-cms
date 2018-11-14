#!/bin/bash
docker run \
  --workdir /base-cms \
  --tty \
  --volume `pwd`:/base-cms:cached \
  --volume base-cms_node_modules:/base-cms/node_modules \
  node:10.13-alpine \
  yarn
