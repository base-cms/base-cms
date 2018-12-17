# BaseCMS GraphQL Client and Schema Stitching
Creates a server-side client, link, and remote schema for the BaseCMS GraphQL API. Can be used as a low-level dependency in other projects.

## Configuration
The following environment variables can be used to configure how to connect to the remote schema.

**Required**:
- `GRAPHQL_URL`: the GraphQL URL to remotely connect to and stitch from. For example `https://graphql.[your-website].com`

**Optional**:
- `CONTENT_CANONICAL_PATHS`: a JSON value that specifies the format for creating Content paths. By default this is set to `["sectionAlias", "type", "id", "slug"]`
