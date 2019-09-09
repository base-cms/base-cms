module.exports = ({ provider, label }) => {
  let formatted = provider ? `${provider}`.toLowerCase() : '';
  if (formatted === 'other' && label) formatted = `${label}`.toLowerCase();
  return formatted;
};
