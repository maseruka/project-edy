import { observable } from 'mobx'

class Store{
	@observable sellConfiguration = [{id: 1, todo: 'SELL'}]
}

export default Store;