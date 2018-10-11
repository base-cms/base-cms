# Base NextJS Website Starter Kit
Assume everything in this folder is either cloned to start a _new_ repository for a site. Or it is somehow generated using a CLI command (similar to Ember). For example: `nextjs-website new officer`. For now we'll pretend the command was run.

# Files
- `.gitignore`
  - Should be built/pulled from the standard Node gitgnore
- `package.json`
  - Should represent the _site/project name_ and should properly install the required peer deps of the core package?
  - Still need to determine what comes with core and what doesn't
  - `react` and `react-dom` are peer deps of `next`
  - `next` is currently a peer dep of `@base-cms/base4-website-nextjs`
  - Can `next` be exclusively loaded into the core package?
- `.env`
  - Needs to be initially created with the proper variables?
- `next.config.js`
  - Needs to be created with the `buildDir` value set... eventually needs to use a plugin to add `graphql-loader` and the like
  - This could be removed if `next` can be moved to core.
- `/site`
  - Folder should be initially created
- `/site/routes.js`
  - Should be generated with the default routes
- `/site/pages`
  - Should be generated with some defaults. How will `_app.js` and `_document.js` be handled?
- `/site/components`
  - Folder should be create with a .gitkeep and empty
- `/server`
  - Folder should be initially created with the proper base4 server requirements

# Misc
- Where does bootstrap live? As a part of the starter or somewhere else??
