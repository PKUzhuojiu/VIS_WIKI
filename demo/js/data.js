function nGenerateDataFromRange(minVersion=0, maxVersion=5000, minSentence=0, maxSentence=50000){
    return new Promise((resolve, reject) =>{
        nGenerateDataFromRangeAsync(minVersion, maxVersion, 
            minSentence, maxSentence, data=>{resolve(data)});
    })
}
function nGenerateDataFromRangeAsync(minVersion=0, maxVersion=5000, 
    minSentence=0, maxSentence=50000, resolve){
    var nodes = []
    var edges = []
    var categories = []
    const params = {
        minVersion:minVersion,
        maxVersion:maxVersion,
        minSentence:minSentence,
        maxSentence:maxSentence,
    }

    var res = { nodes:nodes, edges:edges,categories:categories}
    $.get('data/newpoints_less_all_processed.json', function(data){
        $.get('data/authors.json', function(author){
            //#region nodes
            var user_dict = {}

            // generate dict
            data.forEach(pairs => {
                // Version filter
                if (pairs.length == 0)
                    return true;
                if (pairs[0][0] < params.minVersion || pairs[0][0] > params.maxVersion)
                    return true;
                if (!user_dict.hasOwnProperty(author[pairs[0][0]])){
                    user_dict[author[pairs[0][0]]] = {
                        adds:0,
                        deletes:0
                    }
                }       
                
                pairs.forEach(p => {
                    // sentence filter
                    if (p[4] < params.minSentence || p[4] > params.maxSentence)
                        return true;
                    if (p[5] == 0){
                        user_dict[author[p[0]]].deletes++;
                    }
                    else{
                        user_dict[author[p[0]]].adds++;
                    }
                });
            });
            
            // to node
            for (const name in user_dict) {
                if (Object.hasOwnProperty.call(user_dict, name)) {
                    const user = user_dict[name];
                    nodes.push({
                        name:name,
                        count: user.adds+user.deletes,
                        ratio: user.adds/user.deletes
                    })
                }
            }
            console.log(nodes);
            //#endregion

            //#region edges
            var add_list = {};
            var relation_detail = {'source':[], 'target':[], 'relation':[]};
            var users = [];

            // generation lists
            data.forEach(pairs => {
                // Version filter
                if (pairs.length == 0)
                    return true;
                if (pairs[0][0] < params.minVersion || pairs[0][0] > params.maxVersion)
                    return true;

                pairs.forEach(p => {
                    // sentence filter
                    if (p[4] < params.minSentence || p[4] > params.maxSentence)
                        return true;

                    if (p[5] == 1){
                        add_list[p[4]] = p[0]               
                    }
                    if (p[5] == 0 && add_list.hasOwnProperty(p[4])){
                        target = author[add_list[p[4]]];
                        source = author[p[0]];
                        if (source == target)
                            return true;
                        
                        // find index
                        idx = -1;
                        if (users.indexOf(source) == -1)
                            users.push(source);
                        if (users.indexOf(target) == -1)
                            users.push(target);
                        for (let i = 0; i < relation_detail.source.length; i++) {
                            if (relation_detail.source[i] == source 
                                && relation_detail.target[i] == target && source != target){
                                idx = i;
                                break;
                            }
                        }

                        if (idx > -1){
                            relation_detail.relation[idx]++;
                        }
                        else{
                            relation_detail.relation.push(1);
                            relation_detail.source.push(source);
                            relation_detail.target.push(target);
                        }
                    }
                });
            });

            // reshape
            for (let i = 0; i < relation_detail.source.length; i++) {
                edges.push({
                    source:relation_detail.source[i],
                    target:relation_detail.target[i],
                    relation:relation_detail.relation[i]
                })
            }
            console.log(edges);
            //#endregion

            //#region categories
            cat_list = ['strong deleter', 'deleter', 'gentle deleter','medium','gentle adder', 'adder', 'strong adder'];
            cat_list.forEach(element => {
                categories.push({name:element})
            })
            //#endregion categories

            //#region figure attributes
            // 先统计edge和node的最大值
            var maxCount = 0;
            var maxRelation = 0;
            res.nodes.forEach(node=>{
                if (node.count > maxCount)
                    maxCount = node.count;
            })
            res.edges.forEach(edge=>{
                if (edge.relation > maxRelation)
                    maxRelation = edge.relation;
            })
            var nodeCoef = maxCount / 30;
            var edgeCoef = maxRelation / 8;

            res.nodes.forEach(node => {
                node.symbolSize = node.count/nodeCoef+5;
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
                node.tooltip = {
                    formatter:(params, ticks, callback)=>{
                        var result = '<div><span style="display:inline-block;margin-right:5px; margin-bottom:2px;border-radius:10px;width:9px;height:9px;background-color:'
                                    +params.color +
                                    '"></span>';
                        result +=  params.name + "</div>"
                        result += '编辑次数<b style="margin-left:10px">' + params.data.count
                            + '</b><br\>编辑增删比<b style="margin-left:10px">' + params.data.ratio.toFixed(2)+"</b>";
                        return result;
                    }
                }
            });

            res.edges.forEach(edge =>{
                edge.lineStyle= {'width': 1 + edge.relation/edgeCoef};
                edge.symbolSize = 2+edge.relation/edgeCoef*3;
                edge.tooltip = {
                    formatter:(params, ticks, callback)=>{
                        var result =  "<div>" + params.name + "</div>"
                        result += '修改次数<b style="margin-left:15px">' + params.data.relation
                        return result;
                    }
                }
            });
            //#endregion
            resolve(res);
        })
    }) ;
}
