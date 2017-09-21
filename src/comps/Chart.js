import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import { observer } from 'mobx-react';
import {chart_options} from './data';

@observer
class App extends Component {
  constructor(props){
    super(props);
    this.store = this.props.store;
    this.socket = this.store.socket;
    this.coin = this.props.coin;
    this.state = {dats : 0};
  }
  componentDidMount() {
    this.socket.emit('coin', {name: this.coin});
    this.socket.on('data', (data)=>{
      if (data.coin != this.coin) {

      }else{
        this.store.chart_const.value = data.data.result.Last;
         if (!this.store.chart_const.chartStarted) {
          this.store.chart_const.initValue = this.store.chart_const.value;
          this.getLineValues(data.data.result.Last);
          this.updateChart();
          this.store.chart_const.chartStarted = true;
        }
      }
    })
  }
  componentDidUpdate() {
     console.log(this.coin = this.props.coin);
    this.whenChartReachesMaximumAtY();
    this.getLineValues(this.store.chart_const.initValue);
  }
  whenChartReachesMaximumAtY(){
    if (this.store.chart_data.datasets[0].data.length === 240) {
         //this.store.chart_data.labels.shift();
         this.store.chart_data.datasets[0].data.shift();
         //this.store.chart_data.labels.push('00:00');
         //mx_data.datasets[0].data.splice(0, 30);
         this.setState({dats: this.state.dats++});
    }
  }
  updateChart(){

    setInterval(()=>{
     //   ++this.store.chart_const.timer;
     //   this.store.chart_const.secs = pad(parseInt(this.store.chart_const.timer%60));
     //   this.store.chart_const.mins = pad(parseInt(this.store.chart_const.timer/60));
     // if(this.store.chart_data.labels.length > 15){
     //   this.store.chart_data.labels.shift();  
     //   this.store.chart_data.datasets[0].data.shift();
     // }

       // this.store.chart_data.labels = [...this.store.chart_data.labels, this.store.chart_const.mins+":"+this.store.chart_const.secs];
       this.store.chart_data.datasets[0].data = [...this.store.chart_data.datasets[0].data, this.store.chart_const.value];
       for (let i = 0; i < this.store.chart_const_lines.length; i++) {
         if (i >= 2) {
            this.controlLines(i);
         }
          this.store.chart_data.datasets[i+1].data = this.store.chart_const_lines[i];
      }
       this.setState({dats: this.state.dats++});
     }, 1000);
  }
  getLineValues(value){
    for (var i = 0; i < this.store.chart_const.ay.length; i++) {
      if (i === 0) {
        let vax = value + value*this.store.chart_const.ay[i]/100;
        this.store.chart_const_lines[i] = const_vals_to_array(vax);
      }
      else if (i === 1) {
         let vax = value - value*this.store.chart_const.ay[i]/100;
         this.store.chart_const_lines[i] = const_vals_to_array(vax);
      }else{
        if (this.store.chart_const.ay[i] === null) {
          this.store.chart_const_lines[i] = [];
        }else{
          let vax = value + value*this.store.chart_const.ay[i]/100;
          this.store.chart_const_lines[i] = const_vals_to_array(vax);
        }
      }
     }
  }
  controlLines(index){
          let rando = Math.random()+'';
           if (index === 2) {
               this.store.chart_data.datasets[index+1] = {
                                    label: rando,
                                    fill: false,
                                    pointRadius: 0,
                                    borderColor: this.store.chart_lines_colors[0],
                                    data: [],
                                    borderWidth: 0.4,
                                    pointBorderWidth: 0
                                   };
           }else{
               this.store.chart_data.datasets[index+1] = {
                                    label: rando,
                                    fill: false,
                                    pointRadius: 0,
                                    borderColor: this.store.chart_lines_colors[1],
                                    data: [],
                                    borderWidth: 0.4,
                                    pointBorderWidth: 0
                                   };
           }
  }
  render() {
    return (
      <div className="App">
        <Line data={this.store.chart_data} options={chart_options} />
      </div>
    );
  }
}

function pad(val){
  var valString = val + "";
  if(valString.length < 2){
      return "0" + valString;
  }
  else{
      return valString;
  }
}
function const_vals_to_array(value) {
  let arr = [];
  for (var i = 0; i < 240; i++) {
    arr.push(value+"");
    if (i === 239) {
      return arr;
    }
  }
}

export default App;
