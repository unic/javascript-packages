/* eslint-disable no-console */
/**
 * @module @unic/logger
 */

/**
 * @function createLogger
 *
 * @description
 * This composite returns an object with the log-method.
 * The log-method can be used, to log prefixed messages to the console.
 * INFO: logging only happens when `window.localStorage.debug == true`
 *
 * @example
 * import createLogger from '@unic/logger';
 *
 * // Basic form
 * const obj = createLogger('MyModule');
 *
 * // No prefix
 * const obj = createLogger();
 *
 * // Composition
 * const obj = Object.assign({}, object1, object2, createLogger('MyModule'));
 *
 * @param {String} [prefix] Prefix of logged content
 * @return {module:@unic/logger~Logger} Logger
 */
export default function createLogger(prefix) {
  /**
   * @see Use {@link module:@unic/logger|createLogger()} for object creation.
   * @type {Object}
   */
  const Logger = {
    /**
     * Log params to the console when `window.localStorage.debug == true`
     *
     * @instance
     * @example
     * // Creation
     * const obj = createLogger('MyModule');
     *
     * window.localStorage.debug = true; // Enable logging to the console
     *
     * obj.log('Hello', 'World', '!'); // Outputs 'MyModule → Hello World !' to the console
     * obj.log(1, 2, 3, 4); // Outputs 'MyModule → 1 2 3 4' to the console
     *
     * @param {...*} data All params you want to log
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
  };

  return Logger;
}
