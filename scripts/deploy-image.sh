#!/bin/bash
set -e
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

mv services ../
mkdir services
mv ../services/$1 services/

[[ -z "services/$1/Dockerfile"]] && mv Dockerfile Dockerfile.core && mv "services/$1/Dockerfile" Dockerfile
docker build -q -t "$1:$2" --build-arg SERVICE=$1 .
[[ -z "Dockerfile.core" ]] && mv Dockerfile.core Dockerfile

mv ../services/* services/
rm -rf ../services

docker tag "$1:$2" "basecms/$1:$2"
docker push "basecms/$1:$2"
docker image rm "$1:$2"
