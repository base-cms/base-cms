#!/bin/bash
set -e

# Install dependencies
./scripts/install.sh

# Update GraphQL documentation
docker-compose up -d graphql-server
# MONGO_DSN=mongodb://localhost:27017 TENANT_KEY=as3_baseplatform node services/graphql-server/src/index.js &
sed -i.bak "s/NPM_VERSION/$1/g" package.json
sleep 10; docker-compose run --rm --no-deps --entrypoint ./node_modules/.bin/graphdoc commands --force -o doc/graphql/$1 -e http://graphql-server/graphql
# sleep 2; ./node_modules/.bin/graphdoc --force -o doc/graphql/$1 -e http://localhost/graphql
docker-compose down
# killall node


# Commit the new docs!
git config --global user.email "solocommand+base-cms-bot@gmail.com"
git config --global user.name "BaseCMSBot"

git clone --depth=50 --branch=gh-pages https://${GITHUB_TOKEN}@github.com/base-cms/base-cms.git _doc

cp -r doc/* _doc/

if [ "master" != "$1" ]; then
    echo "- $1\n" > _doc/_data/versions.yml
fi

cd _doc
git add .
git commit --message "Documentation update: $1"
git push
