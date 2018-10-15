export default (fragment) => {
  const pattern = /fragment (.*) on/;
  if (typeof fragment === 'string') return fragment.match(pattern)[1];
  if (fragment && fragment.kind && fragment.kind === 'Document') {
    return fragment.loc.source.body.match(pattern)[1];
  }
  return null;
};
