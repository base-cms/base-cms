import isObject from './is-object';

export default v => (isObject(v) ? v : {});
