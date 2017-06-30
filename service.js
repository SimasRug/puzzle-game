const service = {
    boardSet : function () { // this looks ugly but its pretty efficiant and theres gonna be a lot of duoble loops
        parts = new Array(tiles);
        for (var i = 0; i <= tiles; i++) {
            parts[i] = new Array(tiles);
            for (var j = 0; j <= tiles; j++) {
            parts[i][j] = new Object;
            parts[i][j].x = i;
            parts[i][j].y = j;
            }
        }
        service.makeRandom();
        service.empty();
        if (!service.isSolvable(tiles, tiles, emptyLocation.y + 1)) {
            if (emptyLocation.y == 0 && emptyLocation.x <= 1) {
                service.swap(tiles - 2, tiles - 1, tiles - 1, tiles - 1);
            } else {
                service.swap(0, 0, 1, 0);
                }
            service.empty();
                }
        solved = false;
    },

    draw: function () {
        context.clearRect ( 0 , 0 , board , board );
        for (var i = 0; i <= tiles; i++) {
            for (var j = 0; j <= tiles; j++) {
                var x = parts[i][j].x;
                var y = parts[i][j].y;
                if(i != emptyLocation.x || j != emptyLocation.y || solved == true) {
                    context.drawImage(image, x * size, y * size, size, size,
                        i * size, j * size, size, size);
                }
            }
        }
    },

    slide: function (toLoc, fromLoc) {
        if (!solved) {
            parts[toLoc.x][toLoc.y].x = parts[fromLoc.x][fromLoc.y].x;
            parts[toLoc.x][toLoc.y].y = parts[fromLoc.x][fromLoc.y].y;
            parts[fromLoc.x][fromLoc.y].x = tiles - 1;
            parts[fromLoc.x][fromLoc.y].y = tiles - 1;
            toLoc.x = fromLoc.x;
            toLoc.y = fromLoc.y;
            service.checkSolved();
        }
    },

    makeRandom: function () { // make stuff random Fisher Yates alrogtihm.. I'm not a mad genius
        var i = tiles * tiles - 1;
        while (i > 0) {
            var j = Math.floor(Math.random() * i);
            var xi = i % tiles;
            var yi = Math.floor(i / tiles);
            var xj = j % tiles;
            var yj = Math.floor(j / tiles);
            service.swap(xi, yi, xj, yj);
            --i;
        }
    },

    swap: function (i, j, k, l) {
        var temp = new Object();
        temp = parts[i][j];
        parts[i][j] = parts[k][l];
        parts[k][l] = temp;
    },

    isSolvable: function (width, height, emptyRow) {
        if (width % 2 == 1) {
            return (service.sum() % 2 == 0)
        } else {
            return ((service.sum() + height - emptyRow) % 2 == 0)
        }
    },

    sum: function () {
        var inver = 0;
        for (var j = 0; j <= tiles; j++) {
            for (var i = 0; i <= tiles; i++) {
            inver += service.countinver(i, j);
            }
        }
        return inver;
    },

    countinver: function (i, j) {
        var inver = 0;
        var num = j * tiles + i;
        var last = tiles * tiles;
        var value = parts[i][j].y * tiles + parts[i][j].x;
        for (var q = num ; q <= last; q++) {
            var k = q % tiles;
            var l = Math.floor(q / tiles);

            var compValue = parts[k][l].y * tiles + parts[k][l].x;
            if (value > compValue && value != (last - 1)) {
            ++inver;
            }
        }
        return inver;
    },

    empty: function () {
        for (var j = 0; j <= tiles; j++) {
            for (var i = 0; i <= tiles; i++) {
                if (parts[i][j].x == tiles - 1 && parts[i][j].y == tiles - 1) {
                    emptyLocation.x = i;
                    emptyLocation.y = j;
                }
            }
        }
    },

    distance: function (x1, y1, x2, y2) {
        return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    },

    checkSolved:function () {
        var flag = true;
        for (var i = 0; i <= tiles; i++) {
            for (var j = 0; j <= tiles; j++) {
            if (parts[i][j].x != i || parts[i][j].y != j) {
                flag = false;
            }
            }
        }
        solved = flag;
    }
}