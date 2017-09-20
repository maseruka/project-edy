import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import {mx_options, mx_data, mx_const, mx_const_lines_type, mx_const_lines} from './data';

class App extends Component {
  constructor(props){
    super(props);
    mx_const.ay = this.props.data;
    this.socket = this.props.store.socket;
    this.coin = this.props.coin;
    this.state = {dats : 0};
    console.log(mx_const.ay);
  }
  componentDidMount() {
    this.socket.emit('coin', {name: this.coin});
    this.socket.on('data', (data)=>{
       mx_const.value = data.result.Last;
        if (!mx_const.chartStarted) {
          mx_const.initValue = mx_const.value;
          this.getLineValues(data.result.Last);
          this.updateChart();
          mx_const.chartStarted = true;
        }
    })
  }
  componentDidUpdate() {
    //this.whenChartReachesMaximumAtY();
  }
  updateChart(){

    setInterval(()=>{
       ++mx_const.timer;
       mx_const.secs = pad(parseInt(mx_const.timer%60));
       mx_const.mins = pad(parseInt(mx_const.timer/60));
     if(mx_data.labels.length > 15){
       mx_data.labels.shift();  
       mx_data.datasets[0].data.shift();
     }

       mx_data.labels = [...mx_data.labels, mx_const.mins+":"+mx_const.secs];
       mx_data.datasets[0].data = [...mx_data.datasets[0].data, mx_const.value];
       for (let i = 0; i < mx_const_lines.length; i++) {
        if (!mx_data.datasets[i+1]) {
          let rando = Math.random()+'';
           if (i === 2) {
               mx_data.datasets[i+1] = {
                                    label: rando,
                                    fill: false,
                                    pointRadius: 0,
                                    borderColor: mx_const_lines_type[0],
                                    data: [],
                                    borderWidth: 0.4,
                                    pointBorderWidth: 0
                                   };
           }else{
               mx_data.datasets[i+1] = {
                                    label: rando,
                                    fill: false,
                                    pointRadius: 0,
                                    borderColor: mx_const_lines_type[1],
                                    data: [],
                                    borderWidth: 0.4,
                                    pointBorderWidth: 0
                                   };
           }
        }
        mx_data.datasets[i+1].data = [...mx_data.datasets[i+1].data, mx_const_lines[i]];
         }
       this.setState({dats: this.state.dats++});
     }, 1000);
  }
  getLineValues(value){
    for (var i = 0; i < mx_const.ay.length; i++) {
      mx_const.ay[i] = parseInt(mx_const.ay[i]);
      if (i === 0) {
        mx_const_lines[i] = value + value*mx_const.ay[i]/100;
      }
      else if (i === 1) {
         mx_const_lines[i] = value - value*mx_const.ay[i]/100;
      }else{
         mx_const_lines[i] = value + value*mx_const.ay[i]/100;
      }
     }
  }
  render() {
    return (
      <div className="App">
       <Line data={mx_data} options={mx_options} />
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

export default App;
