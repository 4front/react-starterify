// import React from 'react'
// import pack from '../../package.json'

var Child = require('./Child.jsx');

module.exports = React.createClass({
 render: function(){
   return (
     <div>
       <div> This is the parent. </div>
       <Child name="child" num1="4" num2="8"/>
     </div>
   )
 }
});


// let MyComponent = React.createClass({
//   render: function() {
//     let version = pack.version,
//         deps;
//
//     // deps = Object.keys(pack.devDependencies).map((dep, i) => <li key={i}>{dep}</li>);
//
//     return (
//       <div>
//         <h1 className="Mycomponent">Welcome to &#9883; React Starterify {version}</h1>
//         <h2>Subtitle More</h2>
//         <p>Powered by:</p>
//       </div>
//     )
//   }
// });
// export default MyComponent;
