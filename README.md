# Browser Extension Boilerplate

This repository is a starting point for building and distributing extensions for Chrome and Firefox browsers.

It is built with TypeScript/JavaScript, Webpack, and React.

Other dependencies minimal so you can bring your own tools.

> **Note:**
> 
> This boilerplate uses Manifest V2, which you will see warnings about from Chrome. Firefox is still implementing V3, so in order to produce extensions for both browsers this project will continue to use V2 until Firefox has added support.
> 
> For more info see: 
> - [Manifest version 3 is not supported for Firefox extensions](https://discourse.mozilla.org/t/manifest-version-3-is-not-supported-for-firefox-extensions/80651)
> - [Welcome to Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/)
## Development

```bash
yarn install
yarn start
```

With the development server running, you can now load the plugin in the browser.

### Loading in Chrome

1. Open Chrome
1. Navigate to `chrome://extensions/`
1. Enable "Developer mode" in the top right
1. Click "Load Unpacked"
1. Navigate to repo/build/chrome

### Loading in Firefox

1. Open Firefox
1. Navigate to to `about:debugging`
1. Click "This Firefox" option
1. Click  "Load Temporary Add-on" button
1. Navigate to repo/build/chrome and select any file

### Output directories

- The `build` directory contains the webpack built application. You can use this to load the plugin to Chrome for development.
- The `dist` directory contains the zip files that are generated by running `yarn package`. See [Package for distribution](#package-for-distribution) below.

### Package for distribution

In order to build for Firefox, you must first get your web-ext credentials. See [Getting started with web-ext](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/).

Configure environment variables:

```bash
export WEB_EXT_API_KEY=xxx;
export WEB_EXT_API_SECRET=xxx
```

Sign and build plugin:

```bash
yarn package
```

See INSTALL.md for dist install instructions
