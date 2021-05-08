// Demonstrates TILE_BIAS to prevent object tunneling through tilemap tiles
// Platforms are placed at various heights to test tunneling
// Move character with left/right arrows
// Reset character to top of map with up arrow
// Use A/D keys to decrement/increment TILE_BIAS value

/* 
Note that tile bias can also be set globally in the main.js game config object, e.g.:

    arcade: {
      tileBias: 24,
      gravity: { y: 2000 },
      debug: true
    }

*/

class TileBias extends Phaser.Scene {
    constructor() {
        super("tileBiasScene");

        // variables and settings
        this.ACCELERATION = 500;
        this.MAX_X_VEL = 200;
        this.MAX_Y_VEL = 2000;
        this.DRAG = 600;    
        this.JUMP_VELOCITY = -650;
    }

    preload() {
        // load assets
        this.load.path = "./assets/";
        this.load.tilemapTiledJSON("bias_map", "tilemap08.json");    // Tiled JSON file
    }

    create() {
        // add a tile map
        const map = this.add.tilemap("bias_map"); 
        // add a tile set to the map
        const tileset = map.addTilesetImage("colored_packed", "1bit_tiles");
        // create tilemap layers
        const bgLayer = map.createLayer("Background", tileset, 0, 0);
        const groundLayer = map.createLayer("Ground", tileset, 0, 0);

        // set map collision
        groundLayer.setCollisionByProperty({ collides: true });

        // create player & set its physics properties
        this.p1 = this.physics.add.sprite(centerX, 24, "kenney_sheet", 450);
        this.p1.body.setSize(this.p1.width/2);
        this.p1.body.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        this.p1.body.setCollideWorldBounds(true);

        // init player animation
        this.p1.anims.play('idle');

        // set physics world properties
        this.physics.world.gravity.y = 2000;
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.world.TILE_BIAS = 24;  // increase to prevent sprite tunneling through tiles

        // create collider(s)/overlap(s)
        this.physics.add.collider(this.p1, groundLayer);

        // setup camera
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.p1, true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])

        // define keyboard cursor input
        cursors = this.input.keyboard.createCursorKeys();

        // enable scene switcher / reload keys
        this.swap = this.input.keyboard.addKey('S');
        this.reload = this.input.keyboard.addKey('R');
        // create tile bias increment/decrement keys
        this.bias_down = this.input.keyboard.addKey('A');
        this.bias_up = this.input.keyboard.addKey('D');

        // print bias text
        this.bias_text = this.add.text(32, h-32, `TILE_BIAS: ${ this.physics.world.TILE_BIAS }`, { 
            fontSize: '8px',
            backgroundColor: '#000000' 
        }).setScrollFactor(0);

        // update instruction text
        document.getElementById('description').innerHTML = '<h2>TileBias.js</h2><br>←→: Move<br>↑: Reset Player<br>D: Increase Tile Bias<br>A: Decrease Tile Bias<br>S: Next Scene<br>R: Restart Scene';
    }

    update() {
        // update text
        this.bias_text.text = `TILE_BIAS: ${ this.physics.world.TILE_BIAS }`;

        // player movement
        if(cursors.left.isDown) {
            this.p1.body.setAccelerationX(-this.ACCELERATION);
            this.p1.play('walk', true);
            this.p1.setFlip(true, false);
        } else if(cursors.right.isDown) {
            this.p1.body.setAccelerationX(this.ACCELERATION);
            this.p1.play('walk', true);
            this.p1.resetFlip();
        } else {
            // set acceleration to 0 so DRAG will take over
            this.p1.play('idle');
            this.p1.body.setAccelerationX(0);
            this.p1.body.setDragX(this.DRAG);
        }

        // press up to re-position character
        if(Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.p1.x = centerX;
            this.p1.y = 24;
        }

        // scene switching / restart
        if(Phaser.Input.Keyboard.JustDown(this.bias_down)) {
            this.physics.world.TILE_BIAS--;
        }
        if(Phaser.Input.Keyboard.JustDown(this.bias_up)) {
            this.physics.world.TILE_BIAS++;
        }

        // scene switching / restart
        if(Phaser.Input.Keyboard.JustDown(this.reload)) {
            this.scene.restart();
        }
        if(Phaser.Input.Keyboard.JustDown(this.swap)) {
            this.scene.start("arrayMapScene");
        }
    }
}