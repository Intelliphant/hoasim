/// <reference path="../ref/electron.d.ts" />
/// <reference path="../ref/game.d.ts" />

(function () { //add Game module to global scope
    var game = require('electron').remote.require('./game');
    Object.keys(game).forEach(k => window[k] = game[k]);
})();


var helloWorld = document.createElement('h1');
document.body.appendChild(helloWorld);

(function getNextMessage() {
    helloWorld.innerText = HelloWorld.Chatter();
    setTimeout(getNextMessage, (Math.random() * 5000) + 3000);
})();