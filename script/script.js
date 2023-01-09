// game state variables
// -------------------------
let playerSum
let dealerSum
let message = ""
let winner

let cardValue
let cardSuit
let url
let payout

let gameStarted = false
let hasAce
let hasBlackjack
let isAlive
let doubledDown

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
    0: { 
        1: "../assets/deck/aceclubs.png",
        2: "../assets/deck/2clubs.png",
        3: "../assets/deck/3clubs.png",
        4: "../assets/deck/4clubs.png",
        5: "../assets/deck/5clubs.png",
        6: "../assets/deck/6clubs.png",
        7: "../assets/deck/7clubs.png",
        8: "../assets/deck/8clubs.png",
        9: "../assets/deck/9clubs.png",
        10: ["../assets/deck/10clubs.png", "../assets/deck/jackclubs.png", "../assets/deck/queenclubs.png", "../assets/deck/kingclubs.png"],
        11: "../assets/deck/aceclubs.png",
    },
    1: {
        1: "../assets/deck/acespades.png",
        2: "../assets/deck/2spades.png",
        3: "../assets/deck/3spades.png",
        4: "../assets/deck/4spades.png",
        5: "../assets/deck/5spades.png",
        6: "../assets/deck/6spades.png",
        7: "../assets/deck/7spades.png",
        8: "../assets/deck/8spades.png",
        9: "../assets/deck/9spades.png",
        10: ["../assets/deck/10spades.png", "../assets/deck/jackspades.png", "../assets/deck/queenspades.png", "../assets/deck/kingspades.png"],
        11: "../assets/deck/acespades.png",
    },
    2: {
        1: "../assets/deck/acehearts.png",
        2: "../assets/deck/2hearts.png",
        3: "../assets/deck/3hearts.png",
        4: "../assets/deck/4hearts.png",
        5: "../assets/deck/5hearts.png",
        6: "../assets/deck/6hearts.png",
        7: "../assets/deck/7hearts.png",
        8: "../assets/deck/8hearts.png",
        9: "../assets/deck/9hearts.png",
        10: ["../assets/deck/10hearts.png", "../assets/deck/jackhearts.png", "../assets/deck/queenhearts.png", "../assets/deck/kinghearts.png"],
        11: "../assets/deck/acehearts.png",
    },
    3: {
        1: "../assets/deck/acediamonds.png",
        2: "../assets/deck/2diamonds.png",
        3: "../assets/deck/3diamonds.png",
        4: "../assets/deck/4diamonds.png",
        5: "../assets/deck/5diamonds.png",
        6: "../assets/deck/6diamonds.png",
        7: "../assets/deck/7diamonds.png",
        8: "../assets/deck/8diamonds.png",
        9: "../assets/deck/9diamonds.png",
        10: ["../assets/deck/10diamonds.png", "../assets/deck/jackdiamonds.png", "../assets/deck/queendiamonds.png", "../assets/deck/kingdiamonds.png"],
        11: "../assets/deck/acediamonds.png",
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
const doubleDownBtn = document.getElementById("double-down-btn")

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

        hideElement(formEl)
        showElement(startGameBtn)
        showElement(nameInputField)

        messageEl.innerHTML = "Ready to lose?"
        playerEl.innerHTML = `
            ${player.name}
            <br>
            Chips: $${player.chips}
        `
    }
})

// draws 2 cards each for player & dealer, calls renderGame()
startGameBtn.addEventListener("click", function () {
    // if game has just started, proceed with function
    if (gameStarted === false) {
        initilizeGame()
        showElement(anotherCardBtn)
        showElement(standBtnWrap)
        showElement(quitBtn)
        showElement(doubleDownBtn)

        // Loop twice and push random cards to player's and dealer's hands
        for (let i = 0; i < 2; i++) {
            player.hand.push(getRandomCard())
            dealer.hand.push(getRandomCard())
            playerSum += player.hand[i]
        }
        // If player receives two aces, draw 1 new card for player's hand and reset playerSum
        if (playerSum === 22) {
            player.hand[0] = getRandomCard()
            playerSum = 0
            for (let i = 0; i < 2; i++) {
                playerSum += player.hand[i]
            }
        }
        renderGame()
        gameStarted = true
    } else {
        console.log("startGameBtn cannot execute because game has already started")
    }
    hideElement(startGameBtn)
})

