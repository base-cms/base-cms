#!/bin/bash
COMPOSEDIR="services/$1"

function usage() {
  echo -e "\nUsage: scripts/run.sh PACKAGE_NAME"
  echo -e "\nBoots a package service"
}

function compose() {
  echo -e "Package path does not exist: $COMPOSEDIR"
  usage
  exit 1
}

function arguments() {
  echo -e "\"run.sh\" requires 1 argument."
  usage
  exit 1
}

# Throw if args are invalid
[[ -z "$1" ]] && arguments

# Check for a valid package
[[ -d $COMPOSEDIR ]] || compose

echo -e "\nStarting dev environment for $1\n"
docker-compose \
  run \
    --rm \
    --service-ports \
    -e NODE_ENV=development $1
