//UI/UX and DOM control
const userInterface ={   

    //Loads welcome screen
    welcomeScreenOptions() {
        let newGame = document.getElementById('newGameBtn')
        let tutorial = document.getElementById('tutorialBtn')
        let welcomeScreen = document.getElementById("welcomeScreen")
        let optionsScreen = document.getElementById("difficultyScreen")
        let tutorialScreen = document.getElementById("tutorialScreen")

        //Event listener for launching game
        newGame.addEventListener("click", () => {
            
            welcomeScreen.style.display = "none"
            optionsScreen.style.display = "block"
            this.difficultyScreenOptions(optionsScreen)
        })

        //Under construction: tutorial page
        tutorial.addEventListener("click", () => {{
            welcomeScreen.style.display = "none"
            tutorialScreen.style.display = "block"
        }})
        
    },

    //Launches difficulty screen
    difficultyScreenOptions(optionsScreen) {
        let gameScreen = document.getElementById("gameScreen")
        let gameDisplay = document.getElementById("gameDisplay")

        let easyBtn = document.getElementById('easy')
        let normalBtn = document.getElementById('normal')
        let hardBtn = document.getElementById('hard')

        //Allows user to choose difficulty
        easyBtn.addEventListener("click", () => {
            gameGrid.initializeGameGrids(difficulty.easy)
            optionsScreen.style.display = "none"
            gameScreen.style.display = "flex"
        })
        normalBtn.addEventListener("click", () => {
            gameGrid.initializeGameGrids(difficulty.normal)
            optionsScreen.style.display = "none"
            gameScreen.style.display = "flex"
        })
        hardBtn.addEventListener("click", () => {
            gameGrid.initializeGameGrids(difficulty.hard)
            optionsScreen.style.display = "none"
            gameScreen.style.display = "flex"
            // gameScreen.style.height = "1000px"
        })

        this.gameScreen(optionsScreen, gameScreen,gameDisplay)
    },

    //Starts buttons for game screen
    gameScreen(optionsDOM, gameScreen, gameDisplay){
        let resetButton = document.getElementById("resetBtn")
        resetButton.addEventListener('click', () => {
            optionsDOM.style.display = "block"
            gameScreen.style.display = "none"
            // gameScreen.style.height = "600px";

            gameGrid.resetGrid()
        })


    },

}

window.onload = async () => {
    userInterface.welcomeScreenOptions()
}