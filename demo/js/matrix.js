// ! Deprecated
let x_attr = 0;
let y_attr = 2;

let fontFamily;

function draw_matrix() {
    var div = d3.select('#left_panel')
    var svgWidth = $('#left_panel').width()
    var svgHeight = $('#left_panel').height()
    var padding = {
        'left': 0.1 * svgWidth,
        'right': 0.1 * svgWidth,
        'top': 0.1 * svgHeight,
        'bottom': 0.1 * svgHeight
    }
    let svg = div.append('svg')
        .attr('id', 'matrixSvg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);

    // background
    let toplevel = 2
    let topname = "trump"
    let this_struct = null
    console.log(struct_data)
    struct_data.forEach(d => {
        if ((d["name"] == topname) && (d["level"] == toplevel)){
            this_struct = d
        }
    })
    let y_range = [this_struct["startLineID"],this_struct["endLineID"]]
    let x_range = [this_struct["endVersionID"],this_struct["startVersionID"]]
    x_range[0] = 5500
    y_range[1] = 12000

    // x axis - phd graduation year
    let x = d3.scaleLinear()
        .domain(x_range)
        .range([padding.left, svgWidth-padding.right]);    
    let axis_x = d3.axisBottom()
        .scale(x)
        .ticks(10)
        .tickFormat(d => d);

    // y axis - publications
    let y = d3.scaleLinear()
        .domain(y_range)
        .range([padding.top, svgHeight-padding.bottom]);    

    // x axis
    svg.append('g')
        .attr('transform', `translate(${0}, ${svgHeight-padding.bottom})`)
        .call(axis_x)
        .attr('font-family', fontFamily)
        .attr('font-size', '0.8rem')

    svg.append('g')
        .attr('transform', `translate(${padding.left+(svgWidth-padding.left-padding.right)/2}, ${svgHeight-padding.bottom})`)
        .append('text')
        .attr('class', 'axis_label')
        .attr('dx', '-0.4rem')
        .attr('dy', 0.08*svgHeight)
        .text(x_attr);

    level_list = [];
    struct_data.forEach(d => {
        if ((d["level"] == toplevel + 1) 
        && (d["startLineID"] >= y_range[0])
        && (d["endLineID"] <= y_range[1])){
            console.log(d);
            console.log(x(d["startVersionID"]));
            console.log(y(d["startLineID"]));
            level_list.push(d);
        }
    })
    svg.append('g')
        .selectAll('rect')
        .data(level_list)
        .enter()
        .append('rect')
        .attr('class', 'rectangle')
        .attr('x', (d, i) => x(d["endVersionID"]))
        .attr('y', (d, i) => y(d["startLineID"]))
        .attr('width', d => (x(d["startVersionID"]) - x(d["endVersionID"])))
        .attr('height', d => (y(parseInt(d["endLineID"]) + 1) - y(d["startLineID"])))
        .attr('fill', (d, i) => {
            if ((i&1) == 0) return '#999999';
            else return '#D6D6D6';
        })
        .attr('opacity', 0.5);
    // points
    data.forEach(d => {
        draw_subdata(svg, d, x, y);
    });
}
function draw_subdata(svg, subdata, x, y){
    svg.append('g')
        .selectAll('circle')
        .data(subdata)
        .enter()
        .append('circle')
        .attr('class', 'point')
        .attr('cx', (d, i) => {
            //console.log('data', d); 
            return x(parseInt(d[x_attr]));
        })
        .attr('cy', (d, i) => y(parseInt(d[y_attr])))
        .attr('r', 2)
        .attr('fill', (d, i) => {
            t = parseInt(d[3])
            // console.log(t)
            if (t == 0) return '#6AF07A';
            else return '#FF474A';
        })
        .attr('opacity', 0.3)
}

let data = null;
let struct_data = null;
let data_file = '../data/points.json';

function init_matrix() {
    d3.json(data_file, function(d) {
        return d
    }).then(function (DATA){
        data = DATA;
        d3.json("../data/struct.json", function(d) {
            return d
        }).then(function (DATA){
            struct_data = DATA;
            draw_matrix();
        });
    });
}

init_matrix()


function get_min_max(data, attr) {
    let min = 1e9;
    let max = 0;
    data.forEach(d0 => {
        d0.forEach(d1 => {
            let v = parseInt(d1[attr]);
            if (v > max)
                max = v;
            if (v < min)
                min = v;
        })
    });
    // console.log('attr', attr, 'min', min, 'max', max);

    return [min, max];
}