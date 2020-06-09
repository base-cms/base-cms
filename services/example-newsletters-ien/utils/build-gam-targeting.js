module.exports = ({ newsletter, date, dateInfo }) => ({
  dayofweek: date.format('ddd'),
  nl_date: date.format('YYYY-MM-DD'),
  weeknum: dateInfo.weeknum,
  month: dateInfo.month,
  day: dateInfo.day,
  year: dateInfo.year,
  nl_name: newsletter.name,
  nl_id: newsletter.id,
});
