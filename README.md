# Managed Javscript Packages
Mono-repo for npm packages based on Lerna.

## Packages

### Factories

- (None yet)

### Composites

- [composite-logger](packages/composite-logger)
- [composite-observer](packages/composite-observer)

TODO:
* Add BreakpointManager (Singleton)
* Add PubSub (Singleton)
* Add Scrollhandler (Singleton)

Running a test for a specifig package only: 
```bash
# Run the tests once
$ npm run test --testMatch ./packages/<packagename>/**/*.test.js

# Run the tests in watch mode
$ npm run test-watch --testMatch ./packages/<packagename>/**/*.test.js
```
