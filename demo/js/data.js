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

    function get_node(data, author, params){
        var nodes = []
        return nodes;
    }

    function get_edge(data, author, params){
        return edges
        
    }

    var res = { nodes:nodes, edges:edges,categories:categories}
    $.get('data/points.json', function(data){
        $.get('data/authors.json', function(author){
            //* nodes
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
                    if (p[2] < params.minSentence || p[2] > params.maxSentence)
                        return true;
                    if (p[3]){
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


            var add_list = {};
            var relation_detail = {'source':[], 'target':[], 'relation':[]};
            var users = [];

            function find_pairs(source, target){
            }

            // generation lists
            data.forEach(pairs => {
                // Version filter
                if (pairs.length == 0)
                    return true;
                if (pairs[0][0] < params.minVersion || pairs[0][0] > params.maxVersion)
                    return true;

                pairs.forEach(p => {
                    // sentence filter
                    if (p[2] < params.minSentence || p[2] > params.maxSentence)
                        return true;

                    if (p[3] == 0){
                        add_list[p[2]] = p[0]               
                    }
                    if (p[3] == 1 && add_list.hasOwnProperty(p[2])){
                        source = author[add_list[p[2]]];
                        target = author[p[0]];
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

            cat_list = ['strong deleter', 'deleter', 'gentle deleter','medium','gentle adder', 'adder', 'strong adder'];
            cat_list.forEach(element => {
                categories.push({name:element})
            })
            resolve(res);
        })
    }) ;
}
