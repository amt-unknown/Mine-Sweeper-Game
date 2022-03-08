//Game grid sytem
const gameGrid = {
    rows: 0,
    columns: 0,
    bombCount: 0,
    emptyTilesRemaing: 0,
    bombLayer: [[]],
    eventLayer: [[]],
    gameEnd: false,
    currentScore: 0,
    highScore: 0,
    proximityLayer: [[]],

    //Initializes grid via the user difficulty setting. 
    initializeGameGrids([numberOfBombs, numberOfRows, numberOfColumns]) {
        //Saves difficulty parameters within object

        let userHighScore = localStorage.getItem('highScore')
        console.log(userHighScore)
        if(userHighScore != null){
            let parsedUserHighScore = JSON.parse(userHighScore)
            console.log(parsedUserHighScore)
            this.highScore = parsedUserHighScore;
            let highscore = document.getElementById("highScore")
            highscore.textContent = this.highScore
        }

        this.rows = numberOfRows;
        this.columns = numberOfColumns;
        this.bombCount = numberOfBombs;

        //Targets the gridSpace <div> and begins iterating first across a row and then down the column
        let gameSpace = document.querySelector('#gridSpace')
        let bombsRemaining = numberOfBombs;
        let placeBomb = false;

        //For-loop over rows
        for(let j=0; j < numberOfRows; j++){
            let newRow = document.createElement('div')
            newRow.className = `grid-row`

            //For-loop over columns
            for(let i=0; i < numberOfColumns; i++){
                //Establishes a grid with a specifialized class and settings. 
                let newCol = document.createElement('div')
                newCol.className = `grid-column row-${j}-column-${i}`
                newCol.style.border = "2px outset #5A6F7B"
                newCol.style.backgroundColor = "#5A6F7B"
                
                //Establishes a 'double click' event 
                newCol.addEventListener('dblclick',() => {
                    //Checks whether game is still running
                    if(!this.gameEnd){
                        //Checks whether a bomb is not present. 
                        if(this.bombLayer[j][i] == 0){
                            //Update tiles remaining
                            gameGrid.emptyTilesRemaing -= 1
                            //Change color and border style of revealed tile
                            newCol.style.backgroundColor = '#A5C0C9'
                            newCol.style.borderStyle = "solid"

                            //Checks for adjacenent mines and runs reveal propagator.
                            if(this.proximityLayer[j][i] == 0 && isNaN(newCol.textContent)){
                                let adjacencies = findAdjacentIndeces([i,j], this.columns, this.rows)
                                grayedGridExpansion([i,j],adjacencies, this.columns, this.rows, 0)
                                newCol.textContent = " "
                            } else if(!isNaN(newCol.textContent)){ 
                                //Prevent clicking of a revealed tile
                            } else {
                                //Updates score and reveals number of mines adjacent to target tile
                                newCol.textContent = this.proximityLayer[j][i]
                                this.trackScore(this.proximityLayer[j][i])
                            }
                        } else {
                            //Loss Condition
                            this.gameEnd = true
                            this.displayBombs(i,j)

                            //export high score here 
                            let exportHighScore = JSON.stringify(this.highScore)
                            localStorage.setItem('highScore', exportHighScore)

                            let message = document.getElementById("gameMessage")
                            gameSpace.style.opacity = ".40"
                            message.textContent = "Game Over!"
                        }
                    }
                })
                //Adds event for single click to toggle through tags '', 'X', '?'
                newCol.addEventListener('click', () => {
                    if(!this.gameEnd){
                        if(newCol.style.backgroundColor == 'rgb(90, 111, 123)'){
                            cycleMarking([i,j])
                        }
                    }
                })
                    newRow.appendChild(newCol)
                    
                    //Iterator to add a bomb given conditions with bombPlacement()
                    let result = bombPlacement(bombsRemaining)
                    placeBomb = result[0]
                    bombsRemaining = result[1]

                    //Initializes bombLayer 
                    if(j === 0 && i === 0){ //Only used for initial value in null array. 
                        this.eventLayer[j][i] = newCol;
                        if(placeBomb){ 
                            this.bombLayer[j][i] = 1;
                        } else{
                            this.bombLayer[j][i] = 0;
                        }
                    } else { //Normal iterations after initial value placement
                        this.eventLayer[j].push(newCol)
                        if(placeBomb){
                            this.bombLayer[j].push(1);
                        } else{
                            this.bombLayer[j].push(0);
                        }
                        
                    }
            }
             
            //Control statement to check whether arrays are undefined. 
            if(j < numberOfRows - 1){
                this.bombLayer.push([])
                this.eventLayer.push([])
            }
            gameSpace.appendChild(newRow)
        }

        //Initializes bombs present, tiles unrealed and runs proximityArray() method
        this.bombCount -= bombsRemaining
        this.emptyTilesRemaing = this.rows*this.columns - this.bombCount;
        this.eventLayer = gameSpace;
        this.proximityArray()
        this.displayBombs()
    },

    //updates user score
    trackScore(number){

        this.currentScore += number*100;
        let highscore = document.getElementById("highScore")
        let currentscore = document.getElementById("currentScore")

        currentscore.textContent = this.currentScore;

        //Updates highscore if user surpasses current highscore
        if(this.highScore < this.currentScore){
            this.highScore = this.currentScore;
            highscore.textContent = this.highScore
        }

        //Tests win condition
        if(this.emptyTilesRemaing === 0){
            let message = document.getElementById("gameMessage")
            message.textContent = "Congrats you won!"

            //export high score here
        }
    },

    //Generate Adjacency Layer
    proximityArray(){
        let adjacencies, bombsInArea,index;
        

        for(let j = 0; j < this.rows; j++){
            for(i = 0; i < this.columns; i++){
                if(i==0 && j==0){
                    //initializes this.proximityLayer if undefined
                    adjacencies = findAdjacentIndeces([0,0], this.columns, this.rows);
                    bombsInArea = sumArrayIndeces([0,0],adjacencies,this.bombLayer)

                    this.proximityLayer[0][0] = bombsInArea
                }
                else{ 
                    //All other index numbers passed through here 
                    index = [i, j];
                
                    adjacencies = findAdjacentIndeces(index, this.columns, this.rows);
                    bombsInArea = sumArrayIndeces(index ,adjacencies,this.bombLayer);
                
                    this.proximityLayer[j].push(bombsInArea)
                }
            }
            
            //pushes to a new row unless at required number of rows
            if(j < this.rows - 1){
                this.proximityLayer.push([])
            }
        }
    },

    //Displays bombs upon testing or game completion
    displayBombs(xIndex, yIndex){
        for(let j=0; j < this.rows; j++){
            for(let i=0; i < this.columns; i++){
                //target current index <div> 
                let currentTile = document.querySelector(`.row-${j}-column-${i}`)
            
                if(this.bombLayer[j][i] == '1'){
                    if(currentTile.textContent == "X"){
                        //If user identified a bomb currectly a flag is revealed and score is updated
                        this.trackScore(10)
                        currentTile.innerHTML = "<img class='flagIcon' src='./assets/images/flagicon.png' alt='flag icon'>"
                    } else {
                        currentTile.innerHTML = "<img class='bombIcon' src='./assets/images/bombicon.png' alt='bomb icon'>"
                    }
                }
            }
        }

        if(xIndex && yIndex){///////
            let clickedTile = document.querySelector(`.row-${yIndex}-column-${xIndex}`)
            clickedTile.innerHTML = "<img class='bombIcon' src='./assets/images/bombicon.png' alt='bomb icon'>"
        }

    },

    //removes all settings and removes all tiles from gridSpace <div>
    resetGrid() {
        this.rows = 0
        this.columns = 0
        this.bombCout = 0
        this.bombLayer = [[]]
        this.eventLayer = [[]]
        this.gameEnd = false
        this.proximityLayer = [[]]
        this.currentScore = 0;

        let message = document.getElementById("gameMessage")
        message.textContent = ""


        let gridSpace = document.getElementById("gridSpace")
        gridSpace.innerHTML = ""
        gridSpace.style.opacity = "1"

        let currentscore = document.getElementById("currentScore")
        currentscore.textContent = this.currentScore;

    },
}

