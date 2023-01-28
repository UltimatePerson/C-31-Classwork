const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var ground, rope, fruit, fruit_con;

let engine;
let world;

var bg_img;
var food;
var bunny_img;

var button;
var bunny;

var blink, eat, sad;

function preload() {
  bg_img = loadImage('background.png')
  food = loadImage("melon.png")
  bunny_img = loadImage("Rabbit-01.png")

  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;

  eat.looping = false;
  sad.looping = false;

}

function setup() {
  createCanvas(600, 700);
  frameRate(80);
  blink.frameDelay = 20;
  sad.frameDelay = 20;
  eat.frameDelay = 20;

  engine = Engine.create();
  world = engine.world;

  button = createImg('cut_btn.png');
  button.position(270, 30);
  button.size(50, 50);
  button.mouseClicked(drop);

  ground = new Ground(300, 690, width, 20);
  rope = new Rope(5, {
    x: 300,
    y: 20
  });
  fruit = Bodies.circle(300, 200, 30);
  Matter.Composite.add(rope.body, fruit);
  fruit_con = new Link(rope, fruit);

  bunny = createSprite(300, 620);
  bunny.scale = 0.25

  bunny.addAnimation("blinking", blink);
  bunny.addAnimation("eating", eat);
  bunny.addAnimation("crying", sad);

  bunny.changeAnimation("blinking");

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
}

function draw() {
  background(51);
  image(bg_img, 0, 0, width, height);
  Engine.update(engine)
  ground.show()
  rope.show()

  if (fruit != null) {
    push()
    image(food, fruit.position.x, fruit.position.y, 100, 100)
    pop()
  }

  if(collide(fruit, bunny) == true){
    bunny.changeAnimation("eating");
  }

  if(collide(fruit, ground.body) == true){
    bunny.changeAnimation("crying");
  }

  drawSprites()

}

function drop() {
  rope.break();
  fruit_con.detatch();
  fruit_con = null;
}

function collide(body, sprite) {
  if (body != null) {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if (d <= 70) {
      World.remove(world, fruit)
      fruit = null
      return true
    } else {
      return false
    }
  }
}