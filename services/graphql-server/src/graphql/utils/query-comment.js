module.exports = (info, apolloClient) => {
  const { parentType, fieldName, operation } = info;

  const data = {
    apolloClient,
    parentType: parentType.name,
    fieldName,
    operation: {
      type: operation.operation,
      name: operation.name ? operation.name.value : null,
      selections: operation.selectionSet.selections.map(s => s.name.value),
    },
  };

  return `GraphQL Info: ${JSON.stringify(data)}`;
};
