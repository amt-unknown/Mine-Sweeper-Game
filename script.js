//Screen Navigation Control




//Game grid sytem
//Create DOM for Grid
const gameGrid = {
    rows: 0,
    columns: 0,
    bombCout: 0,
    bombLayer: [[]],
    proximityLayer: [[]],

    initializeGameGrids([numberOfBombs, numberOfRows, numberOfColumns]) {
        this.rows = numberOfRows;
        this.columns = numberOfColumns;
        this.bombCout = numberOfBombs;

        let gameGrid = document.querySelector('#gridSpace')
        let bombsRemaining = numberOfBombs;
        let placeBomb = false;
        for(let j=0; j < numberOfRows; j++){
            let newRow = document.createElement('div')
            newRow.className = 'grid-row'

            
            // gameGrid.push()
            for(let i=0; i < numberOfColumns; i++){
                let newCol = document.createElement('div')
                newCol.className = 'grid-column'
                newCol.addEventListener('dblclick',() => {
                    if(this.bombLayer[j][i] == 0){
                        newCol.style.backgroundColor = 'rgba(200, 200, 200)'
                        newCol.textContent = this.proximityLayer[j][i]
                    }
                    console.log(this.bombLayer[j][i])
                })
                newRow.appendChild(newCol)
                
                let result = bombPlacement(bombsRemaining)
                placeBomb = result[0]
                bombsRemaining = result[1]
                // [ placeBomb, bombsRemaining ] = bombPlacement(bombsRemaining)

                //Initializes bombLayer 
                if(j === 0 && i === 0){ //Only used for initial value in null array. 
                    if(placeBomb){ 
                        this.bombLayer[j][i] = 1;
                    } else{
                        this.bombLayer[j][i] = 0;
                    }
                } else { //Normal iterations after initial value placement
                    if(placeBomb){
                        this.bombLayer[j].push(1);
                    } else{
                        this.bombLayer[j].push(0);
                    }
                    
                }
            }

            if(j < numberOfRows - 1){
                this.bombLayer.push([])
            }
            gameGrid.appendChild(newRow)
        }
    },

    //Generate Numbers Layer
    proximityArray(){
        let adjacencies, bombsInArea,index;
    
        for(let j = 0; j < this.rows; j++){
            for(i = 0; i < this.columns; i++){
                if(i==0 && j==0){
                    adjacencies = findAdjacentIndeces([0,0], this.columns, this.rows);
                    bombsInArea = sumArrayIndeces([0,0],adjacencies,this.bombLayer)

                    this.proximityLayer[0][0] = bombsInArea
                }
                else{
                    index = [i, j];
                
                    adjacencies = findAdjacentIndeces(index, this.columns, this.rows);
                    bombsInArea = sumArrayIndeces(index ,adjacencies,this.bombLayer);

                    // console.log(adjacencies)
                
                    this.proximityLayer[j].push(bombsInArea)
                }

                
                   
                // console.log(`(${i},${j})`)
            }
            if(j < this.rows - 1){
                this.proximityLayer.push([])
            }
        }
    },
}

//Generate Mine Map
//Randomized Grid System Function
function bombPlacement(numberOfBombs){
    let randomNumber = Math.random();
    let isBomb = false;
    if(randomNumber < 0.5 && numberOfBombs > 0){
        isBomb = true;
        numberOfBombs--;
    }

    return [isBomb, numberOfBombs]
}

//Finds adjacent nodes of a given index in grid arrays
function findAdjacentIndeces(index, columns, rows){
    let adjacenyObject = [
        [-1,-1],
        [0,-1],
        [1,-1],
        [-1,0],
        [1,0],
        [-1,1],
        [0,1],
        [1,1],
    ];

    let hasIndex = [0, 0, 0, 0, 0, 0, 0, 0];
       
    //Top
    if(index[0]==0 && index[1]==0){ //Top-left corner
        hasIndex = [0, 0, 0, 0, 1, 0, 1, 1]

    } else if ((index[0]>0 && index[0]<columns-1) && index[1]==0){ //Top row
        hasIndex = [0, 0, 0, 1, 1, 1, 1, 1]

    } else if (index[0]==columns-1 && index[1]==0){ //Top-right corner
        hasIndex = [0, 0, 0, 1, 0, 1, 1, 0]

    } else if((index[0]>0 && index[0]<columns-1) && (index[1]>0 && index[1]<rows-1)){ //Main Body Element
        hasIndex = [1, 1, 1, 1, 1, 1, 1, 1]
    
    } else if (index[0]==columns-1 && (index[1]>0 && index[1]<rows-1)){ //Rightside Column
        hasIndex = [1, 1, 0, 1, 0, 1, 1, 0]

    } else if ((index[0]>0 && index[0]<columns-1) && index[1]==rows-1){ //Bottom row
        hasIndex = [1, 1, 1, 1, 1, 0, 0, 0]

    } else if (index[0]==0 & (index[1]>0 && index[1]<rows-1)){ //Left Column
        hasIndex = [0, 1, 1, 0, 1, 0, 1, 1]
   
    } else if (index[0]==columns-1 & index[1] == rows-1){ //Bottom-right corner
        hasIndex = [1, 1, 0, 1, 0, 0, 0, 0]

    } else if(index[0]==0 && index[1]==0){ //Top-left corner
        hasIndex = [0, 0, 0, 0, 1, 0, 1, 1]

    } else if (index[0]==0 && index[1] == rows-1) {//Bottom-left corner
        hasIndex = [0, 1, 1, 0, 1, 0, 0 ,0]
    } 

    return [adjacenyObject, hasIndex]
}

function sumArrayIndeces(index, adjacencyObject, gridArray){
    let sum = 0;

    for(let i=0; i< adjacencyObject[1].length; i++){
        if(adjacencyObject[1][i] != 0){
            sum += gridArray[index[1]+adjacencyObject[0][i][1]][index[0]+adjacencyObject[0][i][0]]
        }
    }

    return sum
}

//Game grid sensor. Checks targeted block for underlying type







//Score Tracker

//Game difficulty selection


// function difficultySelector(){
//     let userSelection;

    let difficulty = {
        test: [3,4,4],
        easy: [25,9,9],
        normal: [80, 16, 16],
        hard: [150, 16, 30],
    }


//     const difficultyDIV = document.getElementById('difficultyBtns')
//     let controlBtns = difficultyDIV.getElementsByTagName('button')
//     for(let i=0; i<controlBtns.length; i++){
//         controlBtns[i].addEventListener('click', () => {
//             switch (controlBtns[i].textContent){
//             case 'Easy':
//                 userSelection = difficulty.easy;
//                 break;
//             case 'Normal':
//                 userSelection = difficulty.normal;
//                 break;
//             case 'Hard':
//                 userSelection = difficulty.hard;
//                 break;
//             default: 
//                 userSelection = difficult.test;
//                 break;
//             }
//         })
//     }

//     return userSelection
// }




//Local Storage and Leaderboard

//*Tutorial
//*Help Button

// initializeGameGrids(0, 1, 4)
window.onload = async () => {
    

    gameGrid.initializeGameGrids(difficulty.test)
    gameGrid.proximityArray()
    
    
}