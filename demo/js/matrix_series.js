let data = null;
let data_file = "../data/points_3834_5500_processed.json";
let datax = {adds:[], deletes:[]}

var dom = document.getElementById("left_panel");
matrixChart = echarts.init(dom);
var myChart = matrixChart;

$.get(data_file, function(data){
    for (var i = 0; i < data.length; i++ )
    {
        if (data[i] == []) {
            continue;
        };
        for (var j = 0; j < data[i].length; j++) { 
            var point = []
            point.push(data[i][j][0])
            point.push(data[i][j][2])
            point.push(data[i][j][3])
            if (data[i][j][3])
                datax.deletes.push(point)
            else
                datax.adds.push(point)
        };
    }

    option = {
        tooltip: {
        },
        dataZoom: [
            {
                type: 'inside'
            },
            {
                type: 'slider'
            }
        ],
        xAxis: {
            type: "time",
            scale: true,
            axisLabel: {
                formatter: '{yyyy}-{MM}-{dd} {hh}:{mm}' ,
                hideOverlap: true
            },
        },
        yAxis: {
            type: "value",
            scale: true,
            // axisLabel: {
            //     formatter: '{yyyy}-{MM}-{dd}' ,
            //     hideOverlap: true
            // },
        },
        legend: [
            {
            
            selectedMode: 'true',
            // data: graph.categories 
            }
        ],
        brush: {
            // removeOnClick = true,
            // throttleType: 'debounce',
            // throttleDelay: Numeric = 10000,
            brushLink: 'all',
            inBrush: {
                // opacity: 1
            }
        },
        series: [
            {
                name:"deletes", 
                data:datax.deletes,
                type:'scatter',
                symbolSize:5,
                symbol:'circle',
                itemStyle:{
                    color: '#FF474A',
                    opacity: 0.3
                },
                emphasis:{
                    itemStyle:{
                        color:"#f8e71c",
                        shadowColor: 'rgba(0, 0, 0, 0.8)',
                        shadowBlur: 10
                    }
                },
                // large:true
            },
            {
                name:"adds", 
                data:datax.adds,
                type:'scatter',
                symbolSize:5,
                symbol:'circle',
                itemStyle:{
                    color: '#6AF07A',
                    opacity: 0.3
                },
                emphasis:{
                    itemStyle:{
                        color:"#f8e71c",
                        shadowColor: 'rgba(0, 0, 0, 0.8)',
                        shadowBlur: 10
                    }
                },
                // large:true
            },
        ],
        animation:false,
        hoverLayerThreshold:1000
    }

    if (option && typeof option === 'object') {
        myChart.setOption(option);
        myChart.on('brushSelected', function (params) {
            var brushComponent = params.batch[0];
        
            var minVersion = 1e8;
            var maxVersion = -1e8;
            var minSentence = 1e8;
            var maxSentence = -1e8;
        
            for (var sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
                // 对于每个 series：
                var dataIndices = brushComponent.selected[sIdx].dataIndex;
        
                for (var i = 0; i < dataIndices.length; i++) {
                    var dataIndex = dataIndices[i];
                    if (minVersion > datax[dataIndex][0]) minVersion = datax[dataIndex][0];
                    if (maxVersion < datax[dataIndex][0]) maxVersion = datax[dataIndex][0];
                    if (minSentence > datax[dataIndex][1]) minSentence = datax[dataIndex][1];
                    if (maxSentence < datax[dataIndex][1]) maxSentence = datax[dataIndex][1];
                }
            }
            if (minVersion == 1e8){
                var getlength = datax.length;
                for (var i = 0; i < getlength; i++) {
                    if (minVersion > datax[i][0]) minVersion = datax[i][0];
                    if (maxVersion < datax[i][0]) maxVersion = datax[i][0];
                    if (minSentence > datax[i][1]) minSentence = datax[i][1];
                    if (maxSentence < datax[i][1]) maxSentence = datax[i][1];
                }
            }
            console.log("brush res");
            console.log(minVersion);
            console.log(maxVersion);
            console.log(minSentence);
            console.log(maxSentence);
            nGenerateDataFromRange(minVersion, maxVersion, minSentence, maxSentence).then(graph=>{
                networkChart.setOption({
                    series:[
                        {
                            data:graph.nodes,
                            links:graph.edges
                        }
                    ]
                })

            });
        });
    }
});

function mFindVersionFromAuthor(authorList){
    // sample
    console.log('find');
    return [1001,1002,1003,1004,1005,1006,1007,1008];
}
