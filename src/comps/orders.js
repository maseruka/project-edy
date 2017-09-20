import React, { Component } from 'react';

export default class Orders extends Component {
  render() {
    return (
    	<div className="row padd">
    		<div className="col-lg-8"><h5 className={"todo " + this.props.todo}>{ this.props.todo }</h5></div>
            <div className="col-lg-4"><span className="time">{ this.props.time }</span></div>
    		<div className="col-lg-12">
            <h5>{ this.props.todon }</h5>
            <span className="order">Filled: { this.props.filled }</span><br/>
            <span className="order">Remaining: { this.props.rem }</span><br/>
            <span className="order">status: { this.props.stat }</span>
            </div>
    	</div>
    	);
  }
}