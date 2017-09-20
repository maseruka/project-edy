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
}

export default Store;
