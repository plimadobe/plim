// ==UserScript==
// @name         Jira Note - Remote
// @namespace    https://jira.corp.adobe.com/
// @version      0.29
// @description  Make your own note in the localStorage
// @author       plim@adobe.com
// @match        https://jira.corp.adobe.com/browse/*remote=1
// @icon         https://www.google.com/s2/favicons?sz=64&domain=adobe.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


    // Your code here...
    console.log(GM_info.script.name + ' ver ' + GM_info.script.version);

    //BEGIN Calling jiranote
    const urlParams = new URLSearchParams(window.location.search);
    const dev = urlParams.get('dev');

    let src = 'https://main--plim--plimadobe.hlx.page/bookmarklets/jiranote/jiranote-remote';
    if (dev === null) {
      src += '.js';
    } else {
      src += '-dev.js';
    }
    console.log('src:' + src);

    let head = document.getElementsByTagName('head')[0];
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.src = src;
    script.id = 'jiranote-js';
    script.name = 'jiranote-js';
    head.appendChild(script);
    //END Calling jiranote

})();
