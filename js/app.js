//Reimplementing gameOver() function based on Feedback from coach TY.
//Old clear message was targeting the wrong element so it would barf and freeze
function gameOver () {
  var div = document.createElement('div');

  div.id = 'message';
  div.innerHTML = '<h2>Game Over</h2>';

  document.body.appendChild(div);

  setTimeout(function() {
      document.body.removeChild(div);
  }, 1000);
}

//Reset player to beginning position
Object.prototype.reset = function() {
  player.x = 200;
  player.y = 400;
  gameOver();
};


// Enemies our player must avoid
var Enemy = function(x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  // The image/sprite for enemies
  this.sprite = 'images/enemy-bug.png';

  //x and y coordinates and movement speed
  this.x = x;
  this.y = y;
  this.speed = Math.floor((Math.random() * 200) + (Math.random() * 150) + 100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  //if the enemy crosses off screen, reset its position. Otherwise, it keeps running.
  if(this.x <= 550){
    this.x += this.speed * dt;
  }else{
    this.x = -2;
  }

  // Collision detection within 30px
  // Check if the player is within 30px of an enemy reset the game

  // This can be split into 2 nested if statements or, since they all have to be true
  // we join them all together. The result is the same, the expression will only evaluate
  // to true if all conditions are true.
  if (player.x >= this.x - 30  && player.x <= this.x + 30
      && player.y >= this.y - 30 && player.y <= this.y + 30) {
    this.reset();
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
  // What sprite to use
  this.sprite = 'images/char-boy.png';
  // Initial x location
  this.x = 200;
  // Initial y location
  this.y = 400;
};



Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.update = function() {
  // FIXME: Can we do this with a swtich statement?
  //if left key is pressed and player is not on edge of map, pressed decrement x
  if(this.ctlKey === 'left' && this.x > 0){
    this.x = this.x - 50;
    //if r ight key is pressed and player is not on edge of map increment x
  } else if(this.ctlKey === 'right' && this.x != 400){
    this.x = this.x + 50;
    //if up key is pressed increment y
  } else if(this.ctlKey === 'up'){
    this.y = this.y - 50;
    //if down key is pressed and player is not on edge of map decrement y
  } else if (this.ctlKey === 'down' && this.y != 400){
    this.y = this.y + 50;
  }
  this.ctlKey = null;

  //If on water, pop a message and reset the game
  if(this.y < 25){

    this.reset();
  }
};


Player.prototype.handleInput = function(e) {
  this.ctlKey = e;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();


var allEnemies = [];

(function addEnemies () {
  allEnemies.push(new Enemy(-2, 60));
  allEnemies.push(new Enemy(-2, 100));
  allEnemies.push(new Enemy(-2,150));
  allEnemies.push(new Enemy(-2,220));
}());


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