// draws 1 card each for player/dealer, calls renderGame()
anotherCardBtn.addEventListener("click", function () {  
    // if game is ongoing proceed with function
    if (gameStarted && isAlive && hasBlackjack === false) {
        // draw card for player
        let drawnCard = getRandomCard()

        // if drawnCard is an ace, stop program flow so user can decide to the value of ace. aceReceived(aceValue) takes over
        if (hasAce === true) {
            hasAce = false
            return
        } else {
            dealer.hand.push(getRandomCard())
            player.hand.push(drawnCard)
            playerSum += drawnCard
            renderGame()
        }
    } else {
        console.log("anotherCardBtn cannot execute because game ended already")
    }

    if (doubledDown === true) {
        stand()
    } else {
        hideElement(doubleDownBtn)
    }
})

standButton.addEventListener("click", function () {
    hideElement(doubleDownBtn)
    stand()
})

// resets game
quitBtn.addEventListener("click", function () {
    resetElements()

    playerEl.innerHTML = ""
    messageEl.innerHTML = "Want to play a round?"
    nameInputEl.value = ""
    chipsInputEl.value = ""

    showElement(formEl)
    showElement(nameInputField)
    hideElement(quitBtn)
    hideElement(anotherCardBtn)
    hideElement(newRoundBtn)
    hideElement(standBtnWrap)
    hideElement(startGameBtn)
    hideElement(doubleDownBtn)

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
    hideElement(doubleDownBtn)
    hideElement(quitBtn)

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
        playerEl.innerHTML = `
            ${player.name}
            <br>
            Chips: $${player.chips}
        `
        hideElement(formEl)
        showElement(startGameBtn)
    }
})

// passes ace value to function
aceButton1.addEventListener("click", function () {
    aceReceived (11)
})
aceButton2.addEventListener("click", function () {
    aceReceived (1)
})

// Updates game state & renders to user interface
function renderGame() {
    // evaluates player hand (sum) & updates message / game variables (message, hasBlackjack, isAlive)
    updateGameVariables()
    // fetches & renders card icon from deck object
    currentCardsEl.innerHTML = "Your hand: "
    for (let i = 0; i < player.hand.length; i++) {
        cardSuit = Math.floor((Math.random() * 4))
        url = fetchURL(cardSuit, player.hand[i])
        currentCardsEl.innerHTML += `
            <img src="${url}" alt="playing card icon">
            ${player.hand[i]}
        `
    }
    dealersHandEl.innerHTML = `Dealer's hand: ${dealer.hand[0]} X ...`
    // checks hasBlackjack and isAlive & renders DOM if game has come to an end
    checkGameStatus()

    // renders message & sum of players hand
    messageEl.innerHTML = message
    sumEl.innerHTML = "Sum: " + playerSum
}

