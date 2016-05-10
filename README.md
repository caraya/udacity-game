# Frogger Clone

This is my Frogger clone created for Udacity's Frontend Nanodegree program's arcade game clone.


## Files description

* `js/app.js` contains my version of the code
* `js/engine.js` is the engine provided by Udacity
* `js/resources.js` contains utility classes. Also provided by Udacity
* `css/style.css` basic styles fot project
* `index.html` HTML file everything is run from

## app.js

engine.js and resources.js are provided by Udacity and have not been modified. I will concentrate on `app.js` how it's strucured.

```javascript
//Reset player to beginning position
Object.prototype.reset = function() {
  // gameOver();
  player.x = 200;
  player.y = 400;
  // clearMessage();
};
```

Variables applied to each of our instances go here, we've provided one for you to get started

The image/sprite for our enemies, this uses a helper we've provided to easily load images

```javascript
// Enemies our player must avoid
var Enemy = function(x, y) {
  // The image/sprite for enemies
  this.sprite = 'images/enemy-bug.png';
  //x and y coordinates and movement speed
  this.x = x;
  this.y = y;
  this.speed = Math.floor((Math.random() * 200) + 100);
};
```

Update the enemy's position, required method for game

Parameter: dt, a time delta between ticks

You should multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers.

**If the enemy crosses off screen, reset its position. Otherwise, it keeps running.**


##  Collision Detection

We also do collision detection

Check if the player is within 30px of an enemy (x or y axis) and reset the game if true

This can be split into 2 nested if statements or, since they all have to be true we join them all together. The result is the same, the expression will only evaluate to true if all conditions are true.

```javascript
Enemy.prototype.update = function(dt) {
  if(this.x <= 550){
    this.x += this.speed * dt;
  }else{
    this.x = -2;
  }
  if (player.x >= this.x - 30  && player.x <= this.x + 30
      && player.y >= this.y - 30 && player.y <= this.y + 30) {
    this.reset();
  }
};
```

Now write your own player class.

This class requires an update(), render() and a handleInput() method.

**Note that using other sprites breaks the load process. It gives an error about the url being of the wrong type**

```javascript
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
```

The `player.update` method deserves a little more discussion.

The thing that tripped me the most and the most often is forgetting that the coordinates for a canvas start top left, not bottom left like I'm used to as show in the image below.

![](http://media.creativebloq.futurecdn.net/sites/creativebloq.com/files/images/2013/05/Hannah/canvas1.jpg)

The practical effect is that all the measurements are the reverse of what I thought they would have been, particularly dealing with the up and down movement.

Another thing that I have yet to explore is whether I can use compound switch cases instead of if statements. They work but feel really cluttered.

```javascript
Player.prototype.update = function() {
  // TODO: Can we do this with a swtich statement?
  //if left key is pressed and player is not on edge of map, pressed decrement x
  if(this.ctlKey === 'left' && this.x > 0){
    this.x = this.x - 50;
    //if right key is pressed and player is not on edge of map increment x
  }else if(this.ctlKey === 'right' && this.x != 400){
    this.x = this.x + 50;
    //if up key is pressed increment y
  }else if(this.ctlKey === 'up'){
    this.y = this.y - 50;
    //if down key is pressed and player is not on edge of map decrement y
  }else if (this.ctlKey === 'down' && this.y != 400){
    this.y = this.y + 50;
  }
  this.ctlKey = null;

  //If on water, pop a message and reset the game
  if(this.y < 25){

    this.reset();
  }
};
```
`handle.input` and the keyup event listener feed data into the update function.

```javascript
Player.prototype.handleInput = function(e) {
  this.ctlKey = e;
};

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
```

Now instantiate your objects.

* Place all enemy objects in an array called allEnemies
* Place the player object in a variable called player


```javascript
var player = new Player();


var allEnemies = [];

(function addEnemies () {
  allEnemies.push(new Enemy(-2, 60));
  allEnemies.push(new Enemy(-2, 100));
  allEnemies.push(new Enemy(-2,150));
  allEnemies.push(new Enemy(-2,220));
}());
```
