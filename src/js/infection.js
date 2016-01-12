function colorBasedOnValue(value) {
    var normalizedValue = Math.floor(value * 255);
    var redHexadecimal = (normalizedValue).toString(16);
    return '#' + redHexadecimal + '0000';
}

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
            var tileValue = Math.random() * 0.5;
            tileRow.push(tileValue);
            context.fillStyle = colorBasedOnValue(tileValue);
            context.fillRect(x, y, squareSide, squareSide);
        }
        tiles.push(tileRow);
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
