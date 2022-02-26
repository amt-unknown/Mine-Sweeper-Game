//Screen Navigation Control
// const screenChanger = {
//     initializeGameSpace () {
//         let gameSpaceDOM = document.getElementsByClassName('screen');
//         let screenDisplayList = [];
//     // let screenList = gameSpaceDOM.getElementsByClassName("screen")
//         for(let i = 0; i < gameSpaceDOM.length; i++){
//             // let element = document.getElementById(gameSpaceDOM[i].id);
//             // screenDisplayList.push(element)
//             // element.style.display = 'auto';
//             // console.log(element.style)

//             console.log(gameSpaceDOM[i].style)
//         }
//         console.log(screenDisplayList)
//     },

// }




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


    }
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

//Generate Numbers Map
function proximityArray(bombLayer){


}

//Game grid sensor. Checks targeted block for underlying type







//Score Tracker

//Game difficulty selection
let difficulty = {
    test: [6,4,4],
    easy: [25,9,9],
    medium: [80,16, 16],
    hard: [150, 16, 30],
}





//Local Storage and Leaderboard


// let bombLayer = [];

// for(let i=0; i < 16; i++){
//     bombLayer.push(0)
// }
// bombLayer[15]=1;


//*Tutorial
//*Help Button

// initializeGameGrids(0, 1, 4)
window.onload = async () => {
    

    gameGrid.initializeGameGrids(difficulty.test)
    
    for(let i = 0; i < 4; i++){
        console.log(gameGrid.bombLayer[i])
    }
}