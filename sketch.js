var monkey,monkeyRunning;
var banana,bananaImage;
var stone,stoneImage;
var foodGroup,ObstacleGroup;
var jungle,jungleImage;
var ground,groundImage;
var score = 0;



function preload(){
  monkeyRunning = loadAnimation("Monkey1.png","Monkey2.png","Monkey3.png","Monkey4.png","Monkey5.png","Monkey6.png","Monkey7.png","Monkey8.png","Monkey9.png","Monkey10.png");
bananaImage = loadImage("banana.png");
stoneImage = loadImage("stone.png");
jungleImage = loadImage("jungle.jpg");
}



function setup(){
  createCanvas(600,500);
  
  jungle = createSprite(0,0,600,500);
  jungle.addImage(jungleImage);
  jungle.scale = 1.5;
  jungle.velocityX = -4;
  
  monkey = createSprite(70,370);
  monkey.scale = 0.08;
  monkey.addAnimation("Running",monkeyRunning);
  monkey.debug = false;
  
  ground = createSprite(370,400,600,10);
  ground.velocityX = -10;
  ground.visible = false;
  
  obstacleGroup = new Group();
  foodGroup = new Group();
  score = 0;
}



function draw(){
  background("white");
  
  if (jungle.x < 0){
      jungle.x = jungle.width / 2;
    }
  
  
  if (ground.x < 0){
      ground.x = ground.width / 2;
    }
  
  
  if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
  
  
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground);
  
spawnfood();
spawnObstacle();
  
 if(foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: monkey.scale = 0.12;
                break;
        case 20: monkey.scale = 0.14;
                break;
        case 30: monkey.scale = 0.16;
                break;
        case 40: monkey.scale = 0.18;
                break;
        default: break;
    }
  
  if(obstacleGroup.isTouching(monkey)){
     monkey.scale = 0.08;
     score = 0;
     }
    
drawSprites();
  stroke("white");
  textSize(30);
  fill("yellow");
  text("SCORE: "+ score, 400,50);
}



function spawnfood(){
  if(frameCount % 80 === 0){
    banana = createSprite(500,250,40,10);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.setCollider("circle",0,0,40)
    banana.debug = false;
    banana.velocityX = -4;
    banana.y = Math.round(random(150,280));
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    foodGroup.add(banana);
  }
}



function spawnObstacle(){
  if(frameCount % 300 === 0){
    stone = createSprite(650,385,0,0);
    stone.addImage(stoneImage);
    stone.scale = 0.1;
    stone.debug = false;
    stone.velocityX = -4;
    stone.lifetime = 300;
    monkey.depth = stone.depth + 1;
    obstacleGroup.add(stone);
  }
}
  

