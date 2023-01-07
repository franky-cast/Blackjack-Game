// game state variables
// -------------------------
let playerSum
let dealerSum
let message = ""
let winner

let card
let symbol
let url

let startGameClicked = false
let hasAce
let hasBlackjack
let isAlive

// let localStorageChips

// game objects
// -------------------------
let player = {
    name: null,
    chips: null,
    hand: []
}
let dealer = {
    name: "Dealer",
    hand: []
}
const deck = {
    "clubs": { 
        "1": "../assets/deck/aceclubs.png",
        "2": "../assets/deck/2clubs.png",
        "3": "../assets/deck/3clubs.png",
        "4": "../assets/deck/4clubs.png",
        "5": "../assets/deck/5clubs.png",
        "6": "../assets/deck/6clubs.png",
        "7": "../assets/deck/7clubs.png",
        "8": "../assets/deck/8clubs.png",
        "9": "../assets/deck/9clubs.png",
        "10": ["../assets/deck/10clubs.png", "../assets/deck/jackclubs.png", "../assets/deck/queenclubs.png", "../assets/deck/kingclubs.png"],
        "11": "../assets/deck/aceclubs.png",
    },

    "spades": {
        "1": "../assets/deck/acespades.png",
        "2": "../assets/deck/2spades.png",
        "3": "../assets/deck/3spades.png",
        "4": "../assets/deck/4spades.png",
        "5": "../assets/deck/5spades.png",
        "6": "../assets/deck/6spades.png",
        "7": "../assets/deck/7spades.png",
        "8": "../assets/deck/8spades.png",
        "9": "../assets/deck/9spades.png",
        "10": ["../assets/deck/10spades.png", "../assets/deck/jackspades.png", "../assets/deck/queenspades.png", "../assets/deck/kingspades.png"],
        "11": "../assets/deck/acespades.png",
    },

    "hearts": {
        "1": "../assets/deck/acehearts.png",
        "2": "../assets/deck/2hearts.png",
        "3": "../assets/deck/3hearts.png",
        "4": "../assets/deck/4hearts.png",
        "5": "../assets/deck/5hearts.png",
        "6": "../assets/deck/6hearts.png",
        "7": "../assets/deck/7hearts.png",
        "8": "../assets/deck/8hearts.png",
        "9": "../assets/deck/9hearts.png",
        "10": ["../assets/deck/10hearts.png", "../assets/deck/jackhearts.png", "../assets/deck/queenhearts.png", "../assets/deck/kinghearts.png"],
        "11": "../assets/deck/acehearts.png",
    },

    "diamonds": {
        "1": "../assets/deck/acediamonds.png",
        "2": "../assets/deck/2diamonds.png",
        "3": "../assets/deck/3diamonds.png",
        "4": "../assets/deck/4diamonds.png",
        "5": "../assets/deck/5diamonds.png",
        "6": "../assets/deck/6diamonds.png",
        "7": "../assets/deck/7diamonds.png",
        "8": "../assets/deck/8diamonds.png",
        "9": "../assets/deck/9diamonds.png",
        "10": ["../assets/deck/10diamonds.png", "../assets/deck/jackdiamonds.png", "../assets/deck/queendiamonds.png", "../assets/deck/kingdiamonds.png"],
        "11": "../assets/deck/acediamonds.png",
    }
}

// dom variables
// -------------------------
const gameBoard = document.getElementById("game-board")
const formEl = document.getElementById("form-el")
const nameInputField = document.getElementById("name-input-field")
const messageEl = document.getElementById("message-el")
const currentCardsEl = document.getElementById("current-cards-el")
const sumEl = document.getElementById("sum-el")
const dealersHandEl = document.getElementById("dealers-hand-el")
const dealerSumEl = document.getElementById("dealer-sum-el")
const nameInputEl = document.getElementById("name-input-el")
const chipsInputEl = document.getElementById("chips-input-el")
const playerEl = document.getElementById("player-el")

