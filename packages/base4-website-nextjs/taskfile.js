export async function build(task) {
  await task.parallel(['pages', 'utils', 'components', 'hoc']);
}

export async function pages(task) {
  await task.source('site/pages/*.jsx').babel().target('dist/pages');
}

export async function gql(task) {
  await task.source('site/gql/**/*.graphql').target('dist/gql');
}

export async function components(task) {
  await task.source('site/components/*.jsx').babel().target('dist/components');
}

export async function hoc(task) {
  await task.source('site/hoc/*.jsx').babel().target('dist/hoc');
}

export async function utils(task) {
  await task.source('site/utils/*.js').babel().target('dist/utils');
}

export default async function (task) {
  await task.start('gql');
  await task.start('build');
}
