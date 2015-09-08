import React from 'react';
import Child from './Child';

export default class Parent extends React.Component {
  render() {
    return (
      <div>
        <div> This is the parent.</div>
        <Child name="child" num1="4" num2="20"/>
      </div>
    );
  }
}
