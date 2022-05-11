var width = 0; var height = 0;
let frogTongue = document.getElementById('frogTongue');
let placarHead = document.getElementById('placarHead');
let pointsEl = document.getElementById('points');
let startMenu = document.getElementById('startMenu');
let endMenu = document.getElementById('endMenu');
let mosquitoNet = document.getElementById('mosquitoNet');
let speedAmplify = 25;
let mosquitoGenerate = 2000;
let speedCont = 0;

let customFrog = document.getElementById('customFrog');
let mainHeader = document.querySelectorAll('h1')[0]
let pauseBtn = document.getElementById('pauseBtn')
let pause = false; //True if we want to pause

function windowResize() {
    width = window.innerWidth - 125;
    height = window.innerHeight - 150;
    console.log('width: ' + width + ' height: ' + height)
}
windowResize();

// KEYDOWN EVENTS
document.addEventListener('keydown', (e) => {
    let nameKey = e.key;

    if (nameKey == 'Delete') { resetGame(); }
})

// RESET GAME
function resetGame() {
    window.location.reload();
}

// PAUSE GAME
pauseBtn.addEventListener('click', () => {

    if (pause == false) {
        pause = true;
        startMenu.style.display = 'block';

        let allBtns = document.querySelectorAll('button')
        allBtns.forEach(btn => {
            btn.style.display = 'none';
        })

        mainHeader.innerHTML = 'Jogo Pausado';
    } else {
        pause = false;
        startMenu.style.display = 'none';
    }

    pauseBtn.classList.toggle('active')

})

// FROG AND TONGUE MOUSE EVENT
document.addEventListener('mousemove', (e) => {
    if (!pause) {
        frogTongue.style.left = e.clientX+"px";
    }
})
document.addEventListener('mousedown', (e) => {
    if (!pause) {
        frogTongue.style.top = e.clientY+"px";
    }
})
document.addEventListener('mouseup', () => {
    if (!pause) {
        frogTongue.style.top = "auto";
    }
})

function leaveGame(){
    window.location.replace('../index.html')
}

function lifeUpdate(value) {
    let hearts = document.querySelectorAll('#life');
    life = parseInt(hearts.length)
    life += value;
    console.log(life);
    if (life < 0) { 
        life = 0;
    }
        
    hearts.forEach(heart => {
        heart.remove();
    });
    if (life > 0) {
        while (life > 0) {
            const heartEl = document.createElement('img');
            heartEl.src = 'img/heart.png';
            heartEl.id = 'life'

            placarHead.appendChild(heartEl);
            life--;
        }

    } else {
        endGame();
    }
    
}

// END GAME
function endGame() {
    pause = true;
    endMenu.style.display = "block";
    pointsNum = pointsEl.textContent.split(' ');
    pointsNum = parseInt(pointsNum[0]);
    document.getElementById('pointEnd').innerHTML = pointsNum;
}

// START GAME
function startGame() {
    // RESET PAUSE
    pause = false;
    // RESET LIFE
    lifeUpdate(3);
    // HIDE MENU
    startMenu.style.display = 'none';
    customFrog.style.display = 'none';
    // SHOW GAME CONTENT
    frogTongue.style.display = 'block';
    placarHead.style.display = 'block';
    pauseBtn.style.display = 'block';

    // MOSQUITO INTERVAL
    mosquitoInterval = setInterval(() => {
        // VERIFY IF GAME WAS PAUSED
        if (!pause) {
            if (speedCont == 10) {
                mosquitoGenerate -= 500;
                if (mosquitoGenerate <= 750){
                    mosquitoGenerate = 750;
                }
            }
            // CREATE MOSQUITO ELEMENT
            const mosquito = document.createElement('img');
            mosquito.src = 'img/fly.png';
            mosquito.setAttribute('class', 'mosca')
        
            // CLICK ON MOSQUITO
            mosquito.addEventListener('click', () => {
                if (!pause) {     
                    pointsNum = pointsEl.textContent.split(' ');
                    pointsNum = parseInt(pointsNum[0]);
                    pointsNum += 1;
                    pointsEl.textContent = pointsNum + " Moscas mortas";
                    mosquitoNet.removeChild(mosquito);
                }
            })
        
            // RANDON POSITIONS
            let positionX = Math.floor(Math.random() * width);
            let positionY = 75;
            if (speedCont == 10) {
                speedAmplify -= 10;
                speedCont = 0;
            }
            positionY = 75;
            mosquitoAnimation = setInterval(() => {
                if (!pause) {
                    positionY += 1;
                    mosquito.style.top = positionY + 'px';

                    if (mosquito.style.top == ((height + 75)+'px')) {
                        // mosquito.remove();
                        lifeUpdate(-1);
                        positionY = 75;
                    }
                    console.log(mosquito.style.top)
                    
                }
            }, speedAmplify)
            let widthRand = Math.floor(Math.random() * (85 - 60)) + 60;
            mosquito.style.width = widthRand + "px";
            mosquito.style.left = positionX + 'px';
        
            mosquitoNet.appendChild(mosquito);
            speedCont++;
        }
    }, mosquitoGenerate)

    let poisonTime = 0;
    // BEETLE OR POISONED BEETLE INTERVAL
    beetleInterval = setInterval(() => {
        if (!pause) {
            if (Math.random() > 0.6) {

                // CREATE BEETLE ELEMENT
                const beetle = document.createElement('img');
                beetle.src = 'img/beetle.png';
                if (poisonTime >= 2) {
                    beetle.src = 'img/poison_beetle.png';
                    beetle.id = 'poisoned'
                    poisonTime = 0;
                }
                beetle.setAttribute('class', 'beetle')

                // CLICK ON BEETLE
                beetle.addEventListener('click', (e) => {
                    if (!pause) {
                        pointsNum = pointsEl.textContent.split(' ');
                        pointsNum = parseInt(pointsNum[0]);
                        if (beetle.id == 'poisoned') {
                            lifeUpdate(-1);
                        } else {
                            pointsNum += 5;
                        }
                        
                        pointsEl.textContent = pointsNum + " Moscas mortas";
                        beetle.remove();
                    }
                })

                // RANDON POSITIONS
                let positionX = -75;
                let positionY = Math.floor(Math.random() * (height - 100));

                beetle.style.left = positionX + 'px';
                beetle.style.top = positionY + 'px';

                let yAnimate = positionY;
                let count = 0
                // BEETLE ANIMATION
                beetleAnimation = setInterval(() => {
                    if (!pause) {
                        positionX += 1.5;
                        beetle.style.left = positionX + 'px';
                        
                        if (count == 200) {
                            if (positionY >= yAnimate) {
                                positionY -= 150;
                            } else if (positionY <= yAnimate) {
                                positionY += 150;
                            }
                            count = 0;
                        } else {
                            count ++;
                        }
                        
                        beetle.style.top = positionY + 'px';

                        if (positionX > (width+100)) {
                            beetle.remove();
                            positionX = 0;
                        }
                    }
                }, 1)
                
                document.getElementsByTagName('body')[0].appendChild(beetle);
                poisonTime++;
            }
        }
    }, 2000)
}

