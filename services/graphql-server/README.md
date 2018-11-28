# BaseCMS GraphQL Server
The BaseCMS GraphQL server using Apollo and Express.

## Creating a New Content Type
1. Create the GraphQL definition in `graphql/definitions/platform/content/types`
2. Add the corresponding query criteria in `graphql/utils/criteria-for.js` - for example, if the type was `ContentEvent` add the `contentEvent` criteria key.
3. Add the content type to the array within the `content` criteria (in `graphql/utils/criteria-for.js`)
4. Import the type definition into `graphql/definitions/platform/content/types/index.js`
