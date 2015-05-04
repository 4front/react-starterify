# React Starterify

![http://www.4front.io](https://s3-us-west-2.amazonaws.com/4front-media/4front-logo.png)

A 4front starter template for [React](https://facebook.github.io/react/) apps. Comes with a `gulpfile.js` preconfigured to handle:

* JSX transformations and module bundling with [Browserify](http://browserify.org/)
* [Sass](http://sass-lang.com/) compilation
* LiveReload
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

## Tools used

__Build__
- [gulp](http://gulpjs.com/)

__Styles__
- [gulp-sass](https://www.npmjs.org/package/gulp-sass)
- [gulp-csso](https://www.npmjs.org/package/gulp-csso)

__JSX tranform/ES6 support__
- [Babel (formerly 6to5)](https://github.com/babel/babel)

__Minification__
- [gulp-uglify](https://github.com/terinjokes/gulp-uglify/)

__Modules__
- [gulp-browserify](https://www.npmjs.com/package/browserify)

__LiveReload__
- [watchify](https://www.npmjs.com/package/watchify)
- [gulp-livereload](https://www.npmjs.com/package/gulp-livereload)

## Credits
This article by [Tyler McGinnis](http://tylermcginnis.com/blog/) was very helpful in initially getting React + Gulp + Browserify all wired up properly:
[React.js Tutorial Pt 1: A Comprehensive Guide to Building Apps with React.js](http://tylermcginnis.com/reactjs-tutorial-a-comprehensive-guide-to-building-apps-with-react/)

## License
Licensed under the Apache License, Version 2.0. See (http://www.apache.org/licenses/LICENSE-2.0).