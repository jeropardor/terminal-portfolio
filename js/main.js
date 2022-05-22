'use strict'


const $ = selection => document.querySelector(selection);
const $$ = selection => document.querySelectorAll(selection);


const appWindow = $('#window');
const results = $('#results');
const input = $('#input');
const inputWrapper = $('#input-wrapper');
const host = $('.host');


let user = 'jero';
let machine = 'term';

let hostName = user + '@' + machine + ' ❯ ';
host.innerHTML = hostName;

appWindow.focus();


function processCmd(text) {
    let res = document.createElement('p');

    let host = document.createElement('span');
    host.classList.add("host", "back-host");
    let cmd = document.createElement('span');

    host.innerHTML = hostName;
    cmd.innerHTML = text;

    res.appendChild(host);
    res.appendChild(cmd);

    results.appendChild(res);

    appWindow.scrollTop = appWindow.scrollHeight;
};


appWindow.addEventListener('keydown', c => {
    switch (c.key) {
        case 'Enter': // trigers the processCmd function
            processCmd(input.innerHTML);
            input.innerHTML = '';
            break;

        case 'Tab':
        case 'Shift':
        case 'Control': // resets the run
            c.preventDefault();
            break;

        case 'Backspace': // resets the run
            input.innerHTML = input.innerHTML.slice(0, -1);
            break;


        default: // registers a normal char
            input.innerHTML += c.key;
            // console.log(c.key);
    }
});