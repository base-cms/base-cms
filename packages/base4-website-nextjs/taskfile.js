export async function build(task) {
  await task.parallel(['site']);
}

export async function site(task) {
  await task.source('site/**/*.jsx').babel({
    presets: ['next/babel'],
  }).target('dist/site');
}

export default async function (task) {
  await task.start('build');
}
