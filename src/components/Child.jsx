import React from 'react';
import * as calc from '../js/calc';

export default class Child extends React.Component {
  render() {
    return (
      <div>
        <div>{this.props.num1} + {this.props.num2} = {calc.add(parseInt(this.props.num1), parseInt(this.props.num2))}</div>
      </div>
    );
  }
}
