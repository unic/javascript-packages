import PubSub from './index';

test('PubSub is an object', () => {
  expect(typeof PubSub).toBe('object');
});

test('The right methods are exposed', () => {
  expect(['on', 'off', 'trigger']).toEqual(expect.arrayContaining(Object.keys(PubSub)));
});