// draws new card
function getRandomCard() {
    cardValue = Math.floor((Math.random() * 13) + 2)

    if (cardValue > 1 && cardValue < 11) {
        return cardValue
    } else if (cardValue === 11) {
        if (gameStarted === false) {
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
function fetchURL(cardSuit, number) {
    if (number != 10) {
        url = deck[cardSuit][number]
        return url
    } else if (number === 10) {
        index = Math.floor(Math.random() * 4)
        url = deck[cardSuit][number][index]
        return url
    }
}

// appends aceValue to player array and updates sum
function aceReceived(aceValue) {

    player.hand.push(aceValue)
    dealer.hand.push(Math.floor(Math.random() * 11) + 1)
    playerSum += aceValue

    renderGame()

    hideElement(aceBtn1Wrap)
    hideElement(aceBtn2Wrap)
    showElement(standBtnWrap)

    if (isAlive === true && hasBlackjack === false && doubledDown === false) {
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
    hideElement(standBtnWrap)
}

// determines result of game after player stands
function establishWinner() {
    displayDealerHand()

    dealerSum = sumOfArray(dealer.hand)
    dealerSumEl.innerHTML = `Sum: ${dealerSum}`

    if (playerSum > 21 || playerSum < dealerSum && dealerSum <= 21) {
        return "dealer"
    } else if (dealerSum > 21 || playerSum > dealerSum) {
        return "player"
    }else {
        return null
    }
}

// calculates sum of any given array
function sumOfArray(arr) {
    let count = 0
    for (let i = 0; i < arr.length; i++) {
        count += arr[i]
    }
    return count
}

// shows dealers full hand on UI
function displayDealerHand () {
    console.log(dealer.hand)
    dealersHandEl.innerHTML = "Dealer's hand: "
        for (let i = 0; i < dealer.hand.length; i++) {
            dealersHandEl.innerHTML += `${dealer.hand[i]} `
        }
}

// shows any given element on UI
function showElement(element) {
    element.classList.remove('hide');
}

// hides any given element on UI
function hideElement(element) {
    element.classList.add('hide');
}

// initializes game state variables
function initilizeGame() {
    playerSum = 0
    hasBlackjack = false
    hasAce = false
    isAlive = true
    doubledDown = false
    payout = 1.5
}

// updates game state variables
function updateGameVariables() {
    if (playerSum <= 20) {
        message = "Would you like another card❔"
    } else if (playerSum === 21) {
        message = "BLACKJACK❗️ You have 21 🏆"
        hasBlackjack = true
    } else {
        message = "Bust! You are out of the game 😢💔"
        isAlive = false
    }
}

// resets game state variables
function resetElements() {
    currentCardsEl.innerHTML = ""
    dealersHandEl.innerHTML = ""
    sumEl.innerHTML = ""
    dealerSumEl.innerHTML = ""
    playerSum = 0
    player.hand = []
    dealer.hand = []
    gameStarted = false
}

// checks game status
function checkGameStatus() {
    if (hasBlackjack === true) {
        hideElement (doubleDownBtn)
        winner = establishWinner()

        if (winner != null) {
            payout = 2
            gameBoard.classList.add("blackjack")
            player.chips = player.chips * payout
            playerEl.innerHTML = `
                ${player.name}
                <br>
                Chips: $${player.chips}
            `
        } else {
            message = "You got blackjack, but so did the dealer"
        }
        displayDealerHand()
        showElement(newRoundBtn)
        hideElement(anotherCardBtn)
        hideElement(standBtnWrap)
    }
    if (isAlive === false) {
        gameBoard.classList.add("out")

        player.chips = 0
        playerEl.innerHTML = `
            ${player.name}
            <br>
            Chips: $${player.chips}
        `
        displayDealerHand()
        sumEl.innerHTML = ""

        showElement(newRoundBtn)
        hideElement(anotherCardBtn)
        hideElement(standBtnWrap)
    }
}

// allows player to double bet in exchange for one more card & increased payout
doubleDownBtn.addEventListener("click", () => {
    payout = 2
    player.chips = player.chips * 2
    playerEl.innerHTML = `
        ${player.name}
        <br>
        Chips: $${player.chips}
    `

    hideElement(doubleDownBtn)
    hideElement(standBtnWrap)
    doubledDown = true
})

// stop receving additional cards & compare hand to dealer's
function stand () {
    hideElement(anotherCardBtn)
    hideElement(standBtnWrap)

    winner = establishWinner()
    if (winner === "player") {
        message = "You win! 🥳"
        player.chips = player.chips * payout
        gameBoard.classList.add("blackjack")
    } else if (winner === "dealer") {
        message = "You lose... 😔"
        player.chips = 0
        gameBoard.classList.add("out")   
    } else {
        message = "Tie! 🙅‍♂️ You and dealer have the same hand."
    }
    messageEl.innerHTML = message
    // playerEl.innerHTML = `${player.name}: $${player.chips}`
    playerEl.innerHTML = `
        ${player.name}
        <br>
        Chips: $${player.chips}
    `
    showElement(newRoundBtn)
}