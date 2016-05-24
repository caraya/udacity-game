'use strict';

/**
 * Udacity Game Clone
 *
 * @author Carlos Araya <carlos.araya@gmail.com>
 * @license MIT (caraya.mit-license.org)
 *
 * @description The game is a clone of Frogger, the player must use the keyboard to navigate from the bottom to the top of the screen. If the player contacts any of the monsters the game resets and begins again.
 *
 * It uses 3 objects:
 * * Game holds game related information not directly related to player or enemy
 * * Player holds data and state about the player
 * * Enemy contains information about enemy objects. We instantiate multiple copies of this object
 */


/**
 * @name Player
 * @constructor
 * @description constructor for player object. Includes sprites and initial x and y coordinates
 */
var Player = function() {
  // What sprite to use
  this.sprite = 'images/char-boy.png';
  // Initial x location
  this.x = 200;
  // Initial y location
  this.y = 400;
};

/**
 * @name Enemy
 * @constructor
 * @module Enemy
 * @description contains all variables for the enemy object.
 * @param x initial x coordinate
 * @param y initial y coordinate
 */
var Enemy = function(x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  /**
   * @name sprite
   * @module Enemy
   * @description the image (as a string) for the enemy
   * @type {string}
  */
  //
  this.sprite = 'images/enemy-bug.png';

  this.x = x;
  this.y = y;

  /**
   * @name speed
   * @module Enemy
   * @description starting speed for the bug use 3 random numbers plus a fixed value
   * @type: number
   */
  this.speed = Math.floor((Math.random() * 200) + (Math.random() * 150) + 100);
};

/**
 * @name update
 * @description Update the enemy's position, required method for game
 *
 * Multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers.
 *
 * if the enemy crosses off screen, reset its position.
 *
 * Otherwise, it keeps running.
 *
 * Updates collision detection within 30px. Check if the player is within 30px of an enemy. If it is reset the game
 *
 * The check can be split into 2 nested if statements or, since they all have to be true we join them all together. The result is the same, the expression will only evaluate to true if all conditions are true.
 *
 * @param dt a time delta between ticks
 */
Enemy.prototype.update = function(dt) {
  if(this.x <= 550){
    this.x += this.speed * dt;
  }else{
    this.x = -2;
  }

  if (player.x >= this.x - 30
    && player.x <= this.x + 30
    && player.y >= this.y - 30
    && player.y <= this.y + 30) {
      player.reset('Game Over');
  }
};

/**
 * @name render
 * @module Enemy
 * @description Draw the enemy on the screen, required method for game
 */
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/**
 * @name reset
 * @module Player
 * @description prints game over message
 * @param message the message to print
 */
Player.prototype.reset = function(message) {
  this.x = 200;
  this.y = 400;

  var div = document.createElement('div');

  div.id = 'message';
  div.innerHTML = '<h2>' + message + '</h2>';

  document.body.appendChild(div);

  setTimeout(function() {
    document.body.removeChild(div);
  }, 1000);
};

/**
 * @name render
 * @module Player
 * @description renders the player object
 */
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @name update
 * @module Player
 * @description updates movement and resets the player's position when at the top of the screen
 */
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

    this.reset('Well done!');
  }
};


/**
 * @name handleInput
 * @param e
 * @description handles player's input and passes it to update
 */
Player.prototype.handleInput = function(e) {
  this.ctlKey = e;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

/** New player instance, we need only one per game **/
var player = new Player();

/** Array for enemy objects **/
var allEnemies = [];

/**
 * @name addEnemies
 * @description creates and pushes new enemy instances to the allEnemies array
 */
(function addEnemies () {


  allEnemies.push(new Enemy(-2, 60));
  allEnemies.push(new Enemy(-2, 100));
  allEnemies.push(new Enemy(-2,150));
  allEnemies.push(new Enemy(-2,220));
}());


/** This listens for key presses and sends the keys to your Player.handleInput() method. You don't need to modify this. */
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
