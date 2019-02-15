var config = {
    type: Phaser.AUTO,
    width: 384,
    height: 216,
    backgroundColor : "#aedecb",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


var game = new Phaser.Game(config);