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
    this.load.image("runO", "assets/images/character/runO.png");
    // objets
    this.load.atlas("jewel", "assets/images/objects/jewel.png", "assets/images/objects/jewelAtlas.json");
    this.load.image("jewel_0", "assets/images/objects/jewel_0.png");
    this.load.image("jewel_1", "assets/images/objects/jewel_1.png");
    this.load.image("jewel_2", "assets/images/objects/jewel_2.png");
    this.load.image("jewel_3", "assets/images/objects/jewel_3.png");
    this.load.image("panel", "assets/images/objects/green_panel.png");
    this.load.image("panel2", "assets/images/objects/green_sliderLeft.png");
    // sons
    this.load.audio("musicJeu", "assets/sounds/pentatonic.ogg");
    this.load.audio("jewel", "assets/sounds/jewel.ogg");
    this.load.audio("jump", "assets/sounds/jump.wav");
    this.load.audio("chute", "assets/sounds/chute.ogg");
}
function create(){
    jeu.world.initialiserWorld();
    jeu.player.initialiserPlayer();
    jeu.player.creerAnimationPlayer();
    jeu.world.gererCollider();
    jeu.world.gererCamera();
    jeu.world.afficherBestDistance();
    jeu.cursor = jeu.scene.input.keyboard.createCursorKeys();
}
function update(time, delta){
    ajusterTailleEcran();
    updateCurrentDistance();
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

function updateCurrentDistance(){
  jeu.world.currentDistance = ((jeu.player.aPlayer.x - jeu.world.spawnPosition.x)/10).toFixed(0)+"m";
  jeu.world.textCurrentDistance.setText(" "+ jeu.world.currentDistance);
}
