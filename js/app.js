/**** All Variables ****/

// cards array holds all cards
let card = document.getElementsByClassName('card');
let cards = [...card];
console.log(cards);
// define move Variable
let moves = 0;
let counter = document.getElementsByClassName('moves');
// define star icon Variable
const stars = document.querySelectorAll('.fa-star');
//define for timer function
let second = 0;
let minute = 0;
let hour = 0;
let timer = document.querySelector('.timer');
//deck of all cards in game
const deck = document.getElementById('card-deck');
//variable of matchedCards
let matchedCard = document.getElementsByClassName('match');
//array opend cards
let openedCards = [];
// define modal Variable
const modal = document.getElementById('popup1');
//define stars list variable
const starsList = document.querySelectorAll('.stars li');
//define close icon
const closeIcon = document.querySelector('.close');



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
document.body.onload = startGame();

//function start game will shuffle and display each card
// click on restart button - reset star rating, move counting, deck visibility
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

 var displayCard = function (){
   this.classList.toggle('open');
   this.classList.toggle('show');
   this.classList.toggle('disabled');
 }

// add/push opened cards to OpenedCards array and
function cardOpen(){
  openedCards.push(this);
  let len = openedCards.length;
  //check if 2 cards match/unmatch
  if(len === 2){
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

//if cards don't match add classList unmatched, set cards disable
function unmatched(){
  openedCards[0].classList.add('unmatched');
  openedCards[1].classList.add('unmatched');
  disable();
  // remove all classLists and enable cards and send new list
  setTimeout(function(){
    openedCards[0].classList.remove('show', 'open', 'no-event', 'unmatched');
    openedCards[1].classList.remove('show', 'open', 'no-event', 'unmatched');
    enable();
    openedCards = [];
  },1000);
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

// count player move and...
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
    for(i = 0; i < 3; i++){ // we have 3 stars
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
// define for startTimer
var interval;
// timer function
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
// winner modal if player found all pairs
function winner(){
  if(matchedCard.length == 16){ // if player found 16 pairs
    clearInterval(interval);
    finalTime = timer.innerHTML; //show final Time
    // add class to winner modal
    modal.classList.add('show');// to show on page
    //define star rating Variable
    const starRating = document.querySelector('.stars').innerHTML;
    //show move, rating and time on modal
    document.getElementById('finalMove').innerHTML = moves;
    document.getElementById('starRating').innerHTML = starRating;
    document.getElementById('totalTime').innerHTML = finalTime;
    //TODO: close icon on modal
    closeModal();
  };
}

function playAgain(){
  modal.classList.remove('show');
  startGame();
}

function closeModal(){
  closeIcon.addEventListener('click',function(event){
    modal.classList.remove('show');
    startGame();
  });
}

//loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
  card = cards[i];
  card.addEventListener('click', displayCard);
  card.addEventListener('click', cardOpen);
  card.addEventListener('click', winner);
};
