const grid = document.querySelector(".grid");
let squares = Array.from(document.querySelectorAll('.grid div'));
const score =document.querySelector('#score');
const startBtn =document.querySelector('#start-button');
const btnImg = document.querySelector('#btn')
let count = 0;
const width = 10;

//button using to move boxes
const leftBtn = document.querySelector('#left');
const reightBtn = document.querySelector('#right')
const downBtn = document.querySelector('#down')
const rotateBtn = document.querySelector('#rotate')


const colour = [ '#FF3353','#A03EFF','#33FFD1','#FFE833','#15e915']

const lshape = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
]

const zshape = [
    [width+1, width+2, width*2 , width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2 , width*2+1],
    [0, width, width+1, width*2+1],
]

const tshape = [
    [1, width,width+1,width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width+2,width*2+1],
    [1, width, width+1, width*2+1]
]

const oshape = [
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1]
]

const ishape = [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
]

const theShapes = [lshape, zshape, oshape, tshape, ishape]

let curPos= 4;
let curRot = 0;

// randomly selecting shapes
let random = Math.floor(Math.random()*theShapes.length)
let currentShape = theShapes[random][curRot]


// draw the shapes
function draw(){

    currentShape.forEach((index)=>{
        squares[curPos + index].style.background = colour[random]
    })
}
//upar se start ho jayegi
 draw()

// erase the shape
function erase(){
    currentShape.forEach((index)=>{
        squares[curPos + index].style.background = ''  //yha par uska color null kar diya matlab erase ho jayegi
    })
}

// movedown
function moveDown(){
    erase()
    curPos += width
    draw()
    stop()
}

var timer = setInterval(moveDown, 800)

// neeche rokne ke liye

function stop(){
    if(currentShape.some(index => squares[curPos + index + width].classList.contains('freeze'))) {
        currentShape.forEach(index => squares[curPos + index].classList.add('freeze'))

        // start a new shape falling
        random = Math.floor(Math.random()*theShapes.length)
        curRot = 0
        currentShape = theShapes[random][curRot]
        curPos = 4

        draw()
        gameOver()
        addScore()
        
    }
}

// control the game
function control(e){
    if(e.keyCode === 37){
        moveLeft()
    }
    else if(e.keyCode === 39){
        moveRight()
    }
    else if(e.keyCode === 40){
        moveDown()
    }
    else if(e.keyCode === 32){
        rotate()
    }
}

window.addEventListener("keydown", control);

// Control shapes in phone
leftBtn.addEventListener("click", moveLeft);
reightBtn.addEventListener("click", moveRight);
downBtn.addEventListener("click", moveDown)
rotateBtn.addEventListener("click", rotate)

// moveleft funtion
function moveLeft(){
    erase()

    let LeftBlockage = currentShape.some(index => (curPos + index) % width === 0)
    let Blockage = currentShape.some(index => squares[curPos + index - 1 ].classList.contains('freeze'));

    if(!LeftBlockage && !Blockage){
        curPos--;
    }
    

    draw()
}


// moveRight funtion
function moveRight(){
    erase()

    let RightBlockage = currentShape.some(index => (curPos + index) % width === width-1)
    let Blockage = currentShape.some(index => squares[curPos + index + 1 ].classList.contains('freeze'));

    if(!RightBlockage && !Blockage){
        curPos++;
    }
    

    draw()
}

// Rotate function
function rotate(){
    erase()
    curRot++ 
    if(curRot === 4){
        curRot = 0
    }
    currentShape = theShapes[random][curRot]
    draw()
}

// add functionality to pause button
function pause(){
    if(timer){
        clearInterval(timer)
        timer = null;
        btnImg.src = 'play.png'
    }
    else{
        draw()
        timer = setInterval(moveDown, 1000);
        btnImg.src = 'pause.png'
    }
}

startBtn.addEventListener("click" , pause)

// game over funtion
function gameOver(){
    if(currentShape.some(index => squares[curPos + index].classList.contains('freeze'))){
        score.innerHTML = "Game Over"
        clearInterval(timer)
    }
}

// add Score
function addScore(){
    for(let i=0;i<199; i += width){
        const row = [i ,i+1, i+2, i+3, i+4, i+5, i+6 ,i+7, i+8, i+9];
        console.log(row)

        if(row.every(index => squares[index].classList.contains("freeze"))){
            count +=10
            score.textContent = `score:${count}`
            row.forEach(index =>{
                squares[index].classList.remove("freeze");
                squares[index].style.background = '';
            })
            const squareRemoved = squares.splice(i,width)
          squares = squareRemoved.concat(squares)
            squares.forEach(square => grid.appendChild(square))
        }
    }
}
