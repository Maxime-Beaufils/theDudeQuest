var config = {
    type: Phaser.AUTO,
    width: 384,
    height: 216,
    parent: 'myGame',
    backgroundColor : "#aedecb",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug : false
        }
    },
    scene: {
        loader: loader,
        preload: preload,
        create: create,
        update: update
    },
    pixelArt: true,
};

var game = new Phaser.Game(config);