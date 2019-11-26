# Newsletter Deployment Tool

To use the deployment tool with your `base-cms-newsletters` project, include and modify (as appropriate) the files in the `templates` directory at the root of your project.

## Dockerfile

The `Dockerfile` defines the production build process for your project. No modifications to this file should be necessary.

## .travis.yml

The `.travis.tml` defines how your project should be deployed. Copy this file to your project, and update the deployment commands to deploy each tenant. You **must** include both the `production` and `staging` definition for each tenant, if you would like it to deploy to both stacks.

Ensure that you replace all references to `TENANT_*` with the appropriate values for your tenant.