// game buttons
// -------------------------
const playButton = document.getElementById("play-button")
const submitBtn = document.getElementById("submit-button")
const startGameBtn = document.getElementById("start-game-btn")
const anotherCardBtn = document.getElementById("another-card-btn")
const standButton = document.getElementById("stand-button")
const quitBtn = document.getElementById("quit-btn")
const newRoundBtn = document.getElementById("new-round-btn")
const aceButton1 = document.getElementById("ace-btn1")
const aceButton2 = document.getElementById("ace-btn2")

const playBtnWrap = document.getElementById("play-btn-wrap")
const standBtnWrap = document.getElementById("stand-btn-wrap")
const aceBtn1Wrap = document.getElementById("ace-btn-1-wrap")
const aceBtn2Wrap = document.getElementById("ace-btn-2-wrap")


// *-------------- Functions called by buttons --------------*

// diplays form element so that player can input name and chips
playButton.addEventListener("click", function () {
    messageEl.innerHTML = "Feeling lucky?"
    playBtnWrap.classList.remove("play-btn-wrap")
    hideElement(playButton)
    showElement(formEl)
})

// validates inputs and updates DOM with player's name and chip amount
submitBtn.addEventListener("click", function () {
    if (nameInputEl.value === "" || chipsInputEl.value === "" || nameInputEl.value === " " || chipsInputEl.value < 10) {
        alert("Please make sure to enter valid name and at least $10")
    } else {
        player.name = nameInputEl.value
        player.chips = chipsInputEl.value
        nameInputEl.value = ""
        chipsInputEl.value = ""

        hideElement(formEl)
        showElement(startGameBtn)
        showElement(nameInputField)

        messageEl.innerHTML = "Ready to lose?"
        playerEl.innerHTML = `${player.name}: $${player.chips}`

        // localStorageChips = localStorageChips - player.chips
    }
})

// draws 2 cards each for player & dealer, calls renderGame()
startGameBtn.addEventListener("click", function () {
    // if game has just started, proceed with function
    if (startGameClicked === false) {
        initilizeGame()
        showElement(anotherCardBtn)
        showElement(standBtnWrap)
        showElement(quitBtn)

        // Loop twice and push random cards to player's and dealer's hands
        for (let i = 0; i < 2; i++) {
            player.hand.push(randomCard())
            dealer.hand.push(randomCard())
            playerSum += player.hand[i]
        }
        // If player receives two aces, draw 1 new card for player's hand and reset playerSum
        if (playerSum === 22) {
            player.hand[0] = randomCard()
            playerSum = 0
            for (let i = 0; i < 2; i++) {
                playerSum += player.hand[i]
            }
        }
        renderGame()
        startGameClicked = true
    } else {
        console.log("startGameBtn cannot execute because game has already started")
    }
    hideElement(startGameBtn)
})

// draws 1 card each for player/dealer, calls renderGame()
anotherCardBtn.addEventListener("click", function () {
    // if game is ongoing proceed with function
    if (startGameClicked && isAlive && hasBlackjack === false) {
        // draw card for player
        let drawnCard = randomCard()

        // if drawnCard is an ace, stop program flow so user can decide to the value of ace. aceReceived(x) takes over
        if (hasAce === true) {
            hasAce = false
            return
        } else {
            dealer.hand.push(randomCard())
            player.hand.push(drawnCard)
            playerSum += drawnCard
            renderGame()
        }
    } else {
        console.log("anotherCardBtn cannot execute because game ended already")
    }
})

// stop receving additional cards & compare hand to dealer's
standButton.addEventListener("click", function () {
    hideElement(anotherCardBtn)
    hideElement(standBtnWrap)

    winner = establishWinner()
    if (winner === "player") {
        message = "You win! 🥳"
        player.chips = player.chips * 1.5
        gameBoard.classList.add("blackjack")
    } else if (winner === "dealer") {
        message = "You lose... 😔"
        player.chips = 0
        gameBoard.classList.add("out")   
    } else {
        message = "Tie! 🙅‍♂️ You and dealer have the same hand."
    }
    messageEl.innerHTML = message
    playerEl.innerHTML = `${player.name}: $${player.chips}`
    showElement(newRoundBtn)
})

