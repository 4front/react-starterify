# React Starterify

![http://www.4front.io](https://s3-us-west-2.amazonaws.com/4front-media/4front-logo.png)

A [4front](http://4front.io) starter template for [React](https://facebook.github.io/react/) apps. Comes with a `gulpfile.js` preconfigured to handle:

* ES6 transpiling and JSX transformations using [Babel](https://babeljs.io/)
* Module bundling with [Browserify](http://browserify.org/)
* [Sass](http://sass-lang.com/) compilation
* [Auto-Reload](http://4front.io/docs/guides/autoreload.html)
* Release build that has been minified with [UglifyJS](http://lisperator.net/uglifyjs/)

## Usage

Create a new 4front application from this repo:

~~~sh
4front create-app --template-url https://github.com/4front/react-starterify/archive/master.zip
~~~

Start the development sandbox server. This will automatically kick of the `gulp watch` task and open a browser window to your personal sandbox URL.

~~~sh
4front dev
~~~

## Credits
This article by [Tyler McGinnis](http://tylermcginnis.com/blog/) was very helpful in initially getting React + Gulp + Browserify all wired up properly:
[React.js Tutorial Pt 1: A Comprehensive Guide to Building Apps with React.js](http://tylermcginnis.com/reactjs-tutorial-a-comprehensive-guide-to-building-apps-with-react/)

## License
Licensed under the Apache License, Version 2.0. See (http://www.apache.org/licenses/LICENSE-2.0).
