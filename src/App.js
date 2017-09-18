import React, { Component } from 'react';
import { observer } from 'mobx-react'
import Store from './Store/store'
import Dex from './comps/dex.js'
import Orders from './comps/orders.js'

var randomize = require('randomatic');

@observer
class App extends Component {
  constructor(props){
      super(props)
      this.state = {contentShowed: false}
      this.store = new Store()
  }
  startGraph(){
      
  }
  showContent(e){
      const coinValue = e.target.value
      if(coinValue !== ''){
            if (e.which === 13) {
                  const coins = ['btc', 'gld', 'ugx', 'gbg']
                  if (coins.indexOf(coinValue) !== -1) {
                        this.setState({contentShowed: true})
                  }else{
                        this.setState({contentShowed: false})
                  }
            }
      }else{
      }
  }
  createNewSell(){
      let rand = randomize('Aaxs0', 10);
      this.store.sellConfiguration.push({sell: 0, at: 0, id: rand, todo: 'SELL', put: '%'})
  }
  removeLastSell(){
      this.store.sellConfiguration.pop()
  }
  render() {
      let openOrdersMap;
      let closedOrdersMap;
      let closedOrders = [
                           {
                            todo: 'BUY', 
                            time: '9:23:11', 
                            todon: '0.0000000',
                            filled: '0.0000000', 
                            rem: '0.0000000'
                           },
                           {
                            todo: 'SELL', 
                            time: '9:20:15', 
                            todon: '0.0000000',
                            filled: '0.0000000', 
                            rem: '0.0000000'
                           }
                         ]
      let openOrders = [
                         {
                           todo: 'SELL', 
                           time: '12:23:11', 
                           todon: '0.0000000', 
                           filled: '0.0000000', 
                           rem: '0.0000000'
                        }
                      ]
      if (this.state.contentShowed !== false ) {
            openOrdersMap = openOrders.map((open) => (
                  <Orders key={open.time} todo={open.todo} time={open.time} todon={open.todon} filled={open.filled} rem={open.rem}/>
                  ))
            closedOrdersMap = closedOrders.map((open) => (
                  <Orders key={open.time} todo={open.todo} time={open.time} todon={open.todon} filled={open.filled} rem={open.rem}/>
                  ))
      }
      let sellConfigurationMap = this.store.sellConfiguration.map((sells) => (
            <Dex key={sells.id} todo={sells.todo} put={sells.put} dd = {sells.id} store={sells}/>
            ))
      let truckSellAndBuyMap = this.store.sellConfiguration.map((sellsBuys) => (
            <span key={sellsBuys.id}>selKey: {sellsBuys.id} : sell: {sellsBuys.sell} : at: {sellsBuys.at}, </span>
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
      <div className="col-lg-4">Last</div>
      <div className="col-lg-7 aright"><span className="fa fa-btc"></span> 0.000000553</div>
      <div className="col-lg-4">Volume</div>
      <div className="col-lg-7 aright"><span className="fa fa-btc"></span> 0.000055367</div>
      <div className="col-lg-4">Low</div>
      <div className="col-lg-7 aright"><span className="fa fa-btc"></span> 0.000000023</div>
      <div className="col-lg-4">High</div>
      <div className="col-lg-7 aright"><span className="fa fa-btc"></span> 0.000000553</div>
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
      <Dex todo="BUY" put="btc"/>
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
      <p>Track values</p>
      <p>[ { truckSellAndBuyMap } ]</p>
      </div>
      </div>
      </div>
      <div className="row">
      <div className="col-lg-6">
      <div className="six top child">
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
