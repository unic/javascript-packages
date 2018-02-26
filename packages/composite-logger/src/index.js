/**
 * Composite - Logger
 *
 * @author Christian Sany
 * @copyright Unic AG
 */

/* eslint-disable no-console */

export default prefix => ({
  /**
   * Log params to the console when debugging is activated
   * @param {*} data - All given params as Array
   * @return {undefined}
   */
  log(...data) {
    if (window.localStorage && window.localStorage.debug) {
      if (typeof prefix === 'string' && prefix.length > 0) {
        console.log(`${prefix} →`, ...data);
      } else {
        console.log(...data);
      }
    }
  },
});
