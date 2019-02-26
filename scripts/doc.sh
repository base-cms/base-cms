#!/bin/bash

# Install deps
./scripts/install.sh

# Update GraphQL documentation
docker-compose up -d graphql-server

curl -IX GET http://localhost:10002/grapqhl?query=%7Bping%7D \
    --retry 10 \
    --retry-connrefused \
    --retry-delay 2

docker-compose run --rm --no-deps --entrypoint ./node_modules/.bin/graphdoc commands \
    --force \
    -o doc/graphql/$1 \
    -e http://graphql-server/graphql

docker-compose down

# Commit the new docs!
git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"

git checkout -b gh-pages
git add doc/
git commit --message "Documentation update: $1"

git remote add origin-pages https://${GH_DOC_TOKEN}@github.com/base-cms/base-cms.git > /dev/null 2>&1
git push --quiet --set-upstream origin-pages gh-pages
