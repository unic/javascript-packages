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
 * PubSub.getInstance().on('someEvent', () => {
 *   console.log('someEvent was triggered')
 * })
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
