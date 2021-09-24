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

// Step 3: Get random number from deck and remove it
var generateRandomCard = () => {
  let randomIndex = Math.floor(Math.random() * newDeck.length);
  let card = newDeck[randomIndex];
  newDeck.splice(randomIndex, 1);
  return card;
}

// Step 4: Count hand value by applying Blackjack rules
var countHand = (hand) => {
  let sum = 0;
  let aces = 0;
  const JKQ = "JKQ";
  for (let i = 0; i < hand.length; i++) {
    var val = hand[i].value;
    if (JKQ.includes(val)) {
      sum += 10;
    } else if (val == "A") {
      sum += 1;
      aces++;
    } else {
      sum += Number(val);
    }
  }
  if ((aces >= 1) && (sum <= 11)) {
    sum += 10;
  }
  return sum;
}

// Step 5: Add one card to hand, keep it there, and show current score
var addCard = (hand) => {
  let newLi = document.createElement("li");
  let cards = document.getElementById(hand).getElementsByTagName("ul")[0];
  cards.appendChild(newLi);
  let card = generateRandomCard(); // object
  newLi.innerHTML = (card.value + card.suit); // string
  if (hand == "dealer") {
    dealerHand.push(card);
  } else {
    playerHand.push(card);
  }
  document.getElementById("dealer-score").innerHTML = countHand(dealerHand);
  document.getElementById("player-score").innerHTML = countHand(playerHand);
}

// Step 6: Create hit fucntion and stand function to start over
var hit = () => {
  addCard("player");
  if (countHand(playerHand) > 21) {
    finishGame("You bust!");
  }
}

var stand = () => {
  while (countHand(dealerHand) < 17) {
    addCard("dealer");
  }
  if (countHand(dealerHand) > 21) {
    finishGame("You won!");
  } else if (countHand(dealerHand) == countHand(playerHand)) {
    finishGame("Draw!");
  } else if (countHand(dealerHand) > countHand(playerHand)) {
    finishGame("You lost!");
  } else if (countHand(dealerHand) < countHand(playerHand)) {
    finishGame("You won!");
  }
}

// Step 7: Create letsPlay function to set 2 cards for players, activate game section and remove let's-play btn
var letsPlay = () => {
  addCard("dealer");
  addCard("dealer");
  addCard("player");
  addCard("player");
  document.getElementById("game").classList.add("active");
  document.getElementById("start").style.display = "none";
  if ((countHand(playerHand) == 21) && (countHand(dealerHand) == 21)) {
    finishGame("Draw!");
  } else if (countHand(dealerHand) == 21) {
    finishGame("You lost!");
  } else if (countHand(playerHand) == 21) {
    finishGame("You won!");
  }
}

// Step 8: Create finishGame function to set result, activate start section, remove game section, emty hands, deck, all <li>, "txt-score"
var finishGame = (result) => {
  document.getElementById("txt-score").innerHTML = result;
  setTimeout(function(){
    document.getElementById("game").classList.remove("active");
    document.getElementById("start").style.display = "block";
    dealerHand = [];
    playerHand = [];
    newDeck = getDeck();
    document.getElementById("txt-score").innerHTML = "";
    let allLi = document.querySelectorAll("li");
    for (let i = allLi.length - 1; i >= 0; --i) {
    allLi[i].remove();
    }
  }, 2000);
}
