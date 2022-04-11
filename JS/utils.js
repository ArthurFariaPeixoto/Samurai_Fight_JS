function Collision({rectangle1, regtangle2,}){
    return(
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= regtangle2.position.x &&
        rectangle1.attackBox.position.x <= regtangle2.position.x + regtangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= regtangle2.position.y &&
        rectangle1.attackBox.position.y <= regtangle2.position.y + regtangle2.height
    )
}

function winner({player, player_2, timerId}){
    clearTimeout(timerId);
    document.querySelector('#displayText').style.display = 'flex';

    if (player.life === player_2.life) {
        console.log('Tie');
        document.querySelector('#displayText').innerHTML = 'Tie';
    }
    else if(player.life > player_2.life){
        console.log('PLayer 1 wins');
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins';

    }
    else{
        console.log('PLayer 2 wins');
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins';
    }
}

let timer = 61;
let timerId;
function decreaseTimer(){

    if(timer > 0){
        timerId = setTimeout(decreaseTimer, 1000);
        timer--;
        document.querySelector('#timer').innerHTML = timer;
    }

    if(timer === 0) {
        winner({player, player_2, timerId});
    }
}