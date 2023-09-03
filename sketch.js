const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
const Constraint = Matter.Constraint;

let engine;
let world;
var bg_img;
var button1
var button2

function preload() {
bg_img = loadImage('city.jpg')
button_img = loadImage('button.png')
person_img = loadImage('person.png')
falling_img = loadImage('falling.webp')
standing_img = loadImage('person.png')

cut_sound = loadSound('cutSound.mp3')
win_sound = loadSound('winSound.wav')
point_sound = loadSound('pointSound.mp3')

}

function setup() {
  createCanvas(800,500);
  frameRate(80)

  engine = Engine.create();
  world = engine.world;

  mattress_options ={
    isStatic:true
  }

  heart_options ={
    isStatic:true
  }
  
  button1 = createImg('button.png')
  button1.position(100,80)
  button1.size(50,50)
  button1.mouseClicked(snap1)

  button2 = createImg('button.png')
  button2.position(700,90)
  button2.size(50,50)
  button2.mouseClicked(snap2)

  button3 = createImg('button.png')
  button3.position(20,200)
  button3.size(50,50)
  button3.mouseClicked(snap3)

  button4 = createImg('button.png')
  button4.position(400,30)
  button4.size(50,50)
  button4.mouseClicked(snap4)


  string1 = new String(8,{x:100,y:80})
  string2 = new String(9,{x:760,y:90})
  string3 = new String(9,{x:30,y:200})
  string4 = new String(5,{x:450,y:30})

  ground = new Ground(400,height,width,20)

  Person = Bodies.circle(300,300,20)
  Matter.Composite.add(string1.body,Person);

  mattress = Bodies.rectangle(400,490,270,20,mattress_options)
  World.add(world,mattress)

  person_connect1 = new Connect(string1,Person)
  person_connect2 = new Connect(string2,Person)
  person_connect3 = new Connect(string3,Person)
  person_connect4 = new Connect(string4,Person)

  rectMode(CENTER);
  ellipseMode(RADIUS);
}


function draw() 
{
  background(51);
  image(bg_img,0,0,width,height)
  rect(mattress.position.x,mattress.position.y,270,20);
  Engine.update(engine);
  

  push();
  imageMode(CENTER);
  if(Person!=null){
    image(falling_img,Person.position.x,Person.position.y,70,70);
  }
  pop();

  ground.show()
  string1.show()
  string2.show()
  string3.show()
  string4.show()

  if (collide(Person,mattress,80)==true){
    win_sound.play()
  }


}
function snap1(){
cut_sound.play()
string1.break()
person_connect1.detach()
person_connect1 = null
}

function snap2(){
  cut_sound.play()
  string2.break()
  person_connect2.detach()
  person_connect2 = null
  }

  function snap3(){
    cut_sound.play()
    string3.break()
    person_connect3.detach()
    person_connect3 = null
    }

    function snap4(){
      cut_sound.play()
      string4.break()
      person_connect4.detach()
      person_connect4 = null
      }

function collide(body,sprite,x){
  if(body!=null)
  {
   var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(d<=x)
      {
         return true; 
      }
      else{
        return false;
      }
   }
}