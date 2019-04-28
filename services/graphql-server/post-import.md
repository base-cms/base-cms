# Post-Import Scripts

These must be ran after a full import is completed, or any time import data changes.

## Setup
1. Clone this repository
2. From the project root, run `scripts/yarn.sh` to install dependencies
3. Create a `.env` in the project root
4. Within the `.env` set the `MONGO_DSN` values for the target site (see below)
5. Pass the `TENANT_KEY` as a `docker-compose` env value (see "Running the Scripts" beliw)
5. Run the `build-section-query.js`, `build-redirects.js`, `create-indexes.js` and `build-fallback-teasers.js` within the `graphql-server` service (see below)

## Example `.env` Setup
```
MONGO_DSN=mongodb://[production-server-list]/?replicaSet=[replica-set-name]&connectTimeoutMS=200&readPreference=primaryPreferred
```

## Running the Scripts
Once the `.env` is created and is configured for the appropriate website, run the following commands (from the project root) in the terminal. _Make sure to replace the `TENANT_KEY=account_group` env value before running, e.g. `TENANT_KEY=cygnus_ofcr`._

`$ docker-compose run -e TENANT_KEY=account_group --rm  --entrypoint node graphql-server build-redirects.js`

`$ docker-compose run -e TENANT_KEY=account_group --rm  --entrypoint node graphql-server create-indexes.js`

`$ docker-compose run -e TENANT_KEY=account_group --rm  --entrypoint node graphql-server build-section-query.js`

`$ docker-compose run -e TENANT_KEY=account_group --rm  --entrypoint node graphql-server build-fallback-teasers.js`
