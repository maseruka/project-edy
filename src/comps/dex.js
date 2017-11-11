import React, { Component } from 'react';
import { observer } from 'mobx-react'
import ReactTooltip from 'react-tooltip'

@observer
export default class Dex extends Component {
  setSell(e){
    let newSellValue = e.target.value
    newSellValue = newSellValue.trim().replace(/\s/g,'');
    if (this.props.store !== undefined) {
        this.props.store.sell = newSellValue.toString();
    }else{
        this.props.buy[0].buy = newSellValue.toString();
    }
  }
  setPer(e){
    let newPerValue = e.target.value
    newPerValue = newPerValue.trim().replace(/\s/g,'');
    if (this.props.store !== undefined) {
        this.props.store.at = newPerValue 
        if (newPerValue === '') {
          for (let i = 0; i < this.props.myStore.sellConfiguration.length; i++) {
            if (this.props.id === this.props.myStore.sellConfiguration[i].id) {
              this.props.myStore.chart_const.ay[3+i] = null
              this.props.myStore.scale();
            }
          }
        }else{
          for (let i = 0; i < this.props.myStore.sellConfiguration.length; i++) {
            if (this.props.id === this.props.myStore.sellConfiguration[i].id) {
              this.props.myStore.chart_const.ay[3+i] = newPerValue
              this.props.myStore.scale();
            }
          }
        }
    }else{
      if (newPerValue === '') {
        this.props.myStore.chart_const.ay[2] = null;
        this.props.buy[0].at = null;
        this.props.myStore.scale();
      }else{
        this.props.myStore.chart_const.ay[2] = newPerValue;
        this.props.buy[0].at = newPerValue
        this.props.myStore.scale();
      }   
    }
  }
  render() {
    let put = '%'
    if (this.props.put !== '%') {
        put = <span className="fa fa-btc"></span>
    }
    let sell = this.props.sell;
    if (!sell || sell === 0) {
      sell = '';
    }
    return (
    	<div className="row pad bot">
    		<div className="col-lg-3 row"><p className="puch sh-small">{ this.props.todo }</p></div>
    		<div className="col-lg-9 kal"><input value={this.props.store ? sell : undefined} type="number" className="pass2" onChange={this.setSell.bind(this)} ref="show" data-tip = { this.props.store ? 'Percent of total amount to sell' : 'Amount in BTC to buy'} data-for="test" data-place="right"/><ReactTooltip id="test"/> { put }</div>
    		<div className="col-lg-3 top row"><span className="puch sh-small">AT</span></div>
    		<div className="col-lg-9 top kal"><input type="number" className="pass2" onChange={this.setPer.bind(this)} ref="show2" data-tip = { this.props.store ? 'Percentage above LAST rate to place sell order' : 'Percentage above LAST rate to place buy order' } data-for="test2" data-place="right"/><ReactTooltip id="test2"/> %</div>
    		<div className="col-lg-12 rite top soo so-small">above current price</div>
    	</div>
    	);
  }
}