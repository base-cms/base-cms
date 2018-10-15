export async function build(task) {
  await task.parallel(['pages', 'utils']);
}

export async function pages(task) {
  await task.source('site/pages/*.jsx').babel().target('dist/pages');
}

export async function utils(task) {
  await task.source('site/utils/*.js').babel().target('dist/utils');
}

export default async function (task) {
  await task.start('build');
}
