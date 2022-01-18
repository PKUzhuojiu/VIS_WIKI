let data = null;
let data_file = "../data/newpoints_less_all_processed.json";

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
            point.push(data[i][j][4])
            point.push(data[i][j][5])
            point.push(data[i][j][0])
            point.push(data[i][j][6])
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
                    var res = '编辑者: ' + datas.data[4]+ '<br/>';
                    res += '编辑时间:  ' + datas.data[0] + '<br/>'
                    res += '版本号:  ' + datas.data[3] + '<br/>'
                    return res
                },
                axisPointer: {
                    show: true,
                    type: 'cross',
                    lineStyle: {
                        type: 'dashed',
                        width: 1
                    }
                }
        },
        dataZoom: [
            {
                type: 'inside'
            },
            {
                show: false,
                type: 'slider',
                showDataShadow:false,
                filterMode:'empty'
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
        // yAxis: {
        //     type: "value",
        //     scale: true,
        //     // axisLabel: {
        //     //     formatter: '{yyyy}-{MM}-{dd}' ,
        //     //     hideOverlap: true
        //     // },
        // },
        yAxis: {
            "show" : false,
            // data: [1000,3000,7000,7050,8000],
            axisLabel:{
                formatter: function (value) {
                    var texts = [];
                    if(value==1000){
                    texts.push('woo');
                    }
                    else{
                    texts.push('2');
                    }
                    return texts;
                }
            }
        },
        brush: {
            removeOnClick :true,
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
                        // color:"#f1c40f",
                        shadowColor: 'rgba(0, 0, 0, 0.8)',
                        // shadowBlur: 10,
                        // borderColor:"#f1c40f",
                        borderWidth:3,
                        opacity:1
                    },
                    focus:'item',
                    blurScope:'global'
                },
                itemStyle: {
                    color: function (d) {
                        if (d.data[2] == 0) return '#FF474A';
                        else return '#6AF07A';
                    },
                    opacity: 0.5
                },
                blur:{
                    itemStyle:{
                        color:'rgb(0,0,0,0.3)'
                    }
                },
                markLine: {
                    symbol: ['none', 'none'],//去掉箭头
                    silent: true,
                    itemStyle: {
                        normal: {
                            
                        }
                    },
                    data: [
                        {
                            name: 'Intro and Contents',
                            //value:'Intro and Contents',
                            
                            yAxis: 831,             //鼠标悬停事件  true没有，false有
                            lineStyle: {
                                
                                type: 'solid',
                                color:'gray'
                            },
                            label:{
                                show:false,
                                fontSize:'10',
                                position:'start',
                                formatter:"Intro and Contents",
                            },
                          },
                          {
                            name: 'Personal life',
                           // value: 'Personal life',
                            yAxis: 1162,             //鼠标悬停事件  true没有，false有
                            lineStyle: {
                                
                                type: 'solid',
                                color:'gray'
                            },
                            label:{show:false,fontSize:'10',
                                position:'start',
                                formatter:"Personal life",
                            },
                          },
                          {
                            name: 'Business career',
                            //value: 'Business career',
                            yAxis: 1387,             //鼠标悬停事件  true没有，false有
                            lineStyle: {
                                
                                type: 'solid',
                                color:'gray'
                            },
                            label:{show:false,fontSize:'10',
                                position:'start',
                                formatter:"Business career",
                            },
                          },
                          {
                            name: 'Media career',
                            value: 'Media career',
                            yAxis: 1473,             //鼠标悬停事件  true没有，false有
                            lineStyle: {
                                
                                type: 'solid',
                                color:'gray'
                            },
                            label:{show:false,fontSize:'10',
                                position:'start',
                                formatter:"Media career",
                            },
                          },
                          {
                            name: 'Pre-presidential political career',
                            value: 'Pre-presidential political career',
                            yAxis: 1654,             //鼠标悬停事件  true没有，false有
                            lineStyle: {
                                
                                type: 'solid',
                                color:'gray'
                            },
                            label:{show:false,fontSize:'10',
                                position:'start',
                                formatter:"Pre-presidential political career",
                            },
                          },
                          {
                            name: 'Presidency (2017-2021)',
                            value: 'Presidency (2017-2021)',
                            yAxis: 3088,             //鼠标悬停事件  true没有，false有
                            lineStyle: {
                                
                                type: 'solid',
                                color:'gray'
                            },
                            label:{show:false,fontSize:'10',
                                position:'start',
                                formatter:"Post-presidency (2017-2021)",
                            },
                          },
                          {
                            name: 'Post-presidency',
                            value: 'Post-presidency',
                            yAxis: 3223,             //鼠标悬停事件  true没有，false有
                            lineStyle: {
                                
                                type: 'solid',
                                color:'gray'
                            },
                            label:{show:false,fontSize:'10',
                                position:'start',
                                formatter:"Post-presidency",
                            },
                          },
                          {
                            name: 'Public profile',
                            value:'Public profile',
                            yAxis: 3867 ,
                            silent:false,             //鼠标悬停事件  true没有，false有
                            lineStyle: {
                                type: 'solid',
                                color:'gray'
                            },
                            label:{show:false,fontSize:'10',
                                position:'start',
                                formatter:"Public profile",
                            },
                           
                          },
                          
                        {
                          name: 'Intro and Contents',
                          //value:'Intro and Contents',
                          
                          yAxis: 415,             //鼠标悬停事件  true没有，false有
                          lineStyle: {
                           color:'white'
                        },
                          label:{
                              fontSize:'10',
                              position:'start',
                              formatter:"Intro and Contents",
                          },
                        },
                        {
                          name: 'Personal life',
                         // value: 'Personal life',
                          yAxis: 997,             //鼠标悬停事件  true没有，false有
                          lineStyle: {
                            color:'white'
                         },
                          label:{fontSize:'10',
                              position:'start',
                              formatter:"Personal life",
                          },
                        },
                        {
                          name: 'Business career',
                          //value: 'Business career',
                          yAxis: 1175,             //鼠标悬停事件  true没有，false有
                          lineStyle: {
                            color:'white'
                         },
                          label:{fontSize:'10',
                              position:'start',
                              formatter:"Business career",
                          },
                        },
                        {
                          name: 'Media career',
                          value: 'Media career',
                          yAxis: 1431,             //鼠标悬停事件  true没有，false有
                          lineStyle: {
                            color:'white'
                         },
                          label:{fontSize:'10',
                              position:'start',
                              formatter:"Media career",
                          },
                        },
                        {
                          name: 'Pre-presidential political career',
                          value: 'Pre-presidential political career',
                          yAxis: 1564,             //鼠标悬停事件  true没有，false有
                          lineStyle: {
                            color:'white'
                         },
                          label:{fontSize:'10',
                              position:'start',
                              formatter:"Pre-presidential political career",
                          },
                        },
                        {
                          name: 'Presidency (2017-2021)',
                          value: 'Presidency (2017-2021)',
                          yAxis: 2372,             //鼠标悬停事件  true没有，false有
                          lineStyle: {
                            color:'white'
                         },
                          label:{fontSize:'10',
                              position:'start',
                              formatter:"Post-presidency (2017-2021)",
                          },
                        },
                        {
                          name: 'Post-presidency',
                          value: 'Post-presidency',
                          yAxis: 3156,             //鼠标悬停事件  true没有，false有
                          lineStyle: {
                            color:'white'
                         },
                          label:{fontSize:'10',
                              position:'start',
                              formatter:"Post-presidency",
                          },
                        },
                        {
                          name: 'Public profile',
                          value:'Public profile',
                          yAxis: 3546 ,
                          silent:false,             //鼠标悬停事件  true没有，false有
                          lineStyle: {
                            color:'white'
                         },
                          label:{fontSize:'10',
                              position:'start',
                              formatter:"Public profile",
                          },
                         
                        },
                        
                      ]
                }
            }
            
        ]
    };

    if (option && typeof option === 'object') {
        myChart.setOption(option);
        // myChart.on('datazoom', function(params){
        //     var option = myChart.getOption();
        //     console.log(option.dataZoom[0].start, option.dataZoom[0].end);
        //     var getlen = datax.length;
        //     range_list = []
        //     var id1 = -1;
        //     var id2 = -1;
        //     var mxline = 0;
        //     for (var i = 0; i < getlen; i++) {
        //         if (datax[i][1] > mxline) mxline = datax[i][1];
        //         var t1 = ((100 * i) + 50) / getlen;
        //         var t2 = ((100 * i) - 50) / getlen;
        //         if ((t1 > option.dataZoom[0].start) && (t2 < option.dataZoom[0].end)){
        //             range_list.push(i);
        //             if (id1 == -1) id1 = i;
        //             id2 = i;
        //         }
        //     }
        //     console.log(range_list)
        //     matrixChart.dispatchAction({
        //         type:'brush',
        //         areas: [
        //           {
        //             brushType: 'rect',
        //             coordRange: [[datax[id1][0], datax[id2][0]], [0, mxline]]
        //           }
        //         ]
        //     })
        // })
        myChart.on('brushSelected', function (params) {
            var brushComponent = params.batch[0];
        
            var minVersion = 1e8;
            var maxVersion = -1e8;
            var minSentence = 1e8;
            var maxSentence = -1e8;
            var startDate = "";
            var endDate = "";
            var times = 0;
            var editors = 0;
            var editors_list = [];
        
            for (var sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
                // 对于每个 series：
                var dataIndices = brushComponent.selected[sIdx].dataIndex;
        
                for (var i = 0; i < dataIndices.length; i++) {
                    times++;
                    var dataIndex = dataIndices[i];
                    var this_editor = datax[dataIndex][4];
                    if (editors_list.indexOf(this_editor) == -1){
                        editors_list.push(this_editor);
                        editors++;
                    }
                    if (minVersion > datax[dataIndex][3]){
                        minVersion = datax[dataIndex][3];
                        endDate = datax[dataIndex][0]
                    }
                    if (maxVersion < datax[dataIndex][3]){
                        maxVersion = datax[dataIndex][3];
                        startDate = datax[dataIndex][0]
                    } 
                    if (minSentence > datax[dataIndex][1]) minSentence = datax[dataIndex][1];
                    if (maxSentence < datax[dataIndex][1]) maxSentence = datax[dataIndex][1];
                }
            }
            if (times == 0){
                var getlength = datax.length;
                for (var i = 0; i < getlength; i++) {
                    times++;
                    var this_editor = datax[i][4];
                    if (editors_list.indexOf(this_editor) == -1){
                        editors_list.push(this_editor);
                        editors++;
                    }
                    if (minVersion > datax[i][3]){
                        minVersion = datax[i][3];
                        endDate = datax[i][0]
                    }
                    if (maxVersion < datax[i][3]){
                        maxVersion = datax[i][3];
                        startDate = datax[i][0]
                    } 
                    if (minSentence > datax[i][1]) minSentence = datax[i][1];
                    if (maxSentence < datax[i][1]) maxSentence = datax[i][1];
                }
            }
            // console.log("brush res");
            // console.log(minVersion);
            // console.log(maxVersion);
            // console.log(minSentence);
            // console.log(maxSentence);
            update_and_renew(startDate, endDate, editors, String(times));
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
    return new Promise((resolve, reject)=>{
        mFindVersionFromAuthorAsync(authorList, data=>{resolve(data)})
    })
}

function mFindVersionFromAuthorAsync(authorList, resolve){
    // sample
    // console.log('find');
    focus_list = []
    var getlength = datax.length;
    for (var i = 0; i < getlength; i++) {
        if (authorList.indexOf(datax[i][4]) > -1){
            console.log("find it")
            // should highlight
            focus_list.push(i)
        }
    }
    resolve(focus_list);//[1001,1002,1003,1004,1005,1006,1007,1008];
}
