/* eslint-disable require-jsdoc */
// This is for overwriting the import
import * as throttle from 'raf-throttle';
import createBreakpointManager from './index';

// TODO: enable testing for em values
let BreakpointManager;
const defaultBreakpoints = {
  xs: 0,
  sm: 768,
  md: 992,
  lg: 1200,
};

beforeAll(() => {
  throttle.default = fn => () => fn();
});

beforeEach(() => {
  window.innerWidth = 1024;
  BreakpointManager = createBreakpointManager(
    defaultBreakpoints,
    'px',
    undefined,
    undefined,
  );
});

const resize = width => {
  window.innerWidth = width;
  window.dispatchEvent(new Event('resize'));
};

test('createBreakpointManager is a function', () => {
  expect(typeof createBreakpointManager).toBe('function');
});

describe('defaults', () => {
  test('state', () => {
    expect(BreakpointManager.getState()).toEqual({
      width: 1024,
      breakpoint: { name: 'md', minWidth: 992 },
    });
  });

  test('adapted window size', () => {
    resize(400);
    expect(BreakpointManager.getState()).toEqual({
      width: 400,
      breakpoint: { name: 'xs', minWidth: 0 },
    });
  });
});

describe('observer functionality', () => {
  test('on fires when it should', () =>
    new Promise(resolve => {
      BreakpointManager.on('change', state => {
        expect(state).toEqual({
          width: 400,
          breakpoint: { name: 'xs', minWidth: 0 },
        });
        resolve();
      });
      resize(400);
    }));
  // console.log(BreakpointManager.getState());
  // resize(100);
  // console.log(BreakpointManager.getState());

  test('off', () => {
    // console.log(BreakpointManager.getState());
    // resize(100);
    // console.log(BreakpointManager.getState());
  });
});

describe('methods', () => {});
