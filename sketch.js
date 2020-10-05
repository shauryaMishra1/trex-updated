var trex,ground1,score,cloud,obstacle,gamestate,gameover,restart,cloud1,obstacle1,select;
var c,go,g2,o1,o2,o3,o4,o5,o6,r,trexrunning,trexcolliding
function preload(){
c=loadImage("cloud.png");
  go=loadImage("gameOver.png");
  g2=loadImage("ground2.png");
  o1=loadImage("obstacle1.png");
  o2=loadImage("obstacle2.png");
  o3=loadImage("obstacle3.png");
  o4=loadImage("obstacle4.png");
  o5=loadImage("obstacle5.png");
  o6=loadImage("obstacle6.png");
  r=loadImage("restart.png");
  trexrunning=loadAnimation("trex1.png","trex3.png","trex4.png");
  trexcolliding= loadAnimation("trex_collided.png");
}
function setup(){
createCanvas(windowWidth,windowHeight)
  trex= createSprite(47,353);
trex.addAnimation("trex",trexrunning);
  trex.addAnimation("colliding",trexcolliding);
trex.scale= 0.5;
//trex.debug= true;
trex.setCollider("circle",0,0,30);
 ground1= createSprite(100,380);
ground1.addImage(g2);
//var invisibleground= createSprite(100,390,400,5);
//invisibleground.visible= false;
 score= 0;
cloud = createGroup();
 obstacle = createGroup();
 gamestate="play";
gameover= createSprite(width/2,height/2-150);
gameover.addImage(go);
 restart= createSprite(width/2,height/2-100);
restart.addImage(r);
gameover.visible= false;
restart.visible= false;
}
  function draw() {
background("white");
drawSprites();
console.log("hello"+7);
if (gamestate=="play") {
  


if (touches.lengh>0||keyDown("up")&& trex.y>=345) {
trex.velocityY= -9;
touches=[];
  //playSound("sound://category_jump/classic_jump_4.mp3");
    }
trex.velocityY=trex.velocityY+0.5;        
trex.collide(ground1);
ground1.velocityX= -(9+score/100);  
if (ground1.x<0) {
ground1.x= ground1.width/2;  
}
clouds();
obstacles();  
if (trex.isTouching(obstacle)) {
gameover.visible= true;
restart.visible= true;
trex.changeAnimation("colliding", trexcolliding);
gamestate="end";
//playSound("sound://category_hits/puzzle_game_button_01.mp3");
}

text("score="+score,336,35);
score=score+Math.round(frameRate()/60);
}
if (gamestate=="end") {
trex.velocityY=0;
ground1.velocityX=0;
cloud.setVelocityXEach(0);
obstacle.setVelocityXEach(0);  
obstacle.destroyEach();
cloud.destroyEach();
if (touches.lengh>0||mousePressedOver(restart)) {
gamestate= "play" ;
touches=[];
  gameover.visible= false;
restart.visible= false;
trex.changeAnimation("trex", trexrunning);
score=0;
}

  
}
if (score%100==0&& score>0) {
//playSound("sound://category_hits/puzzle_game_magic_item_unlock_4.mp3");  
}

}
function clouds() {
if (frameCount%80==0) {
  


 cloud1= createSprite(width,random(50,200));
cloud1.addImage(c);
cloud1.velocityX= -(2+score/100);
cloud1.lifetime= 800;
cloud.add(cloud1);
  
}  
}
function obstacles() {
if (frameCount%100==0) {
 obstacle1= createSprite(width,361);
 select=Math.round( random(1,6));
switch(select){
  case 1:    

obstacle1.addImage(o1);
    break;
    case 2:
  obstacle1.addImage(o2);
    break;
    case 3:
    obstacle1.addImage(o3);
    break;
  case 4:
    obstacle1.addImage(o4);
    break;
    case 5:
    obstacle1.addImage(o5);
    break;
    case 6:
    obstacle1.addImage(o6);
    break;
    default:
    break;}
obstacle1.velocityX= -(5+score/100);
obstacle1.scale= 0.5;
obstacle1.lifetime= 800;
obstacle1.depth= trex.depth;
trex.depth=trex.depth+1;
obstacle.add(obstacle1);
 }


   }
      

