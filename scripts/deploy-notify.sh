#!/bin/bash
set -e

payload="{
    \"attachments\": [{
        \"color\": \"good\",
        \"text\": \"Deployment of \`$TRAVIS_REPO_SLUG\` @ \`$TRAVIS_TAG\` to production has finished successfully.\"
    }]
}"
curl -X POST -H 'Content-type: application/json' --data "$payload" https://hooks.slack.com/services/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
