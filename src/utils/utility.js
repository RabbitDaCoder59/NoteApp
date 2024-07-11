// utils/formatDate.js
export const formatDate = (date) => {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("en-NG", options);
};

export const trimContent = (content, maxLength) => {
  if (content.length > maxLength) {
    return content.substring(0, maxLength) + "...";
  }
  return content;
};

{
  /*
  
Yes, there are more options you can use with toLocaleDateString to customize how dates are formatted. Here are the various options available:

Full List of Options
weekday: Specifies how the day of the week should be displayed.

"narrow": Shortest form (e.g., "M" for Monday).
"short": Abbreviated form (e.g., "Mon").
"long": Full form (e.g., "Monday").
era: Specifies how the era should be displayed.

"narrow": Shortest form (e.g., "AD").
"short": Abbreviated form (e.g., "A.D.").
"long": Full form (e.g., "Anno Domini").
year: Specifies how the year should be displayed.

"numeric": Full numeric form (e.g., 2024).
"2-digit": Last two digits of the year (e.g., 24).
month: Specifies how the month should be displayed.

"numeric": Numeric form (e.g., 6).
"2-digit": Two-digit numeric form (e.g., 06).
"narrow": Shortest form (e.g., "J" for June).
"short": Abbreviated form (e.g., "Jun").
"long": Full form (e.g., "June").
day: Specifies how the day should be displayed.

"numeric": Numeric form (e.g., 7).
"2-digit": Two-digit numeric form (e.g., 07).
hour: Specifies how the hour should be displayed.

"numeric": Numeric form (e.g., 1, 12).
"2-digit": Two-digit numeric form (e.g., 01, 12).
minute: Specifies how the minutes should be displayed.

"numeric": Numeric form (e.g., 5, 59).
"2-digit": Two-digit numeric form (e.g., 05, 59).
second: Specifies how the seconds should be displayed.

"numeric": Numeric form (e.g., 9, 59).
"2-digit": Two-digit numeric form (e.g., 09, 59).
timeZoneName: Specifies how the time zone name should be displayed.

"short": Abbreviated form (e.g., "GMT").
"long": Full form (e.g., "Greenwich Mean Time").
hour12: Boolean value indicating whether to use 12-hour time (true) or 24-hour time (false).

timeZone: Specifies the time zone to use for formatting. This option allows you to display the time in a specific time zone.
 */
}
