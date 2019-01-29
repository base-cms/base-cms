import { helper } from '@ember/component/helper';
import numeral from 'numeral';

export function format(params) {
  const format = params[1] || '0.00a'
  return numeral(params[0]).format(format);
}

export default helper(format);