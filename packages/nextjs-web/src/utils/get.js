import { get } from 'object-path';

export default (obj, path, def = null) => get(obj, path, def);
