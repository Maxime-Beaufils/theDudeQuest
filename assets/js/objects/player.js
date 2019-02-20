var player = {
    aPlayer : null,
    // état du joueur
    isMovingRight : false,
    isMovingRightFast : false,
    isMovingLeft : false,
    isMovingLeftFast : false,
    isGrabing : false,


    initialiserPlayer : function(){
        this.aPlayer = jeu.scene.physics.add.sprite(jeu.world.spawnPosition.x, jeu.world.spawnPosition.y, "player", "dudeIdle2");
        this.aPlayer.setCollideWorldBounds(true);
        this.aPlayer.setOrigin(0.5,0);
        this.aPlayer.setSize(15,15).setOffset(4,16);
    },
    gererDeplacement : function(){
        if(!this.aPlayer.isGrabing){
            //  >>>>>>>
            if(jeu.cursor.right.isDown && jeu.cursor.shift.isDown){
                this.aPlayer.isMovingRightFast = true;
                this.aPlayer.isMovingRight = false;
                this.aPlayer.isMovingLeftFast = false;
                this.aPlayer.isMovingLeft = false;
                this.aPlayer.anims.play("dudeRunFast", true);
                this.aPlayer.setAngle(-6);
                this.aPlayer.setVelocityX(120);
                this.aPlayer.setFlip(false, false);
                //  >>
            }else if(jeu.cursor.right.isDown){
                this.aPlayer.isMovingRight = true;
                this.aPlayer.isMovingRightFast = false;
                this.aPlayer.isMovingLeftFast = false;
                this.aPlayer.isMovingLeft = false;
                this.aPlayer.anims.play("dudeRun", true).setAngle(0);
                this.aPlayer.setVelocityX(70);
                this.aPlayer.setFlip(false, false);
            //  <<<<<< 
            }else if(jeu.cursor.left.isDown && jeu.cursor.shift.isDown){
                this.aPlayer.isMovingLeftFast = true;
                this.aPlayer.isMovingRightFast = false;
                this.aPlayer.isMovingRight = false;
                this.aPlayer.isMovingLeft = false;
                this.aPlayer.anims.play("dudeRunFast", true);
                this.aPlayer.setAngle(6);
                this.aPlayer.setVelocityX(-120);
                this.aPlayer.setFlip(true, false);
            //  <<
            }else if(jeu.cursor.left.isDown){
                this.aPlayer.isMovingLeft = true;
                this.aPlayer.isMovingRightFast = false;
                this.aPlayer.isMovingRight = false;
                this.aPlayer.isMovingLeftFast = false;
                this.aPlayer.anims.play("dudeRun", true).setAngle(0);
                this.aPlayer.setVelocityX(-70);
                this.aPlayer.setFlip(true, false);
                this.aPlayer.isMovingLeft = false;
                this.aPlayer.isMovingLeftFast = false;
            }else{
                this.aPlayer.isMovingLeft = false;
                this.aPlayer.isMovingRightFast = false;
                this.aPlayer.isMovingRight = false;
                this.aPlayer.isMovingLeftFast = false;
                this.aPlayer.anims.play("dudeIdle", true);
                this.aPlayer.setAngle(0);
                this.aPlayer.setVelocityX(0);
            }
            //  ^^
            if(jeu.cursor.space.isDown && this.aPlayer.body.onFloor() && jeu.cursor.shift.isUp){
                this.aPlayer.setVelocityY(-170);
            //  ^^^^^^
            }else if(jeu.cursor.space.isDown && this.aPlayer.body.onFloor() && jeu.cursor.shift.isDown){
                this.aPlayer.setVelocityY(-220);
            }
            // animation de saut si le joueur ne touche pas le sol
            if(!this.aPlayer.body.onFloor()){
                this.aPlayer.setAngle(0);
                this.aPlayer.anims.play("dudeAir", true);
            }
                
        }
    },
    gererGrab : function(){
        if(!jeu.world.overlapGrabTriggered && jeu.cursor.space.isUp){
            jeu.player.aPlayer.isMovingRightFast = false;
            jeu.player.aPlayer.isMovingRight = false;
            jeu.player.aPlayer.isMovingLeftFast = false;
            jeu.player.aPlayer.isMovingLeft = false;
            jeu.player.aPlayer.isGrabing = true;
            // empecher le joueur de pivoter
            jeu.player.aPlayer.flipX = false;
            // positionner le player sur la corniche
            jeu.player.aPlayer.setVelocityY(0);
            jeu.player.aPlayer.body.allowGravity = false;
            jeu.player.aPlayer.setPosition(jeu.world.grabCollider.x + 8, jeu.world.grabCollider.y - 10);
            // animation de grab
            jeu.player.aPlayer.anims.play("dudeGrab");
            jeu.player.aPlayer.once("animationcomplete", () => {
                jeu.player.aPlayer.anims.play("dudeGrabStand", true);
            });
        };
        //booleen permetant de lancer le grab ou non
        jeu.world.overlapGrabTriggered = true;
        // sortir du grab
        if(jeu.cursor.space.isDown){
            jeu.player.aPlayer.body.allowGravity = true;
            jeu.player.aPlayer.setVelocityY(-170);
            jeu.player.aPlayer.isGrabing = false;
            // L'overlap grabCollider est réactivé après 500ms
            jeu.scene.time.addEvent({
              delay : 500,
              callback : jeu.world.switchOverlapGrabTriggered,
              callbackScope : this
            });
        };
    },
    gererChutePlayer : function(){
        if(jeu.player.aPlayer.y > game.config.height){
            const msg = ['tu es mort Jack !', "c'est la piquette jack !", "t'es mauvais jack !"];
            console.log(msg[Math.floor(Math.random() * Math.floor(3))]);
            jeu.world.groupJewel.children.entries.forEach((child) => {child.destroy()});
            jeu.world.groupJewel.clear();
            jeu.scene.scene.restart();
        }
    },
    
    creerAnimationPlayer : function(){
        jeu.scene.anims.create({
            key :         "dudeRun",
            frames :      jeu.scene.anims.generateFrameNames("player", {prefix: "dudeRun", start : 1, end : 8}),
            frameRate :   10,
            repeat :      -1
        }),
        jeu.scene.anims.create({
            key :         "dudeRunFast",
            frames :      jeu.scene.anims.generateFrameNames("player", {prefix: "dudeRun", start : 1, end : 8}),
            frameRate :   14,
            repeat :      -1
        }),
        jeu.scene.anims.create({
            key :         "dudeIdle",
            frames :      jeu.scene.anims.generateFrameNames("player", {prefix: "dudeIdle", start : 1, end : 12}),
            frameRate :   10,
            repeat :      -1
        }),
        jeu.scene.anims.create({
            key :         "dudeAir",
            frames :      jeu.scene.anims.generateFrameNames("player", {prefix: "dudeAir", start : 1, end : 2}),
            frameRate :   1,
            repeat :      -1
        }),
        jeu.scene.anims.create({
            key :         "dudeGrab",
            frames :      jeu.scene.anims.generateFrameNames("player", {prefix: "dudeGrab", start : 1, end : 6}),
            frameRate :   6,
            repeat :      0
        }),
        jeu.scene.anims.create({
            key :         "dudeGrabStand",
            frames :      jeu.scene.anims.generateFrameNames("player", {prefix: "dudeGrab", start : 4, end : 6}),
            frameRate :   4,
            repeat :      -1
        })
    }
}