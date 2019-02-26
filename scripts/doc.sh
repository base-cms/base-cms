#!/bin/bash
set -e

# Update GraphQL documentation
MONGO_DSN=mongodb://localhost:27017 TENANT_KEY=as3_baseplatform node services/graphql-server/src/index.js &
sleep 2; ./node_modules/.bin/graphdoc --force -o doc/graphql/$1 -e http://localhost/graphql
killall node

# Commit the new docs!
git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"

git clone --depth=50 --branch=gh-pages https://${GITHUB_TOKEN}@github.com/base-cms/base-cms.git _doc

cp -r doc/* _doc/

cd _doc
git add .
git commit --message "Documentation update: $1"
git push
