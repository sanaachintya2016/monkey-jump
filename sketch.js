var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground,invisibleGround;
var PLAY = 0
var END=1
var survivalTime=0
var gameState = PLAY
var score = 0
var monkeySound
function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  monkeySound=addSound("p5.sound.min.js")
}

function setup() {
monkey=createSprite(50,350,50,50);
monkey.addAnimation("monkey", monkey_running);
monkey.scale=0.09
ground=createSprite(200,375,4000,20);
invisibleGround=createSprite(200,362,4000,5);
ground.velocityX=-5
  
FoodGroup = new Group();
obstacleGroup = new Group();
obstacleGroup.setDebug=true 
}


function draw() {
background("white");
monkey.collide(invisibleGround);
invisibleGround.visible = false
console.log(gameState)
//monkey.debug=true
monkey.setCollider("circle",0,0,240)
 if (ground.x < 0){
ground.x = ground.width/2;
}
if(keyDown("space")&&monkey.y>=330){
  monkey.velocityY=-20;  
}
spawnObstacle();
spawnBanana();
if(monkey.isTouching(obstacleGroup)){
gameState=END
}
stroke("white")
textSize(20)  
fill("black")
survivalTime = Math.ceil(frameCount/frameRate());
text("survival Time:"+survivalTime,100,50)
if(gameState===END){
obstacleGroup.setVelocityXEach(0)
FoodGroup.setVelocityXEach(0)
survivalTime=0
monkey.velocityY= 0
ground.velocityX=0
obstacleGroup.setLifetimeEach(-1);
FoodGroup.setLifetimeEach(-1) 
FoodGroup.destroyEach(); 

}
//to give the gravity
monkey.velocityY=monkey.velocityY+1.5;
stroke("white")
textSize(20)  
fill("black")
text("score:"+score,270,20)
drawSprites();


}

function spawnObstacle(){
if(frameCount%60===0){
obstacle=createSprite(375,344,20,20);
obstacle.addImage(obstaceImage);
obstacle.scale=0.12;
obstacle.velocityX =-9;
obstacle.lifetime = 60
obstacleGroup.add(obstacle);
}

} 

function spawnBanana(){
if(frameCount%90===0){
banana=createSprite(370,200,20,20);
banana.addImage(bananaImage)
banana.scale=0.08;
banana.velocityX=-7;
banana.y = Math.round(random(190,220));
banana.lifetime = 60
FoodGroup.add(banana);
}
if(monkey.isTouching(FoodGroup)){
FoodGroup.destroyEach(); 
score= score+1
}
}
