class RandomMap extends Phaser.Scene {
    constructor() {
        super("randomMapScene");
    }

    create() {
        // create a 2D array of tile indices
        const level01 = [
            [ 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15 ],
            [ 39,  0,  0,  0,  0,  0,  0,  0,  0, 39, 15,  0,  0, 16,  0,  0, 12,  0,  0, 15 ],
            [ 39,  0,  0,  0,  0,  0,  0,  0,  0, 39, 15,  0,  0, 16,  0,  0, 12,  0,  0, 15 ],
            [ 39,  0,  0,  0,  0,  0,  0,  0,  0, 39, 15,  0,  0, 16,  0,  0, 12,  0,  0, 15 ],
            [ 39,  0,  0,  0, 15, 15,  0,  0,  0, 39, 15,  0,  0, 16,  0,  0, 13,  0,  0, 15 ],
            [ 39,  0,  0,  0, 15, 15,  0,  0,  0, 39, 15,  0,  0, 13,  0,  0,  0,  0,  0, 15 ],
            [ 39,  0,  0,  0,  0,  0,  0,  0,  0, 39, 15,  0,  0,  0,  0,  0,  0,  0,  0, 15 ],
            [ 39,  0,  0,  0,  0,  0,  0,  0,  0, 39, 15,  0,  0,  0,  0,  0,  0,  0,  0, 15 ],
            [ 39,  0,  0,  0,  0,  0,  0,  0,  0, 39, 15,  0,  0,  4,  0,  0,  4,  0,  0, 15 ],
            [ 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15 ],
            [ 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39 ],
            [ 15,  0,  0,  0,  0,  0,  0,  0,  0, 15, 39, 32, 32, 32, 32, 32, 32, 32, 32, 39 ],
            [ 15,  0,  0,  0,  0,  0,  0,  0,  0, 15, 39, 38, 38, 38, 38, 38, 38, 38, 38, 39 ],
            [ 15,  0,  0,  0,  0,  0,  0,  0,  0, 15, 39, 38, 38, 38, 38, 38, 38, 38, 38, 39 ],
            [ 15,  0,  0,  0, 20, 21,  0,  0,  0, 15, 39, 38, 38, 38, 38, 38, 38, 38, 38, 39 ],
            [ 15,  0,  0,  0, 26, 27,  0,  0,  0, 15, 39, 38, 38, 38, 38, 38, 38, 38, 38, 39 ],
            [ 15,  0,  0,  0, 26, 27,  0,  0,  0, 15, 39, 38, 38, 38, 24, 22, 38, 38, 38, 39 ],
            [ 15,  0,  0,  0, 26, 27,  0,  0,  0, 15, 39, 38, 38, 38, 14, 14, 38, 38, 38, 39 ],
            [ 15,  0,  0,  0, 26, 27,  0,  0,  0, 15, 39, 38, 38, 14, 14, 14, 14, 38, 38, 39 ],
            [ 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39 ]
        ];
        console.log(level01);

        // make tilemap from array and tilesheet
        // https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.GameObjectCreator.html#tilemap
        const map = this.make.tilemap({
            data: level01,      // load direct from array
            tileWidth: 16,
            tileHeight: 16
        });
        // addTilesetImage(tilesetName [, key] [, tileWidth] [, tileHeight] [, tileMargin] [, tileSpacing] [, gid])
        // try changing the tilesheet key in the next line to see another tileset uses the same indices
        const tilesheet = map.addTilesetImage("smb_tiles");
        // createStaticLayer(layerID, tileset [, x] [, y])
        const layer = map.createStaticLayer(0, tilesheet, 0, 0);
    }
}