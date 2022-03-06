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

    initializeGameGrids([numberOfBombs, numberOfRows, numberOfColumns]) {
        this.rows = numberOfRows;
        this.columns = numberOfColumns;
        this.bombCount = numberOfBombs;

        let gameSpace = document.querySelector('#gridSpace')
        let bombsRemaining = numberOfBombs;
        let placeBomb = false;
        for(let j=0; j < numberOfRows; j++){
            let newRow = document.createElement('div')
            newRow.className = `grid-row`

            // gameSpace.push()
            for(let i=0; i < numberOfColumns; i++){
                let newCol = document.createElement('div')
                newCol.className = `grid-column row-${j}-column-${i}`
                newCol.style.border = "2px outset #5A6F7B"
                newCol.style.backgroundColor = "#5A6F7B"
                
                newCol.addEventListener('dblclick',() => {
                    if(!this.gameEnd){
                        if(this.bombLayer[j][i] == 0){
                            gameGrid.emptyTilesRemaing -= 1
                            newCol.style.backgroundColor = '#A5C0C9'
                            newCol.style.borderStyle = "solid"
                            console.log(newCol.textContent)
                            if(this.proximityLayer[j][i] == 0 && isNaN(newCol.textContent)){
                            // if(this.proximityLayer[j][i] == 0 && isNaN(newCol.textContent)){
                                let adjacencies = findAdjacentIndeces([i,j], this.columns, this.rows)
                                grayedGridExpansion([i,j],adjacencies, this.columns, this.rows, 0)
                                newCol.textContent = " "
                            } else{
                                newCol.textContent = this.proximityLayer[j][i]
                                this.trackScore(this.proximityLayer[j][i])
                            }
                        } else {
                            this.gameEnd = true
                            this.displayBombs(i,j)

                            let message = document.getElementById("gameMessage")
                            gameSpace.style.opacity = ".40"
                            message.textContent = "Game Over!"
                        }
                    }
                })
                newCol.addEventListener('click', () => {
                    if(!this.gameEnd){
                        if(newCol.style.backgroundColor == 'rgb(90, 111, 123)'){
                            cycleMarking([i,j])
                        }
                    }
                })
                    newRow.appendChild(newCol)
                    
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

            if(j < numberOfRows - 1){
                this.bombLayer.push([])
                this.eventLayer.push([])
            }
            gameSpace.appendChild(newRow)
        }

        this.bombCount -= bombsRemaining
        this.emptyTilesRemaing = this.rows*this.columns - this.bombCount;
        this.eventLayer = gameSpace;
        this.proximityArray()
        this.displayBombs()
    },

    trackScore(number){

        this.currentScore += number*100;
        let highscore = document.getElementById("highScore")
        let currentscore = document.getElementById("currentScore")

        currentscore.textContent = this.currentScore;

        if(this.highScore < this.currentScore){
            this.highScore = this.currentScore;
            highscore.textContent = this.highScore
        }

        if(this.emptyTilesRemaing === 0){
            let message = document.getElementById("gameMessage")
            message.textContent = "Congrats you won!"
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
                
                    this.proximityLayer[j].push(bombsInArea)
                }
            }
            if(j < this.rows - 1){
                this.proximityLayer.push([])
            }
        }
    },

    displayBombs(xIndex, yIndex){
        for(let j=0; j < this.rows; j++){
            for(let i=0; i < this.columns; i++){
                let currentTile = document.querySelector(`.row-${j}-column-${i}`)
                
                if(this.bombLayer[j][i] == '1'){
                    if(currentTile.textContent == "X"){
                        this.trackScore(10)
                        currentTile.innerHTML = "<img class='flagIcon' src='./flagicon.png' alt='flag icon'>"
                    } else {
                        currentTile.innerHTML = "<img class='bombIcon' src='./bombicon.png' alt='bomb icon'>"
                    }
                }
            }
        }

        if(xIndex && yIndex){
            let clickedTile = document.querySelector(`.row-${yIndex}-column-${xIndex}`)
            clickedTile.innerHTML = "<img class='bombIcon' src='./bombicon.png' alt='bomb icon'>"
        }

    },

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
    let count = recursionLimiter
   
    for(let i=0; i<adjacencies[1].length; i++){
        if(adjacencies[1][i]){
            let currentIndex = [index[0]+adjacencies[0][i][0],index[1]+adjacencies[0][i][1]]
            let DOMelement = document.querySelector(`.row-${currentIndex[1]}-column-${currentIndex[0]}`)
            DOMelement.style.backgroundColor = '#A5C0C9'
            DOMelement.style.borderStyle = "solid"
            if(gameGrid.proximityLayer[currentIndex[1]][currentIndex[0]] === 0){
                if(DOMelement.textContent == ""){
                    gameGrid.emptyTilesRemaing -= 1
                }
                DOMelement.textContent = " "
                if(count < 10){
                    count ++;
                    let newAdjacencies = findAdjacentIndeces([currentIndex[0],currentIndex[1]], columns, rows)
                    grayedGridExpansion([currentIndex[0],currentIndex[1]], newAdjacencies, columns, rows, count)
                }
            } else {
                if(DOMelement.textContent == "" || DOMelement.textContent == "?" || DOMelement.textContent == "X"){
                    gameGrid.emptyTilesRemaing -= 1
                }
                DOMelement.textContent = gameGrid.proximityLayer[index[1]+adjacencies[0][i][1]][index[0]+adjacencies[0][i][0]]
            }
        }
    }
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

let difficulty = {
    test: [3,4,4],
    easy: [25,9,9],
    normal: [70, 16, 16],
    hard: [140, 30, 16],
}