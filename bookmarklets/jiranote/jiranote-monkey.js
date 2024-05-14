// ==UserScript==
// @name         Jira Note - Remote
// @namespace    https://jira.corp.adobe.com/
// @version      0.2
// @description  Make your own note in the localStorage
// @author       plim@adobe.com
// @match        https://jira.corp.adobe.com/browse/*?remote=1
// @icon         https://www.google.com/s2/favicons?sz=64&domain=adobe.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


    // Your code here...
    console.log(GM_info.script.name + ' ver ' + GM_info.script.version);

    //BEGIN Calling jiranote
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.src = 'https://main--plim--plimadobe.hlx.page/bookmarklets/jiranote/jiranote-remote.js';
    script.id = 'jiranote-js';
    script.name = 'jiranote-js';
    head.appendChild(script);
    //END Calling jiranote

/*
    var heightTextArea = 300;
    let jiraNoteKey = 'jiraNote';
    let ticketId = document.querySelector('[name="ajs-issue-key"]').content;

    $(document).ready(function() {

        var waiting = 3000;

        setTimeout(function() {
            console.log('Load note...');

            var textArea = '<h4>Jira Note</h4><textarea id="'+jiraNoteKey+'" name="'+jiraNoteKey+'" rows="4" cols="50" class="" style="height: '+heightTextArea+'px; width: 100%; background-color:#000;color:#FFF" onchange="saveJiraNote();" onkeyup="saveJiraNote();" placeholder="Make your note at here."></textarea>';
            textArea += '<input class="button aui-button aui-button-primary" type="button" value="Save" onclick="saveJiraNote2();">';

            var targetPosition = document.getElementById("viewissuesidebar");
            targetPosition.insertAdjacentHTML('beforeend', textArea);

            //document.getElementById('jiraNote').value = '';
            //$('#jiraNote').val('');

            if (ticketId != '') {
                loadJiraNote();
            };




        }, waiting);

    });
*/

})();
