class TiledPlatform extends Phaser.Scene {
    constructor() {
        super("tiledPlatformScene");
    }

    preload() {
        // load assets
        this.load.path = "./assets/";
        this.load.tilemapTiledJSON("platform_map", "tilemap02.json");    // Tiled JSON file
    }

    create() {
        // make a tile map
        const map = this.make.tilemap({ key: "platform_map" });
        // add a tile set to the map
        const tileset = map.addTilesetImage("colored_packed", "1bit_tiles");
        // create static layers
        const backgroundLayer = map.createStaticLayer("Background", tileset, 0, 0);
        const groundLayer = map.createStaticLayer("Ground", tileset, 0, 0);
        const sceneryLayer = map.createStaticLayer("Scenery", tileset, 0, 0);

        // define keyboard cursor input
        cursors = this.input.keyboard.createCursorKeys();

        // create camera control configuration object (see below)
        let controlConfig = {
            camera: this.cameras.main,      // which camera?
            left: cursors.left,             // define keys...
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
            zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
            zoomSpeed: 0.02,
            acceleration: 0.06,             // physics values
            drag: 0.0005,
            maxSpeed: 0.5
        }
        // create smoothed key camera control
        // i.e., we control the cam w/ the defined keys w/ physics controls
        // note: you *must* call the update method of this controller each frame (see below)
        // https://photonstorm.github.io/phaser3-docs/Phaser.Cameras.Controls.SmoothedKeyControl.html
        this.camControl = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

        // set camera bounds
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // enable scene switcher / reload keys
        this.swap = this.input.keyboard.addKey('S');
        this.reload = this.input.keyboard.addKey('R');

        // debug
        //this.scene.start("");
    }

    update(time, delta) {
        // update our camera controller (delta: Δ time in ms since last frame)
        this.camControl.update(delta);

        // scene switching / restart
        if(Phaser.Input.Keyboard.JustDown(this.reload)) {
            this.scene.restart();
        }
        if(Phaser.Input.Keyboard.JustDown(this.swap)) {
            //this.scene.start("platformTiledScene");
        }
    }
}