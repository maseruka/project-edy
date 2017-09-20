module.exports = {
	mx_options: {
         animation : false,
	     tooltips: {enabled: false},
	     hover: {mode: null},
	     scales: {
         xAxes: [{gridLines: {display:false}, ticks:{fontSize: 15}}],
         yAxes: [{gridLines: {display:false}, ticks:{fontSize: 15}}]
         },
         legend: {display: false}
     },
    mx_data: {
     labels: [],
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
         pointBorderColor: 'rgba(75,192,192,1)',
         pointBackgroundColor: '#fff',
         pointBorderWidth: 1,
         pointHoverRadius: 5,
         pointHoverBackgroundColor: 'rgba(75,192,192,1)',
         pointHoverBorderColor: 'rgba(220,220,220,1)',
         pointHoverBorderWidth: 2,
         pointRadius: 0,
         pointHitRadius: 10,
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
   },
   mx_const: {
   	ay: [],
    timer: 0,
    value: null,
    initValue: null,
    mins: '00',
    secs: '00',
    chartStarted: false
   },
   mx_const_lines : [],
   mx_const_lines_type: [],
}