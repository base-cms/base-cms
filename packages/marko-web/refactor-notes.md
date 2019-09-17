# Marko Web Refactor

## Punch List
- [ ] Content: Whitepapers (forms, downloads, etc)
- [x] Contact Us Page
- [x] Search: Google
- [ ] Subscribe
- [x] Reveal Ad
- [ ] NativeX Plugin
- [ ] Contact Us Submissions - move to site package for now
- [ ] Mailer Service for Contact Us and Inquiry
- [ ] Content: Media Galleries (really only Bizbash)
- [ ] Search: Bing (EE and Bizbash only)
- [ ] IdentityX Plugin (OGJ only)
- [ ] Inquiry Plugin (Bizbash only)
- [ ] Review unused theme CSS

## Core
- Page loaders should not use routes
- Document / page wrappers should support all types
- Decouple page context components
- Investigate CMS element components
  - Decouple BEM classes?
  - Decouple Imigix?

## Common
- Remove direct, third-party dependencies
  - NativeX
  - GTM
  - GAM
  - Reskin
- Re-factor items
- Make `item` vs `node` vars consistent
- Create generic query loaders
- Create generic layouts (with customizable items)
- Create generic load more handlers


## To do
- All instances of `<cms-browser-component>` need to be replaced with `<marko-web-browser-component>`
- Rename `<cms-document>` to `<marko-web-document>`
- Placeholder ads were removed.
- The basecmsrc file will need to update to include additional browser packages
- All instances of `<cms-query-*>` need to be changed to `<marko-web-query-*>`
- Add `images.fallback` to core config on all sites
- Change `<cms-page-container>` to `<marko-web-page-container>`
- Change `<cms-page-rel-canonical>` to `<marko-web-page-rel-canonical>`, `pathname` became `path`
- Change `<cms-page-metadata>` to `<mark-web-page-metadata>`
```marko
<marko-web-page-metadata-content
  for="content"
  type=content.type
  title=get(content, "metadata.title")
  description=get(content, "metadata.description")
  canonical-path=content.canonicalPath
  image-src=get(content, "metadata.image.src")
  published-date=get(content, "metadata.publishedDate")
  updated-date=get(content, "metadata.updatedDate")
  expires-date=get(content, "metadata.expiresDate")
/>

<marko-web-page-metadata
  title=get(section, "metadata.title")
  description=get(section, "metadata.description")
  canonical-path=section.canonicalPath
/>
```
- Change `<cms-page-title>` to `<marko-web-page-title>`
- Change `<cms-page-description>` to `<marko-web-page-description>`, `content` is now `value`
- Sticky Leaderbaord
  - the `refreshable` prop was removed. anything that should not refresh so set `refresh-interval` to 0
  - name changed to `<marko-web-gam-fixed-ad-bottom>`
  - update sass vars to match theme
- Update `<endeavor-item>` and `<endeavor-item-list>` to `<marko-web-node>` and `<marko-web-node-list>`
- Update `&__contents` to `&__nodes` for `<marko-web-node-list>`, `&__item` to `&__node`
- Need to add `/__load-more` to no-follow
- Remove `load-more` routes from sites
- Remove the `routing-utils` package from endeavor and use the `json-error-handler` from `@base-cms/marko-web/express/json-error-handler`
