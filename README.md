# BaseCMS

## Usage
_This repository requires Docker Engine 18.06.0 or greater as Compose file format 3.7 is used._

1. Clone the repository
2. From the project root run `scripts/install.sh` to install dependencies

## Running Services
From the project root, run `scripts/run.sh [SERVICE_NAME]`. For example, to run the dev environment for `graphql-server` run `scripts/run.sh graphql-server`

Available services include:
- `graphql-server`
- `example-website`
- `keyword-analysis`

To bring down all services (and service deps) run `scripts/down.sh`.

## Adding/Removing Dependencies
This repository uses Yarn workspaces for managing packages and services.
- To add packages to a workspace run `scripts/workspace.sh [WORKSPACE_NAME] add [package]`
- To remove packages from a workspace run `scripts/workspace.sh [WORKSPACE_NAME] remove [package]`

The `WORKSPACE_NAME` is equivalent to the `name` field found in the `package.json` file of the package or service. For example, to add a package to the `graphql-server` service, run `scripts/workspace.sh @base-cms/graphql-server add [package]`

## Yarn
Do _NOT_ run Yarn from your local machine. Instead run Yarn commands using `scripts/yarn.sh [command]`

## Terminal Access
To access the terminal inside Docker run `scripts/terminal.sh`
