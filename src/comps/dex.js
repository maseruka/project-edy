import React, { Component } from 'react';

export default class Dex extends Component {
  render() {
    return (
    	<div className="row padd bot">
    		<div className="col-lg-3">{ this.props.todo }</div>
    		<div className="col-lg-9 kal"><input type="text" className="pass"/> %</div>
    		<div className="col-lg-3 top">AT</div>
    		<div className="col-lg-9 top kal"><input type="text" className="pass"/> %</div>
    		<div className="col-lg-12 rite top">above current price</div>
    	</div>
    	);
  }
}