module.exports = ([id, fields, query]) => `${id}:${JSON.stringify(query)}:${fields ? fields.join('|') : '*'}`;
