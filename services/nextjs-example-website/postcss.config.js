module.exports = (ctx) => {
  const plugins = {
    precss: {},
    autoprefixer: {
      ...ctx.options.autoprefixer,
      cascade: false,
    },
  };

  return { plugins };
};
