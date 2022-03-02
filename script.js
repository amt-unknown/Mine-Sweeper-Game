//UI/UX and DOM control
const userInterface ={

    welcomeScreenOptions() {
        let newGame = document.getElementById('newGameBtn')
        newGame.addEventListener("click", () => {
            let welcomeScreen = document.getElementById("welcomeScreen")
            let optionsScreen = document.getElementById("difficultyScreen")


            welcomeScreen.style.display = "none"
            optionsScreen.style.display = "block"
            this.difficultyScreenOptions(optionsScreen)
        })
    },

    difficultyScreenOptions(optionsScreen) {
        let gameScreen = document.getElementById("gameScreen")

        let easyBtn = document.getElementById('easy')
        let normalBtn = document.getElementById('normal')
        let hardBtn = document.getElementById('hard')

        easyBtn.addEventListener("click", () => {
            gameGrid.initializeGameGrids(difficulty.easy)
            optionsScreen.style.display = "none"
            gameScreen.style.display = "block"
        })
        normalBtn.addEventListener("click", () => {
            gameGrid.initializeGameGrids(difficulty.normal)
            optionsScreen.style.display = "none"
            gameScreen.style.display = "block"
        })
        hardBtn.addEventListener("click", () => {
            gameGrid.initializeGameGrids(difficulty.hard)
            optionsScreen.style.display = "none"
            gameScreen.style.display = "block"
        })

        this.gameScreen(optionsScreen, gameScreen)
    },

    gameScreen(optionsDOM, gameScreen){
        let resetButton = document.getElementById("resetBtn")
        resetButton.addEventListener('click', () => {
            optionsDOM.style.display = "block"
            gameScreen.style.display = "none"

            gameGrid.resetGrid()
        })


    },

}



// userInterface.welcomeScreenOptions






window.onload = async () => {
    userInterface.welcomeScreenOptions()

    // gameGrid.initializeGameGrids(difficulty.easy)
    // gameGrid.proximityArray()
    
    
}