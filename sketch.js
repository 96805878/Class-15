var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var PLAY = 1;
var END = 0;
var gameState=PLAY;

var restartImg,gameOverImg;




function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  

  restartImg=loadImage("restart.png");
  gamerOverImg=loadImage("gameOver.png");


}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;


  //trex.debug = true;
  trex.setCollider("circle",0,0,50);
  

  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,185,400,10);
  invisibleGround.visible = false;
  
  console.log("Hello" + 5);
  
  score = 0;
  //Group - class
  //new - new object
  obstaclesGroup=new Group();
  cloudsGroup=new Group();
}

function draw() {
  background(180);
  text("Score: "+ score, 500,50);

  
  trex.collide(invisibleGround);
  

  if(gameState === PLAY){
    score = score + Math.round(frameCount/60);
    //console.log(trex.y)
    if(keyDown("space")&& trex.y >= 150) {
      trex.velocityY = -13;
    }

    trex.velocityY = trex.velocityY + 0.8

    //spawn the clouds
    spawnClouds();

    spawnObstacles();

    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    if(trex.isTouching(obstaclesGroup)){
      gameState=END;
      
    }

  }

  else if(gameState === END){
    
    ground.velocityX=0
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    
    trex.changeAnimation("collided");
     
    trex.velocityY=0
   //trex.velocityY = trex.velocityY + 0.8

    var gameOver=createSprite(300,80,10,10);
    var restart=createSprite(300,110,10,10);
    gameOver.addImage(gamerOverImg);
    restart.addImage(restartImg);

    gameOver.scale=0.5;
    restart.scale=0.3;

  }
  

  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(610,165,10,40);
   obstacle.velocityX = -5;
   obstaclesGroup.add(obstacle)
   //obstacle.debug=true

   
    // //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
 }
}




function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;

    cloudsGroup.add(cloud);
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
  
}