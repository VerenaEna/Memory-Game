/*
 **** All Variables ****
*/
// cards array holds all cards
const card = document.getElementsByClassName('card');
let cards = [...card];
console.log(cards);

// define move Variable
let moves = 0;
const counter = document.getElementsByClassName('moves');

// define star icon Variable
const stars = document.querySelectorAll('.fa-star');

//define for timer function
let second = 0;
let minute = 0;
let hour = 0;
const timer = document.querySelector('.timer');

// define for startTimer
let interval;

//deck of all cards in game
const deck = document.getElementById('card-deck');

//variable of matchedCards
const matchedCard = document.getElementsByClassName('match');

//array opend cards
let openedCards = [];

// define modal Variable
const modal = document.getElementById('popup1');

//define stars list variable
const starsList = document.querySelectorAll('.stars li');

//define close icon
const closeIcon = document.querySelector('.close');


/*
 **** All Functions ***
*/
// @description: shuffles cards (provided)
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
// @description: start game when site page is load/refreshed
document.body.onload = startGame();

// @description: function start game will shuffle and display each card
// @description: click on restart button - reset star rating, move counting, deck visibility
function startGame(){
  // shuffle this deck
 cards = shuffle(cards);
  // remove all default classes from each card on the deck
  for (var i = 0; i < cards.length; i++){
    deck.innerHTML = ''; // empty deck
    [].forEach.call(cards, function(item){
      deck.appendChild(item);
    });
    cards[i].classList.remove('show', 'open', 'match', 'disabled');
  }
  // set/reset star rating
  for (var i = 0; i < stars.length; i++){
    stars[i].style.visibility = "visible";
  }
  // reset moves
  moves = 0;
  counter.innerHTML = moves;
  // reset timer and show when page load/reload
  second = 0;
  minute = 0;
  timer.innerHTML = minute + ' min ' + second + ' sec';
  clearInterval(interval);
}
// @description: toggles classes to display cards
function displayCard(){
   this.classList.toggle('open');
   this.classList.toggle('show');
   this.classList.toggle('disabled');
 }

// @description: add/push opened cards to OpenedCards array and
function cardOpen(){
  openedCards.push(this);
  const length = openedCards.length;
  //check if 2 cards with their type match/unmatch
  if(length === 2){
    moveCounter();
    if(openedCards[0].type === openedCards[1].type){
      matched();
    } else {
      unmatched();
    }
  }
};

//if cards match add classLists and remove others
function matched(){
  openedCards[0].classList.add('match', 'disabled');
  openedCards[1].classList.add('match', 'disabled');
  openedCards[0].classList.remove('show', 'open', 'no-event');
  openedCards[1].classList.remove('show', 'open', 'no-event');
  openedCards = [];
}

//if cards don't match set unmatched, set cards disable to reclick
function unmatched(){
  openedCards[0].classList.add('unmatched');
  openedCards[1].classList.add('unmatched');
  disable();
  // remove all classLists to get backside and enable cards to click
  setTimeout(function(){
    openedCards[0].classList.remove('show', 'open', 'no-event', 'unmatched');
    openedCards[1].classList.remove('show', 'open', 'no-event', 'unmatched');
    enable();
    openedCards = [];
  }, 1000);
}

//disable temporarly cards
function disable(){
  Array.prototype.filter.call(cards, function(card){
    card.classList.add('disabled');
  });
}

//enable cards to click and disable matched OpenedCards to click
function enable(){
  Array.prototype.filter.call(cards, function(card){
    card.classList.remove('disabled');
    for(var i = 0; i < matchedCard.length; i++){
      matchedCard[i].classList.add('disabled');
    }
  });
}

// @description: count player move and...
function moveCounter(){
  moves++;
  counter.innerHTML = moves;
  //start timer on first click
  if(moves == 1){
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  }
//...set visibility of stars based on each move
  if (moves > 20 && moves < 30){
    for(i = 0; i < 3; i++){ // for loop bcs we have 3 stars and irrate each
      if(i > 1){ // if 2 is true
        stars[i].style.visibility = "collapse";
      }
    }
  }
  else if(moves > 31){
    for(i = 0; i < 3; i++){
      if(i > 0){
        stars[i].style.visibility = "collapse";
      }
    }
  }
}

// @description: timer function to show the timer starts: 0 min 0 sec
function startTimer(){
  interval = setInterval(function(){
    timer.innerHTML = minute + ' min ' + second + ' sec ';
    second++;
    if(second == 60){
      minute++;
      second = 0;
    }
    if(minute == 60){
      hour++;
      minute = 0;
    }
  }, 1000);
}

// @description: winner modal if player found all 16 pairs
function winner(){
  if(matchedCard.length == 16){
    clearInterval(interval);
    finalTime = timer.innerHTML; //show final Time on modal
    // add class to winner modal
    modal.classList.add('show');// to show on page
    //define star rating Variable
    const starRating = document.querySelector('.stars').innerHTML;
    //show move, star rating and time on modal
    document.getElementById('finalMove').innerHTML = moves;
    document.getElementById('starRating').innerHTML = starRating;
    document.getElementById('totalTime').innerHTML = finalTime;
    //close icon
    closeModal();
  };
}
// @description: click on play Again button starts the function - removes the winner modal and restarts the game
function playAgain(){
  modal.classList.remove('show');
  startGame();
}
// @description: click on close icon starts the function - removes the winner modal and restart the game
function closeModal(){
  closeIcon.addEventListener('click',function(event){
    modal.classList.remove('show');
    startGame();
  });
}

//@description: card loop to have event listeners to each card
for (var i = 0; i < cards.length; i++){
  const card = cards[i];
  card.addEventListener('click', displayCard);
  card.addEventListener('click', cardOpen);
  card.addEventListener('click', winner);
};
