// The logic behind the magic. It is very unoptimized as it is a work in progress and there is a lot of experimentation.

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

function setUp() {
    game.running = false;
    game.map = {};
    game.map.tiles = [];
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
    var tilesPerRow = game.tilesPerRow = 20;
    context.fillRect(0, 0, width, height);
    if (width !== height || width < 0) {
        throw Error('Expected a square canvas.');
    }
    if (width % tilesPerRow !== 0) {
        throw Error('Expected the side of the canvas to be a multiple of 20.');
    }
    var canvasSide = width;
    var squareSide = width / tilesPerRow;
    for (var y = 0; y <= canvasSide - squareSide; y += squareSide) {
        var tileRow = [];
        for (var x = 0; x <= canvasSide - squareSide; x += squareSide) {
            var tile = {'density': Math.random() * 0.5, 'infected': false};
            tileRow.push(tile);
        }
        game.map.tiles.push(tileRow);
    }
    game.canvas = canvas;
    game.updateCanvas();

    canvas.addEventListener('click', function (event) {
        if (!game.running) {
            var mousePosition = getMousePosition(canvas, event);
            var tilePosition = translateToTilePosition(canvas, mousePosition, tilesPerRow);
            game.map.tiles[tilePosition.y][tilePosition.x].infected = true;
            game.running = true;
        }
    }, false);
}

function getMousePosition(canvas, event) {
    var rectangle = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rectangle.left,
        y: event.clientY - rectangle.top
    };
}

function translateToTilePosition(canvas, position, tilesPerRow) {
    var tileWidth = canvas.width / tilesPerRow;
    var tileHeight = canvas.height / tilesPerRow;
    return {x: Math.floor(position.x / tileWidth), y: Math.floor(position.y / tileHeight)};
}

game.renderTick = function () {
    game.map.tiles[0][0].density = Math.random();
};

game.updateCanvas = function () {
    var squareSide = game.canvas.width / game.tilesPerRow;
    var context = game.canvas.getContext("2d");
    for (var y = 0; y < game.tilesPerRow; y++) {
        for (var x = 0; x < game.tilesPerRow; x++) {
            context.fillStyle = colorBasedOnState(game.map.tiles[y][x]);
            context.fillRect(x * squareSide, y * squareSide, squareSide, squareSide);
        }
    }
};

(function () {
    setUp();
    var tickLength = 200; // 200 milliseconds.
    game.lastTickTimeFrame = window.performance.now();
    function main(timeFrame) {
        window.requestAnimationFrame(main); // A DOMHighResTimeStamp will be provided to the callback
        if (game.running) {
            if (game.lastTickTimeFrame + tickLength < timeFrame) {
                game.renderTick();
                game.updateCanvas();
                game.lastTickTimeFrame = timeFrame;
            }
        }
    }

    main();
})();
