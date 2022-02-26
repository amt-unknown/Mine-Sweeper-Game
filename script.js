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
        for(let j = 0; j < this.rows; j++){
            for(i = 0; i < this.columns; i++){
                let bombsInArea = 0;
                if((i>0 && i<this.columns-1) && (j>0 && j<this.rows-1)){ //Main Body Element
                    bombsInArea = this.bombLayer[j-1][i-1]+this.bombLayer[j-1][i]+this.bombLayer[j-1][i+1]+this.bombLayer[j][i-1]+this.bombLayer[j][i+1]+this.bombLayer[j+1][i-1]+this.bombLayer[j+1][i]+this.bombLayer[j+1][i+1];
                    this.proximityLayer[j].push(bombsInArea)
                    // console.log('main body')
                } else if ((i>0 && i<this.columns-1) && j==0){ //Top row
                    bombsInArea = this.bombLayer[j][i-1]+this.bombLayer[j][i+1]+this.bombLayer[j+1][i-1]+this.bombLayer[j+1][i]+this.bombLayer[j+1][i+1];
                    this.proximityLayer[j].push(bombsInArea)
                    // console.log('top row')
                } else if (i==this.columns-1 && (j>0 && j<this.rows-1)){ //Rightside Column
                    bombsInArea = this.bombLayer[j-1][i-1]+this.bombLayer[j-1][i]+this.bombLayer[j][i-1]+this.bombLayer[j+1][i-1]+this.bombLayer[j+1][i];
                    this.proximityLayer[j].push(bombsInArea)
                    // console.log('right col')
                } else if ((i>0 && i<this.columns-1) && j==this.rows-1){ //Bottom row
                    bombsInArea = this.bombLayer[j-1][i-1]+this.bombLayer[j-1][i]+this.bombLayer[j-1][i+1]+this.bombLayer[j][i-1]+this.bombLayer[j][i+1];
                    this.proximityLayer[j].push(bombsInArea)
                    // console.log('bottom row')
                } else if (i==0 & (j>0 && j<this.rows-1)){ //Left Column
                    bombsInArea = this.bombLayer[j-1][i]+this.bombLayer[j-1][i+1]+this.bombLayer[j][i+1]+this.bombLayer[j+1][i]+this.bombLayer[j+1][i+1];
                    this.proximityLayer[j].push(bombsInArea)
                    // console.log('left col')
                } else if (i==this.columns-1 && j==0){ //Top-right corner
                    bombsInArea = this.bombLayer[j][i-1]+this.bombLayer[j+1][i-1]+this.bombLayer[j+1][i];
                    this.proximityLayer[j].push(bombsInArea)
                    // console.log('top-right corner')
                } else if (i==this.columns-1 & j == this.rows-1){ //Bottom-right corner
                    bombsInArea = this.bombLayer[j-1][i-1]+this.bombLayer[j-1][i]+this.bombLayer[j][i-1];
                    this.proximityLayer[j].push(bombsInArea)
                    // console.log('bottom-right corner')
                } else if(i==0 && j==0){ //Top-left corner
                    bombsInArea = this.bombLayer[j][i+1]+this.bombLayer[j+1][i]+this.bombLayer[j+1][i+1];
                    this.proximityLayer[j][i] = bombsInArea;
                    // console.log('top-left corner')
                } else if (i==0 && j == this.rows-1) {//Bottom-left corner
                    bombsInArea = this.bombLayer[j-1][i]+this.bombLayer[j-1][i+1]+this.bombLayer[j][i+1];
                    this.proximityLayer[j].push(bombsInArea)
                    // console.log('bottom-left corner')
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




//Game grid sensor. Checks targeted block for underlying type







//Score Tracker

//Game difficulty selection
let difficulty = {
    test: [3,4,4],
    easy: [25,9,9],
    medium: [80,16, 16],
    hard: [150, 16, 30],
}





//Local Storage and Leaderboard

//*Tutorial
//*Help Button

// initializeGameGrids(0, 1, 4)
window.onload = async () => {
    

    gameGrid.initializeGameGrids(difficulty.hard)
    for(let i = 0; i < 4; i++){
        console.log(gameGrid.bombLayer[i])
    }
    
    console.log("")
    
    gameGrid.proximityArray()
    for(let i = 0; i < 4; i++){
        console.log(gameGrid.proximityLayer[i])
    }
}