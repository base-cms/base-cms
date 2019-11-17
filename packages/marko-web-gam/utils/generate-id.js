const { randomElementId } = require('@base-cms/utils');

module.exports = ({ inc } = {}) => randomElementId({ prefix: 'div-gpt-ad', inc });
