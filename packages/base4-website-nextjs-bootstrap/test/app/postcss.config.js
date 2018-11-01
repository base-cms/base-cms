module.exports = (ctx) => {
  console.log(ctx);
  const plugins = {
    precss: {},
    autoprefixer: {
      ...ctx.options.autoprefixer,
      cascade: false,
    },
  };

  return { plugins };
};
