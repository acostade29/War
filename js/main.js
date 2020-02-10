/*----- constants -----*/
const cards = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"];


/*----- app's state (variables) -----*/
let p1Cards = [];
let p2Cards = [];
let p1Flipped = [];
let p2Flipped = [];
let p1War = [];
let p2War = [];
let p1Burned = [];
let p2Burned = [];


/*----- cached element references -----*/
const p1deck = document.getElementById('p1deck');
const p2deck = document.getElementById('p2deck');
const p1flip = document.getElementById('p1flip');
const p2flip = document.getElementById('p2flip');
const p1warflip = document.getElementById('p1warflip');
const p2warflip = document.getElementById('p2warflip');
const p1burn = document.getElementById('p1burn');
const p2burn = document.getElementById('p2burn');
const war1 = document.getElementById('war1');
const war2 = document.getElementById('war2');
const war3 = document.getElementById('war3');
const dealButton = document.getElementById('deal-button');
const playButton = document.getElementById('play-button');
const clearButton = document.getElementById('clear-button');
const clearWarButton = document.getElementById('clear-war-button');


/*----- event listeners -----*/
dealButton.addEventListener('click', dealCards);
playButton.addEventListener('click', playCards);
clearButton.addEventListener('click', clear);
clearWarButton.addEventListener('click', clearWar);


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
    p1deck.classList.replace('outline', 'shadow-medium');
    p1deck.classList.add('back-roger');
    p2deck.classList.replace('outline', 'shadow-medium');
    p2deck.classList.add('back-roger');
    dealButton.classList.add('hidden');
    playButton.classList.remove('hidden');
};

function playCards() {
    if (p1Cards.length) {
        p1Flipped = p1Cards.splice(0, 1);
        p1flip.classList.replace('outline', p1Flipped);
    }
    if (p2Cards.length) {
        p2Flipped = p2Cards.splice(0, 1);
        p2flip.classList.replace('outline', p2Flipped);
    }
    playButton.classList.add('hidden');
    clearButton.classList.remove('hidden');
    compareCards();
    render();
};

function compareCards() {
    if (lookUp(p1Flipped) > lookUp(p2Flipped)) {
        console.log('Player 1 Win');
        p1Cards.push(`${p1Flipped}`);
        p1Cards.push(`${p2Flipped}`);
        p2Cards.splice(p2Cards.length - 1, 1);
    } else if (lookUp(p1Flipped) < lookUp(p2Flipped)) {
        console.log('Player 2 Win');
        p2Cards.push(`${p1Flipped}`);
        p2Cards.push(`${p2Flipped}`);
        p1Cards.splice(p1Cards.length - 1, 1);
    } else {
        console.log("War");
        war();
    }
};

function clear() {
    p1flip.classList.replace(`${p1Flipped}`, 'outline');
    p2flip.classList.replace(`${p2Flipped}`, 'outline');
    p1Flipped.pop();
    p2Flipped.pop();
    playButton.classList.remove('hidden');
    clearButton.classList.add('hidden');
};

function clearWar() {
    p1flip.classList.replace(`${p1Flipped}`, 'outline');
    p2flip.classList.replace(`${p2Flipped}`, 'outline');
    p1warflip.classList.replace(`${p1War}`, 'outline');
    p2warflip.classList.replace(`${p2War}`, 'outline');
    p1burn.classList.replace('back-roger', 'outline');
    p2burn.classList.replace('back-roger', 'outline');
    p1War.pop();
    p2War.pop();
    p1Flipped.pop();
    p2Flipped.pop();
    p1Burned.pop();
    p1Burned.pop();
    p1Burned.pop();
    p2Burned.pop();
    p2Burned.pop();
    p2Burned.pop();
    playButton.classList.remove('hidden');
    clearWarButton.classList.add('hidden');
};

function war() {
    war1.classList.remove('hidden');
    p1burn.classList.add('back-roger', 'W');
    p2burn.classList.add('back-roger', 'W');
    if (p1Cards.length) {
        p1Burned = p1Cards.splice(0, 3);
        p1War = p1Cards.splice(0, 1);
        p1Cards.push(p1War[0]);
        p1warflip.classList.replace('outline', p1War);
    }
    if (p2Cards.length) {
        p2Burned = p2Cards.splice(0, 3);
        p2War = p2Cards.splice(0, 1);
        p2Cards.push(p2War[0]);
        p2warflip.classList.replace('outline', p2War);
    }
    playButton.classList.add('hidden');
    clearButton.classList.add('hidden');
    clearWarButton.classList.remove('hidden');
    compareWarCards();
    render();
}

