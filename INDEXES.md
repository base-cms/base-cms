# BaseCMS MongoDB Index Requirements
Additional optimization notes:
- When performing a paginated query, do not return the edges if only `totalCount` is returned. Also, account for if only `pageInfo` is returned.
- Generally speaking, it would be best to project the results from the DB based on the GraphQL fields requested. If not possible, at least prevent returning "heavy" fields (e.g. `platform.Content.body`) unless requested.
- When possible, data loaders should be used to prevent N+1 query issues on relationships. Hopefully this can be limited to rel fields only.

## Email

## Magazine

## Platform
### Asset
- Query
  - `{ type: 1, _id: 1 }`
- Sort
  - `{ name: 1, _id: 1 }, { collation: { locale: 'en_US' } }`
  - `{ touched: 1, _id: 1 } }`
  - `{ filePath: 1, _id: 1 }, { collation: { locale: 'en_US' } }`
  - `{ fileName: 1, _id: 1 }, { collation: { locale: 'en_US' } }`
### Product
- Query
  - `{ type: 1, status: 1, _id: 1 }`
- Sort
  - `{ name: 1, _id: 1 }, { collation: { locale: 'en_US' } }`
  - `{ fullName: 1, _id: 1 }, { collation: { locale: 'en_US' } }`

## Website
### Option
- Query
  - `{ status: 1, _id: 1 }`
  - `{ status: 1, 'site.$id': 1 }`
- Sort
  - `{ name: 1, _id: 1 }, { collation: { locale: 'en_US' } }`
### Section
- Query
  - `{ status: 1, _id: 1 }`
  - `{ status: 1, alias: 1 }`
  - `{ status: 1, redirects: 1 }`
  - `{ status: 1, 'parent.$id': 1 }`
  - `{ status: 1, 'site.$id': 1, 'parent.$id': 1 }`
- Sort
  - `{ name: 1, _id: 1 }, { collation: { locale: 'en_US' } }`
  - `{ fullName: 1, _id: 1 }, { collation: { locale: 'en_US' } }`
  - `{ sequence: 1, _id: 1 }`
