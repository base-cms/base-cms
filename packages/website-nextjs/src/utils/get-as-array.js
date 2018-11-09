import { get } from 'object-path';
import asArray from './as-array';

export default (obj, path) => asArray(get(obj, path, []));
