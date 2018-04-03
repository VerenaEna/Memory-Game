/**** All Variables ****/

// cards array holds all cards
let card = document.getElementsByClassName('card');
let cards = [...card];
console.log(cards);
//deck of all cards in game
const deck = document.getElementById('deck');
//variable of matchedCards
let matchedCard = document.getElementsByClassName('match');
//array or opend opend cards
let openedCards = [];


/**** All Functions ****/

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//shuffles cards when site page is refreshed/load
window.onload = startGame();

//start game function will shuffle and display each card
function startGame(){
  // shuffle this deck
 cards = shuffle(cards);
  // remove all existing classes from each card on the deck
  for (var i = 0; i < cards.length; i++){
    deck.innerHTML = '';
    [].forEach.call(cards, function(item){
      deck.appendChild(item);
    });
    cards[i].classList.remove('show', 'open', 'match', 'disabled');
  }
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 var displayCard = function (){
   this.classList.toggle('open');
   this.classList.toggle('show');
   this.classList.toggle('disabled');
 }

//add opened cards to OpenedCards array and
function cardOpen(){
  openedCards.push(this);
  let len = openedCards.length;
  //check if 2 cards match/unmatch
  if(len === 2){
    if(openedCards[0].type === openedCards[1].type){
      matched();
    } else {
      unmatched();
    }
  }
};

//if cards match add classList and remove others
function matched(){
  openedCards[0].classList.add('match', 'disabled');
  openedCards[1].classList.add('match', 'disabled');
  openedCards[0].classList.remove('show', 'open', 'no-event');
  openedCards[1].classList.remove('show', 'open', 'no-event');
  openedCards = [];
}

//if cards don't match
function unmatched(){
  openedCards[0].classList.add('unmatched');
  openedCards[1].classList.add('unmatched');
  disable();
  setTimeout(function(){
    openedCards[0].classList.remove('show', 'open', 'no-event', 'unmatched');
    openedCards[1].classList.remove('show', 'open', 'no-event', 'unmatched');
    enable();
    openedCards = [];
  },1100);
}

//disable temporarly cards
function disable(){
  Array.prototype.filter.call(cards, function(card){
    card.classList.add('disabled');
  });
}

//enable cards and disable matched OpenedCards
function enable(){
  Array.prototype.filter.call(cards, function(card){
    card.classList.remove('disabled');
    for(var i = 0; i < matchedCard.length; i++){
      matchedCard[i].classList.add('disabled');
    }
  });
}

/**** Event Listener ****/
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
  card = cards[i];
  card.addEventListener('click', displayCard);
  card.addEventListener('click', cardOpen);
};
