// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (Math.floor((Math.random() * (300 - 100)) + 100) * dt);
    if(this.x > 500) {
        allEnemies.splice();
        this.x = -100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.resetBug = function() {
    this.x = -100;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
};

Player.prototype.update = function(dt) {
    this.checkCollisions();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keys) {
    switch(keys){
        case 'left':
        if(this.x>50){
            this.x = this.x - 50;
        }
            break;

        case 'right':
        if(this.x<400){
            this.x = this.x + 50;
        }
            break;

        case 'up':
        if(this.y>20){
            this.y = this.y - 50;
        }
            break;

        case 'down':
        if(this.y<400){
            this.y = this.y + 50;
        }
            break;
    }
};

Player.prototype.checkCollisions = function () {
    for(var i=0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 50 && 
            this.x + 50 > allEnemies[i].x && 
            this.y < allEnemies[i].y + 50 && 
            this.y + 50 > allEnemies[i].y) {
            console.log("fail");
            this.resetPlayer();
            break;
        }    
    }
};

Player.prototype.resetPlayer = function() {
    this.x = 203;
    this.y = 435;
};

// Now instantiate your objects.
var enemy1 = new Enemy(50,62);
var enemy2 = new Enemy(300,145);
var enemy3 = new Enemy(0,228);
// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3];
allEnemies.push();
// Place the player object in a variable called player
var player = new Player(203,435);

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
