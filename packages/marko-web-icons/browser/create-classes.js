/**
 * @param {object} params
 * @param {string} iconName
 * @param {string} [params.blockName=icon]
 * @param {array} [params.modifiers]
 * @param {string} [params.className]
 */
export default ({
  iconName,
  blockName = 'icon',
  modifiers,
  className,
} = {}) => {
  const mods = Array.isArray(modifiers) ? modifiers.slice() : [];
  mods.push(iconName);
  return [blockName, ...mods.map(mod => `${blockName}--${mod}`), className];
};
