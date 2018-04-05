/* eslint-disable require-jsdoc */
import * as throttle from 'raf-throttle'; // This is for overwriting the import
import createBreakpointManager from './index';

let BreakpointManager;
const defaultBreakpoints = {
  xs: 0,
  sm: 768,
  md: 992,
  lg: 1200,
};

// Overwrite throttle import in module
throttle.default = fn => () => fn();

// Mock window.getComputedStyle
window.getComputedStyle = () => ({
  fontSize: '16px',
});

const resize = width => {
  window.innerWidth = width;
  window.dispatchEvent(new Event('resize'));
};

describe('factory...', () => {
  test('...is a function', () => {
    expect(typeof createBreakpointManager).toBe('function');
  });

  test("...doesn't throw without params", () => {
    expect(createBreakpointManager).not.toThrow();
  });

  test("...doesn't throw with correct params", () => {
    expect(() => {
      createBreakpointManager(defaultBreakpoints);
    }).not.toThrow();

    // Accepts floats
    expect(() => {
      createBreakpointManager({
        foo: 1.3,
      });
    }).not.toThrow();

    // Accept unit param
    expect(() => {
      createBreakpointManager(defaultBreakpoints, 'em');
    }).not.toThrow();
  });

  test('...throws with incorrect params', () => {
    expect(() => {
      createBreakpointManager('yolo');
    }).toThrow();

    expect(() => {
      createBreakpointManager({
        foo: 'foo',
      });
    }).toThrow();

    expect(() => {
      createBreakpointManager(defaultBreakpoints, 'foo');
    }).toThrow();
  });
});

describe('methods', () => {
  beforeEach(() => {
    window.innerWidth = 1024;
    BreakpointManager = createBreakpointManager();
  });

  describe('getState...', () => {
    test("...doesn't throw", () => {
      expect(() => {
        BreakpointManager.getState();
      }).not.toThrow();
    });

    test('...returns correct initial state', () => {
      expect(BreakpointManager.getState()).toEqual({
        width: 1024,
        breakpoint: { name: 'md', minWidth: 992 },
      });
    });

    test('...returns correct state after resize', () => {
      resize(400);
      expect(BreakpointManager.getState()).toEqual({
        width: 400,
        breakpoint: { name: 'xs', minWidth: 0 },
      });
      resize(500);
      expect(BreakpointManager.getState()).toEqual({
        width: 500,
        breakpoint: { name: 'xs', minWidth: 0 },
      });
      resize(768);
      expect(BreakpointManager.getState()).toEqual({
        width: 768,
        breakpoint: { name: 'sm', minWidth: 768 },
      });
    });
  });

  describe('matches...', () => {
    test('...throws without params', () => {
      expect(() => {
        BreakpointManager.matches();
      }).toThrow();
    });

    test('...throws with incorrect params', () => {
      expect(() => {
        BreakpointManager.matches(1642);
      }).toThrow();
    });

    test('...returns false when incorrect breakpointname is given', () => {
      expect(BreakpointManager.matches('mds')).toBe(false);
    });

    test('...returns true when breakpoint matches', () => {
      expect(BreakpointManager.matches('md')).toBe(true);
    });

    test('...returns true when breakpoint matches a value in given array', () => {
      expect(BreakpointManager.matches(['xs', 'sm', 'md'])).toBe(true);
    });

    test("...returns false when given breakpoint doesn't match", () => {
      expect(BreakpointManager.matches('xs')).toBe(false);
    });

    test("...returns false when given breakpoint doesn't match", () => {
      expect(BreakpointManager.matches('xs')).toBe(false);
    });

    test('...still functions correctly after breakpoint changes', () => {
      expect(BreakpointManager.matches('md')).toBe(true);
      expect(BreakpointManager.matches(['xs', 'sm', 'md'])).toBe(true);
      resize(1200);
      expect(BreakpointManager.matches('md')).toBe(false);
      expect(BreakpointManager.matches(['xs', 'sm', 'md'])).toBe(false);
      resize(320);
      expect(BreakpointManager.matches('md')).toBe(false);
      expect(BreakpointManager.matches(['xs', 'sm', 'md'])).toBe(true);
    });

    describe('modifier... (up|down)', () => {
      test('...throws when given incorrect modifier', () => {
        expect(() => {
          BreakpointManager.matches('md', 123);
          BreakpointManager.matches('md', 'foo');
        }).toThrow();
      });

      test("...doesn't throws when given correct modifier", () => {
        expect(() => {
          BreakpointManager.matches('md', 'up');
          BreakpointManager.matches('md', 'down');
        }).not.toThrow();
      });

      test('...up is working correctly', () => {
        expect(BreakpointManager.matches('md', 'up')).toBe(true);
        expect(BreakpointManager.matches('xs', 'up')).toBe(true);
        expect(BreakpointManager.matches('lg', 'up')).toBe(false);
        resize(1200);
        expect(BreakpointManager.matches('md', 'up')).toBe(true);
        resize(400);
        expect(BreakpointManager.matches('xs', 'up')).toBe(true);
        expect(BreakpointManager.matches('sm', 'up')).toBe(false);
      });

      test('...down is working correctly', () => {
        expect(BreakpointManager.matches('md', 'down')).toBe(true);
        expect(BreakpointManager.matches('sm', 'down')).toBe(false);
        expect(BreakpointManager.matches('lg', 'down')).toBe(true);
        resize(1200);
        expect(BreakpointManager.matches('lg', 'down')).toBe(true);
        expect(BreakpointManager.matches('md', 'down')).toBe(false);
        resize(800);
        expect(BreakpointManager.matches('lg', 'down')).toBe(true);
        expect(BreakpointManager.matches('md', 'down')).toBe(true);
        expect(BreakpointManager.matches('xs', 'down')).toBe(false);
      });
    });
  });
});

