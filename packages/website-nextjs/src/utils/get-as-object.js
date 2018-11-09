import { get } from 'object-path';
import asObject from './as-object';

export default (obj, path) => asObject(get(obj, path, {}));
