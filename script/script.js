// *------- Local varibales -------*
let sum
let dealerSum
let message = ""
let winner
let card
let symbol
let url

// *------- Boolean varibales -------*
let startGameClicked = false
let hasAce
let hasBlackjack
let isAlive

// *------- DOM varibales -------*
const formEl = document.getElementById("form-el")

const messageEl = document.getElementById("message-el")
const currentCardsEl = document.getElementById("current-cards-el")
const sumEl = document.getElementById("sum-el")
const dealersHandEl = document.getElementById("dealers-hand-el")
const dealerSumEl = document.getElementById("dealer-sum-el")

const nameInputField = document.getElementById("name-input-field")
const nameInputEl = document.getElementById("name-input-el")
const chipsInputEl = document.getElementById("chips-input-el")

const playerEl = document.getElementById("player-el")

// *------- Buttons -------*
const playBtnWrap = document.getElementById("play-btn-wrap")
const playButton = document.getElementById("play-button")
const submitBtn = document.getElementById("submit-button")
const startGameBtn = document.getElementById("start-game-btn")

const anotherCardBtn = document.getElementById("another-card-btn")
const standBtnWrap = document.getElementById("stand-btn-wrap")
const standButton = document.getElementById("stand-button")
const quitBtn = document.getElementById("quit-btn")

const newRoundBtn = document.getElementById("new-round-btn")

const aceBtn11Wrap = document.getElementById("ace-btn-1-wrap")
const aceButton1 = document.getElementById("ace-btn1")
const aceBtn1Wrap = document.getElementById("ace-btn-2-wrap")
const aceButton2 = document.getElementById("ace-btn2")

// *------- Objects -------*
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

// *-------------- Functions called by buttons --------------*

// *---- Enables user input fields  ----*

playButton.addEventListener("click", function () {

    messageEl.innerHTML = "Feeling lucky?"
    playBtnWrap.classList.remove("play-btn-wrap")
    playButton.classList.add("hide")
    formEl.classList.remove("hide")
})

// *---- Assigns User Inputs to Player Object Keys ----*
submitBtn.addEventListener("click", function () {

    if (nameInputEl.value === "" || chipsInputEl.value === "" || nameInputEl.value === " " || chipsInputEl.value < 10) {
        alert("Please make sure to enter valid name and at least $10")
    } else {
        player.name = nameInputEl.value
        player.chips = chipsInputEl.value

        formEl.classList.add("hide")
        startGameBtn.classList.remove("hide")
        nameInputField.classList.remove("hide")
        messageEl.innerHTML = "Ready to lose?"

        playerEl.innerHTML = `${player.name}: $${player.chips}`
    }
})

// *---- initializes variables  ----*
startGameBtn.addEventListener("click", function () {

    if (startGameClicked === false) {
        sum = 0
        hasBlackjack = false
        hasAce = false
        isAlive = true
        anotherCardBtn.classList.remove("hide")
        quitBtn.classList.remove("hide")
        standBtnWrap.classList.remove("hide")

        for (let i = 0; i < 2; i++) {
            player.hand.push(randomCard())
            dealer.hand.push(randomCard())
            sum += player.hand[i]
        }

        if (sum === 22) {
            player.hand[1] = 1
            sum = 12
        }

        renderGame()
        startGameClicked = true
    } else {
        console.log("startGameBtn cannot execute because (startGameClicked === true)")
    }

    startGameBtn.classList.add("hide")
})

// *---- appends random card to player and dealer arrays ----*
anotherCardBtn.addEventListener("click", function () {

    if (startGameClicked === true && isAlive === true && hasBlackjack === false) {
        newCard = randomCard()

        if (hasAce === true) {
            hasAce = false
            return
        }

        player.hand.push(newCard)
        dealer.hand.push(newCard)
        sum += newCard

        renderGame()
    } else {
        console.log("anotherCardBtn cannot execute because if condition not being met")
    }
})


standButton.addEventListener("click", function () {
    anotherCardBtn.classList.add("hide")
    standBtnWrap.classList.add("hide")
    winner = establishWinner()
    if (winner === "player") {
        message = "You win! 🥳"
        messageEl.innerHTML = message
        player.chips = player.chips * 1.5
        playerEl.innerHTML = `${player.name}: $${player.chips}`
        document.getElementById("container").classList.add("blackjack")
        // newRoundBtn.classList.remove("hide")
    } else if (winner === "dealer") {
        message = "You lose... 😔"
        messageEl.innerHTML = message
        player.chips = 0
        playerEl.innerHTML = `${player.name}: $${player.chips}`
        document.getElementById("container").classList.add("out")   
    } else {
        message = "Tie! 🙅‍♂️ You and dealer have the same hand."
        messageEl.innerHTML = message
        playerEl.innerHTML = `${player.name}: $${player.chips}`
        // newRoundBtn.classList.remove("hide")
    }
    newRoundBtn.classList.remove("hide")
})

