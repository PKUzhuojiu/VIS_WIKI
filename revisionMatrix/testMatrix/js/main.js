let _width = $(window).width();
let _height = $(window).height();
let width = 0.9 * _width;
let height = 0.96 * _height;

let x_attr = 0;
let y_attr = 2;

let fontFamily;

function set_ui() {
    // 设置字体
    let ua = navigator.userAgent.toLowerCase();
    fontFamily = "Khand-Regular";
    if (/\(i[^;]+;( U;)? CPU.+Mac OS X/gi.test(ua)) {
        fontFamily = "PingFangSC-Regular";
    }
    d3.select("body")
        .style("font-family", fontFamily);
}

function draw_main() {
    let padding = {'left': 0.2*width, 'bottom': 0.1*height, 'top': 0.2*height, 'right': 0.1*width};
    let svg = d3.select('#container')
        .select('svg')
        .attr('width', width)
        .attr('height', height);

    // title
    svg.append('g')
        .attr('transform', `translate(${padding.left+(width-padding.left-padding.right)/2}, ${padding.top*0.4})`)
        .append('text')
        .attr('class', 'title')
        .text('Revision Matrix');

    // x axis - phd graduation year
    let x = d3.scaleLinear()
        .domain(get_min_max(data, x_attr))
        .range([padding.left, width-padding.right]);    
    let axis_x = d3.axisBottom()
        .scale(x)
        .ticks(10)
        .tickFormat(d => d);

    // y axis - publications
    let y = d3.scaleLinear()
        .domain(get_min_max(data, y_attr))
        .range([height-padding.bottom, padding.top]);    
    let axis_y = d3.axisLeft()
        .scale(y)
        .ticks(10)
        .tickFormat(d => d);

    // x axis
    svg.append('g')
        .attr('transform', `translate(${0}, ${height-padding.bottom})`)
        .call(axis_x)
        .attr('font-family', fontFamily)
        .attr('font-size', '0.8rem')

    svg.append('g')
        .attr('transform', `translate(${padding.left+(width-padding.left-padding.right)/2}, ${height-padding.bottom})`)
        .append('text')
        .attr('class', 'axis_label')
        .attr('dx', '-0.4rem')
        .attr('dy', 0.08*height)
        .text(x_attr);

    // y axis
    svg.append('g')        
        .attr('transform', `translate(${padding.left}, ${0})`)
        .call(axis_y)
        .attr('font-family', fontFamily)
        .attr('font-size', '0.8rem')
    svg.append('g')
        .attr('transform', `
            translate(${padding.left}, ${height/2})
            rotate(-90)    
        `)
        .append('text')
        .attr('class', 'axis_label')
        .attr('dy', -height*0.07)
        .text(y_attr);

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
        .attr('r', 1)
        .attr('fill', (d, i) => {
            t = parseInt(d[3])
            console.log(t)
            if (t == 0) return '#6AF07A';
            else return '#FF474A';
        })
        .attr('opacity', 0.7)
}

function main() {
    d3.json(data_file, function(d) {
        return d
    }).then(function (DATA){
        data = DATA;
        set_ui();
        draw_main();
    });
}

main()