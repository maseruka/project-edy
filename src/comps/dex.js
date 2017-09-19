import React, { Component } from 'react';
import { observer } from 'mobx-react'
@observer
export default class Dex extends Component {
  setSell(e){
    let newSellValue = e.target.value
    if (this.props.store !== undefined) {
        this.props.store.sell = newSellValue
    }else{
        this.props.buy[0].buy = newSellValue
    }
  }
  setPer(e){
    let newPerValue = e.target.value
    if (this.props.store !== undefined) {
        this.props.store.at = newPerValue 
    }else{
        this.props.buy[0].at = newPerValue
    }
  }
  render() {
    let put = '%'
    if (this.props.put !== '%') {
        put = <span className="fa fa-btc"></span>
    }else{

    }
    return (
    	<div className="row padd bot">
    		<div className="col-lg-3">{ this.props.todo }</div>
    		<div className="col-lg-9 kal"><input type="text" className="pass" onBlur={this.setSell.bind(this)}/> { put }</div>
    		<div className="col-lg-3 top">AT</div>
    		<div className="col-lg-9 top kal"><input type="text" className="pass" onBlur={this.setPer.bind(this)}/> %</div>
    		<div className="col-lg-12 rite top soo">above current price</div>
    	</div>
    	);
  }
}