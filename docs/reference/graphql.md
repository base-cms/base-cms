---
layout: page
title: GraphQL API
permalink: /reference/graphql
parent: Reference
show_toc: true
---

# Introduction
<nav class="toc" markdown="1">
  <h4>On this page</h4>
  - replaceme!
  {:toc}
</nav>

The GraphQL API provides a GraphQL interface to your data in BaseCMS. This API provides a single GraphQL schema, regardless of tenancy.

You can use this API to consume both published and non published content. Read more about this on the [previewing content](#previewing-content) section.

# Basic API Information

The BaseCMS GraphQL API is available at the following urls:
```
https://graphql.base-cms.io/v4/[account-key]/[group-key]
```

The Staging environment can be acccessed via the following url:
```
https://graphql-staging.base-cms.io/v4/[account-key]/[group-key]
```

The following legacy URL structure is still supported (for now!):
```
https://[group-key].[account-key].base-cms.io/graphql
```

# Authentication
Any client using the API needs to provide an access token in either:
- The Authorization header, specifically, `Authorization: Bearer MY_TOKEN`.
- The `access_token` URL query parameter.

To learn more about authentication in BaseCMS and how to create your own access tokens take a look to the [Authentication](/learn/authentication) reference documentation.

# API rate limits
API Rate limits specify the number of requests a client can make to our APIs in a specific time frame. Every request counts against a per second rate limit.

There are no limits enforced on requests that hit our CDN cache, i.e. the request doesn't count towards your rate limit and you can make an unlimited amount of cache hits. For requests that do hit the GraphQL API, the following rate limits apply:
- Unauthenticated queries (no access token): 1 request per second per IP address
- Authenticated queries: 75 requests per second.
- Authenticated mutations: 15 requests per second.

When a client gets rate limited, the API responds with the `429 Too Many Requests` HTTP status code.

# Query complexity limits

@todo we should do this too.


# HTTP Methods
The GraphQL API supports both GET and POST methods.

This is the query used in both examples below:

```
query ($input: AllContentQueryInput) {
  allContent(input: $input) {
    edges {
      node {
        name
      }
    }
  }
}
```

## POST
The HTTPS POST method is more flexible and recommended. The query should be sent as a property in a JSON payload in the body of the POST request with the property name "query". Any required variables are added as an additional JSON property to the payload with the property name "variables".

```
curl -g \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {MY_TOKEN}" \
  -d  '{"query":"query($input:AllContentQueryInput){allContent(input:$input){edges{node{name}}}}","variables":{"input":{"pagination":{"limit":2}}}}' \
  https://graphql.base-cms.io/v4/[account-key]/[group-key]
```

## GET
The HTTPS GET method requires that the query is included in the URL string as a parameter. You can also send any required variables in an additional "variables" parameter in JSON format.

```
curl -g \
  -X GET \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {MY_TOKEN}" \
  'https://graphql.base-cms.io/v4/[account-key]/[group-key]?query=query($input:AllContentQueryInput){allContent(input:$input){edges{node{name}}}}&variables={"input":{"pagination":{"limit":2}}}'
```

# Previewing content

Certain content can be previewed when it would normally not be returned. To utilize this feature, ensure you send the correct `enum ModelStatus` value along with requests that support it -- for instance the `allContent` query above.

# Exploring the schema
You can explore and inspect the schema of a space using the GraphiQL, an in-browser GraphQL IDE.

To open GraphiQL visit the `https://graphql.base-cms.io/v4/[account]/[group]/explore?access_token={MY_TOKEN}` URL in your browser. You must provide the `MY_TOKEN` as a query parameter.

The latest GraphQL schema is [available here](/graphql/master).
