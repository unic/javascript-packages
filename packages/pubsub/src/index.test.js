import PubSub from './index';

test('getInstance() always points to the same instance', () => {
  const instance = PubSub.getInstance();
  expect(instance).toBe(PubSub.getInstance());
});
