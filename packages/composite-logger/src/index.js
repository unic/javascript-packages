/* eslint-disable no-console */
/**
 * Composite - Logger
 *
 * @author Christian Sany
 * @copyright Unic AG
 *
 * @description
 * This composite returns an object with the log-method.
 * The log-method can be used, to log prefixed messages to the console.
 * INFO: logging only happens when window.localStorage.debug == true
 *
 * @example
 * import logger from '@unic/composite-logger';
 *
 * // Factory
 * export default () => {
 *  const instance = Object.assign({}, logger('MyModule'));
 *  instance.log('Hello', 'World'); // Logs 'MyModule → Hello World' to the console (only when debug mode is activated)
 * }
 *
 * @param {String} [prefix] - Prefix of logged content
 * @return {Object} - Expose logger-functionality
 */
export default prefix => ({
  /**
   * Log params to the console when debugging is activated
   * @param {Array} data - All given params as Array
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
