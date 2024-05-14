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
    script.id = 'maio-js';
    head.appendChild(script);
    //END Calling jiranote


    var heightTextArea = 300;
    $(document).ready(function() {

        var waiting = 3000;

        setTimeout(function() {
            console.log('Load note...');

            var newScript = document.createElement("script");
            newScript.type = "text/javascript";
            document.head.appendChild(newScript);
            newScript.src = "data:text/plain;base64,dmFyIHNwcmludCA9IGZhbHNlOwogICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluY2x1ZGVzKCJSYXBpZEJvYXJkLmpzcGEiKSkgewogICAgICAgIHNwcmludCA9IHRydWU7CiAgICB9OwoKICAgIHZhciBsb2NhbFN0b3JhZ2VKaXJhTm90ZSA9ICcnOwogICAgdmFyIGppcmFOb3RlS2V5ID0gJ2ppcmFOb3RlJzsKCiAgICBmdW5jdGlvbiBnZXRUaWNrZXRJZChzKSB7CiAgICAgICAgdmFyIHRJZCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KCcvJyk7CiAgICAgICAgdElkID0gdElkW3RJZC5sZW5ndGggLSAxXTsKCiAgICAgICAgaWYgKHMpIHsKICAgICAgICAgICAgdElkID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoJ3NlbGVjdGVkSXNzdWU9Jyk7CiAgICAgICAgICAgIGlmICh0SWQubGVuZ3RoID4gMSkgewogICAgICAgICAgICAgICAgdElkID0gdElkWzFdLnNwbGl0KCcmJyk7CiAgICAgICAgICAgICAgICB0SWQgPSB0SWRbMF07CiAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICB0SWQgPSAnJzsKICAgICAgICAgICAgfTsKICAgICAgICB9OwoKICAgICAgICByZXR1cm4gdElkOwoKICAgIH07CiAgICB2YXIgdGlja2V0SWQgPSBnZXRUaWNrZXRJZChzcHJpbnQpOwogICAgdmFyIHRKaXJhTm90ZTsKICAgIHZhciBjbGVhbkppcmFOb3RlID0gdHJ1ZTsKICAgIGxldCBqaXJhTm90ZU9iaiA9IHt9OwogICAgdmFyIG5ld0ppcmFOb3RlID0gdHJ1ZTsKCiAgICBmdW5jdGlvbiBsb2FkSmlyYU5vdGUoKSB7CiAgICAgICAgdGlja2V0SWQgPSBnZXRUaWNrZXRJZChzcHJpbnQpOwogICAgICAgIGNvbnNvbGUubG9nKCdqaXJhTm90ZUtleTonICsgamlyYU5vdGVLZXkpOwogICAgICAgIGxvY2FsU3RvcmFnZUppcmFOb3RlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oamlyYU5vdGVLZXkpOwogICAgICAgIGNvbnNvbGUubG9nKCdsb2NhbFN0b3JhZ2VKaXJhTm90ZTonICsgbG9jYWxTdG9yYWdlSmlyYU5vdGUpOwogICAgICAgIGlmIChsb2NhbFN0b3JhZ2VKaXJhTm90ZSA9PSBudWxsKSB7CiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGppcmFOb3RlS2V5LCAnW10nKTsKICAgICAgICAgICAgbG9jYWxTdG9yYWdlSmlyYU5vdGUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShqaXJhTm90ZUtleSk7CiAgICAgICAgfTsKICAgICAgICBqaXJhTm90ZU9iaiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlSmlyYU5vdGUpOwogICAgICAgIGNvbnNvbGUubG9nKE9iamVjdC5rZXlzKGppcmFOb3RlT2JqKS5sZW5ndGgpOwogICAgICAgIGNvbnNvbGUubG9nKCduZXdKaXJhTm90ZTE6JyArIG5ld0ppcmFOb3RlKTsKCiAgICAgICAgaWYgKGNsZWFuSmlyYU5vdGUpIHsKICAgICAgICAgICAgY29uc29sZS5sb2coJ0NsZWFuIG9sZCBub3RlcycpOwogICAgICAgICAgICBpZiAoamlyYU5vdGVPYmogIT09IG51bGwgfHwgamlyYU5vdGVPYmogIT09IHVuZGVmaW5lZCkgewogICAgICAgICAgICAgICAgdmFyIHRzID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7CiAgICAgICAgICAgICAgICB0cyA9IHRzIC0gKDEwMDAgKiA2MCAqIDYwICogMjQgKiAxMjApOwogICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IGppcmFOb3RlT2JqLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7CiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaSArICcgOiAnICsgamlyYU5vdGVPYmpbaV0udGltZXN0YW1wICsgJyA6ICcgKyB0cyk7CiAgICAgICAgICAgICAgICAgICAgaWYgKGppcmFOb3RlT2JqW2ldLnRpbWVzdGFtcCA8IHRzKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdERUxFVEUgOiAnICsgamlyYU5vdGVPYmpbaV0uaWQgKyAnIDogJyAramlyYU5vdGVPYmpbaV0udGltZXN0YW1wKTsKICAgICAgICAgICAgICAgICAgICAgICAgamlyYU5vdGVPYmouc3BsaWNlKGksIDEpOwogICAgICAgICAgICAgICAgICAgICAgICBuZXdKaXJhTm90ZSA9IGZhbHNlOwogICAgICAgICAgICAgICAgICAgICAgICBjbGVhbkppcmFOb3RlID0gZmFsc2U7CiAgICAgICAgICAgICAgICAgICAgfTsKICAgICAgICAgICAgICAgIH07CiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gSlNPTi5zdHJpbmdpZnkoamlyYU5vdGVPYmopOwogICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oamlyYU5vdGVLZXksIHJlc3VsdCk7CgogICAgICAgICAgICB9OwoKICAgICAgICB9OwoKICAgICAgICBpZiAoamlyYU5vdGVPYmogIT09IG51bGwgfHwgamlyYU5vdGVPYmogIT09IHVuZGVmaW5lZCkgewogICAgICAgICAgICBjb25zb2xlLmxvZygnamlyYU5vdGVPYmoubGVuZ3RoOicgKyBPYmplY3Qua2V5cyhqaXJhTm90ZU9iaikubGVuZ3RoKTsKICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBPYmplY3Qua2V5cyhqaXJhTm90ZU9iaikubGVuZ3RoOyBpKyspIHsKICAgICAgICAgICAgICAgIGlmIChqaXJhTm90ZU9ialtpXS5pZCA9PSB0aWNrZXRJZCkgewogICAgICAgICAgICAgICAgICAgICQoJyMnICsgamlyYU5vdGVLZXkpLnZhbChqaXJhTm90ZU9ialtpXS5jb250ZW50cyk7CiAgICAgICAgICAgICAgICAgICAgbmV3SmlyYU5vdGUgPSBmYWxzZTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIH07CiAgICAgICAgICAgIH07CgogICAgICAgIH07CiAgICAgICAgY29uc29sZS5sb2coJ25ld0ppcmFOb3RlMjonICsgbmV3SmlyYU5vdGUpOwogICAgfTsKCiAgICBmdW5jdGlvbiBzYXZlSmlyYU5vdGUoKSB7CiAgICAgICAgdmFyIHRpY2tldElkID0gZ2V0VGlja2V0SWQoc3ByaW50KTsKCgogICAgICAgIGNsZWFyVGltZW91dCh0SmlyYU5vdGUpOwogICAgICAgIHRKaXJhTm90ZSA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7CiAgICAgICAgICAgIHZhciB0cyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpOwogICAgICAgICAgICBjb25zb2xlLmxvZygnQWxsIGNoYW5nZXMgc2F2ZWQ6JyArIHRzKTsKCiAgICAgICAgICAgIGxvY2FsU3RvcmFnZUppcmFOb3RlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oamlyYU5vdGVLZXkpOwogICAgICAgICAgICBqaXJhTm90ZU9iaiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlSmlyYU5vdGUpOwoKICAgICAgICAgICAgdmFyIG5ld09iaiA9IHsKICAgICAgICAgICAgICAgIGlkOiB0aWNrZXRJZCwKICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogdHMsCiAgICAgICAgICAgICAgICBjb250ZW50czogJCgnI2ppcmFOb3RlJykudmFsKCkKICAgICAgICAgICAgfTsKICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBqaXJhTm90ZU9iai5sZW5ndGg7IGkrKykgewogICAgICAgICAgICAgICAgaWYgKGppcmFOb3RlT2JqW2ldLmlkID09IHRpY2tldElkKSB7CiAgICAgICAgICAgICAgICAgICAgamlyYU5vdGVPYmouc3BsaWNlKGksIDEpOwogICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCJTUExJQ0U6ICIgKyB0aWNrZXRJZCk7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICB9OwogICAgICAgICAgICB9OwogICAgICAgICAgICBqaXJhTm90ZU9iai5wdXNoKG5ld09iaik7CiAgICAgICAgICAgIGNvbnNvbGUubG9nKCJQVVNIOiAiICsgdGlja2V0SWQgKyAiIDogIisgJCgnI2ppcmFOb3RlJykudmFsKCkpOwogICAgICAgICAgICB2YXIgcmVzdWx0ID0gSlNPTi5zdHJpbmdpZnkoamlyYU5vdGVPYmopOwogICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShqaXJhTm90ZUtleSwgcmVzdWx0KTsKCgogICAgICAgIH0sIDE1MDApOwogICAgfTsKCiAgICBmdW5jdGlvbiBzYXZlSmlyYU5vdGUyKCkgewogICAgICAgIHZhciB0aWNrZXRJZCA9IGdldFRpY2tldElkKHNwcmludCk7CiAgICAgICAgdmFyIHRzID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7CiAgICAgICAgY29uc29sZS5sb2coJ0FsbCBjaGFuZ2VzIHNhdmVkOicgKyB0cyk7CgogICAgICAgIGxvY2FsU3RvcmFnZUppcmFOb3RlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oamlyYU5vdGVLZXkpOwogICAgICAgIGppcmFOb3RlT2JqID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2VKaXJhTm90ZSk7CgogICAgICAgIHZhciBuZXdPYmogPSB7CiAgICAgICAgICAgIGlkOiB0aWNrZXRJZCwKICAgICAgICAgICAgdGltZXN0YW1wOiB0cywKICAgICAgICAgICAgY29udGVudHM6ICQoJyNqaXJhTm90ZScpLnZhbCgpCiAgICAgICAgfTsKICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGppcmFOb3RlT2JqLmxlbmd0aDsgaSsrKSB7CiAgICAgICAgICAgIGlmIChqaXJhTm90ZU9ialtpXS5pZCA9PSB0aWNrZXRJZCkgewogICAgICAgICAgICAgICAgamlyYU5vdGVPYmouc3BsaWNlKGksIDEpOwogICAgICAgICAgICAgICAgY29uc29sZS5sb2coIlNQTElDRTogIiArIHRpY2tldElkKTsKICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICB9OwogICAgICAgIH07CiAgICAgICAgamlyYU5vdGVPYmoucHVzaChuZXdPYmopOwogICAgICAgIGNvbnNvbGUubG9nKCJQVVNIOiAiICsgdGlja2V0SWQgKyAiIDogIisgJCgnI2ppcmFOb3RlJykudmFsKCkpOwogICAgICAgIHZhciByZXN1bHQgPSBKU09OLnN0cmluZ2lmeShqaXJhTm90ZU9iaik7CiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oamlyYU5vdGVLZXksIHJlc3VsdCk7CiAgICB9Ow=="

            var textArea = '<h4>Jira Note</h4><textarea id="'+jiraNoteKey+'" name="'+jiraNoteKey+'" rows="4" cols="50" class="" style="height: '+heightTextArea+'px; width: 100%; background-color:#000;color:#FFF" onchange="saveJiraNote();" onkeyup="saveJiraNote();" placeholder="Make your note at here."></textarea>';
            textArea += '<input class="button aui-button aui-button-primary" type="button" value="Save" onclick="saveJiraNote2();">';
            //var viewissuesidebar = document.querySelector("#viewissuesidebar");

            var targetPosition = document.getElementById("viewissuesidebar");
            targetPosition.insertAdjacentHTML('beforeend', textArea);

            //document.getElementById('jiraNote').value = '';
            //$('#jiraNote').val('');

            if (ticketId != '') {
                loadJiraNote();
            };




        }, waiting);

    });


})();
