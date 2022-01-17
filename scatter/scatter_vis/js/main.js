let data = null;
let data_file = "./data/points_3834_5500_processed.json";
let datax = []
let datay = []
d3.json(data_file).then(function (DATA) {
    data = DATA;
    console.log(data)
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
    //console.log(datax);

    var dom = document.getElementById("container");
    var myChart = echarts.init(dom);
    var app = {};

    var COLOR_ALL = [
        '#FF474A',
        '#6AF07A'
      ];
      var pieces = [];
      for (var i = 0; i < 2; i++) {
        pieces.push({
          value: i,
          label: 'cluster ' + i,
          color: COLOR_ALL[i]
        });
      }
    
    var option;
    option = {
        tooltip: {
            position: 'top'
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
                formatter: '{yyyy}-{MM}-{dd}' ,
                hideOverlap: true
            },
        },
        yAxis: {},
        brush: {
            // removeOnClick = true,
            throttleType: 'debounce',
            brushLink: 'all',
            inBrush: {
                // opacity: 1
            }
        },
        series: [
            {
                symbolSize: 20,
                data: datax,
                type: 'scatter',
                large: true,
                symbolSize: 5,
                symbol: 'circle',
                itemStyle: {
                    color: function (d) {
                        if (d.data[2] == 1) return '#FF474A';
                        else return '#6AF07A';
                    },
                    opacity: 0.3
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
            // console.log("brush res");
            // console.log(minVersion);
            // console.log(maxVersion);
            // console.log(minSentence);
            // console.log(maxSentence);
            // nGenerateDataFromRange(minVersion, maxVersion, minSentence, maxSentence);
        });
    }
});

