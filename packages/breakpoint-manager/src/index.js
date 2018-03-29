/**
 * BreakpointManager
 *
 * @author Christian Sany
 * @copyright Unic AG
 */

import createObserver from '@unic/composite-observer';
import createLogger from '@unic/composite-logger';
import throttle from 'raf-throttle';

const NAME = 'BreakpointManager';

const defaultBreakpoints = {
  xs: 0,
  sm: 768,
  md: 992,
  lg: 1200,
};

/**
 * BreakpointManager Factory
 * @param {Object} breakpoints - Breakpoints
 * @param {Object} unit - Unit (either 'px' or 'em')
 * @param {Object} logger - Dependency - instance of @unic/composite-logger
 * @param {Object} observer - Dependency - instance of @unic/composite-logger
 * @return {Object} BreakpointManager
 */
export default (
  breakpoints = defaultBreakpoints,
  unit = 'px',
  logger = createLogger(NAME),
  observer = createObserver(),
) => {
  const instance = {
    /**
     * Getter - Name
     * @return {String} name
     */
    get name() {
      return NAME;
    },
  };

  breakpoints = Object.entries(breakpoints) // eslint-disable-line
    .map(([key, val]) => ({ name: key, minWidth: val }))
    .sort((a, b) => a.minWidth - b.minWidth);

  const state = {
    width: 0,
    breakpoint: breakpoints[0].name,
  };

  // **Composition**

  Object.assign(instance, observer);

  // **Private functions**

  /**
   * Get the window with depending on the unit
   * @private
   * @return {Integer/Float} width
   */
  const getWindowWidth = () => {
    switch (unit) {
      case 'px':
        return window.innerWidth;
      case 'em':
        return (
          window.innerWidth / parseFloat(window.getComputedStyle(document.body).fontSize)
        );
      default:
        throw new Error('Please provide either px or em as unit');
    }
  };

  /**
   * Set the new state
   * @private
   * @return {undefined}
   */
  const setState = () => {
    const oldState = Object.assign({}, state); // Cache old state

    const width = getWindowWidth(); // window.innerWidth;
    const matchingBreakpoints = breakpoints.filter(bp => width >= bp.minWidth);

    // Assign new state values
    state.width = width;
    state.breakpoint = matchingBreakpoints[matchingBreakpoints.length - 1]; // Last matching entry

    // Check silent option and if brakpoint changed
    if (state.breakpoint.name !== oldState.breakpoint.name) {
      logger.log('breakpoint changed', state.breakpoint.name, width + unit);
      instance.trigger('change', state, oldState); // Trigger change event
    }
  };

  /**
   * Throttled resize handler
   */
  const resizeHandler = throttle(() => {
    setState();
    instance.trigger('resize', state); // Trigger resize event
  });

  /**
   * Event listeners initialisation
   * @return {undefined}
   */
  const initEventListeners = () => {
    window.addEventListener('resize', resizeHandler);
  };

  /**
   * Event listeners removal
   * @return {undefined}
   */
  const removeEventListeners = () => {
    window.removeEventListener('resize', resizeHandler);
  };

  // **Public functions**

  /**
   * Return state object that is decoupled from internal state
   * @return {Object} state
   */
  instance.getState = () => Object.assign({}, state);

  /**
   * Match the current breakpoint with given breakpoint or array of breakpoints
   * TODO: Add second parameter to enable up/down thingie
   * @param {String|Array} match - The desired match/matches that should be checked for
   * @return {Boolean} - Returns true if current breakpoint is maching any given breakpoint
   */
  instance.matches = match => {
    if (!match) {
      throw new Error('match() expected one parameter.');
    }

    if (typeof match === 'string') {
      return match === state.breakpoint.name;
    } else if (Array.isArray(match)) {
      return match.includes(state.breakpoint.name);
    }

    throw new Error(
      'Sorry man, it seems your given value is neither of type string nor is it an array.',
    );
  };

  /**
   * Unbind events, remove data, custom teardown
   * @return {undefined}
   */
  instance.destroy = () => {
    removeEventListeners();
    instance.trigger('destroy'); // Notify all listeners this instance is beeing destroyed
  };

  // **Initiation logic**

  initEventListeners();

  // Set initial state
  setState();

  return instance; // Expose instance
};
