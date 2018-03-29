# PubSub

[Singleton](http://www.dofactory.com/javascript/singleton-design-pattern)-version of the composite-observer for app-wide communication between your modules.

## Installation

```shell
$ npm install @unic/pubsub
```

## Importing

```javascript
// ES6 Module
import PubSub from '@unic/pubsub';

// CommomJS
const PubSub = require('@unic/pubsub').default;
```

## Usage

You can import PubSub from anywhere in your project and be sure you have the same instance of your observer reade to subscribe to events using [.on()](#on), unsubscribe using [.off()](#off) or trigger all subscribers for a surtain event by [.trigger()](#trigger).

**Example**
```js
// module-a.js
import Pubsub from '@unic/pubsub';

// Subscribe to the event 'eventName' and provide a callback for when this event is triggered
Pubsub.getInstance().on('eventName', function () {
  console.log('eventName was triggered');
});
```

```js
// module-b.js
import Pubsub from '@unic/pubsub';

// Trigger all subscribers to event 'eventName'
Pubsub.getInstance().trigger('eventName');
```

## API

* [getInstance()](#getInstance)
  * [on(event, callback[, once = false])](#on)
  * [off(identifier)](#off)
  * [trigger(event[, params...])](#trigger)

<a name="getInstance"></a>

### getInstance()

Get the PubSub instance. If the instance was accessed the first time, it'll be created.

**Returns**: <code>Object</code> - Returns the observer instance

**Example**
```js
// Get instance of PubSub and save it in another variable
const PubSubInstance = PubSub.getInstance();
```

<a name="on"></a>

### on(event, callback[, once = false])

Subscribe to an event

**Returns**: <code>Integer</code> - Returns an identifyer to unsubscribe

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>String</code> |  | Eventname to subscribe to |
| callback | <code>function</code> |  | Callback function to execute when the event is triggered |
| [once] | <code>boolean</code> | <code>false</code> | When true, will unsubscribe automatically after first execution |

**Example**
```js
// Subscribe to the 'eventName' event
PubSub.getInstance().on('eventName', () => {
  console.log('eventName was called');
});

// Subscribe to the 'eventName' event but unsubscribe automatically after first call
PubSub.getInstance().on('eventName', () => {
  console.log('eventName was called');
  console.log('This handler unsubscribes automatically');
}, true);
```

<a name="off"></a>

### off(identifier)

Unsubscribe a single handler by the identifier returned by .on() or unsubscribe a whole event group by providing an eventname you want to unsubscribe all listeners from

**Returns**: <code>String/Number</code> - For now... lets jsut say the return doesn't matter

| Param | Type | Description |
| --- | ---  | --- |
| identifier | <code>String/Number</code> | Either the eventname or the identifiers returned by .on() |


**Example**
```js
// Subscribe to the 'eventName' event
const uid = PubSub.getInstance().on('eventName', () => {
  console.log('eventName was called');
});

// Unsubscribe by uid
PubSub.getInstance().off(uid);

// Unsubscribe by eventname, this unsubscribes all listeners for this event
PubSub.getInstance().off('eventName');
```

<a name="trigger"></a>

### trigger(event[, params...])

Trigger all listeners by eventname

**Returns**: <code>undefined</code>

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | Eventname to trigger |
| [params...] | <code>Any</code> | Pass any number of arguments you want to receive in the listener |


**Example**
```js
// Subscribe to the 'eventName' event
PubSub.getInstance().on('eventName', () => {
  console.log('eventName was called');
});

// Trigger the event 'eventName'
PubSub.getInstance().trigger('eventName');

// Subscribe and output all the params you get in the callback
PubSub.getInstance().on('eventName', (param1, param2, ...rest) => {
  console.log(param1, param2, rest);
});

// Trigger the event 'eventName' and add custom parameters for this trigger
PubSub.getInstance().trigger('eventName', 'Hello', 'World', '!!!');
```

MIT © [Christian Sany](https://github.com/christiansany)
