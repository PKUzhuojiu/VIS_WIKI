// var echarts = require('echarts');
let _width = $(window).width();
let _height = $(window).height();
let width = _width;
let height = _height;

var chartDom = document.getElementById('container');
var myChart = echarts.init(chartDom);
var option;
dataPath = '../data/relation_detail.json'

myChart.showLoading();
$.get(dataPath, function(graph){
  console.log(graph);
  myChart.hideLoading();
  graph.nodes.forEach(node => {
    node.symbolSize = node.count/100+5;
    node.symbol = 'circle'
    node.label = {'show': (node.symbolSize > 10)}
    if (node.ratio < 1/3)
      node.category = 0
    else if (node.ratio < 1/2)
      node.category = 1
    else if (node.ratio < 0.8)
      node.category = 2
    else if (node.ratio < 1.25)
      node.category = 3
    else if (node.ratio < 2)
      node.category = 4
    else if (node.ratio < 3)
      node.category = 5
    else
      node.category = 6
  });
  graph.edges.forEach(edge =>{
    edge.lineStyle= {'width': 1 + edge.relation/40};
    edge.symbolSize = 2+edge.relation/10;
  });
  option = {
    title: {
      text: 'User Relation in 2020',
      top: 'bottom',
      left: 'right'
    },
    tooltip: {},
    legend: [
      {
        
        selectedMode: 'true',
        // data: graph.categories 
      }
    ],
    animationDuration: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        name: 'user relation 2020',
        type: 'graph',
        layout: 'force',
        data: graph.nodes,
        links: graph.edges,
        categories: graph.categories,
        roam: true,
        symbol:'circle',
        label: {
          position: 'right',
          formatter: '{b}'
        },
        labelLayout:{
          hideOverlap:true
        },
        edgeSymbol: ['none', 'arrow'],
        lineStyle: {
          color: 'source',
          curveness: 0.2,
          join:'round',
          cap:'none',
          opacity:0.8
        },
        emphasis: {
          focus: 'adjacency',
          // lineStyle: {
          //   width: 10
          // }
        },
        force:{
          repulsion:200,
          gravity:0.001,
          edgeLength:50,
          initLayout:'circular'
        }
      }
    ]
  };
  myChart.setOption(option);
});
option && myChart.setOption(option);