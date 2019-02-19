var world = {
    tilemap : null,
    tileset : null,
    fondLayer : null,
    worldLayer : null,
    solLayer : null,
    spawnPosition : null,
    grabPosition : null,
    grabCollider : null,
    overlapGrabTriggered : false,


    initialiserWorld : function(){
        // arrière plan
        this.bg1 = jeu.scene.add.tileSprite(0, 0, 384, 216, "bg1").setOrigin(0);
        this.bg1.setScrollFactor(0);
        this.bg2 = jeu.scene.add.tileSprite(0, 0, 384, 216, "bg2").setOrigin(0);
        this.bg2.setScrollFactor(0);
        this.bg3 = jeu.scene.add.tileSprite(0, 0, 384, 216, "bg3").setOrigin(0);
        this.bg3.setScrollFactor(0);
        this.bg4 = jeu.scene.add.tileSprite(0, 0, 384, 216, "bg4").setOrigin(0);
        this.bg4.setScrollFactor(0);
        this.bg5 = jeu.scene.add.tileSprite(0, 0, 384, 216, "bg5").setOrigin(0);
        this.bg5.setScrollFactor(0);
        // carte tileset
        this.tilemap = jeu.scene.make.tilemap({key : "level1"});
        this.tileset = this.tilemap.addTilesetImage("jungle", "tiles");
        this.fondLayer = this.tilemap.createStaticLayer("fond", this.tileset, 0, 0);
        this.worldLayer = this.tilemap.createStaticLayer("world", this.tileset, 0, 0);
        this.solLayer = this.tilemap.createStaticLayer("sol", this.tileset, 0, 0);
        // collide & bounds
        this.worldLayer.setCollisionBetween(1, 500);
        jeu.scene.physics.world.setBounds(0, -50, this.tilemap.widthInPixel, this.tilemap.heightInPixel);
        // objets de la map
        this.spawnPosition = this.tilemap.findObject("Objects", obj => obj.name === "spawn");
        this.grabPosition = this.tilemap.findObject("Objects", obj => obj.name === "grab");
        //  paramêtres du collider grab
        this.grabCollider = jeu.scene.physics.add.sprite(this.grabPosition.x, this.grabPosition.y);
        this.grabCollider.setOrigin(-1,0).setScale(0.3);
        this.grabCollider.body.allowGravity = false;
    },
    
    gererCollider : function(){
        //  collide entre joueur et sol
        jeu.scene.physics.add.collider(jeu.player.aPlayer, this.worldLayer);
        //  grab du joueur
        jeu.scene.physics.add.overlap(jeu.player.aPlayer, this.grabCollider, jeu.player.gererGrab, null, this);
    },

    gererBgParallax : function(){
        if(jeu.player.aPlayer.x > 192){
            if(jeu.player.aPlayer.isMovingRightFast){
                jeu.world.bg5.tilePositionX += 0.5;
                jeu.world.bg4.tilePositionX += 0.4;
                jeu.world.bg3.tilePositionX += 0.3;
            }else if(jeu.player.aPlayer.isMovingRight){
                jeu.world.bg5.tilePositionX += 0.3;
                jeu.world.bg4.tilePositionX += 0.2;
                jeu.world.bg3.tilePositionX += 0.1;
            }else if(jeu.player.aPlayer.isMovingLeftFast){
                jeu.world.bg5.tilePositionX -= 0.5;
                jeu.world.bg4.tilePositionX -= 0.4;
                jeu.world.bg3.tilePositionX -= 0.3;
            }else if(jeu.player.aPlayer.isMovingLeft){
                jeu.world.bg5.tilePositionX -= 0.3;
                jeu.world.bg4.tilePositionX -= 0.2;
                jeu.world.bg3.tilePositionX -= 0.1;
            }
        }
    },
    gererCamera : function(){
        jeu.scene.cameras.main.setBounds(0, 0, this.tilemap.widthInPixels, this.tilemap.heightInPixels-10);
        jeu.scene.cameras.main.startFollow(jeu.player.aPlayer);
    },
    switchOverlapGrabTriggered : function(){
        this.overlapGrabTriggered = false;
    }
}