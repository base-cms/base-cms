import escape from 'escape-string-regexp';

export default v => (v ? escape(v) : '');
