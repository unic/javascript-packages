/**
 * PubSub
 *
 * @author Christian Sany
 * @copyright Unic AG
 *
 * @example
 * import PubSub from '@unic/pubsub';
 *
 * // Subscribe
 * PubSub.getInstance().on('someEvent', (passedVal) => {
 *   console.log('someEvent was triggered'); // -> 'someEvent was triggered'
 *   console.log(passedVal); // -> 'someval'
 * })
 *
 * // Trigger
 * PubSub.getInstance().trigger('someEvent', 'someval')
 *
 * @return {Object} - Expose getInstance
 */

import observer from '@unic/composite-observer';

let instance;

export default {
  /**
   * Get Singleton instance
   * If instance doesn't exist yet, it'll be created and then returned
   * @return {Object} instance
   */
  getInstance() {
    if (!instance) {
      instance = observer();
    }
    return instance;
  },
};
