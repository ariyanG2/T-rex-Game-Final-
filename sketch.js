var gameState = "play"

var score = 0

function preload(){
  
  trexanimation=loadAnimation("trex1.png", "trex3.png", "trex4.png");
  
  groundimg=loadImage("ground2.png");

  skyimg=loadImage("cloud.png")

  cactusimg1=loadImage("obstacle1.png")
  cactusimg2=loadImage("obstacle2.png")
  cactusimg3=loadImage("obstacle3.png")
  cactusimg4=loadImage("obstacle4.png")
  cactusimg5=loadImage("obstacle5.png")
  cactusimg6=loadImage("obstacle6.png")
  trexover=loadAnimation("trex_collided.png")

  jumps=loadSound("jump.mp3")
  dies=loadSound("die.mp3")
  checkpoints=loadSound("checkpoint.mp3")
  gameoverimg=loadImage("gameOver.png");
  restartimg=loadImage("restart.png");
}


function setup(){
  createCanvas (windowWidth, windowHeight);
  
  trex=createSprite(50, height-60, 50, 50);
  
  trex.addAnimation("animation", trexanimation);
  
  trex.addAnimation("trex_collided", trexover);
  
  trex.scale = 0.5;

  trex.debug = false

  trex.setCollider("circle",0, 0, 40);

  ground=createSprite(width/2, height-50, width, 20);
  
  ground.addImage(groundimg);

  ground2=createSprite(width/2, height-48, width, 20);

  ground2.visible = false

  gameover = createSprite(width/2, height/2, 25, 25);

  gameover.addImage(gameoverimg)
  
  gameover.scale = 0.5

  restart = createSprite(width/2,height/2-50 , 25, 25)

  restart.addImage(restartimg)
  
  restart.scale = 0.5

  obstaclegroup = createGroup()

  skygroup = createGroup()

}

function draw(){
  
  background(180);

  text("Score = "+ score, width-100, 25)

  if (gameState==="play"){

    gameover.visible = false
    restart.visible = false

    if(score%100===0 && score>0){
  checkpoints.play()
    }
    score = score + Math.round(getFrameRate()/20)

    ground.velocityX = -(4+score/110);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if ((keyDown("SPACE")||touches.length>0)&&(trex.y >= height-88 ) ){
      trex.velocityY = -6;
      jumps.play()
      touches=[]
    }

    trex.velocityY = trex.velocityY + 0.2;
    
    sky()

    cactus()

    if (trex.isTouching (obstaclegroup)){
      gameState = "end" 
      dies.play()
    }

  }  

  if (gameState === "end"){

    gameover.visible = true;
    restart.visible = true;
    ground.velocityX = 0
    obstaclegroup.setVelocityXEach(0)
    skygroup.setVelocityXEach(0)
    
    obstaclegroup.setLifetimeEach(-5)
    skygroup.setLifetimeEach(-5)
    trex.changeAnimation("trex_collided", trexover);

    trex.velocityY = 0

    if (mousePressedOver(restart)){
      gameState = "play"
      score = 0
      obstaclegroup.destroyEach()
      skygroup.destroyEach()
      trex.changeAnimation("animation", trexanimation);

    }
  }
  
  trex.collide(ground2);
  
  drawSprites();
}

function sky(){
  
if (frameCount%70===0){
  cloud=createSprite(width, random(10, 90), 25, 25)  
  cloud.velocityX = -(4 + score/110);
  cloud.addImage(skyimg)
  cloud.scale = 0.75
  cloud.lifetime = 300
  skygroup.add(cloud)
  trex.depth = cloud.depth + 1
  //console.log(trex.depth)
  //console.log(cloud.depth)
  //every 70 frames a cloud will be summoned/spawned/shown
}

}

function cactus(){
  if (frameCount%70===0){
  cacti = createSprite(width,height-70, 25, 25)
  cacti.velocityX = -(4 + score/110)
  cacti.scale = 0.5  
  cacti.lifetime = 300
  obstaclegroup.add (cacti)
  var number = Math.round(random(1,6))
  switch(number){
  case 1:cacti.addImage(cactusimg1)  
  break
  case 2:cacti.addImage(cactusimg2)  
  break
  case 3:cacti.addImage(cactusimg3)  
  break
  case 4:cacti.addImage(cactusimg4)  
  break
  case 5:cacti.addImage(cactusimg5)  
  break
  case 6:cacti.addImage(cactusimg6)  
  break
  }
  //no quotations in a variable; (num)
}
}