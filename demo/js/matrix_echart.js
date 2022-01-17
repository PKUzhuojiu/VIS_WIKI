let data = null;
let data_file = "./data/points.json";
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
            point.splice(0, 0, data[i][j][1], data[i][j][2], data[i][j][3], data[i][j][0]);
            console.log(point);
            datax.splice(-1, 0, point);
        };
    }
    //console.log(datax);

    var dom = document.getElementById("left_panel");
    var myChart = echarts.init(dom);
    var app = {};

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
            type: "value",
            scale: true
        },
        yAxis: {},
        series: [
            {
                symbolSize: 20,
                data: datax,
                type: 'scatter',
                symbolSize: 10,
                symbol: function (dataItem) {
                    if (dataItem[2] == 1) {
                        return 'circle';
                    }
                    else {
                        return 'rect';
                    }
                    return dataItem[1] * 4;
                }
            }
        ]
    };

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }
});