// resets game
quitBtn.addEventListener("click", function () {
    resetElements()

    playerEl.innerHTML = ""
    messageEl.innerHTML = "Want to play a round?"

    showElement(formEl)
    showElement(nameInputField)
    hideElement(quitBtn)
    hideElement(anotherCardBtn)
    hideElement(newRoundBtn)
    hideElement(standBtnWrap)
    hideElement(startGameBtn)

    // removes any added classlists to gameboard
    if (gameBoard.classList.contains("blackjack")){
        gameBoard.classList.remove("blackjack")
    }
    if (gameBoard.classList.contains("out")) {
        gameBoard.classList.remove("out")
    }
    // in case user quits while in the midst of choosing ace value
    if (hasAce === true) {
        hideElement(aceBtn1Wrap)
        hideElement(aceBtn2Wrap)
    }
})

// *---- resets game except for player name and chips ----*
newRoundBtn.addEventListener("click", function () {
    resetElements()
    hideElement(anotherCardBtn)
    hideElement(newRoundBtn)
    hideElement(standBtnWrap)

    if (gameBoard.classList.contains("blackjack")) {
        gameBoard.classList.remove("blackjack")
    }

    // if player is coming from a loss
    if (gameBoard.classList.contains("out")) {
        gameBoard.classList.remove("out")
        messageEl.innerHTML = "Place bet before starting another round"
        // prompts user to input chips only
        showElement(formEl)
        hideElement(nameInputField)
    } else {
        // no need to prompt user to input chips [for now]
        messageEl.innerHTML = "Ready?"
        playerEl.innerHTML = `${player.name}: $${player.chips}`
        hideElement(formEl)
        showElement(startGameBtn)
    }
})


// ------------------------------------------------------------------------------------------------------------
// passes ace value to function
aceButton1.addEventListener("click", function () {
    aceReceived (11)
})

aceButton2.addEventListener("click", function () {
    aceReceived (1)
})

// Updates game state and renders it to user interface
function renderGame() {

    // *---- evaluates sum of cards & updates variables  ----*
    if (playerSum <= 20) {
        message = "Would you like another card❔"
    } else if (playerSum === 21) {
        message = "BLACKJACK❗️ You have 21 🏆"
        hasBlackjack = true
    } else {
        message = "Bust! You are out of the game 😢💔"
        isAlive = false
    }

    // *---- updates current cards display on GUI ----*
    currentCardsEl.innerHTML = "Your hand: "
    for (let i = 0; i < player.hand.length; i++) {
        symbol = Math.floor((Math.random() * 4) + 1)
        if (symbol === 1) {
            symbol = "clubs"
        } else if (symbol === 2) {
            symbol = "spades"
        } else if (symbol === 3) {
            symbol = "hearts"
        } else {
            symbol = "diamonds"
        }
        url = fetchURL(symbol, player.hand[i])
        currentCardsEl.innerHTML += `
            <img src="${url}" alt="playing card icon">
            ${player.hand[i]}
        `
    }

    dealersHandEl.innerHTML = `Dealer's hand: ${dealer.hand[0]} X ...`

    // *---- checks if user has blackjack / is over 21 (toggling css classes) ----*
    if (hasBlackjack === true) {
        winner = establishWinner()

        if (winner != null) {
            gameBoard.classList.add("blackjack")
            player.chips = player.chips * 2
            playerEl.innerHTML = `${player.name}: $${player.chips}`
        } else {
            message = "You got blackjack, but so did the dealer"
        }
        showElement(newRoundBtn)
        hideElement(anotherCardBtn)
        hideElement(standBtnWrap)
    }

    if (isAlive === false) {
        gameBoard.classList.add("out")

        player.chips = 0
        playerEl.innerHTML = `${player.name}: $${player.chips}`
        displayDealerHand()
        sumEl.innerHTML = ""

        showElement(newRoundBtn)
        hideElement(anotherCardBtn)
        hideElement(standBtnWrap)
    }

    // *---- updates message display on GUI ----*
    messageEl.innerHTML = message

    // *---- updates sum display on GUI ----*
    sumEl.innerHTML = "Sum: " + playerSum
}