//Generate Mine Map
//Randomized Grid System Function
function bombPlacement(numberOfBombs){
    let randomNumber = Math.random();
    let isBomb = false;
    if(randomNumber < 0.30 && numberOfBombs > 0){
        isBomb = true;
        numberOfBombs--;
    }

    return [isBomb, numberOfBombs]
}

//Finds adjacent nodes of a given index in grid arrays
function findAdjacentIndeces(index, columns, rows){
    //Indicator function for 2D arrays
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

//Changes Color of square is target square has 0 mines nearby
function grayedGridExpansion(index, adjacencies, columns, rows, recursionLimiter){
    //Limits max number of calls
    let count = recursionLimiter
   
    for(let i=0; i<adjacencies[1].length; i++){
        //checks where is a non-bomb tile adjacent
        if(adjacencies[1][i]){
            //Saves current index for recursion
            let currentIndex = [index[0]+adjacencies[0][i][0],index[1]+adjacencies[0][i][1]]
            //Updates DOM of zero square
            let DOMelement = document.querySelector(`.row-${currentIndex[1]}-column-${currentIndex[0]}`)
            DOMelement.style.backgroundColor = '#A5C0C9'
            DOMelement.style.borderStyle = "solid"


            if(gameGrid.proximityLayer[currentIndex[1]][currentIndex[0]] === 0){
                //reveals zero tiles and adjusts remaining tile count
                if(DOMelement.textContent == ""){
                    gameGrid.emptyTilesRemaing -= 1
                }
                DOMelement.textContent = " "
                //Runs recursion
                if(count < 10){
                    count ++;
                    let newAdjacencies = findAdjacentIndeces([currentIndex[0],currentIndex[1]], columns, rows)
                    grayedGridExpansion([currentIndex[0],currentIndex[1]], newAdjacencies, columns, rows, count)
                }
            } else {
                //Reveals non-zero/non-mine tiles
                if(DOMelement.textContent == "" || DOMelement.textContent == "?" || DOMelement.textContent == "X"){
                    gameGrid.emptyTilesRemaing -= 1
                }
                DOMelement.textContent = gameGrid.proximityLayer[index[1]+adjacencies[0][i][1]][index[0]+adjacencies[0][i][0]]
            }
        }
    }
}

//Functin to sum numbers adjacent to a tile via findAdjacentTiles() function
function sumArrayIndeces(index, adjacencyObject, gridArray){
    let sum = 0;

    for(let i=0; i< adjacencyObject[1].length; i++){
        if(adjacencyObject[1][i] != 0){
            sum += gridArray[index[1]+adjacencyObject[0][i][1]][index[0]+adjacencyObject[0][i][0]]
        }
    }

    return sum
}

//Cycles between blank, bomb here, and potential bomb here symbols
function cycleMarking(index){
    let DOMelement = document.querySelector(`.row-${index[1]}-column-${index[0]}`)
    if(DOMelement.textContent == ""){
        DOMelement.textContent = "?"
    } else if(DOMelement.textContent == "?"){
        DOMelement.textContent = "X"
    } else if(DOMelement.textContent == "X"){
        DOMelement.textContent = ""
    }
}


//Difficulty options
let difficulty = {
    test: [3,4,4],
    easy: [25,9,9],
    normal: [70, 16, 16],
    hard: [140, 30, 16],
}