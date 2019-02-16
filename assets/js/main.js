let jeu = {
    scene : null,
    world : world,
    player : player,
    cursor : null

}

function preload(){
    jeu.scene = this;
    //  arrière plan
    this.load.image("bg1", "assets/images/background/plx-1.png");
    this.load.image("bg2", "assets/images/background/plx-2.png");
    this.load.image("bg3", "assets/images/background/plx-3.png");
    this.load.image("bg4", "assets/images/background/plx-4.png");
    this.load.image("bg5", "assets/images/background/plx-5.png");
    // carte
    jeu.scene.load.image("tiles", "assets/images/jungleTileset.png");
    jeu.scene.load.tilemapTiledJSON("level1", "assets/json/level1.json");
    // joueur
    jeu.scene.load.atlas("player", "assets/images/character/player.png", "assets/images/character/playerAtlas.json");
    this.load.image("jumpO", "assets/images/character/jumpO.png");
}
function create(){
  
  jeu.world.initialiserWorld();
  jeu.player.initialiserPlayer();
  jeu.player.creerAnimationPlayer();
  jeu.world.gererCollider();
  jeu.world.gererCamera();
  // cursor
  jeu.cursor = jeu.scene.input.keyboard.createCursorKeys();
}
function update(){
    ajusterTailleEcran();
    jeu.player.gererDeplacement();
    jeu.world.gererBgParallax();
};
	
function ajusterTailleEcran(){
    // max_width et max_height du canvas dans main.css
    let canvas = document.querySelector("canvas");
    let fenetreWidth = window.innerWidth;
    let fenetreHeight = window.innerHeight;
    let fenetreRatio = fenetreWidth / fenetreHeight;
    let jeuRatio = config.width / config.height;
    if(fenetreRatio < jeuRatio){
      canvas.style.width = fenetreWidth + "px";
      canvas.style.height = (fenetreWidth/jeuRatio) + "px";
    }else {
      canvas.style.width = (fenetreHeight * jeuRatio) + "px";
      canvas.style.height = fenetreHeight + "px";
    }
};
