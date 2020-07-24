// getting canvas
let field = document.getElementById("field");
// initilizing canvas and box size
const boxSize = 100;
const fieldSize = 600;
// setting canvas size
field.height = fieldSize;
field.width = fieldSize;
// setting canvas
let c = field.getContext('2d');


// class Box
class Box {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
    }

    moveUp = () => {
        this.y--;
    }

    moveDown = () => {
        this.y++;
    }

    moveLeft = () => {
        this.x--;
    }

    moveRight = () => {
        this.x++;
    }
}

// class Game
class Game {
    constructor(_x1, _y1, _x2, _y2) {
        this.box1 = new Box(_x1, _y1);
        this.box2 = new Box(_x2, _y2);
        this.draw();
    }

    up = () => {
        if (this.box1.y > 0 && !this.upCollide()) {
            this.box1.moveUp();
        }
        if (this.box2.y > 0 && !this.upCollide()) {
            this.box2.moveUp();
        }
        this.draw();
    }

    down = () => {
        if (this.box1.y < fieldSize - boxSize && !this.downCollide()) {
            this.box1.moveDown();
        }
        if (this.box2.y < fieldSize - boxSize && !this.downCollide()) {
            this.box2.moveDown();
        }
        this.draw();
    }

    left = () => {
        if (this.box1.x > 0 && !this.leftCollide()) {
            this.box1.moveLeft();
        }
        if (this.box2.x > 0 && !this.leftCollide()) {
            this.box2.moveLeft();
        }
        this.draw();
    }

    right = () => {
        if (this.box1.x < fieldSize - boxSize && !this.rightCollide()) {
            this.box1.moveRight();
        }
        if (this.box2.x < fieldSize - boxSize && !this.rightCollide()) {
            this.box2.moveRight();
        }
        this.draw();
    }

    upCollide = () => {
        if (this.box1.y == 0) {
            if (this.box2.y == boxSize && (this.box2.x + boxSize >= this.box1.x && this.box2.x < this.box1.x + boxSize)) {
                return true
            }
        }
        else if (this.box2.y == 0) {
            if (this.box1.y == boxSize && (this.box1.x + boxSize >= this.box2.x && this.box1.x < this.box2.x + boxSize)) {
                return true
            }
        }
        return false;
    }

    downCollide = () => {
        if (this.box1.y == fieldSize - boxSize) {
            if (this.box2.y + boxSize == fieldSize - boxSize && (this.box2.x + boxSize >= this.box1.x && this.box2.x < this.box1.x + boxSize)) {
                return true
            }
        }
        else if (this.box2.y == fieldSize - boxSize) {
            if (this.box1.y + boxSize == fieldSize - boxSize && (this.box1.x + boxSize >= this.box2.x && this.box1.x < this.box2.x + boxSize)) {
                return true
            }
        }
        return false;
    }

    leftCollide = () => {
        if (this.box1.x == 0) {
            if (this.box2.x == boxSize && (this.box2.y + boxSize >= this.box1.y && this.box2.y < this.box1.y + boxSize)) {
                return true;
            }
        }
        else if (this.box2.x == 0) {
            if (this.box1.x == boxSize && (this.box1.y + boxSize >= this.box2.y && this.box1.y < this.box2.y + boxSize)) {
                return true;
            }
        }
        return false;
    }

    rightCollide = () => {
        if (this.box1.x + boxSize == fieldSize) {
            if (this.box2.x + boxSize == fieldSize - boxSize && (this.box1.y + boxSize >= this.box1.y && this.box2.y < this.box1.y + boxSize)) {
                return true;
            }
        }
        else if (this.box2.x + boxSize == fieldSize) {
            if (this.box1.x + boxSize == fieldSize - boxSize && (this.box2.y + boxSize >= this.box2.y && this.box1.y < this.box2.y + boxSize)) {
                return true;
            }
        }
        return false;
    }

    draw = () => {
        c.clearRect(0, 0, fieldSize, fieldSize);
        c.fillStyle = "red";
        c.fillRect(this.box1.x, this.box1.y, boxSize, boxSize);
        c.fillStyle = "blue";
        c.fillRect(this.box2.x, this.box2.y, boxSize, boxSize);
    }
}

// Creating two random position without collision
var boxes = new Array();

const setRandomPos = () => {
    let box1 = {
        x: Math.floor(Math.random() * (fieldSize - boxSize)),
        y: Math.floor(Math.random() * (fieldSize - boxSize))
    };
    boxes.push(box1);

    while (true) {
        let box2 = {
            x: Math.floor(Math.random() * (fieldSize - boxSize)),
            y: Math.floor(Math.random() * (fieldSize - boxSize))
        };
        if(!overlap(box1, box2)){
            boxes.push(box2);
            break;
        }
    }
}

const overlap =(box1, box2) => {
    let l1 = box1.x;
    let r1 = box1.x + boxSize;
    let t1 = box1.y;
    let b1 = box1.y + boxSize;

    let l2 = box2.x;
    let r2 = box2.x + boxSize;
    let t2 = box2.y;
    let b2 = box2.y + boxSize;


    if (t2 > b1 || l2 > r1 || t1 > b2 || l1 > r2) return false;
    return true;
}

setRandomPos();

// creating object game
let myGame = new Game(boxes[0].x, boxes[0].y, boxes[1].x, boxes[1].y);

// checking for keypress
window.onkeydown = (e) => {
    let keyCode = e.keyCode;

    if (keyCode == 38) {
        myGame.up();
    }

    if (keyCode == 40) {
        myGame.down();
    }

    if (keyCode == 37) {
        myGame.left();
    }

    if (keyCode == 39) {
        myGame.right();
    }
}

