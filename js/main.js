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



function print(text, hl = false) {
    let res = document.createElement('p');

    res.innerHTML = text;

    if (hl) res.classList.add('hl1');
    results.appendChild(res);
}


// cmds ------------------------------------------------------------------------

function cmdEcho(argv) {
    print(argv.join(' '), true);
}


// -----------------------------------------------------------------------------


function executeCmd(text) {
    const argv = text.split(' ');
    const cmd = argv.shift();
    switch (cmd) {
        case 'echo':
            cmdEcho(argv);
            break;

        default:
            break;
    }
}


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

    executeCmd(text);
};


appWindow.addEventListener('keypress', c => {
    switch (c.key) {
        case 'Enter': // trigers the processCmd function
            processCmd(input.innerHTML);
            input.innerHTML = '';
            break;

        default: // registers a normal char
            input.innerHTML += c.key;
    }
});


appWindow.addEventListener('keydown', e => {
    if (e.key === 'Delete' || e.key === 'Backspace') {
        input.innerHTML = input.innerHTML.slice(0, -1);
    }
});


appWindow.addEventListener('paste', e => {
    let paste = (e.clipboardData || window.clipboardData).getData('text');

    input.innerHTML += paste;

    e.preventDefault();
});