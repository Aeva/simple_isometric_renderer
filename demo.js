"use strict";


// 2D array for storing terrain tiles and other things
var map = [];


// generate the terrain
var load_map = function () {
    var map = window.map = [];
    var area = 10;
    var low = Math.floor(area/2) * -1;
    var high = Math.floor(area/2);
    for (var x=low; x<=high; x+=1) {
        var column = [];
        for (var y=low; y<=high; y+=1) {
            var slope = (y-x) * -.5 - Math.random()*1.5;
            column.push(new BasicTile(x, y, slope));
        }
        map.push(column);
    }
    for (var x=0; x < map.length; x+=1) {
        for (var y=0; y < map[x].length; y+=1) {
            var neighbors = [[-1, -1], [1, -1], [-1, 1], [1, 1,]];
            var tile = map[x][y];
            tile.neighbors = [];
            for (var n=0; n<neighbors.length; n+=1) {
                var seek_x = x + neighbors[n][0];
                var seek_y = y + neighbors[n][1];
                if (seek_x < 0 || seek_x >= map.length) {
                    continue;
                }
                if (seek_y < 0 || seek_y >= map[seek_x].length) {
                    continue;
                }
                tile.neighbors.push(map[seek_x][seek_y]);
            }
        }
    }


    map[2][4].z = 3;
};


addEventListener("load", function () {
    load_map();
    caching_redraw();
});
