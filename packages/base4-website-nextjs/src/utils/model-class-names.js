export default (modelName, path) => {
  const types = String(path).split('.');
  const elementTypes = types.shift();
  const elementClass = `${modelName}__${inflect(elementTypes)}`;
  const classes = [elementClass];
  types.forEach(type => classes.push(`${elementClass}--${inflect(type)}`));
  return types;
}
