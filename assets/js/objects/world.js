var world = {
    tilemap : null,
    tileset : null,
    fondLayer : null,
    grabLayer: null,
    worldLayer : null,
    solLayer : null,

    spawnPosition : null,
    grabPosition : null,
    grabCollider : null,
    overlapGrabTriggered : false,

    jewelPosition : [],
    groupJewel : null,
    nbJewelCollected : 0,

    hudJewel : null,
    distanceParcouru : [],
    currentDistance : 0,
    textCurrentDistance : null,
    musicJeu: null,


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
        this.grabLayer = this.tilemap.createStaticLayer("grab", this.tileset, 0, 0);
        // collide & bounds
        this.worldLayer.setCollisionBetween(1, 500);
        jeu.scene.physics.world.setBounds(0, -50, this.tilemap.widthInPixel, this.tilemap.heightInPixel);
        // objets de la map
        this.spawnPosition = this.tilemap.findObject("Objects", obj => obj.name === "spawn");
        this.grabPosition = this.tilemap.findObject("Objects", obj => obj.name === "grab");
        // jewel
        this.creerAnimationJewel();
        this.genererJewel();
        this.genererMouvementJewel();
        // hud jewel
        jeu.scene.add.sprite(35, -10, "panel").setScale(0.8).setScrollFactor(0);
        jeu.scene.add.sprite(jeu.scene.game.config.width - 10, 22, "panel2").setScale(0.8).setScrollFactor(0);
        this.hudJewel = jeu.scene.add.sprite(jeu.scene.game.config.width - 10, 20, "jewel_0").setScrollFactor(0);
        //  sound
        this.musicJeu = jeu.scene.sound.add("musicJeu", {volume: 0.2, loop: true, pauseOnBlur: true});
        this.musicJeu.play();
    },
    genererJewel : function(){
        let nbJewel = this.tilemap.findObject("Objects", obj => obj.name === "jewel1").properties.nbJewel;
        // recuperer les positions des jewels
        for(let n = 1; n <= nbJewel; n++){
           this.jewelPosition.push(this.tilemap.findObject("Objects", obj => obj.name === "jewel"+n))
        }
        this.groupJewel = jeu.scene.physics.add.group();
        // ajouter les sprites de jewel suivant ces positions
        for(let i = 0; i < nbJewel; i++){
           this.groupJewel.create(this.jewelPosition[i].x, this.jewelPosition[i].y, 'jewel', 'jewel_4');
        }
        this.groupJewel.children.entries.forEach(element => { element.setScale(0.8)});
        this.groupJewel.children.entries.forEach(element => { element.anims.play("jewelAnim")});
        this.groupJewel.children.entries.forEach(element => { element.body.allowGravity = false });
    },

    collectJewel : function(player, tile){
        if(jeu.world.nbJewelCollected < 3){
            jeu.scene.sound.play("jewel", {volume: 0.1});
            tile.destroy();
            jeu.world.nbJewelCollected++;
            // HUD
            jeu.world.hudJewel.setTexture("jewel_"+jeu.world.nbJewelCollected);
            // jeu.scene.add.text(jeu.scene.game.config.width - 40, 10, jeu.world.nbJewelCollected).setScrollFactor(0);
        };
    },
    creerAnimationJewel : function(){
        jeu.scene.anims.create({
            key :         "jewelAnim",
            frames :      jeu.scene.anims.generateFrameNames("jewel", {prefix: "jewel_", start : 0, end : 5}),
            frameRate :   12,
            repeat :      -1
        })
    },

    genererMouvementJewel : function(){
        jeu.scene.tweens.add({
            targets : this.groupJewel.children.entries,
            y : 100,
            ease : "linear",
            duration : 500,
            yoyo : true,
            repeat : -1
        })
    },
    // HUD distance
    afficherBestDistance : function(){
        distanceMaxParcouru = Math.max.apply(null, this.distanceParcouru);
        distanceMaxParcouru = (distanceMaxParcouru/10).toFixed(2)+"m";
        jeu.scene.add.sprite(20,15, "runO").setScale(0.7).setScrollFactor(0);
        this.textCurrentDistance = jeu.scene.add.text(25, 15, " "+ jeu.world.currentDistance, 
                            {fontSize: "7.5px", color : "#FFFFFF", fontFamily: "'Press Start 2P'"}).setScrollFactor(0);
        if(this.distanceParcouru.length > 0){
            jeu.scene.add.text(5, 35, "Your best \n"+ distanceMaxParcouru, 
                            { centerText: "center", fontSize: "7px", color : "#FFFFFF", fontFamily: "'Press Start 2P'"}).setOrigin(0,0).setScrollFactor(0);
        }
    },

    gererCollider : function(){
        //  collide entre joueur et sol     
        jeu.scene.physics.add.collider(jeu.player.aPlayer, this.worldLayer);
        // collide entre joueur et jewel
        jeu.scene.physics.add.overlap(jeu.player.aPlayer, jeu.world.groupJewel, this.collectJewel);
        //  grab du joueur
        this.grabLayer.setTileIndexCallback(49, jeu.player.gererGrab,this);
        jeu.scene.physics.add.overlap(jeu.player.aPlayer, this.grabLayer);
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