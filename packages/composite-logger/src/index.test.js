/* eslint-disable no-console */
import logger from './index';

// Setting up our fake localStorage
global.window = {};
global.localStorage = {};
window.localStorage = global.localStorage;

beforeEach(() => {
  window.localStorage.debug = true;
  console.log = jest.fn();
});

test('logger is executed without failing', () => {
  expect(() => {
    logger();
  }).not.toThrow();
});

test('logs the correct prefix', () => {
  const obj = Object.assign({}, logger('Prefix'));
  obj.log();
  expect(console.log.mock.calls[0].length === 1).toBe(true);
  expect(console.log).toHaveBeenCalledWith('Prefix →');
});

test('logs additional parameters', () => {
  const obj = Object.assign({}, logger('Prefix'));
  obj.log('Firstval', 'Secondval');
  expect(console.log).toHaveBeenCalledWith('Prefix →', 'Firstval', 'Secondval');
});

test('works without a prefix present', () => {
  const obj = Object.assign({}, logger());
  obj.log('Firstval', 'Secondval');
  expect(console.log).toHaveBeenCalledWith('Firstval', 'Secondval');
});

test("doesn't log to consolge when debug is false", () => {
  delete window.localStorage.debug;
  const obj = Object.assign({}, logger('Prefix'));
  obj.log('Firstval', 'Secondval');
  expect(console.log.mock.calls.length > 0).toBe(false);
});
