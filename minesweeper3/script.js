let game;
let matrix = [];
let rows = 0 ;
let columns = 0 ;
let numberBombs = 0 , timer = 0, counts = 0;


 
for(let  i = 0; i < rows; ++i){
  matrix.push([0]);
  for(let j = 0; j < columns; ++j){
    matrix[i][j] = 0;
  }
}

// generates the positions for the bombs and place them in the matrix
function generatePositions(numberBombs, matrix){
  let unique = 1, bombsCount = 0;
  let x = (Math.floor(Math.random() * rows));
  let y =  (Math.floor(Math.random() * columns));

  while(bombsCount < numberBombs){
    if(matrix[x][y] != 100){
      matrix[x][y] = 100;
      ++bombsCount;
    } else {  
      x = (Math.floor(Math.random() * rows)),
      y = (Math.floor(Math.random() * columns))
    }  
  }
  return matrix;
}

//matrix = generatePositions(numberBombs, matrix);

//generates the elements in the matrix , aka the numbers representing the bombs around

function generateMatrix(rows, columns, numberBombs){

  if(matrix[0][0] === 100){
    for(let i = 0; i <= 1; ++i){
      for(let j = 0; j <= 1; ++j){
        if(matrix[i][j] !== 100){
          ++matrix[i][j];
        }
      }
    }
  }
  if(matrix[0][columns - 1] === 100){
    for(let i = 0; i <= 1; ++i){
      for(let j = columns - 2; j <= columns - 1; ++j){
        if(matrix[i][j] !== 100){
          ++matrix[i][j];
        }
      }
    }
  }
  if(matrix[rows - 1][0] === 100){
    for(let i = rows - 2; i <= rows - 1; ++i){
      for(let j = 0; j <= 1; ++j){
        if(matrix[i][j] !== 100){
          ++matrix[i][j];
        }
      }
    }
  }
  if(matrix[rows - 1][columns - 1] === 100){
    for(let i = rows - 2; i <= rows - 1; ++i){
      for(let j = columns - 2; j <= columns - 1; ++j){
        if(matrix[i][j] !== 100){
          ++matrix[i][j];
        }
      }
    }
  }

  
  for(let i = 1; i < rows - 1; ++i){
    for(let y = 1; y < columns - 1; ++y){
      if(matrix[i][y] === 100){  
        for(let j = i - 1; j <= i + 1; ++j){
          for(let k = y - 1; k <= y + 1; ++k){
            if(matrix[j][k] !== 100){
              ++matrix[j][k];
            }
          }
        }
      }  
    }
  } 

  for(let y = 1, i = 0; y < columns - 1 ; ++y){
    if(matrix[i][y] === 100){
      for(let j = i; j <= i +1; ++j){
        for(let k = y - 1; k <= y + 1; ++k){
          if(matrix[j][k] !== 100){
            ++matrix[j][k];
          }
        }
      }
    }
  }
  for(let y = 1, i = rows - 1; y < columns - 1 ; ++y){
    if(matrix[i][y] === 100){
      for(let j = i - 1; j <= i ; ++j){
        for(let k = y-1; k <= y+1; ++k){
          if(matrix[j][k] !== 100){
            ++matrix[j][k];
          }
        }
      }
    }
  }
  for(let y = 0, i = 1; i < rows - 1 ; ++i){
    if(matrix[i][y] === 100){
      for(let j = i - 1; j <= i +1; ++j){
        for(let k = y; k <= y + 1; ++k){
          if(matrix[j][k] !== 100){
            ++matrix[j][k];
          }
        }
      }
    }
  }
  for(let y = columns - 1, i = 1; i < rows - 1 ; ++i){
    if(matrix[i][y] === 100){
      for(let j = i-1; j <= i +1; ++j){
        for(let k = y-1; k <= y; ++k){
          if(matrix[j][k] !== 100){
            ++matrix[j][k];
          }
        }
      }
    }
  }
  

  return matrix;
} 
//matrix = generateMatrix(rows, columns, numberBombs);

// making the grid

function newBoard(){
  let boardElement = document.createElement('div');

   boardElement.classList = "game-board";
   boardElement.id = "gameBoard";

  return boardElement;
}

//making the squares in the grid and reveal itself on click, or flagg/unflagg on right click

