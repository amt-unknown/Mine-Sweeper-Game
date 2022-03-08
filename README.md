# Mine-Sweeper-Game

## Requirements
### General Requirements
- This is a solo project!
- Just to clarify, you may do the same game as another student, but you may not work together
- This game cannot be a game or assignment we've already done in class
- This game must run in a web browser
- This game must be tracked in Github, with a minimum on 10 commits
- Ideally, put your empty project up on Github on day one of development and aim for multiple commits per day
- This game must be deployed on Github Pages or another location

### Game Requirements
- This game can be designed for 2 or more players (PvP) or 1 player (PvE)
- The second player in a PvP game can be a person or an AI
- For multi-player games, turns should switch appropriately between players
- This game should be winnable or it should keep score (whichever makes more sense)
- When a player wins or loses, the game status and/or score should display visually to the player in a way that does not rely on console.logs or alerts
- If there is a valid draw (tie) condition in your chosen game, that should be implemented
- HTML, CSS, and JavaScript should live in separate files
- Effort must be spent on styling and appearance
- The HTML code should use sematic tags
- The game should have a Readme.md file in the Github repository that describes the inspiration for the game, explains the controls and how to play the game, lists the technologies used to build the game, and addresses any outstanding bugs or unfinished functionality

---
## UI/UX
The sequence of overlay screens 
1. Welcome screen with "New Game" and "Tutorial" options that pushes to one of 2 screens
2. (On the Tutorial Screen there is a series of pictures and descriptions explaining the game. The User can move through the different lessons and at any time start a new Game)**
3. On the Difficulty Screen there are the options for 'Easy', 'Medium', and 'Hard'
4. The Game Screen provides a section for "High Score", "Score", "Grid Space", and a "Reset" button. 

**Feature to be implemented

---
## Game Overview and Controls
After starting a new game and selecting the difficulty level, the user is presented with a grid of tiles. Behind the tiles, lie empty spaces and space where a mine is contained. The goal of the game is to locate all mines and reveal all spaces which do not contain mines.

There are two controls used a 'single click' and 'double click.' 
-'single click': allows the user to tag an unrevealed tile with an 'X' or a '?'. And 'X' would be used to confirm a the location of a mine while a '?' would signify that the user is unsure of what is behind a tile. 
-'double click': allows the user to review what is behind a tile. Revealing a 'mine' will result in a 'Game Over'. If there is no mine behind a revealed tile, a number will be shown indicating the number of mines within said tile's vacinity. 

---
##Known Bugs
1. If the user clicks to quickly when attempting to tag a tile more than once, the web browser will register a 'double click.' This will result in revealing the contents behind the tile which could be an issue resulting in a premature loss. Unsure if this is a local issue, as in the time width of a user's doulbe click needs to be adjusted in the pointer section of the machine or where there is a work around solution. 
2. When revealing a tile that has no adjacent mines, a search will occur revealing all tiles adjacent that also contains on adjacent mines. The propogation of this doesn't always reveal all so named tiles. This is also reminiscent of the original game. 
3. User gets points for clicking on a bomb. 
4. Resizing issue with grid is not aligning with the easy game mode.
5. Resizing issue with grid on window size not machinging tiles

---
##Citations
###bombicon.png:
-Author: GrumpyDiamond
-Website: https://opengameart.org/content/bomb-1
-License: CC0 https://creativecommons.org/publicdomain/zero/1.0/
###flagicon.png
-Author: Nekith
-Website: https://opengameart.org/content/flags-0
-License: CC0 https://creativecommons.org/publicdomain/zero/1.0/