import { observable } from 'mobx'

class Store{
	@observable sellConfiguration = []
	@observable buyConfiguration  = [{
							id: 1, 
							buy: 0, 
							sell: 0,
							todo: 'BUY', 
                            time: '9:23:11', 
                            todon: '0.0000000',
                            filled: '0.0000000', 
                            rem: '0.0000000',
                        	status: 'closed'}]
	@observable openOrders = []
}

export default Store;