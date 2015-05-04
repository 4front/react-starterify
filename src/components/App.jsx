// import React from 'react'
// import MyComponent from './components/MyComponent.jsx'
var Parent = require('./Parent.jsx');

window.React = React;

React.render(<Parent />, document.getElementById('content'));
