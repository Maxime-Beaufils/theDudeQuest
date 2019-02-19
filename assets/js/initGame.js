var config = {
    type: Phaser.AUTO,
    width: 384,
    height: 216,
    backgroundColor : "#aedecb",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug : false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    pixelArt: true,
};

var game = new Phaser.Game(config);