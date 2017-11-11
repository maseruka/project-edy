import React, { Component } from 'react';
import { observer } from 'mobx-react'
import Store from './Store/store'
import Dex from './comps/dex.js'
import Orders from './comps/orders.js'
import Chart from './comps/Chart.js'
import ReactTooltip from 'react-tooltip'

@observer
class App extends Component {
  constructor(props){
      super(props)
      this.store = new Store()
  }
  startClicked(){
        if(this.store.globalCoin !== ''){
          this.store.addOrders(()=>{
            this.showOrders();
            this.store.sendOrdersToServer();
          });
      }else{
          alert("Please enter a valid coin!")
      }
  }
  startGraph(){
    this.store.resetChart();
    this.store.showChart = <Chart data={[12, 8, ...this.store.allConfigs]} store={this.store}/>
    this.store.isChartShown = true;
  }
  showContent(e){
      let coinValue = e.target.value
      coinValue = coinValue.trim().replace(/\s/g,'').toUpperCase();
      if(coinValue !== '' && this.store.coins.indexOf(coinValue)  >= 0){
          this.store.globalCoin = coinValue;
          this.store.workingCoin = this.store.globalCoin;
          this.startGraph();
      }else{
          this.store.isChartShown = false;
      }
  }
  createNewSell(){
      this.store.chart_const.ay.push(null);
      this.store.addSell({sell: 0, 
                          at: 0, 
                          id: this.store.genRand(), 
                          todo: 'SELL', 
                          put: '%', 
                          time: this.store.currentTime(), 
                          todon: '0.0000000', 
                          filled: '0.0000000', 
                          rem: '0.0000000', 
                          status: 'open'});
  }
  removeLastSell(){
     if (this.store.sellConfiguration.length <= 0) {

     }else{
      this.store.sellConfiguration.pop();
      this.store.allConfigs.pop();
      this.store.chart_const.ay.pop();
      this.store.chart_data.datasets.pop();
      this.store.chart_const_lines.pop();
    }
  }
  setCancelVal(e){
    let newCancelValue = e.target.value
    newCancelValue = newCancelValue.trim().replace(/\s/g,'');
        this.store.cancelAndSellVal = newCancelValue
  }
  showOrders(){
    console.log(this.store.orders)
    this.store.orders.map((d) => {
      if (d.status === 'closed') {
        this.store.closedOrders.push(d)
      }else if(d.status === 'open'){
        this.store.openOrders.push(d)
      }else{
      }
    })
  }
  render() {

      // closedOrdersMap = this.store.closedOrders.map((open) => (
      //             <Orders key={open.id} todo={open.todo} time={open.time} todon={open.todon} filled={open.filled} rem={open.rem}/>
      //             ))
      // openOrdersMap = this.store.openOrders.map((open) => (
      //             <Orders key={open.id} todo={open.todo} time={open.time} todon={open.todon} filled={open.filled} rem={open.rem} stat={open.status}/>
      //             ))
    return (
      <div className="full container-fluid mother">
      <div className="row">
      <div className="col-lg-2">
      <div className="row pitwo putch mitch patch box scroll">
      <div className="rela">
      <center className="smaa">Coin statistics</center>
      <input type="text" placeholder="COIN" className="coin-value" spellCheck="false" onKeyUp={this.showContent.bind(this)}/>
      <button className="btn start" onClick = {this.startClicked.bind(this)}>START</button>
      </div>
      </div>
      <div className="row pithree putch patch box">
      <div className="rela">
      <button className="gbna btn top">CANCEL</button>
      <button className="gbna btn top">CANCEL AND SELL</button>
      <div className="row">
      <div className="col-lg-3 top sh-small">AT</div>
      <div className="col-lg-8 top kal2 paetch"><input type="text" className="pass" onChange={this.setCancelVal.bind(this)} ref="show" data-tip ="Percentage above LAST rate to place CANCEL AND SELL order" data-for="test" data-place="right"/><ReactTooltip id="test"/>%</div>
      <div className="col-lg-11 rite soo r top so-small">above current price</div>
      </div>
      </div>
      </div>
      <div className="row pisix putch patch box rela">
      <div className="rela">
      <center className="smaa">Logs</center>
      <p className="small">Any thing to log must be right here ok? cool go on and put it there</p>
      <p className="small">Any thing to log must be right here ok? cool go on and put it there</p>
      <p className="small">Any thing to log must be right here ok? cool go on and put it there</p>
      </div>
      <span className="light2"></span>
      </div>
      </div>
       <div className="col-lg-2">
      <div className="pifour mitch patch box">
      <div className="rela">
      <center className="smaa">Buy Configuration</center>
      <Dex todo="BUY" put="btc" buy={this.store.buyConfiguration} myStore={this.store}/>
      </div>
      </div>
      <div className="row mitch piseven patch scroll box rela">
      <div className="rela">
       <center className="smaa">Sell Configuration</center>
       {this.store.sellConfiguration.map((sells) => (
           <Dex key={sells.id} id={sells.id} sell={sells.sell} todo={sells.todo} put={sells.put} dd = {sells.id} store={sells} myStore={this.store}/>
        ))}
       <p className="actions remo" onClick = { this.removeLastSell.bind(this)}><span className="fa fa-trash"></span> Remove sell</p>
       <p className="actions addo bog" onClick = { this.createNewSell.bind(this)}><span className="fa fa-plus"></span> Add sell</p>
       </div>
      </div>
      </div>
      <div className="col-lg-8">
      <div className="row petch">
      <div className="col-lg-12 row mitch pifive box">
       <div className="kpad">
       <div className={ this.store.isChartShown ? "" : "hide" }>
       <div className="uptop">
       <div className="row rr">
       <div className="col-lg-2">Last:</div>
       <div className="col-lg-3"><span className="fa fa-btc"></span> { this.store.last }</div>
       <div className="col-lg-2">Volume:</div>
       <div className="col-lg-3"><span className="fa fa-btc"></span> { this.store.volume }</div>
       </div>
       <div className="row">
       <div className="col-lg-2">Low:</div>       <div className="col-lg-3"><span className="fa fa-btc"></span> { this.store.low }</div>
       <div className="col-lg-2">High:</div>
       <div className="col-lg-3"><span className="fa fa-btc"></span> { this.store.high }</div>
       </div>
       </div>
        <div>
        { this.store.showChart }
        </div>
       </div>
       </div>
       </div>
      <div className="col-lg-12 row">
      <div className="col-lg-6 row pifiv mitch box scroll">
      <div className="rela">
       <span className="smaa">Open Orders</span>
       {this.store.openOrders.map((open) => (
         <Orders order={open}/>
        ))}
       </div>
       </div>
      <div className="col-lg-6 row pifiv mitch hitch box scroll">
      <div className="rela">
       <span className="smaa">Closed Orders</span>
       {this.store.closedOrders.map((closed) => (
         <Orders order={closed}/>
        ))}
       </div>
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