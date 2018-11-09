import extractFragmentName from './extract-fragment-name';

export default ({ fragment }) => {
  let spreadFragmentName = '';
  let processedFragment = '';
  if (fragment) {
    const fragmentName = extractFragmentName(fragment);
    if (!fragmentName) throw new Error('Unable to extract a fragment name.');
    processedFragment = fragment;
    spreadFragmentName = `...${fragmentName}`;
  }
  return { processedFragment, spreadFragmentName };
};
