function colorBasedOnState(tile) {
    var normalizedValue = Math.floor(tile.density * 255);
    var intensity = (normalizedValue).toString(16);
    if (tile.infected) {
        return '#00' + intensity + '00';
    } else {
        return '#' + intensity + '0000';
    }
}

var Map = {tiles: []};

function setUp() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
    var squaresInRow = 20;
    context.fillRect(0, 0, width, height);
    if (width !== height || width < 0) {
        throw Error('Expected a square canvas.');
    }
    if (width % squaresInRow !== 0) {
        throw Error('Expected the side of the canvas to be a multiple of 20.');
    }
    var canvasSide = width;
    var squareSide = width / squaresInRow;
    for (var y = 0; y <= canvasSide - squareSide; y += squareSide) {
        var tileRow = [];
        for (var x = 0; x <= canvasSide - squareSide; x += squareSide) {
            var tile = {'density': Math.random() * 0.5, 'infected': false};
            tileRow.push(tile);
            context.fillStyle = colorBasedOnState(tile);
            context.fillRect(x, y, squareSide, squareSide);
        }
        Map.tiles.push(tileRow);
    }
}

(function () {
    setUp();
    var tickLength = 200; // 200 milliseconds.
    function main(timeFrame) {
        window.requestAnimationFrame(main);
    }

    main();
})();
