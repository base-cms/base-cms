import cleanPath from './clean-path';

export default (to) => {
  const path = cleanPath(to);
  const url = `${window.location.origin}/${path}`;
  window.location.replace(url);
};
