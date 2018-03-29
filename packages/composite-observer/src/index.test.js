import observer from './index';

test('The right methods are exposed', () => {
  expect(['on', 'off', 'trigger']).toEqual(
    expect.arrayContaining(Object.keys(observer())),
  );
});
