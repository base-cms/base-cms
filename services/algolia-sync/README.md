# BaseCMS Algolia Service
When content is saved in Management it will push an object onto the AWS SQS queue; example `{id: 12345678, tenant: cygnus_ofcr}`. The BaseCMS Algolia service listens for messages using long polling. Once a message is received, the service will query GraphQL and format the response to upsert into Algolia. We store each site's data into its own indice that matches the tenant key. Once everything is finished the Algolia service deletes the message out of the queue.

## ENV Setup
```sh
# ./env
GRAPHQL_URI="Graph endpoint"
ALGOLIA_SQS_URI="SQS URL"
ALGOLIA_APPID="Algolia API key"
ALGOLIA_API_KEY="Algolia API Secret"
AWS_ACCESS_KEY_ID="AWS user"
AWS_SECRET_ACCESS_KEY="AWS Secret"
AWS_REGION="AWS Region"
NEW_RELIC_LICENSE_KEY="Newrelic License Key"
```

## How AWS SQS Works?
Once a message is pushed into the queue. It will allow the request to be pulled out. If it's not deleted within 30 seconds of it being pulled out. It will put it back into the active queue. It will do this up till 3 times. After that it moves the message into a failed queue for a developer to review. We also watch the failed queue with Newrelic to alert a developer of the issue.

## How To Troubleshooting Failed Messages
A developer can point their env SQS_URL to the failed queue and run it on dev. Once the issue is fixed they can either manually run them on dev or move the failed messages back into the prod queue.

## CLI
This service also supports running CLI commands to sync a site. This will iterate over all of the tenant's content and update it in Algolida. Example:

      nnode services/algolia-sync/src/index.js --tenant cygnus_ofcr --limit 10 --skip 5

#### For More Algolia Information
[https://www.algolia.com/doc/api-client/getting-started/install/javascript/?language=javascript](https://www.algolia.com/doc/api-client/getting-started/install/javascript/?language=javascript)
