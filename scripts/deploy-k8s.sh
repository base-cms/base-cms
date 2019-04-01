#!/bin/bash
set -e

IMAGE=basecms/$1:$2
yarn global add @endeavorb2b/rancher2cli
r2 dl basecms-service $1 $IMAGE
