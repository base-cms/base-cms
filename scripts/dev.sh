#!/bin/bash
COMPOSEDIR="packages/$1"
COMPOSEFILE="$COMPOSEDIR/docker-compose.yml"

function usage() {
  echo -e "\nUsage: scripts/dev.sh PACKAGE_NAME"
  echo -e "\nBoots a package service"
}

function compose() {
  echo -e "Package path does not exist: $COMPOSEDIR"
  usage
  exit 1
}

function arguments() {
  echo -e "\"dev.sh\" requires 1 argument."
  usage
  exit 1
}

# Throw if args are invalid
[[ -z "$1" ]] && arguments

# Only install if we haven't yet.
[[ -n $(docker volume ls -q | grep base-cms_node_modules) ]] || scripts/install.sh

# Check for a valid package
[[ -d $COMPOSEDIR ]] || compose

# Check for valid compose file
[[ ! -f $COMPOSEFILE ]] && echo -e "Creating package docker-compose.yml" && echo -e "version: '3.7'\n" > $COMPOSEFILE

echo -e "\n Starting dev environment for $1\n"
docker-compose \
  --file docker-compose.yml \
  --file $COMPOSEFILE \
  --project-name base-cms \
  run \
    --rm \
    --name "base-cms_dev_$1" \
    --service-ports \
    -e NODE_ENV=development $1
