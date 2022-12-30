# Blackjack-Game
 Web app blackjack game.


# Build a Blackjack Game

This is a tutorial project [Section 4: Build a Blackjack Game](https://scrimba.com/learn/learnjavascript/lets-build-a-blackjack-game-coa954d1fb213d2a9d5a1c8ab). Scrimba classes help you reinforce key/fundamental programming concepts by giving you projects to build and work on continuously.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Concepts reinforced](#concepts-reinforced)
  - [Continued development](#continued-development)

## Overview

### The Project

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Play blackjack against the dealer

### Links

- Live Site URL: https://melodious-custard-422181.netlify.app

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Javascript

### Concepts reinforced

- arrays
- objects
- booleans
- if else statements
- comparison and logical operators
- for loops
- math object
- return statements in functions

### Continued development

Future Additions / improvements:

- Add button that allows user to stay and compare hand to dealers hand
    - this button runs a function that does the following
    - adds random cards to the dealers hand (dealerHand[])
    - Compare sum of dealers array to sum of players array
    - prompt user depending on their success (win or loss)

- Add betting component to the game (double down, split, etc)
    - A button that changes manipulates player.chips and renders it on screen
    - A cashout button that displays when isAlive is false or hasBlackjack is true
