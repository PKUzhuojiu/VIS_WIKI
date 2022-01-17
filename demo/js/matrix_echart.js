let data = null;
let data_file = "./data/points.json";
let datax = []
let datay = []
d3.json(data_file).then(function (DATA) {
    data = DATA;
    // console.log(data)
    for (var i = 0; i < data.length; i++ )
    {
        if (data[i] == []) {
            continue;
        };
        for (var j = 0; j < data[i].length; j++) { 
            var point = []
            point.splice(0, 0, data[i][j][1], data[i][j][2], data[i][j][3], data[i][j][0]);
            // console.log(point);
            datax.splice(-1, 0, point);
        };
    }
    // console.log(datax);

    var dom = document.getElementById("left_panel");
    matrixChart = echarts.init(dom);
    var myChart = matrixChart;
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
                name:'matrix',
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
                },
                emphasis:{
                    focus:'self',
                    itemStyle:{
                        color:"#fac858",
                        borderWidth:1
                    }
                }
            }
        ]
    };

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }
});

function mFindVersionFromAuthor(authorList){
    // sample
    console.log('find');
    return [1001,1002,1003,1004,1005,1006,1007,1008];
}
