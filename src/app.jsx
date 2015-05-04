import React from 'react'
import MyComponent from './components/MyComponent.jsx'

window.React = React;

React.render(<MyComponent />, document.getElementById('content'));
