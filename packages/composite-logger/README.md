# composite-logger

Lightweight logger composite to help you debug your modules and disable when you go to production

## Installation

```shell
$ npm install @unic/composite-logger
```

* * *

## Importing

```javascript
// ES6 Module
import createLogger from '@unic/composite-logger';

// CommomJS
const createLogger = require('@unic/composite-logger').default;
```

* * *

## Usage

**Creation**
```js
// Creation of object
const logger = createLogger('MyPrefix'); // Exposes .log() method

// Logging stuff
window.localStorage.debug = true; // If this is falsy, nothing will be logged to the console
logger.log('Hello', 'World'); // Outputs 'MyPrefix → Hello World' to the console
```

* * *

## API

<a name="module_@unic/logger"></a>

## @unic/logger

* [@unic/logger](#module_@unic/logger)
    * [~createLogger([prefix])](#module_@unic/logger..createLogger) ⇒ <code>module:@unic/logger~Logger</code>
        * [~Logger](#module_@unic/logger..createLogger..Logger) : <code>Object</code>
            * [.log(...data)](#module_@unic/logger..createLogger..Logger+log) ⇒ <code>undefined</code>


* * *

<a name="module_@unic/logger..createLogger"></a>

### @unic/logger~createLogger([prefix]) ⇒ <code>module:@unic/logger~Logger</code>
This composite returns an object with the log-method.
The log-method can be used, to log prefixed messages to the console.
INFO: logging only happens when `window.localStorage.debug == true`

**Kind**: inner method of [<code>@unic/logger</code>](#module_@unic/logger)  
**Returns**: <code>module:@unic/logger~Logger</code> - Logger  

| Param | Type | Description |
| --- | --- | --- |
| [prefix] | <code>String</code> | Prefix of logged content |

**Example**  
```js
import createLogger from '@unic/logger';

// Basic form
const obj = createLogger('MyModule');

// No prefix
const obj = createLogger();

// Composition
const obj = Object.assign({}, object1, object2, createLogger('MyModule'));
```

* [~createLogger([prefix])](#module_@unic/logger..createLogger) ⇒ <code>module:@unic/logger~Logger</code>
    * [~Logger](#module_@unic/logger..createLogger..Logger) : <code>Object</code>
        * [.log(...data)](#module_@unic/logger..createLogger..Logger+log) ⇒ <code>undefined</code>


* * *

<a name="module_@unic/logger..createLogger..Logger"></a>

#### createLogger~Logger : <code>Object</code>
**Kind**: inner constant of [<code>createLogger</code>](#module_@unic/logger..createLogger)  
**See**: Use [createLogger()](#module_@unic/logger) for object creation.  

* * *

<a name="module_@unic/logger..createLogger..Logger+log"></a>

##### logger.log(...data) ⇒ <code>undefined</code>
Log params to the console when `window.localStorage.debug == true`

**Kind**: instance method of [<code>Logger</code>](#module_@unic/logger..createLogger..Logger)  

| Param | Type | Description |
| --- | --- | --- |
| ...data | <code>\*</code> | All params you want to log |

**Example**  
```js
// Creation
const obj = createLogger('MyModule');

window.localStorage.debug = true; // Enable logging to the console

obj.log('Hello', 'World', '!'); // Outputs 'MyModule → Hello World !' to the console
obj.log(1, 2, 3, 4); // Outputs 'MyModule → 1 2 3 4' to the console
```

* * *

## Helpful Ressources

A composite is a function or an object which can be used as is or to merged with another object. These composites are normally used in the factory/composition pattern.

* https://www.youtube.com/watch?v=ImwrezYhw4w
* https://www.youtube.com/watch?v=wfMtDGfHWpA

* * *

## License

Apache-2.0
