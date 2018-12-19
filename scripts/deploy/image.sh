#!/bin/bash
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker build -t "base-cms:$TRAVIS_TAG" .
docker tag "base-cms:$TRAVIS_TAG" "basecms/base-cms:$TRAVIS_TAG"
docker push "basecms/base-cms:$TRAVIS_TAG"
