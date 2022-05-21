'use strict'


const $ = selection => document.querySelector(selection);
const $$ = selection => document.querySelectorAll(selection);


const results = $('#results');
const input = $('#input');


function processCmd(cmd) {
    let res = document.createElement("p");
    res.innerHTML = cmd;
    results.appendChild(res);
};


input.addEventListener('keydown', c => {
    switch (c.key) {
        case 'Enter': // trigers the processCmd function
            processCmd(input.value);
            input.value = '';
            break;

        case 'Tab': // resets the run
            c.preventDefault();
            break;

        default: // registers a normal char
    }
});