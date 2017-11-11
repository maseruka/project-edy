import React, { Component } from 'react';

export default class Orders extends Component {
  // constructor(props){
  //   super(props);
  //   console.log(this.props.order);
  // }
  render() {
    return (
    	<div className="row padd rela kom at-small">
    		<div className="col-lg-3"><h5 className={"todo " + this.props.order.todo}>{ this.props.order.todo }</h5></div>
    		<div className="col-lg-6">
            <h5 className="bogs">{ this.props.order.sell ? this.props.order.sell : this.props.order.buy }</h5>
            <span className="order">Filled: { this.props.order.at }</span><br/>
            <span className="order">Remaining: { this.props.order.sell ? (100-this.props.order.sell).toString() : (100-this.props.order.buy).toString() }</span><br/>
            </div>
            <div className="col-lg-3"><span className="time">{ this.props.order.time }</span></div>
    	</div>
    	);
  }
}