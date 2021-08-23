const score = document.querySelector('.score');
const startButton = document.querySelector('.start-button');
const lowerButton = document.querySelector('.lower-button');
const higherButton = document.querySelector('.higher-button');
const gameButtonsContainer = document.querySelector('.game-buttons-container');
const cardsContainer = document.querySelector('.cards-container');
const modalCloseButton = document.querySelector('.modal-close-button');
const lostGameModal = document.querySelector('.lost-game-modal');

// HEARTS , DIAMONDS, CLUBS, SPADES
const suits = ['\u2665','\u2666','\u2663','\u2660'];
const cardRanks = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];

let scoreValue = 0;
let rankCompareArr = [];
let deck = [];
let lockStartButton = false;
let lockHighLowButton = true;

const startGame = () => {
    if (lockStartButton) {
        return;
    }
    lockStartButton = true;
    lockHighLowButton = false;
    createNewCard(); 
}

const guessHigher = () => {
    if (lockHighLowButton) {
        return
    }
    
    createNewCard(); 
    higherGuessResult();
    clearBoard();
}

const guessLower = () => {
    if (lockHighLowButton) {
        return
    }

    createNewCard(); 
    lowerGuessResult();
    clearBoard();
}

const findRankIndex = () => {
    const firstIndex = cardRanks.indexOf(rankCompareArr[0]);
    const secondIndex = cardRanks.indexOf(rankCompareArr[1]);

    return {
        firstIndex,
        secondIndex
    }
}

const higherGuessResult = () => {
    if (findRankIndex().firstIndex < findRankIndex().secondIndex){
        incrementsScore()
    }
    else {
        lostGame();
    }

    rankCompareArr.shift();
}

const lowerGuessResult = () => {
    if (findRankIndex().firstIndex > findRankIndex().secondIndex) {
        incrementsScore()
    }
    else {
        lostGame();
    }

    rankCompareArr.shift();
}

const incrementsScore = () => {
    scoreValue += 1;
    score.textContent = scoreValue;
}

const lostGame = () => {
    lostGameModal.classList.remove('modal-off');
    lostGameModal.classList.add('modal-on');
    lockHighLowButton = true;
}

const clearBoard = () => {
    if (deck.length === 8) {
        for (let i = deck.length; i > 2 ; i--) {
            deck[0].remove();
            deck.shift();
        }   
    }
}

const resetGame = () => {
    for (let i in deck) {
        deck[i].remove();
    }

    scoreValue = 0;
    score.textContent = scoreValue;
    rankCompareArr = [];
    deck = [];

    lockStartButton = false;

    lostGameModal.classList.remove('modal-on');
    lostGameModal.classList.add('modal-off');   
}

class Card {
    constructor(rank, suit) {
        this.rank = rank,
        this.suit = suit
    }
}

const generateRandomCard = () => {
    for (let i = 0; i < 1000; i++) {
        const randomRank = Math.floor(Math.random() * 13);
        const randomSuit = Math.floor(Math.random() * 4);

        if (rankCompareArr[0] !== cardRanks[randomRank]) {
            rankCompareArr.push(cardRanks[randomRank]);
            return new Card(cardRanks[randomRank], suits[randomSuit]);
        }
    }
}

const suitColor = (cardValue, cardTop, cardBottom) => {
    if (cardValue.suit === '\u2665' || cardValue.suit === '\u2666') {
        cardTop.style.color = 'red';
        cardBottom.style.color = 'red';
    }
}

const createNewCard = () => {
    const cardValue = generateRandomCard();

    const newCard = document.createElement('div');
    const cardTop = document.createElement('div');
    const cardBottom = document.createElement('div');

    newCard.classList.add('card');
    cardTop.classList.add('card-top');
    cardBottom.classList.add('card-bottom');

    suitColor(cardValue, cardTop, cardBottom);

    cardTop.textContent = `${cardValue.rank}${cardValue.suit}`
    cardBottom.textContent = `${cardValue.rank}\n${cardValue.suit}`

    deck.push(newCard);
    cardsContainer.appendChild(newCard);
    newCard.appendChild(cardTop);
    newCard.appendChild(cardBottom);

    return newCard
}


startButton.addEventListener('click', startGame);
higherButton.addEventListener('click', guessHigher);
lowerButton.addEventListener('click', guessLower);
modalCloseButton.addEventListener('click', resetGame);



