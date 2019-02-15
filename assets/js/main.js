var jeu = {
    scene : null,
    world : world,
    player : player

}

function preload(){
    jeu.scene = this;
    //  arrière plan avec Parralax
    this.load.image("bg1", "assets/images/background/plx-1.png");
    this.load.image("bg2", "assets/images/background/plx-2.png");
    this.load.image("bg3", "assets/images/background/plx-3.png");
    this.load.image("bg4", "assets/images/background/plx-4.png");
    this.load.image("bg5", "assets/images/background/plx-5.png");
    // carte
    jeu.scene.load.image("titles", "assets/images/jungleTileset.png");
    jeu.scene.load.tilemapTiledJSON("level1", "assets/json/level1.json");
    // joueur
    this.load.image("jumpO", "assets/images/character/jumpO.png");
}
function create(){
    jeu.world.initialiserWorld();
    
    // jeu.player.initialiserPlayer();
    
    jeu.player = jeu.scene.physics.add.sprite(150, 100, "jumpO");
    jeu.cursor = jeu.scene.input.keyboard.createCursorKeys();
    jeu.scene.cameras.main.startFollow(jeu.player).setBounds();
}
function update(){
    ajusterTailleEcran();
    if(jeu.cursor.right.isDown){
        jeu.world.bg5.tilePositionX += 0.3;
        jeu.world.bg4.tilePositionX += 0.2;
        jeu.world.bg3.tilePositionX += 0.1;
        jeu.player.setVelocityX(100);
        jeu.player.setFlip(false, false);
    }else if(jeu.cursor.right.isUp){
        jeu.player.setVelocityX(0);
    }
}
	
function ajusterTailleEcran(){
    var canvas = document.querySelector("canvas");
  
    var fenetreWidth = window.innerWidth/2;
    var fenetreHeight = window.innerHeight/2;
    var fenetreRatio = fenetreWidth / fenetreHeight;
  
    var jeuRatio = config.width / config.height;
  
    if(fenetreRatio < jeuRatio){
      canvas.style.width = fenetreWidth + "px";
      canvas.style.height = (fenetreWidth/jeuRatio) + "px";
    }else {
      canvas.style.width = (fenetreHeight * jeuRatio) + "px";
      canvas.style.height = fenetreHeight + "px";
    }
};