quitBtn.addEventListener("click", function () {

    formEl.classList.remove("hide")
    quitBtn.classList.add("hide")

    currentCardsEl.innerHTML = ""
    dealersHandEl.innerHTML = ""
    sumEl.innerHTML = ""
    dealerSumEl.innerHTML = ""
    messageEl.innerHTML = "Want to play a round?"
    sum = 0
    player.hand = []
    dealer.hand = []
    startGameClicked = false
    playerEl.innerHTML = ""
    nameInputEl.value = ""
    chipsInputEl.value = ""

    anotherCardBtn.classList.add("hide")
    newRoundBtn.classList.add("hide")
    standBtnWrap.classList.add("hide")
    startGameBtn.classList.add("hide")
    nameInputField.classList.remove("hide")

    if (hasAce === true) {
        aceBtn11Wrap.classList.add("hide")
        aceBtn1Wrap.classList.add("hide")
    }

    document.getElementById("container").classList.remove("blackjack")
    document.getElementById("container").classList.remove("out")
})

// *---- resets app, updates DOM & variables ----*
newRoundBtn.addEventListener("click", function () {

    currentCardsEl.innerHTML = ""
    dealersHandEl.innerHTML = ""
    sumEl.innerHTML = ""
    dealerSumEl.innerHTML = ""
    messageEl.innerHTML = "Ready?"
    sum = 0
    player.hand = []
    dealer.hand = []
    startGameClicked = false
    playerEl.innerHTML = `${player.name}: $${player.chips}`

    anotherCardBtn.classList.add("hide")
    newRoundBtn.classList.add("hide")


    if (hasBlackjack === true || winner === "player") {
        document.getElementById("container").classList.remove("blackjack")
    }

    if (isAlive === false || winner === "dealer") {
        document.getElementById("container").classList.remove("out")
        messageEl.innerHTML = "You need to place a bet before starting another round"
        formEl.classList.remove("hide")
        nameInputField.classList.add("hide")
    } else {
        formEl.classList.add("hide")
        startGameBtn.classList.remove("hide")
    }

    standBtnWrap.classList.add("hide")
})


// passes ace value to function
aceButton1.addEventListener("click", function () {
    aceReceived (11)
})

aceButton2.addEventListener("click", function () {
    aceReceived (1)
})


// *-------------- DOM manipulation --------------*
function renderGame() {

    // *---- evaluates sum of cards & updates variables  ----*
    if (sum <= 20) {
        message = "Would you like another card❔"
    } else if (sum === 21) {
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
        newRoundBtn.classList.remove("hide")
        anotherCardBtn.classList.add("hide")
        standBtnWrap.classList.add("hide")
        winner = establishWinner()

        if (winner != null) {
            document.getElementById("container").classList.add("blackjack")
            player.chips = player.chips * 2
            playerEl.innerHTML = `${player.name}: $${player.chips}`
        } else {
            message = "You got blackjack, but so did the dealer"
        }
        
    }
    if (isAlive === false) {
        document.getElementById("container").classList.add("out")
        newRoundBtn.classList.remove("hide")
        anotherCardBtn.classList.add("hide")
        standBtnWrap.classList.add("hide")
        player.chips = 0
        playerEl.innerHTML = `${player.name}: $${player.chips}`
        displayDealerHand()
        sumEl.innerHTML = ""
    }

    // *---- updates message display on GUI ----*
    messageEl.innerHTML = message

    // *---- updates sum display on GUI ----*
    sumEl.innerHTML = "Sum: " + sum
}

// *-------------- generates new card --------------*
function randomCard() {
    
    if (player.chips > 10) {
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
    } else {
        alert("Place bet first")
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
    tarjeta = Math.floor(Math.random() * 10) + 1
    dealer.hand.push(tarjeta)
    
    sum += x
    renderGame()

    aceBtn11Wrap.classList.add("hide")
    aceBtn1Wrap.classList.add("hide")
    standButton.classList.remove("hide")

    if (isAlive === true && hasBlackjack === false) {
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
    standButton.classList.add("hide")
}


function establishWinner() {

    displayDealerHand()

    dealerSum = sumOfArray(dealer.hand)
    dealerSumEl.innerHTML = `Sum: ${dealerSum}`

    if (dealerSum > 21 || sum > dealerSum) {
        return "player"
    } else if (sum < dealerSum && dealerSum <= 21) {
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