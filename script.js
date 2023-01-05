// *------- Local varibales -------*
let sum
let dealerSum
let card
let message = ""
let winner

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

let player = {
    name: null,
    chips: null,
    hand: []
}
let dealer = {
    name: "Dealer",
    hand: []
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
    winner = establishWinner()
    if (winner === "player") {
        console.log("player wins - standButton.addevent...")
        player.chips = player.chips * 1.5
        playerEl.innerHTML = `${player.name}: $${player.chips}`
        // prompt GUI to communicate result
        document.getElementById("container").classList.add("blackjack")
    } else if (winner === "dealer") {
        console.log("dealer wins - standButton.addevent...")
        player.chips = 0
        playerEl.innerHTML = `${player.name}: $${player.chips}`
        // prompt GUI to communicate result
        document.getElementById("container").classList.add("out")   
    } else {
        console.log("tie - standButton.addevent...")
        playerEl.innerHTML = `${player.name}: $${player.chips}`
        // prompt GUI to communicate result
    }
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
    messageEl.innerHTML = "Ready?"
    sum = 0
    player.hand = []
    dealer.hand = []
    startGameClicked = false
    playerEl.innerHTML = `${player.name}: $${player.chips}`

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
        message = "Would you like another card?"
    } else if (sum === 21) {
        message = "Hoorah!!! You have BLACKJACK 🏆🫶"
        hasBlackjack = true
    } else {
        message = "You are out of the game! 😢💔"
        isAlive = false
    }

    // *---- updates message display on GUI ----*
    messageEl.innerHTML = message

    // *---- updates current cards display on GUI ----*
    currentCardsEl.innerHTML = "Your hand: "
    for (let i = 0; i < player.hand.length; i++) {
        currentCardsEl.innerHTML += `${player.hand[i]} `
    }

    // *---- updates sum display on GUI ----*
    sumEl.innerHTML = "Sum: " + sum

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
            console.log("You got blackjack, but so did the dealer")
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
}

// *-------------- generates new card --------------*
function randomCard() {

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

    player.hand.push(x)
    tarjeta = Math.floor(Math.random() * 10) + 1
    dealer.hand.push(tarjeta)
    
    sum += x
    renderGame()
    aceBtn11Wrap.classList.add("hide")
    aceBtn1Wrap.classList.add("hide")
    standButton.classList.remove("hide")

    if (isAlive === true) {
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
    anotherCardBtn.classList.add("hide")
    standBtnWrap.classList.add("hide")

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
    console.log(`Dealers hand: ${dealer.hand}`)
}