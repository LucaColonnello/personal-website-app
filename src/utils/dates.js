function normaliseDate(utcDate) {
 const date = new Date(utcDate);

 date.setHours(0);
 date.setMinutes(0);
 date.setSeconds(0);

 return date;
}

function printDateWithoutHours(utcDate) {
  // UTC is 'ddd, dd MMM yyyy HH:mm:ss GMT'
  const year = utcDate.getFullYear();

  return (
    utcDate
    .toUTCString()
    .replace(
      new RegExp(`${year}.+`),
      year
    )
  );
 }

export {
  normaliseDate,
  printDateWithoutHours,
};
