let player = {
    aPlayer : null,
    // état du joueur
    isMovingRight : false,
    isMovingRightFast : false,
    isMovingLeft : false,
    isMovingLeftFast : false,
    isGrabing : false,


    initialiserPlayer : function(){
        this.aPlayer = jeu.scene.physics.add.sprite(jeu.world.spawnPosition.x , jeu.world.spawnPosition.y, "player", "dudeIdle2");
        this.aPlayer.setCollideWorldBounds(true);
        this.aPlayer.setOrigin(0.5,1);
    },
    gererDeplacement : function(){
        //  grab du joueur
        jeu.scene.physics.add.overlap(jeu.player.aPlayer, jeu.world.grapPosition, this.gererGrab);
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
            this.aPlayer.anims.play("dudeAir", true);
            this.aPlayer.setVelocityY(-170);
        //  ^^^^^^
        }else if(jeu.cursor.space.isDown && this.aPlayer.body.onFloor() && jeu.cursor.shift.isDown){
            this.aPlayer.setVelocityY(-220);
        }
        // animation saut
        if(!this.aPlayer.body.onFloor()){
            this.aPlayer.anims.play("dudeAir", true);
        }
    },
    gererGrab : function(){
        console.log("yolo")
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
            frameRate :   8,
            repeat :      -1
        }),
        jeu.scene.anims.create({
            key :         "dudeAir",
            frames :      jeu.scene.anims.generateFrameNames("player", {prefix: "dudeAir", start : 1, end : 2}),
            frameRate :   3,
            repeat :      -1
        }),
        jeu.scene.anims.create({
            key :         "dudeGrab",
            frames :      jeu.scene.anims.generateFrameNames("player", {prefix: "dudeAir", start : 1, end : 6}),
            frameRate :   8,
            repeat :      -1
        })
    }
}