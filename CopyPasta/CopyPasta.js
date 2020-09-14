// ==UserScript==
// @name         Copy Pasta
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Copy dropdown value
// @author       You
// @match        https://www.tampermonkey.net/
// @include      http*://*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_setClipboard
// ==/UserScript==

// https://www.tampermonkey.net/documentation.php

// Usage: GM_setClipboard(data, info)

(function () {
    'use strict';

    //document.getElementById("favorite-food").value = "Veggies";

    var copyNode = document.createElement('p');
    copyNode.innerHTML = '<button id="copy-button" type="button">Copy</button>';
    copyNode.setAttribute('id', 'copy-button-container');
    document.body.appendChild(copyNode);

    document.getElementById("copy-button").addEventListener("click", CopyClickAction, false);

    var zNode = document.createElement('p');
    zNode.innerHTML = '<button id="paste-button" type="button">Paste</button>';
    zNode.setAttribute('id', 'paste-button-container');
    document.body.appendChild(zNode);

    document.getElementById("paste-button").addEventListener("click", PasteClickAction, false);

    function CopyClickAction(yEvent) {
        const dropdowns = document.querySelectorAll("select");
        for (const dropdown of dropdowns) {
            console.log(dropdown.value);
        }
        const dropdownState = Array.from(dropdowns).map(dd => {
            return {"id": dd.id, "val": dd.value};
        });

        console.log(dropdownState);
        GM_setClipboard(JSON.stringify(dropdownState), "text");
    }

    function PasteClickAction(zEvent) {
        navigator.clipboard.readText()
            .then(text => {
                console.log('Pasted content: ', text);
                const newStates = JSON.parse(text);
                for (const state of newStates) {
                    document.getElementById(state.id).value = state.val;
                }
            })
    }
})();
