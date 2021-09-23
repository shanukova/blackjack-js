// Step 1: Decalare variables for deck and dealer and player hands
const SUITS = ["♠", "♣", "♥", "♦"];
const VALUES = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K"
]

var dealerHand = [];
var playerHand = [];

// Step 2: Create dec - ordered array of objects
var getDeck = () => {
  let deck = [];
  for (let i = 0; i < SUITS.length; i++) {
    for (let j = 0; j < VALUES.length; j++) {
      let card = { value: VALUES[j], suit: SUITS[i] };
      deck.push(card);
    }
  }
  return deck;
}

var newDeck = getDeck();
