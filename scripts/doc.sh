#!/bin/bash

# Update GraphQL documentation
node services/graphql-server/src/index.js &
./node_modules/.bin/graphdoc --force -o doc/graphql/$1 -e http://localhost:10002/graphql
killall node

# Commit the new docs!
git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"

git checkout -b gh-pages
git pull
mv doc/graphql graphql
git add graphql
git commit --message "Documentation update: $1"

git remote add origin-pages https://${GITHUB_TOKEN}@github.com/base-cms/base-cms.git > /dev/null 2>&1
git push --quiet --set-upstream origin-pages gh-pages
