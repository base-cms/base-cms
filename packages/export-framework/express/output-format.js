module.exports = (output, format) => {
  if (format === 'indtt') return output.join('\n');
  if (format === 'csv') return output.map(line => `"${line.join('", "')}"`).join('\n');
  return output;
};
