function colorBasedOnState(tile) {
    var normalizedValue = Math.floor(tile.density * 255);
    var intensity = (normalizedValue).toString(16);
    if (tile.infected) {
        return '#00' + intensity + '00';
    } else {
        return '#' + intensity + '0000';
    }
}

var game = {};
game.running = false;
game.map = {};
game.map.tiles = [];

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
        game.map.tiles.push(tileRow);
    }

    canvas.addEventListener('click', function (e) {
        if (!game.running) {
            var pos = getMousePos(canvas, e);
            var x = pos.x;
            var y = pos.y;
            console.log('Got a mouse click at (' + x + ', ' + y + ')');
        }
    }, false);
}

function getMousePos(canvas, event) {
    var rectangle = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rectangle.left,
        y: event.clientY - rectangle.top
    };
}

(function () {
    setUp();
    var tickLength = 200; // 200 milliseconds.
    function main(timeFrame) {
        window.requestAnimationFrame(main);
    }

    main();
})();
