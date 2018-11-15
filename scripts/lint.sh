#!/bin/bash
scripts/install.sh
echo 'Running eslint...'
docker run \
  --rm \
  --name base-cms_lint \
  --workdir /base-cms \
  --tty \
  --volume `pwd`:/base-cms:cached \
  node:10.13-alpine \
  node_modules/.bin/eslint packages \
    --ext .js \
    --ext .jsx
echo 'Lint complete.'
