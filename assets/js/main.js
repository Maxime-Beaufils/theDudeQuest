var jeu = {
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
    this.load.image("tiles", "assets/images/jungleTileset.png");
    this.load.tilemapTiledJSON("level1", "assets/json/level1.json");
    // joueur
    this.load.atlas("player", "assets/images/character/player.png", "assets/images/character/playerAtlas.json");
    this.load.image("jumpO", "assets/images/character/jumpO.png");
    // objets
    this.load.atlas("jewel", "assets/images/objects/jewel.png", "assets/images/objects/jewelAtlas.json");
}
function create(){
  jeu.world.initialiserWorld();
  jeu.player.initialiserPlayer();
  jeu.player.creerAnimationPlayer();
  jeu.world.gererCollider();
  jeu.world.gererCamera();
  jeu.cursor = jeu.scene.input.keyboard.createCursorKeys();
}
function update(time, delta){
    ajusterTailleEcran();
    jeu.player.gererDeplacement();
    jeu.player.gererChutePlayer();
    jeu.world.gererBgParallax();
};
	
function ajusterTailleEcran(){
    // max_width et max_height du canvas dans main.css
    var canvas = document.querySelector("canvas");
    var fenetreWidth = window.innerWidth;
    var fenetreHeight = window.innerHeight;
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
