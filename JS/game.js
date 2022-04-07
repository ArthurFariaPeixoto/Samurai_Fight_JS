const canvas = document.querySelector('canvas');
const graphics = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;
graphics.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.5;

//ALl the keys of the game
const keys = {

    //Player 1 keys
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },

    //Player 2 keys
    ArrowRight:{
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    }
}

//All about the sprites
class Sprite{
    constructor({position, speed, color, offset}) {
        this.position = position;
        this.speed = speed;
        this.height = 150;
        this.width = 50;
        this.lastKey;
        this.attackBox ={
            position:{
                x: this.position.x,
                y:this.position.y
            },
            offset,
            width: 100,
            height: 50
        }
        this.color = color;
        this.isAttacking
        this.life = 100;
    }

    putInScreen(){
        graphics.fillStyle = this.color;
        graphics.fillRect(this.position.x, this.position.y, this.width, this.height);

        //Attack box
        if(this.isAttacking) {
            graphics.fillStyle = 'red';
            graphics.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        }
    }

    update(){
        this.putInScreen();
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        if(this.position.y +this.height+this.speed.y >= canvas.height){
            this.speed.y = 0;
        } else{
            this.speed.y += gravity;
        }

    }
    attack(){
        this.isAttacking = true;
        setTimeout(() =>{
            this.isAttacking = false;
        }, 100)
    }
}

//All about Player 1
const player = new Sprite({
    position:{
        x: 0,
        y:0
    },
    speed:{
      x: 0,
      y: 0
    },
    color: 'blue',
    offset:{
        x: 0,
        y: 0
    }

})

//All about Player 2
const player_2 = new Sprite({
    position:{
        x: 400,
        y:100
    },
    speed:{
        x: 0,
        y: 0
    },
    color: 'green',
    offset:{
        x: -50,
        y:0
    }
})

function Collision({rectangle1, regtangle2,}){
    return(
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= regtangle2.position.x &&
        rectangle1.attackBox.position.x <= regtangle2.position.x + regtangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= regtangle2.position.y &&
        rectangle1.attackBox.position.y <= regtangle2.position.y + regtangle2.height
    )
}

//All about loop animations
function animate(){
    window.requestAnimationFrame(animate);
    graphics.fillStyle ='black';
    graphics.fillRect(0,0, canvas.width, canvas.height);

    player.update();
    player_2.update();

    player.speed.x=0;
    player_2.speed.x=0;

    //Player 1 movement
    if(keys.a.pressed && player.lastKey === 'a'){
        player.speed.x = -4.2;
    }
    else if(keys.d.pressed && player.lastKey === 'd'){
        player.speed.x = 4.2;
    }

    //Player 2 movement
    if(keys.ArrowLeft.pressed && player_2.lastKey === 'ArrowLeft'){
        player_2.speed.x = -4.2;
    }
    else if(keys.ArrowRight.pressed && player_2.lastKey === 'ArrowRight'){
        player_2.speed.x = 4.2;
    }

    //Detect for collision
    if(Collision({rectangle1: player, regtangle2: player_2}) && player.isAttacking){
        player.isAttacking = false;
        console.log("Player 1 hits player 2");
        player_2.life-=7;
        document.querySelector('#player2_life').style.width = player_2.life + '%';
    }
    if(Collision({rectangle1: player_2, regtangle2: player}) && player_2.isAttacking){
        player_2.isAttacking = false;
        console.log("Player 2 hits player 1");
        player.life-=7;
        document.querySelector('#player_life').style.width = player.life + '%';
    }

}
animate();


//All about the keys that are pressed in game
window.addEventListener('keydown', (event)=>{
    switch (event.key){

        //For Player 1
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break;
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break;
        case 'w':
            player.speed.y = -13;
            break;
        case ' ':
            player.attack();
            break;

        //For PLayer 2
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            player_2.lastKey = 'ArrowRight';
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            player_2.lastKey = 'ArrowLeft';
            break;
        case 'ArrowUp':
            player_2.speed.y = -13;
            break;
        case 'ArrowDown':
            player_2.attack();
            break;
    }
})

window.addEventListener('keyup', (event)=>{
    switch (event.key){

        //For Player 1
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;

        //For PLayer 2
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
    }
})