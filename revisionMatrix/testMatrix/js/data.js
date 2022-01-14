let data = null;
let data_file = '../data/points.json';

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
    console.log('attr', attr, 'min', min, 'max', max);

    return [min, max];
}