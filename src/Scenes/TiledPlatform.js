class TiledPlatform extends Phaser.Scene {
    constructor() {
        super("tiledPlatformScene");

        // variables and settings
        this.ACCELERATION = 500;
        this.MAX_X_VEL = 200;   // pixels/second
        this.MAX_Y_VEL = 2000;
        this.DRAG = 600;    
        this.JUMP_VELOCITY = -650;
    }

    preload() {
        // load assets
        this.load.path = "./assets/";
        this.load.spritesheet("kenney_sheet", "colored_transparent_packed.png", {
            frameWidth: 16,
            frameHeight: 16
        });
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
        
        // set map collision
        groundLayer.setCollision([19, 20, 21, 67, 69, 120]);
        
        /*
        TO-DO: create tilemap collision using (a) exclusions and (b) properties set in Tiled
        */
        
        // define a render debug so we can see the tilemap's collision bounds
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        // groundLayer.renderDebug(debugGraphics, {
        //     tileColor: null,    // color of non-colliding tiles
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),    // color of colliding tiles
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255)                // color of colliding face edges
        // });

        // setup player
        this.p1 = this.physics.add.sprite(100, 200, "kenney_sheet", 450);
        this.p1.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        this.p1.setCollideWorldBounds(true);

        // set gravity and physics world bounds (so collideWorldBounds works)
        this.physics.world.gravity.y = 2000;
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);

        // create collider(s)
        this.physics.add.collider(this.p1, groundLayer);

        // setup camera
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.p1, true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])
        //this.cameras.main.setDeadzone(50, 50);

        // define keyboard cursor input
        cursors = this.input.keyboard.createCursorKeys();

        // enable scene switcher / reload keys
        this.swap = this.input.keyboard.addKey('S');
        this.reload = this.input.keyboard.addKey('R');

        // debug
        //this.scene.start("");
    }

    update() {
        // player movement
        if(cursors.left.isDown) {
            this.p1.body.setAccelerationX(-this.ACCELERATION);
            this.p1.setFlip(true, false);
        } else if(cursors.right.isDown) {
            this.p1.body.setAccelerationX(this.ACCELERATION);
            this.p1.resetFlip();
        } else {
            // set acceleration to 0 so DRAG will take over
            this.p1.body.setAccelerationX(0);
            this.p1.body.setDragX(this.DRAG);
        }
        // player jump
        // note that we need body.blocked rather than body.touching b/c the former applies to tilemap tiles and the latter to the "ground"
        if(!this.p1.body.blocked.down) {
            //this.p1.anims.play('jump', true);
        }
        if(this.p1.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.p1.body.setVelocityY(this.JUMP_VELOCITY);
        }

        // scene switching / restart
        if(Phaser.Input.Keyboard.JustDown(this.reload)) {
            this.scene.restart();
        }
        if(Phaser.Input.Keyboard.JustDown(this.swap)) {
            //this.scene.start("platformTiledScene");
        }
    }
}