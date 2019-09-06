/**
 * @param {object} params
 * @param {string} iconName
 * @param {string} [params.blockName=icon]
 * @param {array} [params.modifiers]
 * @param {string} [params.className]
 */
module.exports = ({
  iconName,
  blockName = 'icon',
  modifiers,
  className,
} = {}) => {
  const mods = Array.isArray(modifiers) ? modifiers.slice() : [];
  mods.push(iconName);
  return [blockName, ...mods.map(mod => `${blockName}--${mod}`), className];
};
