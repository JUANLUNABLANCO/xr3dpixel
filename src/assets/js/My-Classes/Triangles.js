function init_TRIANGLE() {
    document.onreadystatechange = () => {
        if (document.readyState === 'complete') {
            var Width = window.innerWidth;
            var Height = window.innerHeight;
            var OBJ_bg = [{
                    ord: 0,
                    name: "default_values",
                    width: 600,
                    height: 400,
                    cell_size: 75,
                    variance: 0.75,
                    x_colors: 'random',
                    y_colors: 'match_x',
                    palette: Trianglify.colorbrewer,
                    color_space: 'lab',
                    color_function: false,
                    stroke_width: 1.51,
                    seed: null
                },
                {
                    ord: 1,
                    name: 'cbd-green',
                    width: Width,
                    height: Height,
                    variance: 0.95,
                    seed: '1fkwe',
                    x_colors: 'random'
                },
                {
                    ord: 2,
                    name: 'Rainbow',
                    width: Width,
                    height: Height,
                    variance: 0.88,
                    seed: 'srre9',
                    x_colors: 'random'
                },
                {
                    ord: 3,
                    name: 'Pink',
                    width: Width,
                    height: Height,
                    variance: 0.88,
                    seed: 'fanta',
                    x_colors: 'random'
                },
                {
                    ord: 4,
                    name: 'Mars',
                    width: Width,
                    height: Height,
                    variance: 0.88,
                    seed: 'Love4',
                    x_colors: 'random'
                },

                {
                    ord: 5,
                    name: 'Silver',
                    width: Width,
                    height: Height,
                    variance: 0.88,
                    x_colors: 'random'
                },
                {
                    ord: 6,
                    name: 'Greens',
                    width: Width,
                    height: Height,
                    variance: 0.88,
                    x_colors: 'Greens',
                    y_colors: 'match_x',
                    palette: Trianglify.colorbrewer,
                },
                {
                    ord: 7,
                    name: 'Purples',
                    width: Width,
                    height: Height,
                    variance: 0.88,
                    x_colors: 'Purples',
                    y_colors: 'match_x',
                    palette: Trianglify.colorbrewer,
                },
                {
                    ord: 8,
                    name: 'Blues',
                    width: Width,
                    height: Height,
                    variance: 0.88,
                    x_colors: 'YiGnBu',
                    y_colors: 'match_x',
                    palette: Trianglify.colorbrewer,
                },
                {
                    ord: 9,
                    name: 'Blues-flow',
                    width: Width,
                    height: Height,
                    variance: 0.88,
                    x_colors: 'GnBu',
                    y_colors: 'match_x',
                    palette: Trianglify.colorbrewer,
                }

            ]; // for see palete brewer visit https://bl.ocks.org/mbostock/5577023

            // Objetos a trianglificar
            // body
            var toElem1 = document.body;
            CargaTriangles(OBJ_bg[2], toElem1);
            // .boxed
            var toElem2 = document.getElementsByClassName('boxed')[0];
            CargaTriangles(OBJ_bg[1], toElem2);
            // RESIZE WINDOW
            window.addEventListener('resize', function() {
                console.log("window resizing !!!", toElem1, toElem2);
                CargaTriangles(OBJ_bg[2], toElem1);
                CargaTriangles(OBJ_bg[1], toElem2);
            }, false);
        }
    };

    var colorFunc = function(x, y) {
        return 'hsl(' + Math.floor(Math.abs(x * y) * 360) + ',80%,60%)';
    };

    function CargaTriangles(x, toElem) {

        var pattern = Trianglify({
            width: toElem.clientWidth || x.width,
            height: toElem.clientHeight || x.height,
            variance: x.variance || 0.75,
            seed: x.seed || null,
            color_function: x.color_function || false,
            x_colors: x.x_colors || null,
            y_colors: x.y_colors || null,
            cell_size: x.cell_size || 75,
            palette: x.palette || Trianglify.colorbrewer,
            color_space: x.color_space || 'lab',
            stroke_width: x.stroke_width || 1.51,
        });
        var pngUri = pattern.png();

        toElem.style.backgroundImage = "url(" + pngUri + ")";

    }
}