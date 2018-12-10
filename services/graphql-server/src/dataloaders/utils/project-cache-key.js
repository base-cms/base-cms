module.exports = ([id, fields]) => `${id}:${fields ? fields.join('|') : '*'}`;
