var constants = {
    W: 300, H: 600,
    COLS: 10, ROWS: 20, board: [],
    figure: [
        [1, 1, 1, 1],
        [1, 1, 1, 0,
            1],
        [1, 1, 1, 0,
            0, 0, 1],
        [1, 1, 0, 0,
            1, 1],
        [1, 1, 0, 0,
            0, 1, 1],
        [0, 1, 1, 0,
            1, 1],
        [0, 1, 0, 0,
            1, 1, 1]
    ],
    color: [
        'cyan', 'orange', 'blue', 'yellow', 'red', 'green', 'purple'
    ],
    fail: null,
    interval: null,
    current: null,
    currentX: null, currentY: null
};
var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');
var BLOCK_W = constants.W / constants.COLS,
    BLOCK_H = constants.H / constants.ROWS;
var Tetris = (function () {
    function Tetris() {
    }

    Tetris.prototype.newShape = function () {
        var id = Math.floor(Math.random() * constants.figure.length);
        var shape = constants.figure[id]; // maintain id for color filling
        constants.current = [];
        for (var y = 0; y < 4; ++y) {
            constants.current[y] = [];
            for (var x = 0; x < 4; ++x) {
                var i = 4 * y + x;
                if (typeof shape[i] != 'undefined' && shape[i]) {
                    constants.current[y][x] = id + 1;
                }
                else {
                    constants.current[y][x] = 0;
                }
            }
        }
        constants.currentX = 5;
        constants.currentY = 0;
    };
    Tetris.prototype.init = function () {
        for (var y = 0; y < constants.ROWS; ++y) {
            constants.board[y] = [];
            for (var x = 0; x < constants.COLS; ++x) {
                constants.board[y][x] = 0;
            }
        }
    };
    // keep the element moving down, creating new figure and clearing lines
    Tetris.prototype.tick = function () {
        if (Tetris.prototype.valid(0, 1)) {
            ++constants.currentY;
        }
        else {
            Tetris.prototype.freeze();
            Tetris.prototype.clearLines();
            if (constants.fail) {
                alert("you loose");
                Tetris.prototype.newGame();
                return false;
            }
            Tetris.prototype.newShape();
        }
    };
    Tetris.prototype.freeze = function () {
        for (var y = 0; y < 4; ++y) {
            for (var x = 0; x < 4; ++x) {
                if (constants.current[y][x]) {
                    constants.board[y + constants.currentY][x + constants.currentX] = constants.current[y][x];
                }
            }
        }
    };
    Tetris.prototype.rotate = function (current) {
        var newCurrent = [];
        for (var y = 0; y < 4; ++y) {
            newCurrent[y] = [];
            for (var x = 0; x < 4; ++x) {
                newCurrent[y][x] = current[3 - x][y];
            }
        }
        return newCurrent;
    };
    Tetris.prototype.clearLines = function () {
        for (var y = constants.ROWS - 1; y >= 0; --y) {
            var rowFilled = true;
            for (var x = 0; x < constants.COLS; ++x) {
                if (constants.board[y][x] == 0) {
                    rowFilled = false;
                    break;
                }
            }
            if (rowFilled) {
                for (var yy = y; yy > 0; --yy) {
                    for (var x = 0; x < constants.COLS; ++x) {
                        constants.board[yy][x] = constants.board[yy - 1][x];
                    }
                }
                ++y;
            }
        }
    };
    Tetris.prototype.keyPress = function (key) {
        switch (key) {
            case 'left':
                if (Tetris.prototype.valid(-1)) {
                    --constants.currentX;
                }
                break;
            case 'right':
                if (Tetris.prototype.valid(1)) {
                    ++constants.currentX;
                }
                break;
            case 'down':
                if (Tetris.prototype.valid(0, 1)) {
                    ++constants.currentY;
                }
                break;
            case 'rotate':
                var rotated = this.rotate(constants.current);
                if (Tetris.prototype.valid(0, 0, rotated)) {
                    constants.current = rotated;
                }
                break;
        }
    };
    // checks if the resulting position of current shape will be feasible
    Tetris.prototype.valid = function (offsetX, offsetY, newCurrent) {
        offsetX = offsetX || 0;
        offsetY = offsetY || 0;
        offsetX = constants.currentX + offsetX;
        offsetY = constants.currentY + offsetY;
        newCurrent = newCurrent || constants.current;
        for (var y = 0; y < 4; ++y) {
            for (var x = 0; x < 4; ++x) {
                if (newCurrent[y][x]) {
                    if (typeof constants.board[y + offsetY] == 'undefined'
                        || typeof constants.board[y + offsetY][x + offsetX] == 'undefined'
                        || constants.board[y + offsetY][x + offsetX]
                        || x + offsetX < 0
                        || y + offsetY >= constants.ROWS
                        || x + offsetX >= constants.COLS) {
                        if (offsetY == 1)
                            constants.fail = true; // fail if the current shape at the top row when checked
                        return false;
                    }
                }
            }
        }
        return true;
    };
    Tetris.prototype.newGame = function () {
        clearInterval(constants.interval);
        Tetris.prototype.init();
        Tetris.prototype.newShape();
        constants.fail = false;
        constants.interval = setInterval(Tetris.prototype.tick, 250);
    };
    return Tetris;
}());
var Render = (function () {
    function Render() {

    }

    function drawBlock(x, y) {
        ctx.fillRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
        ctx.strokeRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
    };
    // draws the board and the moving shape
    Render.prototype.render = function () {
        ctx.clearRect(0, 0, constants.W, constants.H);
        ctx.strokeStyle = 'black';
        for (var x = 0; x < constants.COLS; ++x) {
            for (var y = 0; y < constants.ROWS; ++y) {
                if (constants.board[y][x]) {
                    ctx.fillStyle = constants.color[constants.board[y][x] - 1];
                    drawBlock(x, y);
                }
            }
        }
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'black';
        for (var y = 0; y < 4; ++y) {
            for (var x = 0; x < 4; ++x) {
                if (constants.current[y][x]) {
                    ctx.fillStyle = constants.color[constants.current[y][x] - 1];
                    drawBlock(constants.currentX + x, constants.currentY + y);
                }
            }
        }
    };
    return Render;
}());
document.body.onkeydown = function (e) {
    var keys = {
        37: 'left',
        39: 'right',
        40: 'down',
        38: 'rotate'
    };

    if (typeof keys[e.keyCode] != 'undefined') {
        b.render();
        a.keyPress(keys[e.keyCode]);

    }
};
var b = new Render();
var a = new Tetris();
a.newGame();

b.render();
setInterval(b.render, 250);
