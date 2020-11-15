// All vars
const pin1 = document.querySelector("#pin1");
const pin2 = document.querySelector("#pin2");
const canvas = document.querySelector("#table");
const ball = document.querySelector("#ball");
const p1 = document.querySelector(".p1");
const p2 = document.querySelector(".p2");
const score = document.querySelector(".score");
const winner = document.querySelector("#winner");
const playAgain = document.querySelector("#play-again")

let ballPosH = ball.style.left = (canvas.clientWidth - (pin1.clientWidth + pin2.clientWidth)) / 2;
let ballPosV = ball.style.top = canvas.clientHeight / 2 - ball.clientHeight;
let pinSpeed = 20;
let leftSpeedOfBall = 0;
let topSpeedOfBall = 0;
let scoreP1 = 0;
let scoreP2 = 0;
p1.innerHTML = scoreP1;
p2.innerHTML = scoreP2;


//How the ball will move
function ballStart() {
    ballPosH = ball.style.left = (canvas.clientWidth - (pin1.clientWidth + pin2.clientWidth)) / 2;
    ballPosV = ball.style.top = canvas.clientHeight / 2 - ball.clientHeight;

    if (Math.random() < 0.5) {
        var side = 1;
    }
    else {
        var side = -1;
    }
    leftSpeedOfBall = side * (Math.random() * 4 + 5);
    topSpeedOfBall = Math.random() * 3 + 4;
}



//Animation of the ball
let poopy = window.setInterval(startMove, 1000 / 60);
    function startMove() {

    ballPosH += leftSpeedOfBall;
    ballPosV += topSpeedOfBall;
    if (ballPosV >= canvas.clientHeight - ball.clientHeight || ballPosV <= 0) {
        topSpeedOfBall = -topSpeedOfBall;
    }


    document.querySelector("#ball").style.left = ballPosH + 'px';
    document.querySelector("#ball").style.top = ballPosV + 'px';
    if (ballPosH >= canvas.clientWidth - pin2.clientWidth - ball.clientWidth) {
        if (ballPosV > pin2.offsetTop && ballPosV < pin2.offsetTop + pin2.clientHeight) {
            leftSpeedOfBall = -leftSpeedOfBall;
        }
        else {
            scoreP1++;
            ballStart();
            p1.innerHTML = scoreP1;
            if (scoreP1 == 10) {
                pin1.style.display = "none";
                pin2.style.display = "none";
                ball.style.display = "none";
                winner.style.display = "block"
                winner.innerHTML = "Player 1 Is The Winner!";
                playAgain.style.display = "block"
                stop();
            }
        }
    }

    if (ballPosH <= pin1.clientWidth) {

        if (ballPosV > pin1.offsetTop && ballPosV < pin1.offsetTop + pin1.clientHeight) {
            leftSpeedOfBall = -leftSpeedOfBall;
        }
        else {
            scoreP2++;
            ballStart();
            p2.innerHTML = scoreP2;
            if (scoreP2 == 10) {
                pin1.style.display = "none";
                pin2.style.display = "none";
                ball.style.display = "none";
                winner.style.display = "block";
                winner.innerHTML = "Player 2 Is The Winner!";
                playAgain.style.display = "block";
                stop();
            }
           
        }
    }

}
function stop() {
    clearInterval(poopy);
}





// Pin Movement
document.addEventListener("keydown", (e) => {
    if (e.keyCode === 38) {
        let pos1 = pin1.offsetTop;
        pos1 = parseInt(pos1, 10);
        pin1.style.top = pos1 - pinSpeed + 'px';
        if (pin1.offsetTop == 0 - pinSpeed) {
            pin1.style.top = pos1 + 'px';
        }

    }
    else if (e.keyCode === 40) {
        let pos1 = pin1.offsetTop;
        pos1 = parseInt(pos1, 10);
        pin1.style.top = pos1 + pinSpeed + 'px';
        if (pin1.offsetTop >= canvas.clientHeight - pin1.clientHeight + pinSpeed) {
            pin1.style.top = pos1 + 'px';
        }
    }
    if (e.keyCode === 87) {
        let pos2 = pin2.offsetTop;
        pos2 = parseInt(pos2, 10);
        pin2.style.top = pos2 - pinSpeed + 'px';
        if (pin2.offsetTop <= 0 - pinSpeed) {
            pin2.style.top = pos2 + 'px';
        }
    }
    else if (e.keyCode === 83) {
        let pos2 = pin2.offsetTop;
        pos2 = parseInt(pos2, 10);
        pin2.style.top = pos2 + pinSpeed + 'px';
        if (pin2.offsetTop >= canvas.clientHeight - pin2.clientHeight + pinSpeed) {
            pin2.style.top = pos2 + 'px';
        }
    }
})




//Start Game Button
function start() {
    document.querySelector("#ball").style.display = "block";
    document.querySelector("#pin1").style.display = "block";
    document.querySelector("#pin2").style.display = "block";
    document.querySelector("#start").style.display = "none";
    playAgain.style.display = "none";
    winner.style.display = "none";
    scoreP1 = 0;
    scoreP2 = 0;
    p1.innerHTML = scoreP1;
    p2.innerHTML = scoreP2;
    ballStart();
}
