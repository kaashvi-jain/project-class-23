var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground,states = "loaded"
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	

	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)


	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2 , 200 , 20 , {restitution:0.5, isStatic:true});
	World.add(world, packageBody);
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);
	side1 = new Ground(650,670,200,30);
	side2 = new Ground(550,630,30,100);
	side3 = new Ground(750,630,30,100);

	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);
  packageSprite.x= packageBody.position.x 
  packageSprite.y= packageBody.position.y 
  drawSprites();
  side1.display();
  side2.display();
  side3.display();
 
}

function keyPressed() {
 if (keyCode === DOWN_ARROW) {
    // Look at the hints in the document and understand how to make the package body fall only on press of the Down arrow key.
	Matter.Body.setStatic(packageBody,false)
    states = "drop";
    
  }
  if(keyCode == RIGHT_ARROW){
	  helicopterSprite.x += 20;
	  if(states == "loaded"){
		  Matter.Body.translate(packageBody,{x:20,y:0})
	  }
  }
  if(keyCode == LEFT_ARROW){
	helicopterSprite.x -= 20;
	if(states == "loaded"){
		Matter.Body.translate(packageBody,{x:-20,y:0})
	}
}
}



