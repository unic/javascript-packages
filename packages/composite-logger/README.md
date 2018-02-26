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

A composite is a function or an object which can be used as is or to merged with another object. These composites are normally used in the factory/composition pattern.

Helpful Ressources:
* https://www.youtube.com/watch?v=ImwrezYhw4w
* https://www.youtube.com/watch?v=wfMtDGfHWpA

**Important**: In further examples and the API we'll just infer that you've already generated your new object with the composite applied to it and will not give any more examples on how to do that.

**Examples**
```js
// Applying the composite to a new object literal
const obj = Object.assign({}, logger('custom-prefix'));

// Equivalent with lodash.merge
const obj = _.merge({}, logger('custom-prefix'));

// Just use it as a
const obj = logger('custom-prefix');
```

## API

TODO: Provide information for this package

## License

Apache-2.0
