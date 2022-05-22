class TiledAnimation extends Phaser.Scene {
    constructor() {
        super("tiledAnimationScene");

    }

    preload() {
        // load tile animation plugin
        // Use this version, which is keeping up with changes to Phaser:
        // https://github.com/jonit-dev/phaser-animated-tiles
        this.load.scenePlugin('AnimatedTiles', './lib/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');

        // load assets
        this.load.path = "./assets/";
        this.load.image("animtiles", "colored_packed.png");    // tile sheet
        // This tilemap has animated tiles defined within it.
        // Need to ensure that the tileset is *embedded* so that
        // animation information will end up in the tilemap .json file
        // Check .json for an "animation" array within tilesets to ensure
        // animation information has been exported.
        // To create animated tiles within Tiled, follow directions on this
        // page: https://doc.mapeditor.org/en/stable/manual/editing-tilesets/
        this.load.tilemapTiledJSON("animatedmap07", "tilemap07-anim.json");    // Tiled JSON file
        
    }

    create() {
        // add a tile map
        this.map = this.add.tilemap('animatedmap07');
        // add a tile set to the map
        this.tileset = this.map.addTilesetImage("colored_packed", "animtiles");
        // create tilemap layers
        // Note that tile animation plugin documentation says to use
        // createDynamicLayer... this is incorrect. Use createLayer instead.
        this.bgLayer = this.map.createLayer("background", this.tileset, 0, 0);
        this.animLayer = this.map.createLayer("animated", this.tileset, 0, 0);

        // Tell the animated tiles plugin to start (that's it!)
        this.animatedTiles.init(this.map);

        // define keyboard cursor input
        cursors = this.input.keyboard.createCursorKeys();

        // enable scene switcher / reload keys
        this.swap = this.input.keyboard.addKey('S');
        this.reload = this.input.keyboard.addKey('R');

        // update instruction text
        document.getElementById('description').innerHTML = '<h2>TiledAnimation.js</h2><br>Use Tiled animated tiles for animation<br><br>S: Next Scene<br>R: Restart Scene';
    }

    update() {
        // scene switching / restart
        if(Phaser.Input.Keyboard.JustDown(this.reload)) {
            this.scene.restart();
        }
        if(Phaser.Input.Keyboard.JustDown(this.swap)) {
            this.scene.start("tileBiasScene");
        }

    }
}