document.addEventListener('DOMContentLoaded', () => {
const width= 8;
const grid = document.querySelector(".grid");
const squares = [];
let score = 0;
const bomb = ['url(color_bomb.png)'];

const scoreEl = document.querySelector(".scorel");


const candyColors = [
    'url(blue-candy.png)',
    'url(green-candy.png)',
    'url(orange-candy.png)',
    'url(purple-candy.png)',
    'url(red-candy.png)',
    'url(yellow-candy.png)'
]


let colorBeingDragged;
let colorBeingReplaced;
let squareIdBeingDragged;
let squareIdBeingReplaced;

function createBoard(){
    for(let i = 0 ; i < width*width; i++){
       const square = document.createElement("div");
       square.setAttribute('draggable',true);
       square.setAttribute('id', i);
    //    square.innerText = i;
       let randomColor = Math.floor(Math.random() * candyColors.length);
       square.style.backgroundImage = candyColors[randomColor];
       grid.appendChild(square);
       squares.push(square);
    }
}

createBoard();

//drag candies
squares.forEach(square => square.addEventListener('dragstart',dragStart));
squares.forEach(square => square.addEventListener('dragend',dragEnd));
squares.forEach(square => square.addEventListener('dragover',dragOver));
squares.forEach(square => square.addEventListener('dragenter',dragEnter));
squares.forEach(square => square.addEventListener('dragleave',dragLeave));
squares.forEach(square => square.addEventListener('drop',dragDrop));

function dragStart(){
colorBeingDragged = this.style.backgroundImage;
squareIdBeingDragged = parseInt(this.id);
 console.log(colorBeingDragged);
 console.log(this.id,'dragstart');

 
}

function dragEnd(e){
    // e.preventDefault();
    console.log(this.id,'dragend');
    let validMoves = [
        squareIdBeingDragged+1,
        squareIdBeingDragged+width,
        squareIdBeingDragged-1,
        squareIdBeingDragged-width
    ]
    
    let validMove = validMoves.includes(squareIdBeingReplaced);

    if(squareIdBeingReplaced && validMove){
        squareIdBeingReplaced = null;
    }
    else if(squareIdBeingReplaced && !(validMove)){ 
        squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
        squares[squareIdBeingDragged].style.backgroundImage=colorBeingDragged;
    }
    else{
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
    }
}

function dragOver(e){
    e.preventDefault();
    console.log(this.id,'dragover');
    
    
}

function dragEnter(e){
    e.preventDefault();
    console.log(this.id,'dragenter');
    
}

function dragLeave(e){
    e.preventDefault();
    console.log(this.id,'dragleave');
    
}

function dragDrop(){
    console.log(this.id,'dragdrop');
    colorBeingReplaced = this.style.backgroundImage;
    squareIdBeingReplaced = parseInt(this.id);
    this.style.backgroundImage = colorBeingDragged;
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
    
}
// =55
function moveSquareIntoBelow(){
    for(let i = 0;i<=55;i++){ 
        if(squares[i+width].style.backgroundImage === ''){
            squares[i+width].style.backgroundImage = squares[i].style.backgroundImage;
            squares[i].style.backgroundImage = '';
        }
        
        const firstRow = [0,1,2,3,4,5,6,7];
        const isFirstRow = firstRow.includes(i);
        if(isFirstRow && (squares[i].style.backgroundImage == '')) {
                let randomColor = Math.floor(Math.random() * candyColors.length);
                squares[i].style.backgroundImage = candyColors[randomColor];
            }
        
    }
}
moveSquareIntoBelow();

// function checkforBomb(){
//     checkforrowfive();
//     checkforcolfive();
// }
// checkforBomb();


// <61
function checkforrowfive(){
    for(let i = 0;i<59;i++){
        let decidedColor = squares[i].style.backgroundImage;
        let rowOfFive = [i,i+1,i+2,i+3,i+4];
        const isBlank = squares[i].style.backgroundImage === '';
        const notValid = [4,5,6,7,12,13,14,15,20,21,22,23,28,29,30,31,36,37,38,39,44,45,46,47,52,53,54,55];
        if(notValid.includes(i))continue;
        
        if(rowOfFive.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
            score+=5;
            scoreEl.textContent =score;
            rowOfFive.forEach(index=>{
                squares[index].style.backgroundImage = '';
            })
            squares[i].style.backgroundImage = bomb[0];
        }
    }
}
checkforrowfive();
// let message = '';
function checkforcolfive(){
    for(let i =0;i<=31;i++){
        let decidedColor = squares[i].style.backgroundImage;
        let colOfFive = [i,i+width,i+(width+width),i+(width+width+width),i+(width+width+width+width)];
        // for(let i = 0;i<colOfFive.length;i++){
        //     message+=String.valueOf(colOfFive[i]);
        // }
        // console.log(message);
        const isBlank = squares[i].style.backgroundImage === '';

        const notValid =[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63];
        if(notValid.includes(i)) continue;

        if(colOfFive.every(index=> squares[index].style.backgroundImage === decidedColor && !isBlank)){
            score+=5;
            scoreEl.textContent =score;
            colOfFive.forEach(index=> {
                squares[index].style.backgroundImage = '';
            })
            squares[i].style.backgroundImage = bomb[0];
        }
    }
}
checkforcolfive();

function checkRowFour(){
    for(let i = 0;i<60;i++){
    let rowOfFour= [i,i+1,i+2,i+3];
     let decidedColor = squares[i].style.backgroundImage;
     let isBlank = squares[i].style.backgroundImage === '';
     
     const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55];
    //  [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55
     if(notValid.includes(i)) continue;
     if(rowOfFour.every(index=>squares[index].style.backgroundImage === decidedColor && !isBlank )){
         score+=4;
         scoreEl.textContent =score;
         rowOfFour.forEach(index=>{
             squares[index].style.backgroundImage = '';
         })
       }
   }
}
checkRowFour();

// <=39
function checkColOfFour(){
    for(let i =0;i<39;i++){
        let decidedColor = squares[i].style.backgroundImage;
        let colOfFour = [i,i+width,i+(width+width),i+(width+width+width)];
        const isBlank = squares[i].style.backgroundImage === '';

        const notValid = [40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63];
        if(notValid.includes(i))continue;
        if(colOfFour.every(index=> squares[index].style.backgroundImage === decidedColor && !isBlank)){
             score+=4;
             scoreEl.textContent =score;
             colOfFour.forEach(index=>{
                 squares[index].style.backgroundImage = '';
             })
        }
    }
}
checkColOfFour();

// <=61
function checkForRowThree(){
    for (i = 0; i <=61; i ++) {
        let rowOfThree = [i, i+1, i+2]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''
  
        const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
        if (notValid.includes(i)) continue
  
        if(rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
          score += 3
          scoreEl.textContent =score;
        //   scoreDisplay.innerHTML = score
          rowOfThree.forEach(index => {
          squares[index].style.backgroundImage= ''
          })
        }
      }
}
checkForRowThree();


// <=47
function checkColForThree(){
    for(let i = 0;i<=47;i++){
        let decidedColor = squares[i].style.backgroundImage;
        let colOfThree = [i,i+width,i+(width+width)];
        const iBlank = squares[i].style.backgroundImage === '';

        if( colOfThree.every(index=> squares[index].style.backgroundImage === decidedColor && !iBlank)){
            score+=3;
            scoreEl.textContent =score;
            colOfThree.forEach(index=>{
                squares[index].style.backgroundImage ='';
            })
        }
    }
}
checkColForThree();

// function bombblast(){
//     for(let i = 0;i<64;i++){
//         if(squares[i].style.backgroundImage == ''){
//             console.log();
//         }
//     }
// }
// bombblast();


// console.log(squares[5].style.backgroundImage);


window.setInterval(function(){
    checkforrowfive();
    checkforcolfive();
    checkRowFour();
    checkColOfFour();
    checkForRowThree();
    checkColForThree();
    // bombblast();
    moveSquareIntoBelow();
},100)

})

