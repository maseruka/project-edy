import { observable } from 'mobx'
import io from 'socket.io-client';
class Store{

	socket = io('http://192.168.43.149:9898');

	@observable sellConfiguration = []
	@observable buyConfiguration  = [{
							id: 1, 
							buy: 0, 
							at: 0,
							todo: 'BUY', 
                            time: this.currentTime(), 
                            todon: '0.0000000',
                            filled: '0.0000000', 
                            rem: '0.0000000',
                        	status: 'open'}]
	@observable openOrders = []
	@observable allConfigs = []
	@observable showChart = null
	@observable globalCoin = ''
	@observable volume = '00000000'
	@observable high = '00000000'
	@observable low = '00000000'
	@observable last = '00000000'

	currentTime(){
		let d = new Date()
		let h = d.getHours()
		let m = d.getMinutes()
		let s = d.getSeconds()
		let currentTime = h + ':' + m + ':' + s
		return currentTime
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
   	ay: [12, 8, null],
    timer: 0,
    value: null,
    initValue: null,
    mins: '00',
    secs: '00',
    chartStarted: false
   }
  chart_const_lines = [];
  chart_lines_colors = ['#f2b733', '#6ccddf'];

  resetChart(){
   this.socket.emit('coin', {name: this.globalCoin});
   this.chart_const.value = null
   this.chart_const.initValue = null
   this.chart_const.chartStarted = false


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
