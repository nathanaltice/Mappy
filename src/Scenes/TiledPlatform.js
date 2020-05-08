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
        // add a tile map
        const map = this.add.tilemap("platform_map");
        // add a tile set to the map
        const tileset = map.addTilesetImage("colored_packed", "1bit_tiles");
        // create static layers
        const backgroundLayer = map.createStaticLayer("Background", tileset, 0, 0);
        const groundLayer = map.createStaticLayer("Ground", tileset, 0, 0);
        const sceneryLayer = map.createStaticLayer("Scenery", tileset, 0, 0);

        // define keyboard cursor input
        cursors = this.input.keyboard.createCursorKeys();

        // create camera control configuration object to pass to Camera Controller (see below)
        // https://photonstorm.github.io/phaser3-docs/Phaser.Types.Cameras.Controls.html#.FixedKeyControlConfig
        let controlConfig = {
            camera: this.cameras.main,      // which camera?
            left: cursors.left,             // define keys...
            right: cursors.right,
            speed: { x: 0.5, y: 0 }         // set speed of camera (keep values low)
        }
        // create fixed key camera control
        // i.e., we control the cam w/ precise key control
        // note: you *must* call the update method of this controller each frame (see below)
        // https://photonstorm.github.io/phaser3-docs/Phaser.Cameras.Controls.FixedKeyControl.html
        this.camControl = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);

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