describe('observer (dependency)', () => {
  beforeEach(() => {
    window.innerWidth = 1024;
    BreakpointManager = createBreakpointManager();
  });

  describe('change', () => {
    test("subscribe doesn't throw", () => {
      expect(() => {
        BreakpointManager.on('change', () => {});
      }).not.toThrow();
    });

    test('fires when it should...', () => {
      const mockfn = jest.fn();
      BreakpointManager.on('change', mockfn);
      resize(400);
      expect(mockfn.mock.calls.length).toBe(1);
      resize(800);
      expect(mockfn.mock.calls.length).toBe(2);
      resize(900);
      expect(mockfn.mock.calls.length).toBe(2);
      resize(1200);
      expect(mockfn.mock.calls.length).toBe(3);
      resize(1210);
      expect(mockfn.mock.calls.length).toBe(3);
    });

    test('...with correct parameters', () => {
      const mockfn = jest.fn();
      BreakpointManager.on('change', mockfn);
      resize(400);
      expect(mockfn.mock.calls[0][0]).toEqual({ name: 'xs', minWidth: 0 });
      expect(mockfn.mock.calls[0][1]).toEqual({ name: 'md', minWidth: 992 });
    });

    test("unsubscribe doesn't throw", () => {
      const identifier = BreakpointManager.on('change', () => {});
      expect(() => {
        BreakpointManager.off(identifier);
      }).not.toThrow();
    });

    test("doesn't fire anymore when unsubscribed", () => {
      const mockfn = jest.fn();
      const identifier = BreakpointManager.on('change', mockfn);
      resize(400);
      expect(mockfn.mock.calls.length).toBe(1);
      BreakpointManager.off(identifier);
      resize(800);
      expect(mockfn.mock.calls.length).toBe(1);
    });
  });

  describe('resize', () => {
    test("subscribe doesn't throw", () => {
      expect(() => {
        BreakpointManager.on('resize', () => {});
      }).not.toThrow();
    });

    test('fires when it should...', () => {
      const mockfn = jest.fn();
      BreakpointManager.on('resize', mockfn);
      resize(400);
      resize(500);
      resize(600);
      resize(700);
      expect(mockfn.mock.calls.length).toBe(4);
    });

    test('...with correct parameters', () => {
      const mockfn = jest.fn();
      BreakpointManager.on('resize', mockfn);
      resize(400);
      expect(mockfn.mock.calls[0][0]).toEqual({
        breakpoint: { name: 'xs', minWidth: 0 },
        width: 400,
      });
      expect(mockfn.mock.calls[0][1]).toEqual({
        breakpoint: { name: 'md', minWidth: 992 },
        width: 1024,
      });
    });

    test("unsubscribe doesn't throw", () => {
      const identifier = BreakpointManager.on('resize', () => {});
      expect(() => {
        BreakpointManager.off(identifier);
      }).not.toThrow();
    });

    test("doesn't fire anymore when unsubscribed", () => {
      const mockfn = jest.fn();
      const identifier = BreakpointManager.on('resize', mockfn);
      resize(400);
      expect(mockfn.mock.calls.length).toBe(1);
      BreakpointManager.off(identifier);
      resize(800);
      expect(mockfn.mock.calls.length).toBe(1);
    });
  });
});

describe('logger... (dependency)', () => {
  const logger = {};

  beforeEach(() => {
    window.innerWidth = 1024;
    logger.log = jest.fn();
    BreakpointManager = createBreakpointManager(defaultBreakpoints, 'px', logger);
  });

  test('...logs when breakpointchange happens...', () => {
    expect(logger.log.mock.calls.length).toBe(0);
    resize(400);
    expect(logger.log.mock.calls.length).toBe(1);
    resize(500);
    expect(logger.log.mock.calls.length).toBe(1);
  });

  test('...with correct params', () => {
    resize(400);
    expect(logger.log.mock.calls[0][0]).toBe("Breakpoint changed to 'xs' from 'md'");
    resize(1200);
    expect(logger.log.mock.calls[1][0]).toBe("Breakpoint changed to 'lg' from 'xs'");
  });
});
