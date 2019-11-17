module.exports = ({ pos, inc } = {}) => {
  if (!pos) return pos;
  const pattern = /^(.+?)(_(\d{1,})_)(.+?)$/;

  const matches = pattern.exec(pos);
  if (!matches || !matches[3]) return pos;
  const n = inc + parseInt(matches[3], 10);
  return pos.replace(pattern, `$1_${n}_$4`);
};
