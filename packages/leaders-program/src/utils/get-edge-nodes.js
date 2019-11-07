import getAsArray from './get-as-array';

export default (obj, path) => getAsArray(obj, `${path}.edges`).map(edge => edge.node);
