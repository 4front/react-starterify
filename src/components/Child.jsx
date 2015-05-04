import * as calc from '../js/calc.js'

let Child = React.createClass({
 render: function(){
   return (
     <div>
       <div>{this.props.num1} + {this.props.num2} = {calc.add(parseInt(this.props.num1), parseInt(this.props.num2))}</div>
     </div>
   )
 }
});

export default Child;
