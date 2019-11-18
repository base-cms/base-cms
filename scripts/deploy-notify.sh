#!/bin/bash
set -e
[[ -n "$TRAVIS_TAG" ]] && REVISION="$TRAVIS_TAG" || REVISION=`git describe --tags`

payload="{
  \"attachments\": [{
    \"color\": \"good\",
    \"text\": \"Deployment of \`$TRAVIS_REPO_SLUG\` @ \`$REVISION\` to \`$TARGET\` has finished.\"
  }]
}"
curl -f -X POST --data "$payload" -H 'Content-type: application/json' $SLACK_WEBHOOK_URL
