#!/bin/bash
set -e

IMAGE=basecms/$1:$2

# @todo revert
echo "Using v1.x cluster."
RANCHER_CLUSTERID="$RANCHER_CLUSTERID_V1" \
  RANCHER_TOKEN="$RANCHER_TOKEN_V1" \
  npx @endeavorb2b/rancher2cli dl basecms-service $1 $IMAGE

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
