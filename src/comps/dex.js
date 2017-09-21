import React, { Component } from 'react';
import { observer } from 'mobx-react'
@observer
export default class Dex extends Component {
  setSell(e){
    let newSellValue = e.target.value
    newSellValue = newSellValue.trim().replace(/\s/g,'');
    if (this.props.store !== undefined) {
        this.props.store.sell = newSellValue
    }else{
        this.props.buy[0].buy = newSellValue
    }
  }
  setPer(e){
    let newPerValue = e.target.value
    newPerValue = newPerValue.trim().replace(/\s/g,'');
    if (this.props.store !== undefined) {
        this.props.store.at = newPerValue 
        if (newPerValue == '') {
          for (var i = 0; i < this.props.myStore.sellConfiguration.length; i++) {
            if (this.props.id == this.props.myStore.sellConfiguration[i].id) {
              this.props.myStore.chart_const.ay[3+i] = null
            }
          }
        }else{
          for (var i = 0; i < this.props.myStore.sellConfiguration.length; i++) {
            if (this.props.id == this.props.myStore.sellConfiguration[i].id) {
              this.props.myStore.chart_const.ay[3+i] = newPerValue
            }
          }
        }
    }else{
        this.props.buy[0].at = newPerValue
        this.props.myStore.chart_const.ay[2] = newPerValue;
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
    		<div className="col-lg-9 kal"><input type="text" className="pass" onChange={this.setSell.bind(this)}/> { put }</div>
    		<div className="col-lg-3 top">AT</div>
    		<div className="col-lg-9 top kal"><input type="text" className="pass" onChange={this.setPer.bind(this)}/> %</div>
    		<div className="col-lg-12 rite top soo">above current price</div>
    	</div>
    	);
  }
}