const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/**
 * Check wether date is valid or not
 *
 * @param {Date} date - date which needs to be check
 */
export function isDateValid(date) {
  // eslint-disable-next-line no-self-compare
  if (date instanceof Date && date.getTime() === date.getTime()) {
    return true;
  }
  return false;
}

/**
 * Convert string to date object one only in cal date will not show blank if yo use this
 * @param {string} date :  ISO 8601 or RFC 2822 formatted string
 *
 * @return {Date} date object
 */
export function stringToDate(date) {
  return new Date(Date.parse(date));
}

/**
 * Use this method to show date in application
 *
 * @param {Date} date         - ISO 8601 or RFC 2822 format
 *
 * @return {string} formatted  date in format "DD MMM YYYY"
 */
export function getFormattedDate(date) {
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * Use this method to save date in API
 *
 * @param {Date} date         - ISO 8601 or RFC 2822 format
 *
 * @return {string} formatted  date in format "YYYY-MM-DD HH:mm:ss"
 */
export function getFormattedDateForApi(date) {
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
