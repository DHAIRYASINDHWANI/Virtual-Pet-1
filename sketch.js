//Create variables here
var dog, dog1, happyDog, database, food, foodStock;
function preload()
{
  //load images here
  happyDog = loadImage("images/dogImg1.png");
  dog1 = loadImage("images/dogImg.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();

  dog = createSprite(250, 300, 10, 10);
  dog.addImage(dog1);
  dog.scale = 0.2;
  var foodStock = database.ref("Food");
    foodStock.on("value", readStock);
}


function draw() {  
background(rgb(46, 139, 87));

if(keyWentDown(UP_ARROW)){
  writeStock(food);
  dog.addImage(happyDog);
}

drawSprites();

textSize(20);
fill ("black");
text ("Note: Press UP_ARROW key to feed him milk!", 50, 50);
text("Food left: " + food, 200, 400);
}

function readStock(data){
  food = data.val();
}

function writeStock(x){
  if(x == 0){
    x = 0;
  }
  else{
    x = x - 1
  }

  database.ref('/').update({
    Food:x
  })
  
}

