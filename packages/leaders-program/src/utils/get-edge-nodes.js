import { getAsArray } from '@base-cms/object-path';

export default (obj, path) => getAsArray(obj, `${path}.edges`).map(edge => edge.node);
