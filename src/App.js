import React, { Component } from 'react';
import { observer } from 'mobx-react'
import Store from './Store/store'
import Dex from './comps/dex.js'
import Orders from './comps/orders.js'
import Chart from './comps/Chart.js'

var randomize = require('randomatic');

@observer
class App extends Component {
  constructor(props){
      super(props)
      this.store = new Store()
  }
  startGraph(){
      this.store.resetChart();
      this.store.openOrders = [] 
      this.store.allConfigs = []
      if(this.store.globalCoin !== ''){
            this.store.allConfigs.push(this.store.buyConfiguration[0].at)
            if (this.store.openOrders.length === 0) {
                  this.store.openOrders.push(this.store.buyConfiguration[0])
            }
            this.store.sellConfiguration.map((sells) => {
                 this.store.openOrders.push(sells)
                 this.store.allConfigs.push(sells.at)
                 return null
            })
            this.store.showChart = <Chart data={[12, 8, ...this.store.allConfigs]} coin={ this.store.globalCoin } store = { this.store }/>
            this.store.socket.emit('market_summary', {'coin': this.store.globalCoin});
            this.store.socket.on('market_summary', (backCoins)=>{
                  console.log(backCoins)
                  this.store.volume = backCoins.Volume.toString().substring(0, 10)
                  this.store.low = backCoins.Low
                  this.store.high = backCoins.High
                  this.store.last = backCoins.Last
            })
      }else{
            alert("Please enter coin!")
      }

  }
  showContent(e){
      let coinValue = e.target.value
      coinValue = coinValue.trim()
      if(coinValue !== ''){
            this.store.globalCoin = coinValue
      }
  }
  createNewSell(){
      this.store.chart_const.ay.push(null);
      console.log(this.store.chart_const.ay);
      let rand = randomize(10);
      let d = new Date()
      let h = d.getHours()
      let m = d.getMinutes()
      let s = d.getSeconds()
      let currentTime = h + ':' + m + ':' + s
      this.store.sellConfiguration.push({sell: 0, 
                                         at: 0, 
                                         id: rand, 
                                         todo: 'SELL', 
                                         put: '%', 
                                         time: currentTime, 
                                         todon: '0.0000000', 
                                         filled: '0.0000000', 
                                         rem: '0.0000000', 
                                         status: 'open'})
  }
  removeLastSell(){
     if (this.store.sellConfiguration.length <= 0) {

     }else{
      this.store.sellConfiguration.pop();
      this.store.chart_const.ay.pop();
      this.store.chart_data.datasets.pop();
      this.store.chart_const_lines.pop();
    }
  }
  render() {
      let openOrdersMap;
      let closedOrdersMap;
      let openOrders = []
      let closedOrders = []

      let sellConfigurationMap = this.store.sellConfiguration.map((sells) => (
            <Dex key={sells.id} id={sells.id} todo={sells.todo} put={sells.put} dd = {sells.id} store={sells} myStore={this.store}/>
            ))
      this.store.openOrders.map((d) => {
            if (d.status === 'closed') {
                  closedOrders.push({id: d.id, buy: d.buy, at: d.at, todo: d.todo,time: d.time, todon: '0.0000000',filled: '0.0000000', rem: '0.0000000'})
                  return null
            }else if(d.status === 'open'){
                  openOrders.push({id: d.id, buy: d.buy, at: d.at, todo: d.todo,time: d.time, todon: '0.0000000',filled: '0.0000000', rem: '0.0000000'})
                  return null
            }else{
                  return null
            }
      })
      closedOrdersMap = closedOrders.map((open) => (
                  <Orders key={open.id} todo={open.todo} time={open.time} todon={open.todon} filled={open.filled} rem={open.rem}/>
                  ))
      openOrdersMap = openOrders.map((open) => (
                  <Orders key={open.id} todo={open.todo} time={open.time} todon={open.todon} filled={open.filled} rem={open.rem} stat={open.status}/>
                  ))
    return (
      <div className="full container-fluid parent">
      <div className="row">
      <div className="col-lg-3 status about">
      <div className="row">
      <div className="col-lg-12">
      <div className="sixty tops child scroll">
      <center>Coin statistics</center>
      <center><input type="text" placeholder="COIN" className="coin-value top" onKeyUp={this.showContent.bind(this)}/></center>
      <center><button className="btn start top" onClick = {this.startGraph.bind(this)}>START</button></center>
      <div className="row top bom">
      <div className="col-lg-3">Last</div>
      <div className="col-lg-8 aright"><span className="fa fa-btc"></span>{ this.store.last }</div>
      <div className="col-lg-3">Volume</div>
      <div className="col-lg-8 aright"><span className="fa fa-btc"></span>{ this.store.volume }</div>
      <div className="col-lg-3">Low</div>
      <div className="col-lg-8 aright"><span className="fa fa-btc"></span>{ this.store.low }</div>
      <div className="col-lg-3">High</div>
      <div className="col-lg-8 aright"><span className="fa fa-btc"></span>{ this.store.high }</div>
      </div>
      <div className="top">
      <center><button className="btn gbna">CANCEL</button></center>
      <center><button className="btn gbna">CANCEL AND SELL</button></center>
      </div>
      </div>
      </div>
      </div>
      <div className="row">
      <div className="col-lg-12">
      <div className="fourty tops child rela">
      <center>Logs</center>
      <p className="small top">Any thing to log must be right here ok? cool go on and put it there</p>
      <p className="small">Any thing to log must be right here ok? cool go on and put it there</p>
      <span className="light2"></span>
      </div>
      </div>
      </div>
      </div>

      <div className="col-lg-3 configurations full">
      <div className="row">
      <div className="col-lg-12">
      <div className="thirty top child">
      <center>Buy Configuration</center>
      <Dex todo="BUY" put="btc" buy={this.store.buyConfiguration} myStore={this.store} sell={true}/>
      </div>
      </div>
      </div>
      <div className="row">
      <div className="col-lg-12">
      <div className="seventy top child scroll">
      <center>Sell Configuration</center>
      { sellConfigurationMap }
      <p className="actions remo" onClick = { this.removeLastSell.bind(this)}><span className="fa fa-trash"></span> Remove sell</p>
      <p className="actions addo bog" onClick = { this.createNewSell.bind(this)}><span className="fa fa-plus"></span> Add sell</p>
      </div>
      </div>
      </div>
      </div>

      <div className="col-lg-6 monitor full">
      <div className="row">
      <div className="col-lg-12 ">
      <div className="six top child">
      <div className="kpad">
      { this.store.showChart }
      </div>
      </div>
      </div>
      </div>
      <div className="row">
      <div className="col-lg-6">
      <div className="six top child scroll">
      <center>Open Orders</center>
      { openOrdersMap }
      <p className="bog"></p>
      </div>
      </div>
      <div className="col-lg-6">
      <div className="six top child scroll">
      <center>Closed Orders</center>
      { closedOrdersMap }
      <p className="bog"></p>
      </div>
      </div>
      </div>
      </div>

      </div>
      </div>
    );
  }
}

export default App;
