// * ---------------------------------- VARIABLES ---------------------------------- *

// *------- Local varibales -------*
let sum
let card
let message = ""
let playerHand = []
// *------- Boolean varibales -------*
let startGameClicked = false
let hasBlackjack
let isAlive
let countAsEleven
// *------- DOM varibales -------*
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let currentCardsEl = document.getElementById("current-cards-el")
let aceBtn1 = document.getElementById("aceBtn1")
let aceBtn2 = document.getElementById("aceBtn2")
let startGameBtn = document.getElementById("start-game-btn")
let newCardBtn = document.getElementById("new-card-btn")
let newGameBtn = document.getElementById("new-game-btn")

let playerEl = document.getElementById("player-el")
// *------- player object -------*
let player = {
    "name": "Franky",
    "chips": "150",
}




// * ---------------------------------- FUNCTIONS ---------------------------------- *

// *-------------- Functions called by buttons --------------*

// *---- starts game  ----*
function startGame() {
    if (startGameClicked === false) {
        sum = 0
        hasBlackjack = false
        isAlive = true

        // Player is asked to enter his/her name here and how much they want to bet
        playerEl.innerHTML = player.name + ": $" + player.chips     // <---- we want this information to be inputted by the player

        for (let i = 0; i < 2; i++) {
            playerHand.push(hitMe())
            sum += playerHand[i]
        }

        if (sum === 22) {
            playerHand[1] = 1
            sum = 12
        }

        renderGame()
        startGameClicked = true
    } else {
        console.log("You must end the game first")
    }
}

// *---- appends new card to array ----*
function anotherCard() {
    if (startGameClicked && isAlive && hasBlackjack === false) {
        newCard = hitMe()

        playerHand.push(newCard)
        sum += newCard

        renderGame()
    } else {
        console.log("You must start the game first")
    }
}

// *---- resets app, updates DOM & variables ----*
function quit() {
    currentCardsEl.innerHTML = ""
    sumEl.innerHTML = ""
    messageEl.innerHTML = "Want to play a round?"
    sum = 0
    playerHand = []
    startGameClicked = false
    playerEl.innerHTML = ""


    if (hasBlackjack === true) {
        document.getElementById("container").classList.toggle("container-bj")
    }

    if (isAlive === false) {
        document.getElementById("container").classList.toggle("container-ia")
    }
}

function decision() {

    return countAsEleven
}


// *-------------- DOM manipulation --------------*
function renderGame() {

    // *---- evaluates sum of cards & updates variables  ----*
    if (sum <= 20) {
        message = "Would you like another card?"
    } else if (sum === 21) {
        message = "Hoorah!!! You have BLACKJACK 🏆🫶"
        hasBlackjack = true
    } else {
        message = "You are out of the game! 😢💔"
        isAlive = false
    }

    // *---- checks if user has blackjack / is over 21 (toggling css classes) ----*
    if (hasBlackjack === true) {
        document.getElementById("container").classList.toggle("container-bj")
    }
    if (isAlive === false) {
        document.getElementById("container").classList.toggle("container-ia")
    }

    // *---- updates message display on GUI ----*
    messageEl.innerHTML = message

    // *---- updates current cards display on GUI ----*
    currentCardsEl.innerHTML = "Current cards: "
    for (let i = 0; i < playerHand.length; i++) {
        currentCardsEl.innerHTML += playerHand[i] + " "
    }

    // *---- updates sum display on GUI ----*
    sumEl.innerHTML = "Sum: " + sum
}

// *-------------- generates new card --------------*
function hitMe() {
    card = Math.floor(Math.random() * 13) + 1

    if (card > 1 && card < 11) {
        return card
    } else if (card > 10 && card < 14) {
        return 10
    } else {
        if (startGameClicked === false) { // <---- if one of the first two cards is an ace
            return 11
        } else { // <---- if the card is an ace & its not one of the first two
            // return oneOrEleven()
            console.log("decision function should run here")
            return 11
        }
    }
}

// *-------------- prompts user to establish value of ace --------------*
function oneOrEleven() {

    // *---- displays decision buttons & hides the new game/quit button  ----*
    toggleButtons()

    message = "You recieved an ace. Count it as a 1 or 11❓"
    messageEl.innerHTML = message

    // *---- program is paused until one of the decision buttons is clicked  ----*
    addEventListener("click", function () {
        if (countAsEleven === true) {
            return 11
        } else {
            return 1
        }
    })

    // *---- hides decision buttons & displays new game/quit button  ----*
    toggleButtons()

    // *---- returns the value of eleven, a variable used to decide how the user wants to count the ace  ----*

}

function toggleButtons() {
    aceBtn1.classList.toggle("decision-btn-visible")
    aceBtn2.classList.toggle("decision-btn-visible")
    startGameBtn.classList.toggle("hide")
    newGameBtn.classList.toggle("hide")
    newCardBtn.classList.toggle("hide")
}