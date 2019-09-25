# Content Mange

## Punch List
- [ ] Add support for secondary site+section contexts
- [ ] Ensure ContentPage respects primary site
- [ ] Update canonical path/url to support site context
- [ ] Handle newsletters (this requires more thought)
- [ ] Add multi-site support to RSS and sitemap services
- [ ] Add site to Redirects collection
- [ ] Determine if `canonicalPath` should be renamed to `websitePath`
- [ ] Should content path rules be stored on the Site object?
- [ ] Add image and asset hostnames to Site object

## Primary Site + Section
- Must select primary site + section
  - This will generate the canonical URL base on site and section
- Can, optionally, select primary sections for other sites
  - This will provide context when viewing the content on other sites

## Scheduling
- If no website schedules are provided
  - The content will appear in published content queries where the primary or secondary SS's are queried
- If website schedules are provided
  -  Will appear in website scheduled queries for site+section scheduled

## Load More / Ad Targeting / Context
- When viewing content on the website
  - The rel canonical will always be the PSS
  - The section context will be based on matching the current site with the content's primary site (or sites). If found, will use that section, otherwise will default to the current site's homepage.
- In other words, the primary section will be generated off the current website context, unless otherwise specified.


# Examples
- Sites:
  - ien.com
  - ddt.com
  - cen.com

- Content X
  - Site + Sections
    - ien.com + operations (primary)
    - ddt.com + automotive (secondary)

  - url on ien.com: ien.com/operations/slug
  - url on ddt.com: ddt.com/automotive/slug
  - url on cen.com: cen.com/home/slug (since no additional sites have been defined)
  - rel canonical will always be ien.com/operations/slug

  - this content will appear in published content queries for ien.com and ddt.com, but not cen.com because a S+S was not defined (confirm this - perhaps published content should be left as-is)

  - load more / ad targeting
    - will use the current site + section

- Website Schedules for Content X
  - ien.com + operations
  - ien.com + new products
  - cen.com + distribution
  - ddt.com + manufacturing

  - content will display in website scheduled queries for each site where the site + section match
  - where should these click? by default, the current site?
  - what if we want a "content from our sister sites" that links off to the primary section?

- Newsletter Schedule for Content X
  - ien today
  - ddt today
  - cen today

  - newsletter products will likely need sites related to them

  - by default, do thee link to their generated url paths? e.g. cen.con/home/slug since no section is defined for that site? or does that force it to link to ien.com in the cen newsletter?

  - how does this behavior change if we want to force the content to always click to the primary site?
