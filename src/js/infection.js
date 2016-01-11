function colorBasedOnValue(value) {
    var normalizedValue = Math.floor(value * 255);
    var redHexadecimal = (normalizedValue).toString(16);
    return "#" + redHexadecimal + "0000";
}

window.onload = function () {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
    context.fillRect(0, 0, width, height);
    if (width != height || width < 0) throw Error('Expected a square canvas.');
    if (width % 20 != 0) throw Error('Expected the side of the canvas to be a multiple of 20.');
    var canvasSide = width;
    var squareSide = width / 20;
    var tiles = [];
    for (var y = 0; y <= canvasSide - squareSide; y += squareSide) {
        var tileRow = [];
        for (var x = 0; x <= canvasSide - squareSide; x += squareSide) {
            var tileValue = Math.random() * .5;
            tileRow.push(tileValue);
            context.fillStyle = colorBasedOnValue(tileValue);
            context.fillRect(x, y, squareSide, squareSide);
        }
        tiles.push(tileRow);
    }
};
