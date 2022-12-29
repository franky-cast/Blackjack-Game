// * ---------------------------------- VARIABLES ---------------------------------- *
// *------- Local varibales -------*
let sum
let card
let message = ""
let playerHand = []
let aceValue
// *------- Boolean varibales -------*
let startGameClicked = false
let hasAce
let hasBlackjack
let isAlive
let countAsEleven
// *------- DOM varibales -------*
let formEl = document.getElementById("form-el")
let nameInput
let chipsInput
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let currentCardsEl = document.getElementById("current-cards-el")
// *------- Buttons -------*
let playBtnWrap = document.getElementById("play-btn-wrap")
let playButton = document.getElementById("play-button")
let aceBtn1 = document.getElementById("ace-btn-1-wrap")
let aceBtn2 = document.getElementById("ace-btn-2-wrap")
let startGameBtn = document.getElementById("start-game-btn")
let newCardBtn = document.getElementById("new-card-btn")
let newGameBtn = document.getElementById("new-game-btn")
let quitBtn = document.getElementById("quit-btn")

let playerEl = document.getElementById("player-el")
// *------- player object -------*
let player = {
    "name": null,
    "chips": null,
}

// * ---------------------------------- FUNCTIONS ---------------------------------- *

// *-------------- Functions called by buttons --------------*

// *---- Idk how to describe this yet  ----*
function play() {
    messageEl.innerHTML = "Feeling lucky?"
    playBtnWrap.classList.remove("play-btn-wrap")
    playButton.classList.add("hide")
    formEl.classList.remove("hide")
}

// *---- Assigns User Inputs to Player Object Keys ----*
function returnText () {
    if (document.getElementById("name-input").value === "" || document.getElementById("chips-input").value === "" || document.getElementById("name-input").value === " " ||  document.getElementById("chips-input").value < 10) {
        alert("Please make sure to enter valid name and at least $10")
    } else {
        player.name = document.getElementById("name-input").value
        document.getElementById("name-input").value = ""
        player.chips = document.getElementById("chips-input").value
        document.getElementById("chips-input").value = ""
        formEl.classList.add("hide")
        startGameBtn.classList.remove("hide")
        messageEl.innerHTML = "Ready to lose?"
    }
}

// *---- starts game  ----*
function startGame() {
    if (startGameClicked === false) {
        sum = 0
        hasBlackjack = false
        hasAce = false
        isAlive = true
        newCardBtn.classList.remove("hide")
        quitBtn.classList.remove("hide")


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

    startGameBtn.classList.add("hide")
}

// *---- appends new card to array ----*
function anotherCard() {
    if (startGameClicked && isAlive && hasBlackjack === false) {
        newCard = hitMe()

        if (hasAce === true) {
            return
        }

        playerHand.push(newCard)
        sum += newCard

        renderGame()
    } else {
        console.log("You must start the game first")
    }
}

// *---- resets app, updates DOM & variables ----*
function newGame() {
    currentCardsEl.innerHTML = ""
    sumEl.innerHTML = ""
    messageEl.innerHTML = "Bet More Money?"
    sum = 0
    playerHand = []
    startGameClicked = false
    playerEl.innerHTML = ""

    newCardBtn.classList.add("hide")
    newGameBtn.classList.add("hide")


    if (hasBlackjack === true) {
        document.getElementById("container").classList.remove("blackjack")
    }

    if (isAlive === false) {
        document.getElementById("container").classList.remove("out")
    }

    startGameBtn.classList.remove("hide")
    formEl.classList.add("hide")
}

function quit() {
    formEl.classList.remove("hide")
    quitBtn.classList.add("hide")

    currentCardsEl.innerHTML = ""
    sumEl.innerHTML = ""
    messageEl.innerHTML = "Want to play a round?"
    sum = 0
    playerHand = []
    startGameClicked = false
    playerEl.innerHTML = ""

    newCardBtn.classList.add("hide")
    newGameBtn.classList.add("hide")

    if(hasAce === true) {
        aceBtn1.classList.add("hide")
        aceBtn2.classList.add("hide")
    }


    if (hasBlackjack === true) {
        document.getElementById("container").classList.remove("blackjack")
    }

    if (isAlive === false) {
        document.getElementById("container").classList.remove("out")
    }
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
        document.getElementById("container").classList.add("blackjack")
        newGameBtn.classList.remove("hide")
        newCardBtn.classList.add("hide")
    }
    if (isAlive === false) {
        document.getElementById("container").classList.add("out")
        newGameBtn.classList.remove("hide")
        newCardBtn.classList.add("hide")
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
        if (startGameClicked === false) {
            return 11
        } else {
            hasAce = true

            showAceButtons()
    
            message = "You recieved an ace, count it as 1 or 11❓"
            messageEl.innerHTML = message
    
            return
        }
    }
}

// *-------------- appends ace card value to array and updates sum --------------*
function aceReceived(x) {
    playerHand.push(x)
    sum += x
    renderGame()
    aceBtn1.classList.add("hide")
    aceBtn2.classList.add("hide")

    if(isAlive === true) {
        newCardBtn.classList.remove("hide")
    } else {
        newCardBtn.classList.add("hide")
    }
}

function showAceButtons() {
    aceBtn1.classList.remove("hide")
    aceBtn2.classList.remove("hide")
    // startGameBtn.classList.add("hide")
    newGameBtn.classList.add("hide")
    newCardBtn.classList.add("hide")
}

function toggleButtons1() {
    aceBtn1.classList.add("hide")
    aceBtn2.classList.add("hide")
    // startGameBtn.classList.add("hide")
    newGameBtn.classList.remove("hide")
    newCardBtn.classList.remove("hide")
}