# Managed Javscript Packages
Mono-repo for npm packages based on Lerna.

TODO:
* Add Scrollhandler

## Packages

- [composite-logger](packages/composite-logger)
- [composite-observer](packages/composite-observer)
- [breakpoint-manager](packages/breakpoint-manager)

## NPM Scripts

Lint staged files
```bash
$ npm run lint
```

Lint all files
```bash
$ npm run lint-all
```

Build all packages
```bash
$ npm run build
# or
$ lerna run build
```

Bootstrapping
For more information about bootstrapping, please have a look at the lerna documentation
```bash
$ npm run bootstrap
```

Tests
```bash
# Run tests once
$ npm run test

# Run tests in watch mode
$ npm run test-watch
```

Running tests for a specifig package only: 
```bash
# Run tests once
$ npm run test --testMatch ./packages/<packagename>/**/*.test.js

# Run tests in watch mode
$ npm run test-watch --testMatch ./packages/<packagename>/**/*.test.js
```

## Quickstart

**You need:**
- Node
- Lerna

```bash
# Clone the repository to your desired directory
$ git clone git@github.com:unic/javascript-packages.git

# Change directories
$ cd javascript-packages

# Set correct node Version
$ nvm install

# Install packages
$ npm install

# Bootstrap lerna
$ npm run bootstrap
```

## TODOs

* jsdoc should run in prepublish hook to automatically have correct documentation in the published readme
