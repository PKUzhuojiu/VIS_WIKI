draw_network()

function draw_network(){
    var chartDom = document.getElementById('bottom_panel');
    networkChart = echarts.init(chartDom);
    var myChart = networkChart;
    var option;
    myChart.showLoading();
    nGenerateDataFromRange().then(function(graph){
    // $.get(dataPath, function(data){
        console.log(graph);
        // graph = nGenerateDataFromRange();
        myChart.hideLoading();
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
            color:['#f5222d', "#fa541c", "#fa8c16","#fadb14", "#d9ef8b", "#7cb305",'#389e0d'],
            // backgroundColor:'#f5f7fa',
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
                    zoom:0.8,
                    // center:[100,100],
                    symbol:'circle',
                    label: {
                        position: 'right',
                        formatter: '{b}'
                    },
                    labelLayout:{
                        hideOverlap:true
                    },
                    edgeSymbol: ['none', 'none'],
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
                        repulsion:50,
                        gravity:0.005,
                        edgeLength:50,
                        initLayout:'none'
                    }
                }
            ]
        };
        myChart.setOption(option);
        myChart.on('mouseover', {dataType:'node'}, function(params){
            mFindVersionFromAuthor([params.name]).then(data =>{
                console.log([params.name]);
                console.log(data);
                matrixChart.dispatchAction({
                    type:'highlight',
                    seriesName:'matrix',
                    dataIndex: data
                })
            })
        })
        myChart.on('mouseout', {dataType:'node'}, function(params){
            mFindVersionFromAuthor([params.name]).then(data =>{
                matrixChart.dispatchAction({
                    type:'downplay',
                    seriesName:'matrix',
                    dataIndex: data
                })
            })
        })
    });
    option && myChart.setOption(option);
}