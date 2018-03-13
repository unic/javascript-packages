import PubSub from './index';

test('PubSub exposes getInstance method', () => {
  expect(['getInstance']).toEqual(Object.keys(PubSub));
  expect(typeof PubSub.getInstance).toBe('function');
});

test('PubSub.getInstance() always points to the same instance', () => {
  const instance = PubSub.getInstance();
  expect(instance).toBe(PubSub.getInstance());
});

test('PubSub.getInstance() exposes an object', () => {
  const instance = PubSub.getInstance();
  expect(typeof instance).toBe('object');
});

test('The right methods are exposed', () => {
  expect(['on', 'off', 'trigger']).toEqual(
    expect.arrayContaining(Object.keys(PubSub.getInstance())),
  );
});
