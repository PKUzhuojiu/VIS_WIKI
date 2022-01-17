function data_generation(minVersion, maxVersion, minSentence, maxSentence){
    nodes = []
    edges = []
    categories = []
    params = {
        minVersion:minVersion,
        maxVersion:maxVersion,
        minSentence:minSentence,
        maxSentence:maxSentence,
    }
    $.get('data/points.json', function(data){
        nodes = get_node(data);
        edges = get_edges(data);
        cat_list = ['strong deleter', 'deleter', 'gentle deleter','medium','gentle adder', 'adder', 'strong adder'];
        cat_list.forEach(element => {
            categories.push({name:element})
        })
    })
}

function get_node(data, params){
    add_list = {};
    relation_detail = {'source':[], 'target':[], 'relation':[]};
    users = [];

    function find_pairs(source, target){
        if (users.indexOf(source) == -1)
            users.push(source);
        if (users.indexOf(target) == -1)
            users.push(target);
        for (let i = 0; i < relattion_detail.source.length; i++) {
            if (relation_detail.source[i] == source && relation_detial.target[i] == target && source != target)
                return i;
        }
        return -1;
    }

    data.forEach(pairs => {
        // Version filter
        if (pairs[0][0] < params.minVersion || pairs[0][0] > params.maxVersion)
            continue;

        pairs.forEach(p => {
            // sentence filter
            if (p[2] < params.minSentence || p[2] > params.maxSentence)
                continue;

            if (p[3] == 0){
                add_list.p[2] = p[0]               
            }
            if (p[3] == 1 && add_list.hasOwnProperty(p[2])){
                source = 
            }
        });
    });
    
}