class TiledSimple extends Phaser.Scene {
    constructor() {
        super("tiledSimpleScene");
    }

    preload() {
        // load assets
        this.load.path = "./assets/";
        this.load.image("1bit_tiles", "colored_packed.png");    // tile sheet
        this.load.tilemapTiledJSON("map", "tilemap01.json");    // Tiled JSON file
    }

    create() {
        // make tilemap
        const map = this.make.tilemap({
            key: "map"      // this is referencing the key to our Tiled JSON file
        });

        // the first parameter was the name when gave the tileset when we added it to Tiled
        // the second parameter is the key for the tile sheet we loaded above, in preload
        const tileset = map.addTilesetImage("kenney_colored_packed", "1bit_tiles");

        const worldLayer = map.createStaticLayer("Tile Layer 1", tileset, 0, 0);

        // define input
        // define cursors, wire up to camera control

        // debug
    }
}