const canvas = document.querySelector('canvas');
const graphics = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

graphics.fillRect(0, 0, canvas.width, canvas.height);


//All about the sprites
class Sprite{
    constructor(position) {
        this.position = position;
    }

    putInScreen(){
        graphics.fillStyle = 'blue';
        graphics.fillRect(this.position.x, this.position.y, 50, 100);
    }
}

//All about Player 1
const player = new Sprite({
    x: 0,
    y:0
})
player.putInScreen();


//All about Player 2
const player_2 = new Sprite({
    x: 400,
    y:100
})
player_2.putInScreen();
