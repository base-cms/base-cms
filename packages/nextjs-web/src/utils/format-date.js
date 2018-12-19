import moment from 'moment';

export default (value, format) => {
  if (!value) return '';
  const date = moment(value);
  return date.isValid() ? date.format(format) : '';
};
