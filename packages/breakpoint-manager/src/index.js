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

const allowedUnits = ['px', 'em'];

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

  // **Params validation**

  if (typeof breakpoints !== 'object') {
    throw new Error('breakpoints must be an object');
  } else if (
    !Object.values(breakpoints).every(
      n => (Number(n) === n && n % 1 === 0) || (Number(n) === n && n % 1 !== 0),
    )
  ) {
    throw new Error('The values of your breakpoints must be Numbers');
  }

  if (allowedUnits.indexOf(unit) < 0) {
    throw new Error(`The unit ${unit} is not allowed (use 'px' or 'em')`);
  }

  // **Params preparation & initial state**

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
   * @param {Boolean} silent - When true, events and logs won't be executed
   * @return {undefined}
   */
  const setState = (silent = false) => {
    const oldState = Object.assign({}, state); // Cache old state

    const width = getWindowWidth(); // window.innerWidth;
    const matchingBreakpoints = breakpoints.filter(bp => width >= bp.minWidth);

    // Assign new state values
    state.width = width;
    state.breakpoint = matchingBreakpoints[matchingBreakpoints.length - 1]; // Last matching entry

    if (!silent) {
      instance.trigger('resize', state, oldState); // Trigger resize event

      // Check silent option and if brakpoint changed
      if (state.breakpoint.name !== oldState.breakpoint.name) {
        logger.log(
          `Breakpoint changed to '${state.breakpoint.name}' from '${
            oldState.breakpoint.name
          }'`,
        );
        instance.trigger('change', state.breakpoint, oldState.breakpoint); // Trigger change event
      }
    }
  };

  /**
   * Throttled resize handler
   * @private
   * @return {undefined}
   */
  const resizeHandler = throttle(() => {
    setState();
  });

  /**
   * Event listeners initialisation
   * @private
   * @return {undefined}
   */
  const initEventListeners = () => {
    window.addEventListener('resize', resizeHandler);
  };

  /**
   * Event listeners removal
   * @private
   * @return {undefined}
   */
  const removeEventListeners = () => {
    window.removeEventListener('resize', resizeHandler);
  };

  /**
   * Get a breakpoint by name
   * @private
   * @param {String} name - Name of the Breakpoint to get
   * @return {Object|undefined} Breakpoint
   */
  const getBreakpointByName = name => breakpoints.find(b => b.name === name);

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
   * @param {String} modifier - Modifier describing if it should match up or down
   * @return {Boolean} - Returns true if current breakpoint is maching any given breakpoint
   */
  instance.matches = (match, modifier) => {
    if (!match) {
      throw new Error('match() expected one parameter.');
    }
    if (
      modifier &&
      (typeof modifier !== 'string' || (modifier !== 'up' && modifier !== 'down'))
    ) {
      throw new Error("modifier must be either 'up' or 'down'");
    }

    if (modifier && typeof match === 'string') {
      const bp = getBreakpointByName(match);
      return breakpoints
        .filter(breakpoint => {
          if (modifier === 'up') return breakpoint.minWidth >= bp.minWidth;
          return breakpoint.minWidth <= bp.minWidth;
        })
        .map(breakpoint => breakpoint.name)
        .includes(state.breakpoint.name);
    } else if (typeof match === 'string') {
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
  setState(true);

  return instance; // Expose instance
};
