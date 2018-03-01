# composite-logger

Lightweight logger composite to help you debug your modules and disable when you go to production

## Installation

```shell
$ npm install @unic/composite-logger
```

## Importing

```javascript
// ES6 Module
import logger from '@unic/composite-logger';

// CommomJS
const logger = require('@unic/composite-logger').default;
```

## Usage

**Creation**
```js
// Creation of object
const obj = logger('MyPrefix'); // Exposes .log() method

// Logging stuff
window.localStorage.debug = true; // If this is falsy, nothing will be logged to the console
obj.log('Hello', 'World'); // Outputs 'MyPrefix → Hello World' to the console
```

## API

* [logger([prefix])](#logger)
  * [log([params...])](#log)

<a name="logger"></a>

### logger([prefix])

Create an object with a log method.

**Returns**: <code>Object</code> - Returns an object with exposed .log() method

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [prefix] | <code>String</code> |  | If given, provides a prefix for the logged content from the log method |

**Example**
```js
// Basic form
const obj = logger('MyModule');

// No prefix
const obj = logger();

// Composition
const obj = Object.assign({}, object1, object2, logger('MyModule'));
```

<a name="log"></a>

### log([params...])

Log function params to console (including given prefix from creation).

**Info**: window.localStorage.debug must be truthy to see output in the console

**Returns**: <code>undefined</code>

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [params...] | <code>Any</code> | Pass any number of arguments you want to log to the console |

**Example**
```js
// Creation
const obj = logger('MyModule');

window.localStorage.debug = true; // Enable logging to the console

obj.log('Hello', 'World', '!'); // Outputs 'MyModule → Hello World !' to the console
obj.log(1, 2, 3, 4); // Outputs 'MyModule → 1 2 3 4' to the console
```

## Helpful Information

A composite is a function or an object which can be used as is or to merged with another object. These composites are normally used in the factory/composition pattern.

Helpful Ressources:
* https://www.youtube.com/watch?v=ImwrezYhw4w
* https://www.youtube.com/watch?v=wfMtDGfHWpA

## License

Apache-2.0
