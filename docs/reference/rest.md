---
layout: page
title: Legacy REST API
permalink: /reference/rest
parent: Reference
---

# Introduction
<nav class="toc" markdown="1">
  <h4>On this page</h4>
  - replaceme!
  {:toc}
</nav>

The Legacy REST API provides a standard REST-compliant interface to your data in BaseCMS. The REST API supports both read and write operations, and requires authentication for all requests.

The format of the REST API's responses is consistent with the [JSON:API](http://jsonapi.org/) spec.

<div class="alert alert-warning" markdown="1">
This API has been deprecated and will be removed in the near future. All REST API functions have been superceded by the [GraphQL API](/reference/graphql).
</div>

# Basic API Information

The BaseCMS REST API is available at the following uri on any platform domain:
```
https://{DOMAIN}/api/2.0rcpi/{LAYER}/{MODELSPACE}
```

# Authentication
Any client using the API needs to present credentials either as:
- A valid cookie session obtained via the `/login` endpoint, after having presented valid credentials
- An HTTP Basic authorization header for a valid service account

# API Layers

The REST API supports two distinct API layers which change the source data for the response:
- The `search` layer, which provides read-only access to data through Elasticsearch
- The `persistence` layer, which provides read and write access to Platform data

# Query Parameters
All API layers support sending query params with read requests to adjust the returned fields and referenced models. These parameters should be url-encoded comma-separated lists.

- `include` A list of relationship fields to return (`company,primaryImage`)
- `fields` A list of fields to return (`name,id,company`)

# Response Customization
The API can be configured to customize how the response is rendered by sending custom headers. These headers and their configuration are described below.

## Side Loading
Default Value: __Disabled__.

Side loading data includes related model data directly in the API response, removing the need to perform extra API calls to return related models. For example, including `Taxonomy` documents when retrieving a `Content` document, instead of just their IDs.

To enable side-loading data, send a custom header of `X-Modlr-Api-Sideload-Data: 1`.
To explicitly disable, send a value of `0`.

## Metadata Inclusion
Default Value: __Enabled__.

Model and field metadata will now be embedded in the response, preventing the need for another API call to retrieve metadata.

To disable via the External API, send a custom header of `X-Modlr-Api-Include-Meta: 0`.
To explicitly enable, send a value of `1`.

## Query Inverse References
Default Value: __Enabled__.

In order to display inverse model relationships (seeing related models when the current model does not own the relationship), the database **must** be queried to find the related models. This is because the relationship values are not stored on the inversed model, and is inferred via Metadata. This option allows inversed relationshipsto be returned with the response, and can be disabled to prevent the additional database query.

To disable via the External API, send a custom header of `X-Modlr-Api-Query-Inversed: 0`.
To explicitly enable, send a value of `1`.

## URL Templates
Default Value: __Disabled__.

Templates provide a single reference point for accessing referenced resources. Included templates are placed at the root of the response under the `links` key.

To enable via the External API, send a custom header of `X-Modlr-Api-Use-Templates: 1`.
To explicitly disable, send a value of `0`.

## Resource Collections
Default Value: __Disabled__.

A collection represents hasMany relationships as a single object of ids, instead of an array of individual resource objects. For example:

```
field: [
    1234,
    2345,
    ...
]
```

instead of

```
field: [
    { id: 1234 },
    { id: 2345 },
    ...,
]
```

To enable via the External API, send a custom header of `X-Modlr-Api-Use-Collections: 1`.
To explicitly disable, send a value of `0`.


## Reference Formatting
Default Value: __object__.

Multiple resource formats are specified by the JSON:API spec, and two are supported by the API: `id` and `object`. The `id` format will return references as ID values only. The `object` format will return references as reference objects, including the ID, Type, and Resource HREF.

To set to `id` via the External API, send a custom header of `X-Modlr-Api-Reference-Format: id`.
To set to `object` via the External API, send a custom header of `X-Modlr-Api-Reference-Format: object`.

## Display Related/Associated Fields under `links`
Default Value: __Enabled__.

This option allows you to prevent associated or related fields from displaying under the `links` root element.

To disable via the External API, send a custom header of `X-Modlr-Api-Use-Links: 0`.
To explicitly enable, send a value of `1`.

# Search

Not all platform modelspaces support `search`. For this example, we will use the `Platform\Content` modelspace. When executing a search request, include the search layer and modelspace in the URI, and include a JSON payload of Elasticsearch search criteria inside a root `data` object.

```
curl -g \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic {BASIC_AUTH}" \
  -d  '{"data":{"query":{"query_string":{"query":"Technology"}},"from":0,"size":20,"aggregations":{"types":{"filter":{"and":[{"or":[{"type":{"value":"Article"}}]},{"terms":{"status":[1,2]}}]},"aggregations":{"byType":{"terms":{"field":"_type","size":1}}}}},"filter":{"and":[{"or":[{"type":{"value":"Article"}}]},{"terms":{"status":[1,2]}}]}}}' \
  https://{DOMAIN}/api/2.0rcpi/search/platform/content?include=company%2CprimaryImage&fields=name%2Ccompany%2CprimaryImage
```

## Search Examples

Search for a `Contracts\Contract` by the term 'Jane Doe'

    GET /api/2.0rcpi/search/contracts/contact/find?q=Jane+Doe

Search for a `Platform\Content` document with the term 'Technology'

    GET /api/2.0rcpi/search/platform/content/find?q=Jane+Doe


# Persistence

The `persistence` API layer provides CRUD access to all platform data.



## Persistence Examples

Update Jane Doe's name to 'Jane Awesome'
_Update supports three different actions; assign (default), set, remove_

```
PUT /api/2.0rcpi/persistence/contracts/contact/12345678/{action}
```

```
// assign
{
    name: 'Jane Awesome',   // overwrites the value for single values
    taxonomy: [123,456,789] // adds the value(s) for array values
}
```
```
// Set
{
    name: 'Jane Awesome',   // overwrites the value for single values
    taxonomy: [123,456,789] // overwrites the value(s) for array values
}
```

```
// Remove
{
    name: 'Jane Awesome',   // removes the value for single values
    taxonomy: [123,456,789] // removes the matched value(s) for array values
}
```

Jane Awesome isn't that awesome, get rid of her contract.

    DELETE /api/2.0rcpi/persistence/contracts/contract/12345678
