# Website Deployment Tool

To use the deployment tool with your `@base-cms/marko-web` project, include and modify (as appropriate) the following files in the `templates` directory at the root of your project.

## Dockerfile

The `Dockerfile` defines the production build process for your project. No modifications to this file should be necessary.

## .travis.yml

The `.travis.tml` defines how your project should be deployed. Copy this file to your project, and update the deployment commands to deploy each site. You **must** include both the `production` and `staging` definition for each site, if you would like it to deploy to both stacks.

Ensure that you replace all references to `SITE_*` with the appropriate values for your site.

## Custom services

If building a custom website service, copy the `Dockerfile.service` to your service folder, and include/modify (as appropriate) the lines relating to custom service deployment from the `.travis.service.yml`.

Ensure that you replace all references to `SERVICE_*` with the appropriate values for your site.
