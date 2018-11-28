# BaseCMS GraphQL Server
The BaseCMS GraphQL server using Apollo and Express.

## Creating a New Content Type
1. Create the GraphQL definition in `graphql/definitions/platform/content/types`
2. Import the type definition into `graphql/definitions/platform/content/types/index.js`
3. Add the type (e.g. `Event`) to the `ContentType` enum found in `graphql/definitions/platform/content/index.js`
4. Add the type (e.g. `Event`) to the content types array found in `graphql/utils/content-types.js`
