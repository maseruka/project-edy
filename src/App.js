import React, { Component } from 'react';
import Dex from './comps/dex.js'
import Orders from './comps/orders.js'
class App extends Component {
  render() {
    return (
      <div className="container-fluid mother">
      <div className="row">
      <div className="col-lg-6">
      <div className="row">
      <div className="col-lg-6">
      <div className="one box scroll">
      <div className="padd">
      <p className="center">10:29.22</p>
      <input type="text" className="bige bx" placeholder="COIN"/>
      <button className="btn gld">START</button>
      </div>
      </div>
      <div className="two box scroll">
      <div className="padd">
      <button className="btn gbn">CANCEL</button>
      <button className="btn gbn">CANCEL AND SELL</button>
      <div className="row">
      <div className="col-lg-3 top">BUY</div>
      <div className="col-lg-9 top kal"><input type="text" className="pass"/> %</div>
      </div>
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
      <div className="col-lg-12 three box right">
      <center>Open Orders</center>
      <Orders todo="SELL" time="14:26:11" todon="0.0000887" filled="0.000000" rem="605.647464"/>
      </div>
      </div>
      <div className="col-lg-6">
      <div className="col-lg-12 three box right">
      <center>Closed Orders</center>
      <Orders todo="BUY" time="11:23:4" todon="0.0000887" filled="27.455660" rem="00000000"/>
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
