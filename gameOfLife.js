var LIVE = '#';
var DEAD = ' ';
var TOAD = [
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, true, true, true, false],
    [false, true, true, true, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
];
var deadState = function (width, height) {
    var board = [[]];
    for (var h = 0; h < height; h++) {
        if (!board[h]) {
            board.push([]);
        }
        for (var w = 0; w < width; w++) {
            board[h][w] = false;
        }
    }
    return board;
};
var randomState = function (board) {
    var randomBoard = JSON.parse(JSON.stringify(board));
    randomBoard.forEach(function (row) {
        row.forEach(function (_cell, colIndex) {
            var randNumb = Math.random();
            if (randNumb < 0.5) {
                row[colIndex] = true;
            }
        });
    });
    return randomBoard;
};
var renderBoard = function (board) {
    var row = board.length;
    var col = board[0].length;
    var border = '--';
    for (var i = 0; i < row; i++) {
        border += '-';
    }
    console.log(border);
    for (var r = 0; r < row; r++) {
        var line = '|';
        for (var c = 0; c < col; c++) {
            if (board[r][c]) {
                line += LIVE;
            }
            else {
                line += DEAD;
            }
        }
        line += '|';
        console.log(line);
    }
    console.log(border);
};
var nextBoardState = function (board) {
    var nextBoard = JSON.parse(JSON.stringify(board));
    var maxH = nextBoard.length;
    var maxL = nextBoard[0].length;
    for (var h = 0; h < maxH; h++) {
        for (var l = 0; l < maxL; l++) {
            nextBoard[h][l] = calculateGrowth(board, h, l);
        }
    }
    return nextBoard;
};
var calculateGrowth = function (board, h, l) {
    var aliveAround = 0;
    var maxH = board.length;
    var maxL = board[0].length;
    for (var testH = h - 1; testH < h + 2; testH++) {
        for (var testL = l - 1; testL < l + 2; testL++) {
            if (isInBounds(testH, testL, maxH, maxL) &&
                !(testH === h && testL === l)) {
                if (board[testH][testL]) {
                    aliveAround++;
                }
            }
        }
    }
    if (board[h][l]) {
        if (aliveAround <= 1 || aliveAround > 3) {
            return false;
        }
    }
    else {
        if (aliveAround === 3) {
            return true;
        }
    }
    return board[h][l];
};
var isInBounds = function (h, l, maxH, maxL) {
    if (h >= maxH || h < 0)
        return false;
    if (l >= maxL || l < 0)
        return false;
    return true;
};
var run = function (board) {
    setTimeout(function () {
        var next = nextBoardState(board);
        console.clear();
        renderBoard(next);
        return run(next);
    }, 100);
};
var initState = deadState(10, 10);
var randState = randomState(initState);
run(randState);
//# sourceMappingURL=gameOfLife.js.map