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

export default observer();
