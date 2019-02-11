#!/bin/bash
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker build -t "base-cms:$1" .
docker tag "base-cms:$1" "basecms/base-cms:$1"
docker push "basecms/base-cms:$1"
