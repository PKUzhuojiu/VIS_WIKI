let data = null;
let data_file = "../data/points_3834_5500_processed.json";
let datax = []
let datay = []
d3.json(data_file).then(function (DATA) {
    data = DATA;
    for (var i = 0; i < data.length; i++ )
    {
        if (data[i] == []) {
            continue;
        };
        for (var j = 0; j < data[i].length; j++) { 
            var point = []
            point.push(data[i][j][1])
            point.push(data[i][j][2])
            point.push(data[i][j][3])
            datax.push(point)
        };
    }

    var dom = document.getElementById("left_panel");
    matrixChart = echarts.init(dom);
    var myChart = matrixChart;
    var app = {};

    var COLOR_ALL = [
        '#FF474A',
        '#6AF07A'
      ];

    var option;
    option = {
        tooltip: {
                trigger: 'item',
                formatter: function (datas) {
                    var res = '编辑者: ' + datas.data[0]+ '<br/>';
                    res += '编辑时间:  ' + datas.data[0] + '<br/>'
                    res += '版本号:  ' + datas.data[0] + '<br/>'
                    return res
               }
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
                name:'matrix',
                data: datax,
                type: 'scatter',
                // large: true,
                symbolSize: 5,
                symbol: 'circle',
                emphasis:{
                    itemStyle:{
                        color:"#f8e71c",
                        shadowColor: 'rgba(0, 0, 0, 1)',
                        shadowBlur: 20
                    },
                    focus:'item'
                },
                itemStyle: {
                    color: function (d) {
                        if (d.data[2] == 1) return '#FF474A';
                        else return '#6AF07A';
                    },
                    opacity: 0.5
                }
            }
        ]
    };

    if (option && typeof option === 'object') {
        myChart.setOption(option);
        myChart.on('brushSelected', function (params) {
            var brushComponent = params.batch[0];
        
            var minVersion = 1e8;
            var maxVersion = -1e8;
            var minSentence = 1e8;
            var maxSentence = -1e8;
            var startDate = "";
            var endDate = "";
            var times = 0;
        
            for (var sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
                // 对于每个 series：
                var dataIndices = brushComponent.selected[sIdx].dataIndex;
        
                for (var i = 0; i < dataIndices.length; i++) {
                    times++;
                    var dataIndex = dataIndices[i];
                    if (minVersion > datax[dataIndex][0]){
                        minVersion = datax[dataIndex][0];
                        // startDate = 
                    }
                    if (maxVersion < datax[dataIndex][0]) maxVersion = datax[dataIndex][0];
                    if (minSentence > datax[dataIndex][1]) minSentence = datax[dataIndex][1];
                    if (maxSentence < datax[dataIndex][1]) maxSentence = datax[dataIndex][1];
                }
            }
            if (times == 0){
                var getlength = datax.length;
                for (var i = 0; i < getlength; i++) {
                    times++;
                    if (minVersion > datax[i][0]) minVersion = datax[i][0];
                    if (maxVersion < datax[i][0]) maxVersion = datax[i][0];
                    if (minSentence > datax[i][1]) minSentence = datax[i][1];
                    if (maxSentence < datax[i][1]) maxSentence = datax[i][1];
                }
            }
            // console.log("brush res");
            // console.log(minVersion);
            // console.log(maxVersion);
            // console.log(minSentence);
            // console.log(maxSentence);
            update_and_renew(startDate, endDate, undefined, String(times));
            nGenerateDataFromRange(minVersion, maxVersion, minSentence, maxSentence).then(graph=>{
                option = {
                    
                }
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
