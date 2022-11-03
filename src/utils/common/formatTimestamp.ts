import moment from 'moment'

/**
 * Formats a timestamp to a human readable date.
 *
 * @param {number} timestamp - UNIX timestamp in milliseconds
 * @returns {string} - a formatted date on the form "DD.MM.YYYY"
 **/
const timestampToDDMMYYYY = (timestamp: number): string =>
  moment.unix(timestamp).format('DD.MM.YYYY')

export default timestampToDDMMYYYY
