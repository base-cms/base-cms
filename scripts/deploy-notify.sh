#!/bin/bash
set -e

payload="{
  \"attachments\": [{
    \"color\": \"good\",
    \"text\": \"Deployment of \`$TRAVIS_REPO_SLUG\` @ \`$TRAVIS_TAG\` to production has finished successfully.\"
  }]
}"
curl -f -X POST --data "$payload" \
  -H 'Content-type: application/json' \
  https://hooks.slack.com/services/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
