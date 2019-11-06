import { get } from 'object-path';

export default (obj, path) => {
  const v = get(obj, path, {});
  return v && typeof v === 'object' ? v : {};
};
