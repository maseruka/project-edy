import { observable } from 'mobx'
import io from 'socket.io-client';
var randomize = require('randomatic');
class Store {
  socket = io('http://localhost:7676/',{transports: ['websocket'], pingTimeout: 3000, pingInterval: 5000});
   constructor() {
    this.socket.on('market_summary', (backCoins)=>{
          if (backCoins.coin !== this.globalCoin) {
    
          }else{
                this.volume = backCoins.data.Volume.toString().substring(0, 10);
                this.low = backCoins.data.Low;
                this.high = backCoins.data.High;
                this.last = backCoins.data.Last;
          }
    });
    this.socket.on('coins_list', (data)=>{
      this.coins = data.coins;
      console.log(this.coins);
    });
    this.addSell({sell: 0, at: 0, id: this.genRand(), todo: 'SELL', put: '%', time: this.currentTime(), todon: '0.0000000', filled: '0.0000000', rem: '0.0000000', status: 'open'});
    this.addSell({sell: 0, at: 0, id: this.genRand(), todo: 'SELL', put: '%', time: this.currentTime(), todon: '0.0000000', filled: '0.0000000', rem: '0.0000000', status: 'open'})
   }
  coins = [];
  addedOrdersCount: 0;
  @observable openOrders = [];
  @observable closedOrders = [];
	@observable sellConfiguration = [];
	@observable buyConfiguration  = [{
							id: this.genRand(), 
							buy: 0, 
							at: 0,
							todo: 'BUY', 
              time: this.currentTime(), 
              todon: '0.0000000',
              filled: '0.0000000', 
              rem: '0.0000000',
              status: 'open'}]
	@observable orders = []
	@observable allConfigs = []
	@observable showChart = null
  @observable isChartShown = false
	@observable globalCoin = ''
  @observable workingCoin = ''
	@observable volume = '00000000'
	@observable high = '00000000'
	@observable low = '00000000'
	@observable last = '00000000'
  addSell(sell){
   if (this.sellConfiguration.length === 0) {
     sell.sell = 60;
     this.sellConfiguration.push(sell);
   }else if (this.sellConfiguration.length === 1) {
     sell.sell = 40;
     this.sellConfiguration.push(sell);
   }else{
     this.sellConfiguration.push(sell);
   }
  }
  addOrders(done){
    this.allConfigs.push(this.buyConfiguration[0].at);
    if (this.orders.length === 0) {
      this.orders.push(this.buyConfiguration[0]);
    }
    if (this.sellConfiguration.length > 0) {
     this.sellConfiguration.map((sell, index) => {
     this.orders.push(sell)
     this.allConfigs.push(sell.at)
     if (index === this.sellConfiguration.length - 1) {
       done();
     }
     return null
    })
    }else{
      done();
    }
  }
	currentTime(){
		let d = new Date()
		let h = d.getHours()
		let m = d.getMinutes()
		let s = d.getSeconds()
		let currentTime = h + ':' + m + ':' + s
		return currentTime
	}
	genRand(){
      let rand = randomize('A0',10);
      return rand
	}
  
	chart_data = {
     labels: ['0:00',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','0:30',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','1:00',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','1:30',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','2:00',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','2:30',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','3:00',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','3:30',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
     datasets: [
       {
         label: 'My First dataset',
         fill: true,
         lineTension: 0.1,
         backgroundColor: 'rgba(75,192,192,0.4)',
         borderColor: 'rgba(75,192,192,1)',
         borderCapStyle: 'butt',
         borderDash: [],
         borderDashOffset: 0.0,
         borderJoinStyle: 'miter',
         borderWidth: 1,
         pointHoverBorderWidth: 0,
         pointRadius: 0,
         pointHitRadius: 0,
         data: []
       },
       {
         label: 'yaxis',
         fill: false,
         borderColor: 'transparent',
         pointRadius: 0,
         data: []
       },
       {
         label: 'yaxis_2',
         fill: false,
         borderColor: 'transparent',
         pointRadius: 0,
         data: []
       }
     ]
   }
 chart_const = {
   	ay: [12, 8, null, null, null],
    timer: 0,
    value: null,
    initValue: null,
    mins: '00',
    secs: '00',
    chartStarted: false
   }
  chart_const_lines = [];
  chart_lines_colors = ['#f2b733', '#6ccddf'];
  
  scale(){
   this.chart_const.ay[0] = 12;
   this.chart_const.ay[1] = 12;
    let formatedArray = [];
    for (var i = 0; i < this.chart_const.ay.length; i++) {
      if (this.chart_const.ay[i] !== null && this.chart_const.ay[i] !== "") {
       formatedArray.push(this.chart_const.ay[i]);
      }
    }
    let high = Math.max.apply(null,formatedArray);
    let low = Math.min.apply(null,formatedArray);
    this.chart_const.ay[0] = high + high * 25/100;
    this.chart_const.ay[1] = low - low * 25/100;
  }
  sendOrdersToServer(){
    this.socket.emit('orders', {buy:this.buyConfiguration.slice(), sell:this.sellConfiguration.slice()})
    this.addedOrdersCount += this.addedOrdersCount;
  }
  resetChart(){
   this.socket.emit('coin', {name: this.globalCoin});
   this.socket.emit('market_summary', {'coin': this.globalCoin});
   this.chart_const.value = null
   this.chart_const.initValue = null
   this.chart_const.chartStarted = false
   this.chart_const.ay[0] = 12;
   this.chart_const.ay[1] = 8;
   this.volume = '00000000'
   this.high = '00000000'
   this.low = '00000000'
   this.last = '00000000'

   this.chart_const_lines = [];
   this.chart_data = {
     labels: ['0:00',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','0:30',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','1:00',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','1:30',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','2:00',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','2:30',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','3:00',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','3:30',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
     datasets: [
       {
         label: 'My First dataset',
         fill: true,
         lineTension: 0.1,
         backgroundColor: 'rgba(75,192,192,0.4)',
         borderColor: 'rgba(75,192,192,1)',
         borderCapStyle: 'butt',
         borderDash: [],
         borderDashOffset: 0.0,
         borderJoinStyle: 'miter',
         borderWidth: 1,
         pointHoverBorderWidth: 0,
         pointRadius: 0,
         pointHitRadius: 0,
         data: []
       },
       {
         label: 'yaxis',
         fill: false,
         borderColor: 'transparent',
         pointRadius: 0,
         data: []
       },
       {
         label: 'yaxis_2',
         fill: false,
         borderColor: 'transparent',
         pointRadius: 0,
         data: []
       }
     ]
   }
  }
}

export default Store;