function compareWarCards() {
    if (lookUp(p1War) > lookUp(p2War)) {
        console.log('Player 1 Win');
        p1Cards.push(`${p2Burned[2]}`, `${p2Burned[1]}`, `${p2Burned[0]}`);
        p1Cards.push(`${p1Burned[2]}`, `${p1Burned[1]}`, `${p1Burned[0]}`);
        p1Cards.push(`${p1Flipped[0]}`);
        p1Cards.push(`${p2Flipped[0]}`);
        p1Cards.push(`${p2War[0]}`);
        p2Cards.splice(p2Cards.length - 1, 1);
    } else if (lookUp(p1War) < lookUp(p2War)) {
        console.log('Player 2 Win');
        p2Cards.push(`${p1Burned[2]}`, `${p1Burned[1]}`, `${p1Burned[0]}`);
        p2Cards.push(`${p2Burned[2]}`, `${p2Burned[1]}`, `${p2Burned[0]}`);
        p2Cards.push(`${p1Flipped[0]}`);
        p2Cards.push(`${p2Flipped[0]}`);
        p2Cards.push(`${p1War[0]}`);
        p1Cards.splice(p1Cards.length - 1, 1);
    } else {
        console.log("War Again");
        // war();
    }
};

function render() {
    // Player 1 card shading
    if (p1Cards.length === 0) {
        p1deck.classList.replace('back-roger', 'outline');
    }
    if (p1Cards.length > 13) {
        p1deck.classList.replace('outline', 'shadow-light');
    }
    if (p1Cards.length > 26) {
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
        p2deck.classList.replace('back-roger', 'outline');
    }
    if (p2Cards.length > 13) {
        p2deck.classList.replace('outline', 'shadow-light');
    }
    if (p2Cards.length > 26) {
        p2deck.classList.replace('shadow-light', 'shadow-medium');
    }
    if (p2Cards.length > 39) {
        p2deck.classList.replace('shadow-medium', 'shadow-dark');
    }
    if (p2Cards.length > 51) {
        p2deck.classList.replace('shadow-medium', 'shadow-full');
    }
};

function lookUp(x) {
    if (`${x}` === 'dA' || `${x}` === 'cA' || `${x}` === 'sA' || `${x}` === 'hA') {
        return 14;
    } else if (`${x}` === 'dK' || `${x}` === 'cK' || `${x}` === 'sK' || `${x}` === 'hK') {
        return 13;
    } else if (`${x}` === 'dQ' || `${x}` === 'cQ' || `${x}` === 'sQ' || `${x}` === 'hQ') {
        return 12;
    } else if (`${x}` === 'dJ' || `${x}` === 'cJ' || `${x}` === 'sJ' || `${x}` === 'hJ') {
        return 11;
    } else if (`${x}` === 'd10' || `${x}` === 'c10' || `${x}` === 's10' || `${x}` === 'h10') {
        return 10;
    } else if (`${x}` === 'd09' || `${x}` === 'c09' || `${x}` === 's09' || `${x}` === 'h09') {
        return 9;
    } else if (`${x}` === 'd08' || `${x}` === 'c08' || `${x}` === 's08' || `${x}` === 'h08') {
        return 8;
    } else if (`${x}` === 'd07' || `${x}` === 'c07' || `${x}` === 's07' || `${x}` === 'h07') {
        return 7;
    } else if (`${x}` === 'd06' || `${x}` === 'c06' || `${x}` === 's06' || `${x}` === 'h06') {
        return 6;
    } else if (`${x}` === 'd05' || `${x}` === 'c05' || `${x}` === 's05' || `${x}` === 'h05') {
        return 5;
    } else if (`${x}` === 'd04' || `${x}` === 'c04' || `${x}` === 's04' || `${x}` === 'h04') {
        return 4;
    } else if (`${x}` === 'd03' || `${x}` === 'c03' || `${x}` === 's03' || `${x}` === 'h03') {
        return 3;
    } else {
        return 2;
    }
};