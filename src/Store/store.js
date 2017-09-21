import { observable } from 'mobx'
import io from 'socket.io-client';
var randomize = require('randomatic');
class Store{

	socket = io();

	@observable sellConfiguration = [
							{
							sell: 60, 
                            at: 0, 
                            id: this.genRand(), 
                            todo: 'SELL', 
                            put: '%', 
                            time: this.currentTime, 
                            todon: '0.0000000', 
                            filled: '0.0000000', 
                            rem: '0.0000000', 
                            status: 'open'
                        },
                        {
							sell: 40, 
                            at: 0, 
                            id: this.genRand(), 
                            todo: 'SELL', 
                            put: '%', 
                            time: this.currentTime, 
                            todon: '0.0000000', 
                            filled: '0.0000000', 
                            rem: '0.0000000', 
                            status: 'open'
                        }]
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
	genRand(){
      let rand = randomize(10);
      return rand
	}
}

export default Store;
