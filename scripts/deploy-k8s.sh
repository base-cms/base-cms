#!/bin/bash
set -e

IMAGE=basecms/$1:$2

npx @endeavorb2b/rancher2cli dl basecms-service $1-v0x $IMAGE

payload="{
  \"deployment\": {
    \"revision\": \"\`$2\`\",
    \"user\": \"TravisCD\"
  }
}"
curl -f -X POST --data "$payload" \
  -H 'Content-type: application/json' \
  -H "X-Api-Key:$NR_APIKEY" \
  https://api.newrelic.com/v2/applications/$3/deployments.json
