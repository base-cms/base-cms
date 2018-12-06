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
    # bad - this runs a count against the entire content collection. Do do it unless you need it.
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
        # bad - HMTL bodies can _very_ large. We're not using it so don't request it. :)
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

