/* eslint-disable camelcase */
const numeral = require('numeral');
const octokit = require('./octokit');
const codename = require('./codename');

const s = v => (v > 1 ? 's' : '');

module.exports = async ({
  owner,
  repo,
  base,
  head,
}) => {
  if (!base || !head) throw new Error('You must provide a base and a head commit.');

  const { data } = await octokit.repos.compareCommits({
    owner,
    repo,
    base,
    head,
  });

  if (data.total_commits > data.commits.length) {
    throw new Error('Commit range is too long (implement the Commit List API).');
  }

  const pattern = /^merge pull request #([0-9]+) /i;
  const pulls = await Promise.all(data.commits
    .filter(({ commit }) => pattern.test(commit.message))
    .map(({ commit }) => {
      const pr = pattern.exec(commit.message)[1];
      return octokit.pulls.get({
        owner,
        repo,
        pull_number: pr,
      }).then(({ data: pull }) => pull);
    }));

  const totals = pulls.reduce((o, p) => ({
    num: o.num + 1,
    commits: o.commits + p.commits,
    additions: o.additions + p.additions,
    deletions: o.deletions + p.deletions,
    changed_files: o.changed_files + p.changed_files,
  }), {
    num: 0,
    commits: 0,
    additions: 0,
    deletions: 0,
    changed_files: 0,
  });

  const notes = pulls.map((pull) => {
    const {
      number,
      title,
      user,
    } = pull;
    return `- #${number} ${title} @${user.login}`;
  });

  process.stdout.write('\n\n');
  process.stdout.write(codename());
  process.stdout.write('\n\n');
  process.stdout.write([
    numeral(totals.num).format('0,0'),
    `PR${s(totals.num)} totaling`,
    numeral(totals.commits).format('0,0'),
    `commit${s(totals.commits)} in`,
    numeral(totals.changed_files).format('0,0'),
    `file${s(totals.changed_files)}`,
    `[+${numeral(totals.additions).format('0,0')} / -${numeral(totals.deletions).format('0,0')}]`,
  ].join(' '));
  process.stdout.write('\n\n');
  process.stdout.write(notes.join('\n'));
  process.stdout.write('\n\n');
  process.exit(0);
};
