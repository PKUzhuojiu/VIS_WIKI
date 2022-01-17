draw_network()

function draw_network(){
    var chartDom = document.getElementById('bottom_panel');
    networkChart = echarts.init(chartDom);
    var myChart = networkChart;
    var option;
    dataPath = '../data/points.json'
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
                        repulsion:50,
                        gravity:0.005,
                        edgeLength:50,
                        initLayout:'circular'
                    }
                }
            ]
        };
        myChart.setOption(option);
        myChart.on('mouseover', {dataType:'node'}, function(){
            matrixChart.dispatchAction({
                type:'highlight',
                seriesName:'matrix',
                dataIndex: mFindVersionFromAuthor([])
            })
        })
        myChart.on('mouseout', {dataType:'node'}, function(){
            matrixChart.dispatchAction({
                type:'downplay',
                seriesName:'matrix',
                dataIndex: mFindVersionFromAuthor([])
            })
        })
    });
    option && myChart.setOption(option);
}