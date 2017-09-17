import React, { Component } from 'react';
import { observer } from 'mobx-react'
import Store from './Store/index'
import Dex from './comps/dex.js'
import Orders from './comps/orders.js'

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
                  const coins = ['btc', 'gld', 'ugx', 'sex']
                  if (coins.indexOf(coinValue) !== -1) {
                        this.setState({contentShowed: true})
                  }else{
                        this.setState({contentShowed: false})
                  }
            }
      }else{
            this.setState({contentShowed: false})
      }
  }
  render() {
      let openOrders;
      let closedOrders;
      if (this.state.contentShowed !== false ) {
            closedOrders = <Orders todo="BUY" time="11:23:4" todon="0.0000000" filled="0.0000000" rem="0.0000000"/>
            openOrders = <Orders todo="SELL" time="14:26:11" todon="0.000000" filled="0.0000000" rem="0.0000000"/>
      }
// <Orders todo="SELL" time="14:26:11" todon="0.0000887" filled="0.000000" rem="605.647464"/>
// <Orders todo="BUY" time="11:23:4" todon="0.0000887" filled="27.455660" rem="00000000"/>
    return (
      <div className="container-fluid mother">
      <div className="row">
      <div className="col-lg-6">
      <div className="row">
      <div className="col-lg-6">
      <div className="one box scroll">
      <div className="padd2">
      <p className="center">10:29.22</p>
      <input type="text" className="bige bx" placeholder="COIN" onKeyUp={this.showContent.bind(this)}/>
      <button className="btn gld" onClick = {this.startGraph.bind(this)}>START</button>
      </div>
      </div>
      <div className="two box scroll">
      <div className="row padd">
      <button className="btn gbn">CANCEL</button>
      <button className="btn gbn">CANCEL AND SELL</button>
      </div>
      <div className="row">
      <div className="col-lg-3"><span className="lef">BUY</span></div>
      <div className="col-lg-9"><div className="kal2"><input className="pass"/> %</div></div>
      <div className="col-lg-12 rite top">above current price</div>
      </div>
      </div>
      <div className="three box rela">
      <p className="center">Log</p>
      <p className="small">Any thing to log must be right here ok? cool go on and put it there</p>
      <p className="small">Any thing to log must be right here ok? cool go on and put it there</p>
      <span className="light"></span>
      </div>
      </div>
      <div className="col-lg-6">
      <div className="three box">
      <center>Buy Configuration</center>
      <Dex todo="BUY"/>
      </div>
      <div className="four box scroll">
      <center>Sell Configuration</center>
      <Dex todo="SELL" />
      </div>
      </div>
      </div>
      </div>

      <div className="col-lg-6">
      <div className="row">
      <div className="col-lg-12">
      <div className="col-lg-12 fours box">graph</div>
      </div>
      </div>
      <div className="row">
      <div className="col-lg-6">
      <div className="col-lg-12 threes box right">
      <center>Open Orders</center>
      { openOrders }
      </div>
      </div>
      <div className="col-lg-6">
      <div className="col-lg-12 threes box right">
      <center>Closed Orders</center>
      { closedOrders }
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