function newSquare(squareRow, squareColumn){
  let cell = document.createElement('div');
  

  cell.className = "square";
  cell.id = squareRow + "-" + squareColumn;
  


  cell.addEventListener('click', event =>{
    const {target} = event;
    
    if(matrix[squareRow][squareColumn] === 0) {
      revealSquares(squareRow, squareColumn);
    }
        
    if(matrix[squareRow][squareColumn] === 100 && (document.getElementById(squareRow + "-" + squareColumn).dataset.status !== "marked") ){
      target.innerText = '💣';
      gameOver();
    }
         
    if(matrix[squareRow][squareColumn] > 0 &&  matrix[squareRow][squareColumn] <=8 ){
      target.innerText = matrix[squareRow][squareColumn];
      matrix[squareRow][squareColumn] -= 2 * matrix[squareRow][squareColumn];
      document.getElementById("minesCount").innerText = numberBombs;
    }
        
    if(checkWin(matrix, rows, columns) === 1){
      document.getElementById("minesweeper").innerText = "YOU WIN";
    } 
  })

  cell.addEventListener('contextmenu', event => {

    event.preventDefault();
       
    if(matrix[squareRow][squareColumn] === 100 || (matrix[squareRow][squareColumn] > 0 && 
    matrix[squareRow][squareColumn] <= 8)){

      matrix[squareRow][squareColumn] -= 2 * matrix[squareRow][squareColumn];
      document.getElementById(squareRow + "-" + squareColumn).innerHTML = "⚑"
      --numberBombs;
      document.getElementById("minesCount").innerText = numberBombs;

    }else if(matrix[squareRow][squareColumn] < 0 && matrix[squareRow][squareColumn] >= -100){
      
      document.getElementById(squareRow + "-" + squareColumn).innerText = "";
      ++numberBombs;
      matrix[squareRow][squareColumn] += 2 *(-matrix[squareRow][squareColumn]);
      document.getElementById("minesCount").innerText = numberBombs;
    }
      
  }) 

return cell;
} 

function newGame() {
   
  for(let  i = 0; i < rows; ++i){
    matrix.push([0]);
    for(let j = 0; j < columns; ++j){
      matrix[i][j] = 0;
    }
  }

  matrix = generatePositions(numberBombs, matrix);
  matrix = generateMatrix(rows, columns, numberBombs);

  game = newBoard();

  game.style.setProperty("--size", columns);
  
  for(let i = 0; i < rows; ++i){
    for(let j = 0; j < columns; ++j){
      game.appendChild(newSquare(i, j));
    }
  }

  document.body.appendChild(game);
  document.getElementById("minesweeper").innerText = "MINESWEEPER";

  counts = setInterval(cronometru, 1000); 
  document.getElementById("timer").innerHTML = '0';
  timer = 0;
   
} 

// starts the timer

function cronometru(){
  
  var count= document.getElementById("timer");

  count.innerHTML = ++timer;
  return counts;
}    

//stops the timer

function stopCronometru(counts){
  clearInterval(counts);
}

//checking if the game is over due to click on a bomb and also stop the timer

function gameOver(){
  for(let i = 0; i < rows; ++i){
    for(let j = 0; j < columns; ++j){
      if(matrix[i][j] === 100){
        document.getElementById(i + "-" + j).innerText = '💣';
        document.getElementById("minesweeper").innerHTML = "you lose" ;
      }
    }
  }
  
  stopCronometru(counts);
  
}

// clears the board for choosing the next level of difficulty

function clearGame(){
  document.body.removeChild(game);
  document.getElementById("timer").innerHTML = '0';
  document.getElementById("minesCount").innerHTML = '0';
  document.getElementById("minesweeper").innerHTML = "MINESWEEPER";
 
}

//revealing the squares when clicked if they are empty or if they are numbers representing
//the number of bomb around

function revealSquares(x, y){
  
  for(let i = x - 1; i <= x + 1; ++i){
    for(let j = y - 1; j <= y + 1; ++j){
      if(matrix?.[i]?.[j] === 0){
        if((i >= 0 && i < rows) && (j >= 0 && j < columns)){
          document.getElementById(i + "-" + j).style.backgroundColor = 'lightgrey';
          document.getElementById(i + "-" + j).innerText = "";
         
          matrix[i][j] = -200;
         
          revealSquares(i, j);
        } 
          
      }
         
      if(matrix?.[i]?.[j] > 0 && matrix?.[i]?.[j] <= 8  ){
         
        document.getElementById(i + "-" + j).innerText = matrix[i][j];
        matrix[i][j] -= 2 * matrix[i][j];
         
      }  
    }
  }
} 

//checking if the player won an if so, stoping the timer
  
function checkWin(matrix, rows, columns){
  let win = 1;

  for(let i = 0; i < rows; ++i){
    for(let j = 0; j < columns; ++j){
      if(matrix[i][j] >= 0 && matrix[i][j] !== 100){
        win = 0;
      }
    }
  }
  if (win === 1){
    let over = cronometru();
    stopCronometru(counts);
  }
  return win;
}

// 3 functions to choose difficulty

function chooseDifficulty(){

  if(document.getElementById("beginner").innerText){
    columns = 9;
    rows = 9;
    numberBombs = 10;
    document.getElementById("minesCount").innerText = numberBombs;
  }
} 
  
function chooseDifficulty1(){
  if(document.getElementById("intermediate").innerText){
    columns = 16;
    rows = 16;
    numberBombs = 40;
    document.getElementById("minesCount").innerText = numberBombs;
  }
}
function chooseDifficulty2(){  
  if(document.getElementById("advanced").innerText){
    columns = 30;
    rows = 16;
    numberBombs = 99;
    document.getElementById("minesCount").innerText = numberBombs;
  }
}