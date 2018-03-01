/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import test from 'ava';
import sinon from 'sinon';
import localStorage from 'mock-local-storage';
import logger from './index';

global.window = {};
global.localStorage = localStorage;
window.localStorage = global.localStorage;

window.localStorage.debug = true;

test.beforeEach(t => {
  t.context.log = console.log; // eslint-disable-line
  console.log = sinon.spy();
});

test.afterEach(t => {
  console.log = t.context.log;
});

test.serial('logger is executed without failing', t => {
  t.notThrows(logger);
});

test.serial('logs the correct prefix', t => {
  window.localStorage.debug = true;
  const obj = Object.assign({}, logger('Prefix'));
  obj.log();
  t.true(console.log.calledWith('Prefix →'));
});

test.serial('logs additional parameters', t => {
  window.localStorage.debug = true;
  const obj = Object.assign({}, logger('Prefix'));
  obj.log('Firstval', 'Secondval');
  t.true(console.log.calledWith('Prefix →', 'Firstval', 'Secondval'));
});

test.serial('works without a prefix present', t => {
  window.localStorage.debug = true;
  const obj = Object.assign({}, logger());
  obj.log('Firstval', 'Secondval');
  t.true(console.log.calledWith('Firstval', 'Secondval'));
});

test.serial('Works with additional params', t => {
  delete window.localStorage.debug;
  const obj = Object.assign({}, logger('Prefix'));
  obj.log('Firstval', 'Secondval');
  t.false(console.log.called, 'console.log was still called');
});
