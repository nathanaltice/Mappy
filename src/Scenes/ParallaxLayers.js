class ParallaxLayers extends Phaser.Scene {
    constructor() {
        super("parallaxLayersScene");

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
        this.load.tilemapTiledJSON("parallax_map", "tilemap04.json");    // Tiled JSON file
    }

    create() {
        // add a tile map
        const map = this.add.tilemap("parallax_map"); 
        // add a tile set to the map
        const tileset = map.addTilesetImage("colored_packed", "1bit_tiles");
        // create map layers
        // these have scroll factors set to create parallax layer scrolling
        const bgLayer = map.createLayer("Background", tileset, 0, 0).setScrollFactor(0.25);
        const pipesLayer = map.createLayer("Pipes", tileset, 0, 0).setScrollFactor(0.5);
        const laddersLayer = map.createLayer("Ladders", tileset, 0, 0).setScrollFactor(0.75);
        const groundLayer = map.createLayer("Ground", tileset, 0, 0);

        // set map collision
        groundLayer.setCollisionByProperty({ collides: true });

        // create player
        const p1Spawn = map.findObject("Objects", obj => obj.name === "P1 Spawn");
        this.p1 = this.physics.add.sprite(p1Spawn.x, p1Spawn.y, "kenney_sheet", 450);
        // set player physics properties
        this.p1.body.setSize(this.p1.width/2);
        this.p1.body.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        this.p1.body.setCollideWorldBounds(true);

        // init player animation
        this.p1.anims.play('idle');

        // generate coin objects from object data
        this.coins = map.createFromObjects("Objects", {
            name: "coin",
            key: "kenney_sheet",
            frame: 214
        });
        this.physics.world.enable(this.coins, Phaser.Physics.Arcade.STATIC_BODY);
        // now use JS .map method to set a more accurate circle body on each sprite
        this.coins.map((coin) => {
            coin.body.setCircle(4).setOffset(4, 4);
        });
        // then add the coins to a group
        this.coinGroup = this.add.group(this.coins);

        // set gravity and physics world bounds (so collideWorldBounds works)
        this.physics.world.gravity.y = 2000;
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);

        // create collider(s)/overlap(s)
        this.physics.add.collider(this.p1, groundLayer);
        this.physics.add.overlap(this.p1, this.coinGroup, (obj1, obj2) => {
            obj2.destroy(); // remove coin on overlap
        });

        // setup camera
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.p1, true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])

        // define keyboard cursor input
        cursors = this.input.keyboard.createCursorKeys();

        // enable scene switcher / reload keys
        this.swap = this.input.keyboard.addKey('S');
        this.reload = this.input.keyboard.addKey('R');

        // update instruction text
        document.getElementById('description').innerHTML = '<h2>ParallaxLayers.js</h2><br>←→: Move<br>↑: Jump<br>S: Next Scene<br>R: Restart Scene';
    }

    update() {
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
        // player jump
        // note that we need body.blocked rather than body.touching b/c the former applies to tilemap tiles and the latter to the "ground"
        if(!this.p1.body.blocked.down) {
            this.p1.anims.play('jump');
        }
        if(this.p1.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.p1.body.setVelocityY(this.JUMP_VELOCITY);
        }

        // scene switching / restart
        if(Phaser.Input.Keyboard.JustDown(this.reload)) {
            this.scene.restart();
        }
        if(Phaser.Input.Keyboard.JustDown(this.swap)) {
            this.scene.start("spawnMapScene");
        }
    }
}