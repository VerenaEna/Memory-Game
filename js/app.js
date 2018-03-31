/**** All Variables ****/
//variable cards icons
const diamond = '<i class="fa fa-diamond"></i>';
const plane = '<i class="fa fa-paper-plane-o"></i>';
const anchor = '<i class="fa fa-anchor"></i>';
const bolt = '<i class="fa fa-bolt"></i>';
const cube = '<i class="fa fa-cube"></i>';
const leaf = '<i class="fa fa-leaf"></i>';
const bicycle = '<i class="fa fa-bicycle"></i>';
const bomb = '<i class="fa fa-bomb"></i>';
//deck of all cards in game
const deck = document.querySelector('.deck');
// cards array holds all cards
const card = document.getElementsByClassName('card');
let cards = [...card];
console.log(cards);

/**** All Functions ****/
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
  let shuffledCards = shuffle(cards);
  // remove all existing classes from each card on the deck
  for (var i = 0; i < shuffledCards.length; i++){
    deck.innerHTML = '';
    [].forEach.call(shuffledCards, function(item){
      deck.appendChild(item);
    });
    shuffledCards[i].classList.remove('show', 'open', 'match', 'disabled');
  }
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
  let card = cards[i];
  card.addEventListener('click', displayCard);
}
