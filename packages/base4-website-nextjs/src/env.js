import envalid from 'envalid';

const { json, cleanEnv } = envalid;

export default cleanEnv(process.env, {
  CONTENT_CANONICAL_PATHS: json({ desc: 'The canonical path parts for generating content URLs.', default: ['sectionAlias', 'type', 'id', 'slug'] }),
});
