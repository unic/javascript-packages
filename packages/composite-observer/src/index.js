/**
 * Composite - Observer
 *
 * @author Christian Sany
 * @copyright Unic AG
 *
 * @description
 * This module implements an observer pattern.
 * It can be used to extend the functionality of a module.
 *
 * @example
 * import observer from '@unic/composite-observer';
 *
 * // Factory
 * export default () => {
 *  const instance = Object.assign({}, observer());
 *  ...
 *  ...
 * }
 *
 * @return {Object} - Expose observer-functionality
 */
export default () => {
  let uid = -1;
  const events = {};

  /**
   * Subscribes to an Event.
   *
   * @param {String} event - Name of the event.
   * @param {Function} listener - Callback function.
   * @param {Boolean} [once] - If true, removes a listener after first execution
   * @returns {Integer} Returns an id for this subscription.
   */
  const on = (event, listener, once = false) => {
    uid += 1;

    if (!events[event]) {
      events[event] = { queue: [] };
    }

    events[event].queue.push({
      uid,
      listener,
      once,
    });

    return uid;
  };

  /**
   * Unsubscribes from an event.
   * If an event name is passed, all listeners to this event will be removed.
   *
   * @param {String|Number} event - Can be id of subscription or event name.
   * @returns {String|Number} Returns the removed id or event name. -1 will be
   * returned if nothing was removed.
   */
  const off = event => {
    if (typeof event === 'number') {
      Object.entries(events).forEach(([key, val]) => {
        for (let i = 0; i < val.queue.length; i += 1) {
          if (val.queue[i].uid === event) {
            val.queue.splice(i, 1);

            if (!val.queue.length) {
              delete events[key];
            }

            return event;
          }
        }
        return true;
      });
    }

    if (typeof event === 'string') {
      delete events[event];
      return event;
    }

    return -1;
  };

  /**
   * Triggers all listeners of event.
   *
   * @param {String} event - Name of Event
   * @param {Array} ...data - All additional params land in here and are passed to the listeners
   * @return {undefined}
   */
  const trigger = (event, ...data) => {
    if (!events[event] || !events[event].queue.length) {
      return;
    }

    // Create copy, in case the queue gets mutated inside a callback
    const eventQueue = events[event].queue.slice(0);

    // Carefull... #triggerwarning ;)
    eventQueue.forEach(item => {
      item.listener(...data);
      if (item.once) {
        off(item.uid);
      }
    });
  };

  return {
    on,
    off,
    trigger,
  };
};
