#!/bin/bash
set -e

IMAGE=basecms/$1:$2
yarn global add @endeavorb2b/rancher2cli
r2 dl basecms-service $1 $IMAGE

payload="{
  \"deployment\": {
    \"revision\": \"\`$2\`\",
    \"user\": \"TravisCD\"
  }
}"
curl -f -X POST --data "$payload" \
  -H 'Content-type: application/json' \
  -H "X-Api-Key:$NR_APIKEY" \
  https://api.newrelic.com/v2/applications/222815958/deployments.json
