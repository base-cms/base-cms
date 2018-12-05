#!/bin/bash
COMPOSEDIR="services/$1"

function usage() {
  echo -e "\nUsage: scripts/start.sh PACKAGE_NAME"
  echo -e "\nBoots a package service"
}

function compose() {
  echo -e "Package path does not exist: $COMPOSEDIR"
  usage
  exit 1
}

function arguments() {
  echo -e "\"start.sh\" requires 1 argument."
  usage
  exit 1
}

# Throw if args are invalid
[[ -z "$1" ]] && arguments

# Install packages
scripts/install.sh

# Check for a valid package
[[ -d $COMPOSEDIR ]] || compose

echo -e "\nStarting dev environment for $1\n"
docker-compose \
  --file docker-compose.yml \
  --project-name base-cms \
  run \
    --rm \
    --name "base-cms_dev_$1" \
    --service-ports \
    -e NODE_ENV=development $1
