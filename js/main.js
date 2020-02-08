/*----- constants -----*/
const cards = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"];


/*----- app's state (variables) -----*/
let p1Cards = [];
let p2Cards = [];
let p1Flipped = [];
let p2Flipped = [];


/*----- cached element references -----*/
const p1deck = document.getElementById('p1deck');
const p2deck = document.getElementById('p2deck');
const p1flip = document.getElementById('p1flip');
const p2flip = document.getElementById('p2flip');
const dealButton = document.getElementById('deal-button');
const playButton = document.getElementById('play-button');


/*----- event listeners -----*/
dealButton.addEventListener('click', dealCards);
playButton.addEventListener('click', playCards);


/*----- functions -----*/
function shuffle() {
    let idx = cards.length, temp, rndIdx;
    while (0 !== idx) {
      rndIdx = Math.floor(Math.random() * idx);
      idx -= 1;
      temp = cards[idx];
      cards[idx] = cards[rndIdx];
      cards[rndIdx] = temp;
    }
};

function dealCards() {
    shuffle();
    if (cards.length) {
        for (let i = 0; i < 26; i++) {
            p1Dealt = cards.splice(0, 1);
            p1Cards.push(p1Dealt[0]);
        }
        for (let i = 0; i < 26; i++) {
            p2Dealt = cards.splice(0, 1);
            p2Cards.push(p2Dealt[0]);
        }
    }
    p1deck.classList.add('back-blue', 'shadow-medium');
    p2deck.classList.add('back-blue', 'shadow-medium');
    render();
};

function playCards() {
    if (p1Cards.length) {
        p1RemovedCard = p1Flipped;
        p1Flipped = p1Cards.splice(0, 1);
        p1Cards.push(p1Flipped[0]);
        p1flip.classList.replace('outline', p1Flipped);
    }
    if (p2Cards.length) {
        p2RemovedCard = p2Flipped;
        p2Flipped = p2Cards.splice(0, 1);
        p2Cards.push(p2Flipped[0]);
        p2flip.classList.replace('outline', p2Flipped);
    }
    render();
};

function render() {
    // Player 1 card shading
    if (p1Cards.length === 0) {
        p1deck.classList.replace('back-blue', 'outline');
    }
    if (p1Cards.length > 13) {
        p1deck.classList.replace('outline', 'shadow-light');
    }
    if (p1Cards.length >= 26) {
        p1deck.classList.replace('shadow-light', 'shadow-medium');
    }
    if (p1Cards.length > 39) {
        p1deck.classList.replace('shadow-medium', 'shadow-dark');
    }
    if (p1Cards.length > 51) {
        p1deck.classList.replace('shadow-medium', 'shadow-full');
    }
    // Player 2 card shading
    if (p2Cards.length === 0) {
        p2deck.classList.replace('back-blue', 'outline');
    }
    if (p2Cards.length > 13) {
        p2deck.classList.replace('outline', 'shadow-light');
    }
    if (p2Cards.length >= 26) {
        p2deck.classList.replace('shadow-light', 'shadow-medium');
    }
    if (p2Cards.length > 39) {
        p2deck.classList.replace('shadow-medium', 'shadow-dark');
    }
    if (p2Cards.length > 51) {
        p2deck.classList.replace('shadow-medium', 'shadow-full');
    }
};