// *-------------- generates new card --------------*
function randomCard() {
    card = Math.floor((Math.random() * 13) + 2)

    if (card > 1 && card < 11) {
        return card
    } else if (card === 11) {
        if (startGameClicked === false) {
            return 11
        } else {
            hasAce = true

            showAceButtons()

            message = "You recieved an ace, count it as 1 or 11❓"
            messageEl.innerHTML = message

            return
        }
     } else {
        return 10
     }
}

// fetches url from deck object
function fetchURL(symbol, number) {
    console.log(`symbol: ${symbol}`)
    console.log(`number: ${number}`)

    if (number != 10) {
        url = deck[symbol][number]
        return url
    } else if (number === 10) {
        index = Math.floor(Math.random() * 4)
        url = deck[symbol][number][index]
        return url
    }
}

// *-------------- appends ace card value to array and updates sum --------------*
function aceReceived(x) {

    player.hand.push(x)
    tarjeta = Math.floor(Math.random() * 11) + 1
    dealer.hand.push(tarjeta)
    
    playerSum += x
    renderGame()

    hideElement(aceBtn1Wrap)
    hideElement(aceBtn2Wrap)
    showElement(standButton)

    if (isAlive === true && hasBlackjack === false) {
        showElement(anotherCardBtn)
    } else {
        hideElement(anotherCardBtn)
    }
}

function showAceButtons() {
    showElement(aceBtn1Wrap)
    showElement(aceBtn2Wrap)
    hideElement(newRoundBtn)
    hideElement(anotherCardBtn)
    hideElement(standButton)
}

function establishWinner() {

    displayDealerHand()

    dealerSum = sumOfArray(dealer.hand)
    dealerSumEl.innerHTML = `Sum: ${dealerSum}`

    if (dealerSum > 21 || playerSum > dealerSum) {
        return "player"
    } else if (playerSum < dealerSum && dealerSum <= 21) {
        return "dealer"
    } else {
        return null
    }
}

function sumOfArray(arr) {
    let count = 0
    for (let i = 0; i < arr.length; i++) {
        count += arr[i]
    }

    return count
}

function displayDealerHand () {
    dealersHandEl.innerHTML = "Dealer's hand: "
        for (let i = 0; i < dealer.hand.length; i++) {
            dealersHandEl.innerHTML += `${dealer.hand[i]} `
        }
}

function showElement(element) {
    element.classList.remove('hide');
}
  
function hideElement(element) {
    element.classList.add('hide');
}

function initilizeGame() {
    playerSum = 0
    hasBlackjack = false
    hasAce = false
    isAlive = true
}

function resetElements() {
    currentCardsEl.innerHTML = ""
    dealersHandEl.innerHTML = ""
    sumEl.innerHTML = ""
    dealerSumEl.innerHTML = ""
    playerSum = 0
    player.hand = []
    dealer.hand = []
    startGameClicked = false
}

function incrementLocalStorage() {
    localStorageChips = localStorageChips + player.chips
    // update value in local storage here
}

function decrementLocalStorage() {
    localStorageChips = localStorageChips + player.chips
    // update value in local storage here
}





// replacement for newRoundBtn.addEventListener
// newRoundBtn.addEventListener("click", function () {
//     resetElements()
    
//     hideElement(anotherCardBtn)
//     hideElement(newRoundBtn)
//     hideElement(nameInputField)
//     hideElement(standBtnWrap)
//     showElement(formEl)

//     if (gameBoard.classList.contains("blackjack")) {
//         gameBoard.classList.remove("blackjack")
//         incrementLocalStorage()
//     }

//     // if player is coming from a loss
//     if (gameBoard.classList.contains("out")) {
//         gameBoard.classList.remove("out")
//     } else {
//         incrementLocalStorage()
//     }

//     messageEl.innerHTML = "Place bet before starting another round"
//     playerEl.innerHTML = `${player.name}: $${player.chips}`  
// })