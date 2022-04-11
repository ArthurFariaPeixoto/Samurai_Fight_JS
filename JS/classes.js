//All about the sprites
class Sprite{
    constructor({position, imageSrc, scale=1, frames=1, offset = {x:0, y:0}}) {
        this.position = position;
        this.height = 150;
        this.width = 50;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.frames = frames;
        this.frameActual = 0;
        this.framesElapsed = 0;
        this.framesHold = 6;
        this.offset = offset;

    }

    putInScreen(){
        graphics.drawImage(
            this.image,
            this.frameActual * this.image.width / this.frames,
            0,
            this.image.width/this.frames,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.frames) * this.scale,
            this.image.height * this.scale
        );

    }
    animateFrames(){
        this.framesElapsed++;

        if (this.framesElapsed % this.framesHold === 0) {
            if (this.frameActual < this.frames - 1) {
                this.frameActual++;
            } else {
                this.frameActual = 0;
            }
        }
    }

    update() {
        this.putInScreen();
        this.animateFrames();
    }
}

//All about the players
class Players extends Sprite{
    constructor({position, speed, imageSrc, scale=1, frames=1, offset = {x:0, y:0}, sprites}) {
        super({
            position,
            imageSrc,
            scale,
            frames,
            offset
        });
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
        this.isAttacking;
        this.life = 100;
        this.frameActual = 0;
        this.framesElapsed = 0;
        this.framesHold = 9;
        this.sprites = sprites;

        for(const sprite in this.sprites){
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imageSrc;
        }
    }

    update(){
        this.putInScreen();
        this.animateFrames();
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        if(this.position.y +this.height+this.speed.y >= canvas.height-96){
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