
# BaseCMS Dependency Tool
Command line tool for managing @base-cms project dependencies.

## Installation
Add `@base-cms/dependency-tool` as a project dependency via Yarn or npm. You can also add this package globally and use it will all of your `@base-cms` projects.

## Usage

### Updating deps
Once installed, run via the command line and target the project path you'd like to update:

```sh
basecms-dependencies update ../path-to-your-project
```

If the package uses Yarn workspaces, all sub-packages will also be updated.
