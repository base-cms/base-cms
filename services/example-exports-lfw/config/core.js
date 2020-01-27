module.exports = {
  types: {
    xml: {
      headers: {
        'Content-Type': 'application/xml',
      },
      formatter: v => v.join('\n'),
    },
  },
};
