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

//Background image
const background = new Sprite({
    position:{
        x:0,
        y:0
    },
    imageSrc: './SRC/background.png'
})

//Shop
const shop = new Sprite({
    position:{
        x:600,
        y: 128
    },
    imageSrc: './SRC/shop_anim.png',
    scale : 2.75,
    frames:6
})

//All about Player 1
const player = new Players({
    position:{
        x: 100,
        y:canvas.height-151 - 96
    },
    speed:{
      x: 0,
      y: 0
    },
    imageSrc: './SRC/player/Idle.png',
    frames: 9,
    scale:2.5,
    offset:{
        x: 0,
        y: 3
    },
    sprites:{
        idle:{
            imageSrc: './SRC/player/Idle.png',
            frames:9
        },
        run:{
            imageSrc: './SRC/player/Run.png',
            frames:6
        },
        jump:{
            imageSrc: './SRC/player/Jump.png',
            frames:2
        },
        fall:{
            imageSrc: './SRC/player/Fall.png',
            frames:2
        },
        attack:{
            imageSrc: './SRC/player/Attack.png',
            frames:12
        }
    }


})

//All about Player 2
const player_2 = new Players({
    position:{
        x: 850,
        y:canvas.height - 151 - 96
    },
    speed:{
        x: 0,
        y: 0
    },
    color: 'green',
    offset:{
        x: 0,
        y: 3
    },
    imageSrc: './SRC/player/Idle.png',
    frames: 9,
    scale:2.5,
    sprites:{
        idle:{
            imageSrc: './SRC/player/Idle.png',
            frames:9
        },
        run:{
            imageSrc: './SRC/player/Run.png',
            frames:6
        },
        jump:{
            imageSrc: './SRC/player/Jump.png',
            frames:2
        },
        fall:{
            imageSrc: './SRC/player/Fall.png',
            frames:2
        },
        attack:{
            imageSrc: './SRC/player/Attack.png',
            frames:12
        }
    }
})

//Function that are inside utils.js
decreaseTimer();

//All about loop animations
function animate(){
    window.requestAnimationFrame(animate);
    graphics.fillStyle ='black';
    graphics.fillRect(0,0, canvas.width, canvas.height);

    background.update();
    shop.update();
    player.update();
    player_2.update();

    player.speed.x=0;
    player_2.speed.x=0;

    //Player 1 movement
    if(keys.a.pressed && player.lastKey === 'a'){
        player.speed.x = -4.2;
        player.changeSprite('run');
    }
    else if(keys.d.pressed && player.lastKey === 'd'){
        player.speed.x = 4.2;
        player.changeSprite('run');
    }
    else{
        player.changeSprite('idle');
    }

    //Player Jump
    if(player.speed.y < 0){
        player.changeSprite('jump');
    }
    else if(player.speed.y > 0){
        player.changeSprite('fall');
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
        player_2.life-=5;
        document.querySelector('#player2_life').style.width = player_2.life + '%';
    }
    if(Collision({rectangle1: player_2, regtangle2: player}) && player_2.isAttacking){
        player_2.isAttacking = false;
        console.log("Player 2 hits player 1");
        player.life-=5;
        document.querySelector('#player_life').style.width = player.life + '%';
    }

    //End game based on their life
    if(player_2.life <= 0 || player.life <= 0){
        winner({player, player_2, timerId});
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