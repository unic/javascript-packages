# BreakpointManager

Lightweight Breakpoint Manager who notifies you when the breakpoint switches or you can check for the current breakpoint.

## Installation

```shell
$ npm install @unic/breakpoint-manager
```

## Importing

```javascript
// ES6 Module
import createBreakpointManager from '@unic/breakpoint-manager';

// CommomJS
const createBreakpointManager = require('@unic/breakpoint-manager').default;
```

## Usage/Quickstart

```js
import createBreakpointManager from '@unic/breakpoint-manager';

// Creating a new BreakpointManager
const BreakpointManager = createBreakpointManager({
    xs: 0,
    sm: 768,
    md: 992,
    lg: 1200,
  },
  'px'
);

// Subscribe to a breakpoint change
const subscriptionId = BreakpointManager.on('change', function (breakpoint, oldBreakpoint) {
  console.log(breakpoint, oldBreakpoint);

  // Read the current state of your BreakpointManager
  const currentState = BreakpointManager.getState();
  console.log(currentState);

  // Check if the breakpoint is currently value x
  if(BreakpointManager.matches('xs')) {
    console.log('Window width is currently between 0px and 767px');
  }

  // Check if the breakpoint is currently value x or y...
  if(BreakpointManager.matches(['xs', 'md', 'lg'])) {
    console.log('Window is currently on xs/md or lg');
  }

  // Check if matches is false can also result in what you need
  if(!BreakpointManager.matches('sm')) {
    console.log("Same result as when given ['xs', 'md', 'lg'] and checkig if it was true");
  }
});

// Unsubscribe at any given point
BreakpointManager.off(subscriptionId);
```

## API

BreakpointManager has own functionality and functionality provided by its dependencies.

**Factory**
[createBreakpointManager([breakpoints[, unit]])](#factory)

**Methods**
* [getState()](#getstate)
* [matches(test)](#matches)
* [on(event, callback)](#on)
* [off(identifier)](#off)

**Observer**  
Documentation of these methods are extern
* [on()](https://github.com/unic/composite-observer#on)
* [off()](https://github.com/unic/composite-observer#off)

<a name="factory"></a>

### createBreakpointManager([breakpoints[, unit]])

Create a new instance of a BreakpointManager

**Returns**: <code>Object</code> - BreakpointManager

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| breakpoints | <code>Object</code> | <code>{ xs: 0, sm: 768, md: 992, lg: 1200 }</code> | Custom Brekapoints |
| unit | <code>String</code> | <code>'px'</code> | Unit for calculation (`'px'` or `'em'`) |

**Example**
```js
// With default props
const BreakpointManager = createBreakpointManager();

// With custom breakpoints
const BreakpointManager = createBreakpointManager({
    xs: 0,
    sm: 768,
    md: 992,
    lg: 1200,
  },
  'px'
);

// With custom breakpoints in em
const BreakpointManager = createBreakpointManager({
    xs: 0,
    sm: 48,
    md: 62,
    lg: 75,
  },
  'em'
);
```

<a name="getstate"></a>

### getState()

Get the current state of your BreakpointManager.

**Returns**: <code>Object</code> - Returns current state of your BreakpointManager

| Key | Type | Description |
| --- | --- | --- |
| width | <code>Integer/Float</code> | Current Window width |
| breakpoint | <code>Object</code> | Current active breakpoint |

**Example**
```js
const state = BreakpointManager.getState();

console.log(BreakpointManager.getState());

/*
Could return:
{
  width: 823,
  breakpoint: {
    name: 'sm',
    minWidth: 768
  }
}
*/
```

<a name="matches"></a>

### matches(test)

Check on which breakpoint you currently are.

**Returns**: <code>Boolean</code> - Ture if matching, false if not matching

| Param | Type | Description |
| --- | --- | --- |
| test | <code>String/Array</code> | Custom options |

**Example**
```js
if(BreakpointManager.matches('xs')) {
  console.log('Yes! current Breakpoint is xs');
}

if(BreakpointManager.matches(['xs', 'md', 'lg'])) {
  console.log('Current breakpoint is currently xs, md or lg');
}

if(!BreakpointManager.matches('sm')) {
  console.log('Current breakpoint is definitely not sm');
}
```

## Best practises

Having to write your Breakpoints directly into your JS can be a real hazard to maintain, so I'd advise you to write your breakpoint configuration in a JSON file and load this json file into your JS and into your CSS preprocessor. With this you have a single source of truth for your breakpoints and it's very managable.

**Good plugins to achieve this**
* https://webpack.js.org/loaders/json-loader/ for laoding JSON into JS
* https://github.com/acdlite/json-sass for loading JSON into SASS/SCSS

## Information and Ressouces about factories

Every function that returns an object is a factory-function.  
Factories can be used very successfully in factory/composition pattern.

Helpful Ressources:
* https://www.youtube.com/watch?v=ImwrezYhw4w
* https://www.youtube.com/watch?v=wfMtDGfHWpA

## License

Apache-2.0
