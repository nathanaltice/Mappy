// Nathan Altice
// Created: 5/4/20
// Updated: 5/5/20
// Mappy
// Tilemap examples
// Lovingly adapted from Michael Hadley's "Modular Game Worlds in Phaser 3" tutorial series

// debug with extreme prejudice
"use strict";

// game config
let config = {
    type: Phaser.CANVAS,
    pixelArt: true,
    width: 320,
    height: 320,
    zoom: 2,
    physics: {
        default: "arcade",
        arcade: {
            //debug: true,
        }
    },
    scene: [ ArrayMap, RandomMap, TiledSimple, TiledPlatform, ParallaxLayers ]
};

const game = new Phaser.Game(config);

// globals
const centerX = game.config.width / 2;
const centerY = game.config.height / 2;
const w = game.config.width;
const h = game.config.h;
let cursors = null;