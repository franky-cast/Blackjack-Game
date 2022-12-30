// * ---------------------------------- VARIABLES ---------------------------------- *
// *------- Local varibales -------*
let sum
let card
let message = ""
let playerHand = []
let dealerHand = []
// *------- Boolean varibales -------*
let startGameClicked = false
let hasAce
let hasBlackjack
let isAlive
// *------- DOM varibales -------*
let formEl = document.getElementById("form-el")
let nameInputEl = document.getElementById("name-input-el")
let chipsInputEl = document.getElementById("chips-input-el")
let nameInputField = document.getElementById("name-input-field")
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let currentCardsEl = document.getElementById("current-cards-el")
let playerEl = document.getElementById("player-el")
// *------- Buttons -------*
let playBtnWrap = document.getElementById("play-btn-wrap")
let playButton = document.getElementById("play-button")
let aceBtn11Wrap = document.getElementById("ace-btn-11-wrap")
let aceBtn1Wrap = document.getElementById("ace-btn-1-wrap")
let startGameBtn = document.getElementById("start-game-btn")
let anotherCardBtn = document.getElementById("another-card-btn")
let newRoundBtn = document.getElementById("new-round-btn")
let quitBtn = document.getElementById("quit-btn")
let stayBtnWrap = document.getElementById("stay-btn-wrap")
// *------- player object -------*
let player = {
    "name": null,
    "chips": null,
}

// * ---------------------------------- FUNCTIONS ---------------------------------- *

// *-------------- Functions called by buttons --------------*

// *---- Enables user input fields  ----*
function play() {
    messageEl.innerHTML = "Feeling lucky?"
    playBtnWrap.classList.remove("play-btn-wrap")
    playButton.classList.add("hide")
    formEl.classList.remove("hide")
}

// *---- Assigns User Inputs to Player Object Keys ----*
function returnText () {
    if (nameInputEl.value === "" || chipsInputEl.value === "" || nameInputEl.value === " " || chipsInputEl.value < 10) {
        alert("Please make sure to enter valid name and at least $10")
    } else {
        player.name = nameInputEl.value
        player.chips = chipsInputEl.value

        formEl.classList.add("hide")
        startGameBtn.classList.remove("hide")
        nameInputField.classList.remove("hide")
        messageEl.innerHTML = "Ready to lose?"

        playerEl.innerHTML = player.name + ": $" + player.chips
    }
}

// *---- starts game  ----*
function startGame() {
    if (startGameClicked === false) {
        sum = 0
        hasBlackjack = false
        hasAce = false
        isAlive = true
        anotherCardBtn.classList.remove("hide")
        quitBtn.classList.remove("hide")
        stayBtnWrap.classList.remove("hide")

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
    messageEl.innerHTML = "Ready?"
    sum = 0
    playerHand = []
    startGameClicked = false
    playerEl.innerHTML = player.name + ": $" + player.chips

    anotherCardBtn.classList.add("hide")
    newRoundBtn.classList.add("hide")


    if (hasBlackjack === true) {
        document.getElementById("container").classList.remove("blackjack")
    }

    if (isAlive === false) {
        document.getElementById("container").classList.remove("out")
        messageEl.innerHTML = "You need to place a bet before starting another round"
        formEl.classList.remove("hide")
        nameInputField.classList.add("hide")
    } else {
        formEl.classList.add("hide")
        startGameBtn.classList.remove("hide")
    }

    stayBtnWrap.classList.add("hide")
}

function stay() {
    anotherCardBtn.classList.add("hide")
    stayBtnWrap.classList.add("hide")
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
    nameInputEl.value = ""
    chipsInputEl.value = ""

    anotherCardBtn.classList.add("hide")
    newRoundBtn.classList.add("hide")
    stayBtnWrap.classList.add("hide")
    startGameBtn.classList.add("hide")
    nameInputField.classList.remove("hide")

    if(hasAce === true) {
        aceBtn11Wrap.classList.add("hide")
        aceBtn1Wrap.classList.add("hide")
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
        newRoundBtn.classList.remove("hide")
        anotherCardBtn.classList.add("hide")
        stayBtnWrap.classList.add("hide")
        player.chips = player.chips*2
        playerEl.innerHTML = player.name + ": $" + player.chips
    }
    if (isAlive === false) {
        document.getElementById("container").classList.add("out")
        newRoundBtn.classList.remove("hide")
        anotherCardBtn.classList.add("hide")
        stayBtnWrap.classList.add("hide")
        player.chips = 0
        playerEl.innerHTML = player.name + ": $" + player.chips
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

    if (player.chips > 10) {
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
    } else {
        alert("Place bet first")
    }
    
}

// *-------------- appends ace card value to array and updates sum --------------*
function aceReceived(x) {
    playerHand.push(x)
    sum += x
    renderGame()
    aceBtn11Wrap.classList.add("hide")
    aceBtn1Wrap.classList.add("hide")

    if(isAlive === true) {
        anotherCardBtn.classList.remove("hide")
    } else {
        anotherCardBtn.classList.add("hide")
    }
}

function showAceButtons() {
    aceBtn11Wrap.classList.remove("hide")
    aceBtn1Wrap.classList.remove("hide")
    newRoundBtn.classList.add("hide")
    anotherCardBtn.classList.add("hide")
}