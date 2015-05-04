// import React from 'react'
// import pack from '../../package.json'
var calc = require('../js/calc.js');

module.exports = React.createClass({
 render: function(){
   return (
     <div>
       <div>{this.props.num1} + {this.props.num2} = {calc.add(parseInt(this.props.num1), parseInt(this.props.num2))}</div>
     </div>
   )
 }
});
