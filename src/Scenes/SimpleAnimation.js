class SimpleAnimation extends Phaser.Scene {
    constructor() {
        super("simpleanimationScene");

        // how frequently tile animations will happen (in ms)
        // all tile animations obey this same global "clock"
        this.animationFreq = 500;
        // the animationQueue is an object containing arrays of tile IDs to animate
        // the animation routine supports any length of tile ID arrays
        // (the property names are simply for reference)
        this.animationQueue = {     
            skull: [ 714, 762 ],
            rounded: [ 712, 760 ],
            exed: [ 666, 667 ],
            heart: [ 521, 522, 523 ],
            bottle: [ 569, 570, 571 ],
            pip01: [ 715, 763 ],
            pip02: [ 716, 764 ],
            pip03: [ 717, 765 ],
            pip04: [ 718, 766 ],
            pip05: [ 719, 767 ],
            pip06: [ 720, 768 ],
            face: [ 708, 709, 710, 711 ],
            numbers: [ 852, 853, 854, 855, 856, 857, 858, 859, 860, 861 ]
        };
    }

    preload() {
        // load assets
        this.load.path = "./assets/";
        this.load.image("animtiles", "colored_packed.png");    // tile sheet
        this.load.tilemapTiledJSON("animatedmap", "tilemap07.json");    // Tiled JSON file
    }

    create() {
        // add a tile map
        this.map = this.add.tilemap("animatedmap");
        // add a tile set to the map
        this.tileset = this.map.addTilesetImage("colored_packed", "animtiles");
        // create tilemap layers
        this.bgLayer = this.map.createLayer("background", this.tileset, 0, 0);
        this.animLayer = this.map.createLayer("animated", this.tileset, 0, 0);

        // create tile animation timer
        // this fires the tileAnimate routine at each tick of the global animation clock
        this.tileAnimationTimer = this.time.addEvent({
            delay: this.animationFreq,
            callback: this.tileAnimate,
            callbackScope: this,
            loop: true
        });

        // define keyboard cursor input
        cursors = this.input.keyboard.createCursorKeys();

        // enable scene switcher / reload keys
        this.swap = this.input.keyboard.addKey('S');
        this.reload = this.input.keyboard.addKey('R');

        // update instruction text
        document.getElementById('description').innerHTML = '<h2>SimpleAnimation.js</h2><br>S: Next Scene<br>R: Restart Scene';
    }

    // this method handles the tile animations
    // it's a bit brute force, since it's sweeping through *all* tiles in the tilemap
    // thus, it wouldn't scale to huge maps with lots of animated tiles
    tileAnimate() {
        // convert animation queue object values into an array
        let tileQueue = Object.entries(this.animationQueue);
        // loop through array
        for(const entry of tileQueue) {
            // swap tile indices (entry[0] is the key, entry[1] contains the tile IDs)
            this.animLayer.swapByIndex(entry[1][0], entry[1][1]);
            // rotate elements
            let tileID = entry[1].shift();
            entry[1].push(tileID);
            // mutate original object w/ new array (cycles tileIDs from front to back)
            this.animationQueue[entry[0]] = entry[1];
        } 
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