import Child from './Child.jsx';

let Parent = React.createClass({
 render: function(){
   return (
     <div>
       <div> This is the parent.</div>
       <Child name="child" num1="4" num2="80"/>
     </div>
   )
 }
});

export default Parent;
