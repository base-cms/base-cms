# Post-Import Scripts

These must be ran after a full import is completed, or any time import data changes.

## Setup
1. Clone this repository
2. From the project root, run `scripts/yarn.sh` to install dependencies
3. Create a `.env` in the project root.
4. Within the `.env` set the `TENANT_KEY` and `MONGO_DSN` values for the target site (see below).
5. Run the `build-section-query.js` and `create-indexes.js` within the `graphql-server` service (see below).

## Example `.env` Setup
```
TENANT_KEY=ebm_de
MONGO_DSN=mongodb://[production-server-list]/?replicaSet=[replica-set-name]&connectTimeoutMS=200&readPreference=primaryPreferred
```

## Running the Scripts
Once the `.env` is created and is configured for the appropriate website, run the following commands (from the project root) in the terminal.

`$ docker-compose run  --rm  --entrypoint node graphql-server create-indexes.js`

`$ docker-compose run  --rm  --entrypoint node graphql-server build-section-query.js`
