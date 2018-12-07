# BaseCMS GraphQL Server
The BaseCMS GraphQL server using Apollo and Express.

## Creating a New Content Type
1. Create the GraphQL definition in `graphql/definitions/platform/content/types`
2. Import the type definition into `graphql/definitions/platform/content/types/index.js`
3. Add the type (e.g. `Event`) to the `ContentType` enum found in `graphql/definitions/platform/content/index.js`
4. Add the type (e.g. `Event`) to the content types array found in `graphql/utils/content-types.js`

## Query Best Practices
Don't request more fields than you need! Data will only be returned from the database for fields _defined_ within the GraphQL query. Don't request large or time-consuming fields like `Content.body` or `Connection.totalCount` or `Connection.edges.cursor` or `Content.taxonomy.edges.node` when you don't need the data!

For example, when displaying content in a list:
```
Content Title 1
Teaser text here...

Published: Jun 6th, 2018
Section: Firearms

-----

Content Title 2
Another teaser is here...

Published: Jun 5th, 2018
Section: Tactical
```
Your query should look like something like this:
```graphql
{
  allContent(input: { pagination: { limit: 2 } }) {
    edges {
      node {
        id
        name
        teaser
        published
        primarySection {
          id
          name
        }
      }
    }
  }
}
```
**NOT** like this:
```graphql
{
  # The `limit` here is bad, don't ask for more content than you need!
  allContent(input: { pagination: { limit: 10 } }) {
    # bad - this runs a count against the entire content collection. Don't do it unless you need it.
    totalCount
    edges {
      # bad - the cursor has to be encoded... why bother when not using?
      cursor
      node {
        id
        name
        teaser
        published
        primarySection {
          id
          name
        }
        # bad - HMTL bodies can be _very_ large. We're not using it so don't request it. :)
        body
        # bad - not using this either: there's no point in doing a taxonomy query.
        taxonomy {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    }
  }
}
```
## Data Loaders
Within the same request, assume the following calls are made somewhere in the API code...
```js
/**
 * load(loaderName, id, projection);
 *
 */
const name = 'activeWebsiteSections'
load(name, 56374);
load(name, 56163, { _id: 1, alias: 1 });
load(name, 56163, { name: 1 });
load(name, 56203, { _id: 1, alias: 1 });
load(name, 56203, { _id: 1, name: 1 });
load(name, 56374, { alias: 1 });
load(name, 56374, { _id: 1, alias: 1 });
load(name, 56265, { _id: 1, name: 1, description: 1,  });
load(name, 56374, { _id: 1, name: 1 });
load(name, 56221, { _id: 1, alias: 1 });
load(name, 56221, { _id: 1, name: 1 });
load(name, 56265, { _id: 1, alias: 1 });
load(name, 56265, { _id: 1, name: 1 });
load(name, 56265, { name: 1 });
load(name, 56265, { _id: 1 });
```

Cache keys would be generated based the `load` calls. All keys start with the stringified `id` followed by a field list.  Projected requests will always add the `_id` field, sort all field names, and then concatenate them with a pipe (`|`). Non-projected requests receive a `*` value. Field names are de-duplicated.
```
56163:_id|alias
56163:_id|name
56203:_id|alias
56203:_id|name
56221:_id|alias
56221:_id|name
56265:_id
56265:_id|alias
56265:_id|description|name
56265:_id|name
56374:*
56374:_id|alias
56374:_id|name
```

Ultimately, five distinct documents need to be returned (since there are five distinct IDs). The query logic determines which fields need to be returned for each `id`, based on every possible projection for that `id`. For example, the above would make three queries to the database.
```js
const [res1, res2, res3] = await Promise.all([
  basedb.find('website.Section', { _id: { $in: [56374] } }, {
    // return all fields since this `id` is associated with `*` fields
    projection: undefined,
  });
  basedb.find('website.Section', { _id: { $in: [56265] } }, {
    // return the combined fields from all id projections.
    projection: { _id: 1, alias: 1, description: 1, name: 1 },
  });
  // **Important** the result will not be in the same order as the `$in` array!
  // Will actually be returned as 56163, 56203, 56221
  basedb.find('website.Section', { _id: { $in: [56203, 56221, 56163] } }, {
    // return the combined fields from all id projections.
    projection: { _id: 1, alias: 1, name: 1 },
  });
]);
```

The documents from each query are then mapped back, in the same order, as the array of keys passed to the batch loader. In other words, they are be returned in such a way that the cache key matches the original query. For example, the incoming `keys` array of the batch function would be:
```js
const keys = [
  [56374, null],
  [56163, ['_id', 'alias'],
  [56163, ['_id', 'name'],
  [56203, ['_id', 'alias'],
  [56203, ['_id', 'name'],
  [56374, ['_id', 'alias'],
  [56265, ['_id', 'description', 'name' ],
  [56374, ['_id', 'name'],
  [56221, ['_id', 'alias'],
  [56221, ['_id', 'name'],
  [56265, ['_id', 'alias'],
  [56265, ['_id', 'name'],
  [56265, ['_id'],
];
```
The batch function would then return the documents from `res1`, `res2` and `res3` in the following order:
```js
const return = [
  { _id: 56374, /* all fields on the document */ },
  { _id: 56163, alias: 'foo', name: 'bar' },
  { _id: 56163, alias: 'foo', name: 'bar' },
  { _id: 56203, alias: 'foo', name: 'bar' },
  { _id: 56203, alias: 'foo', name: 'bar' },
  { _id: 56374, /* all fields on the document */ },
  { _id: 56265, alias: 'foo', name: 'bar', description: 'baz' },
  { _id: 56374, /* all fields on the document */ },
  { _id: 56221, alias: 'foo', name: 'bar' },
  { _id: 56221, alias: 'foo', name: 'bar' },
  { _id: 56265, alias: 'foo', name: 'bar', description: 'baz' },
  { _id: 56265, alias: 'foo', name: 'bar', description: 'baz' },
  { _id: 56265, alias: 'foo', name: 'bar', description: 'baz' },
];
```
