class SimpleAnimation extends Phaser.Scene {
    constructor() {
        super("simpleanimationScene");

        // constants
        this.TILESINTILESET = 1056;    // number of tiles in selected tileset
        this.currentTile = 1;            // current tile in tile index
    }

    preload() {
        // load assets
        this.load.path = "./assets/";
        this.load.image("1bit_tiles", "colored_packed.png");    // tile sheet
        this.load.tilemapTiledJSON("map", "tilemap07.json");    // Tiled JSON file
    }

    create() {
        // add a tile map
        this.map = this.add.tilemap("map");
        // add a tile set to the map
        this.tileset = this.map.addTilesetImage("colored_packed", "1bit_tiles");
        // create a dynamic layer
        this.bgLayer = this.map.createDynamicLayer("background", this.tileset, 0, 0);

        // define keyboard cursor input
        cursors = this.input.keyboard.createCursorKeys();

        // enable scene switcher / reload keys
        this.swap = this.input.keyboard.addKey('S');
        this.reload = this.input.keyboard.addKey('R');

    }

    update() {


        // scene switching / restart
        if(Phaser.Input.Keyboard.JustDown(this.reload)) {
            this.scene.restart();
        }
        if(Phaser.Input.Keyboard.JustDown(this.swap)) {
            //this.scene.start("");
        }
    }
}