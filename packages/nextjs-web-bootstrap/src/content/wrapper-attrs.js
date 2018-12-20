import classNames from 'classnames';
import { get } from '@base-cms/nextjs-web/utils';

export default ({ modifier, content, className } = {}) => {
  const id = get(content, 'id');
  const type = get(content, 'type');
  return {
    'data-id': id,
    className: classNames('content', `content--${modifier}`, `content--${type}`, className),
  };
};
