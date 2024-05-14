(function() {

  const appInfo = 'Jira Note Remote ver 0.2';
  'use strict';
  //throw 'throw';
  console.log(appInfo);
  console.log('document.URL: ' + document.URL);
  console.log('remote - default')
  //BEGIN BASE64
  //var jiraNoteData = '[{"id":"GWP-7361","timestamp":1669849035050,"contents":"7361 blah blah blah"},{"id":"GWP-7364","timestamp":1669849035050,"contents":"7364 blah blah blah"},{"id":"GWP-7562","timestamp":1669849035072,"contents":"7562 blah blah blah"},{"id":"GWP-1234","timestamp":1669849035072,"contents":"1234 blah blah blah"}]';
  var sprint = false;
  if (window.location.href.includes("RapidBoard.jspa")) {
      sprint = true;
  };
  var localStorageJiraNote = '';
  var heightTextArea = 300;
  let jiraNoteKey = 'jiraNote';
  let ticketId = document.querySelector('[name="ajs-issue-key"]').content;

  function getTicketId(s) {
      var tId = window.location.href.split('/');
      tId = tId[tId.length - 1];
      if (s) {
          tId = window.location.href.split('selectedIssue=');
          if (tId.length > 1) {
              tId = tId[1].split('&');
              tId = tId[0];
          } else {
              tId = '';
          };
      };
      return tId;
  };
  //var ticketId = getTicketId(sprint);
  var tJiraNote;
  var cleanJiraNote = true;
  let jiraNoteObj = {};
  var newJiraNote = true;

  function loadJiraNote() {
      ticketId = getTicketId(sprint);
      console.log('jiraNoteKey:' + jiraNoteKey);
      localStorageJiraNote = localStorage.getItem(jiraNoteKey);
      console.log('localStorageJiraNote:' + localStorageJiraNote);
      if (localStorageJiraNote == null) {
          localStorage.setItem(jiraNoteKey, '[]');
          localStorageJiraNote = localStorage.getItem(jiraNoteKey);
      };
      jiraNoteObj = JSON.parse(localStorageJiraNote);
      console.log(Object.keys(jiraNoteObj).length);
      console.log('newJiraNote1:' + newJiraNote);
      if (cleanJiraNote) {
          console.log('Clean old notes');
          if (jiraNoteObj !== null || jiraNoteObj !== undefined) {
              var ts = new Date().getTime();
              ts = ts - (1000 * 60 * 60 * 24 * 120);
              for (var i = jiraNoteObj.length - 1; i >= 0; i--) {
                  console.log(i + ' : ' + jiraNoteObj[i].timestamp + ' : ' + ts);
                  if (jiraNoteObj[i].timestamp < ts) {
                      console.log('DELETE : ' + jiraNoteObj[i].id + ' : ' + jiraNoteObj[i].timestamp);
                      jiraNoteObj.splice(i, 1);
                      newJiraNote = false;
                      cleanJiraNote = false;
                  };
              };
              var result = JSON.stringify(jiraNoteObj);
              localStorage.setItem(jiraNoteKey, result);
          };
      };
      if (jiraNoteObj !== null || jiraNoteObj !== undefined) {
          console.log('jiraNoteObj.length:' + Object.keys(jiraNoteObj).length);
          for (var i = 0; i < Object.keys(jiraNoteObj).length; i++) {
              if (jiraNoteObj[i].id == ticketId) {
                  $('#' + jiraNoteKey).val(jiraNoteObj[i].contents);
                  newJiraNote = false;
                  break;
              };
          };
      };
      console.log('newJiraNote2:' + newJiraNote);
  };

  function saveJiraNote() {
      var ticketId = getTicketId(sprint);
      clearTimeout(tJiraNote);
      tJiraNote = setTimeout(function() {
          var ts = new Date().getTime();
          console.log('All changes saved:' + ts);
          localStorageJiraNote = localStorage.getItem(jiraNoteKey);
          jiraNoteObj = JSON.parse(localStorageJiraNote);
          var newObj = {
              id: ticketId,
              timestamp: ts,
              contents: $('#jiraNote').val()
          };
          for (var i = 0; i < jiraNoteObj.length; i++) {
              if (jiraNoteObj[i].id == ticketId) {
                  jiraNoteObj.splice(i, 1);
                  console.log("SPLICE: " + ticketId);
                  break;
              };
          };
          jiraNoteObj.push(newObj);
          console.log("PUSH: " + ticketId + " : " + $('#jiraNote').val());
          var result = JSON.stringify(jiraNoteObj);
          localStorage.setItem(jiraNoteKey, result);
      }, 1500);
  };

  function saveJiraNote2() {
      var ticketId = getTicketId(sprint);
      var ts = new Date().getTime();
      console.log('All changes saved:' + ts);
      localStorageJiraNote = localStorage.getItem(jiraNoteKey);
      jiraNoteObj = JSON.parse(localStorageJiraNote);
      var newObj = {
          id: ticketId,
          timestamp: ts,
          contents: $('#jiraNote').val()
      };
      for (var i = 0; i < jiraNoteObj.length; i++) {
          if (jiraNoteObj[i].id == ticketId) {
              jiraNoteObj.splice(i, 1);
              console.log("SPLICE: " + ticketId);
              break;
          };
      };
      jiraNoteObj.push(newObj);
      console.log("PUSH: " + ticketId + " : " + $('#jiraNote').val());
      var result = JSON.stringify(jiraNoteObj);
      localStorage.setItem(jiraNoteKey, result);
  };
  //END BASE64

  
  $(document).ready(function() {

      var waiting = 3000;

      setTimeout(function() {
          console.log('Load note...');
          /*
          var newScript = document.createElement("script");
          newScript.type = "text/javascript";
          document.head.appendChild(newScript);
          newScript.src = "data:text/plain;base64,dmFyIHNwcmludCA9IGZhbHNlOwogICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluY2x1ZGVzKCJSYXBpZEJvYXJkLmpzcGEiKSkgewogICAgICAgIHNwcmludCA9IHRydWU7CiAgICB9OwoKICAgIHZhciBsb2NhbFN0b3JhZ2VKaXJhTm90ZSA9ICcnOwogICAgdmFyIGppcmFOb3RlS2V5ID0gJ2ppcmFOb3RlJzsKCiAgICBmdW5jdGlvbiBnZXRUaWNrZXRJZChzKSB7CiAgICAgICAgdmFyIHRJZCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KCcvJyk7CiAgICAgICAgdElkID0gdElkW3RJZC5sZW5ndGggLSAxXTsKCiAgICAgICAgaWYgKHMpIHsKICAgICAgICAgICAgdElkID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoJ3NlbGVjdGVkSXNzdWU9Jyk7CiAgICAgICAgICAgIGlmICh0SWQubGVuZ3RoID4gMSkgewogICAgICAgICAgICAgICAgdElkID0gdElkWzFdLnNwbGl0KCcmJyk7CiAgICAgICAgICAgICAgICB0SWQgPSB0SWRbMF07CiAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICB0SWQgPSAnJzsKICAgICAgICAgICAgfTsKICAgICAgICB9OwoKICAgICAgICByZXR1cm4gdElkOwoKICAgIH07CiAgICB2YXIgdGlja2V0SWQgPSBnZXRUaWNrZXRJZChzcHJpbnQpOwogICAgdmFyIHRKaXJhTm90ZTsKICAgIHZhciBjbGVhbkppcmFOb3RlID0gdHJ1ZTsKICAgIGxldCBqaXJhTm90ZU9iaiA9IHt9OwogICAgdmFyIG5ld0ppcmFOb3RlID0gdHJ1ZTsKCiAgICBmdW5jdGlvbiBsb2FkSmlyYU5vdGUoKSB7CiAgICAgICAgdGlja2V0SWQgPSBnZXRUaWNrZXRJZChzcHJpbnQpOwogICAgICAgIGNvbnNvbGUubG9nKCdqaXJhTm90ZUtleTonICsgamlyYU5vdGVLZXkpOwogICAgICAgIGxvY2FsU3RvcmFnZUppcmFOb3RlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oamlyYU5vdGVLZXkpOwogICAgICAgIGNvbnNvbGUubG9nKCdsb2NhbFN0b3JhZ2VKaXJhTm90ZTonICsgbG9jYWxTdG9yYWdlSmlyYU5vdGUpOwogICAgICAgIGlmIChsb2NhbFN0b3JhZ2VKaXJhTm90ZSA9PSBudWxsKSB7CiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGppcmFOb3RlS2V5LCAnW10nKTsKICAgICAgICAgICAgbG9jYWxTdG9yYWdlSmlyYU5vdGUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShqaXJhTm90ZUtleSk7CiAgICAgICAgfTsKICAgICAgICBqaXJhTm90ZU9iaiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlSmlyYU5vdGUpOwogICAgICAgIGNvbnNvbGUubG9nKE9iamVjdC5rZXlzKGppcmFOb3RlT2JqKS5sZW5ndGgpOwogICAgICAgIGNvbnNvbGUubG9nKCduZXdKaXJhTm90ZTE6JyArIG5ld0ppcmFOb3RlKTsKCiAgICAgICAgaWYgKGNsZWFuSmlyYU5vdGUpIHsKICAgICAgICAgICAgY29uc29sZS5sb2coJ0NsZWFuIG9sZCBub3RlcycpOwogICAgICAgICAgICBpZiAoamlyYU5vdGVPYmogIT09IG51bGwgfHwgamlyYU5vdGVPYmogIT09IHVuZGVmaW5lZCkgewogICAgICAgICAgICAgICAgdmFyIHRzID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7CiAgICAgICAgICAgICAgICB0cyA9IHRzIC0gKDEwMDAgKiA2MCAqIDYwICogMjQgKiAxMjApOwogICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IGppcmFOb3RlT2JqLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7CiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaSArICcgOiAnICsgamlyYU5vdGVPYmpbaV0udGltZXN0YW1wICsgJyA6ICcgKyB0cyk7CiAgICAgICAgICAgICAgICAgICAgaWYgKGppcmFOb3RlT2JqW2ldLnRpbWVzdGFtcCA8IHRzKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdERUxFVEUgOiAnICsgamlyYU5vdGVPYmpbaV0uaWQgKyAnIDogJyAramlyYU5vdGVPYmpbaV0udGltZXN0YW1wKTsKICAgICAgICAgICAgICAgICAgICAgICAgamlyYU5vdGVPYmouc3BsaWNlKGksIDEpOwogICAgICAgICAgICAgICAgICAgICAgICBuZXdKaXJhTm90ZSA9IGZhbHNlOwogICAgICAgICAgICAgICAgICAgICAgICBjbGVhbkppcmFOb3RlID0gZmFsc2U7CiAgICAgICAgICAgICAgICAgICAgfTsKICAgICAgICAgICAgICAgIH07CiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gSlNPTi5zdHJpbmdpZnkoamlyYU5vdGVPYmopOwogICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oamlyYU5vdGVLZXksIHJlc3VsdCk7CgogICAgICAgICAgICB9OwoKICAgICAgICB9OwoKICAgICAgICBpZiAoamlyYU5vdGVPYmogIT09IG51bGwgfHwgamlyYU5vdGVPYmogIT09IHVuZGVmaW5lZCkgewogICAgICAgICAgICBjb25zb2xlLmxvZygnamlyYU5vdGVPYmoubGVuZ3RoOicgKyBPYmplY3Qua2V5cyhqaXJhTm90ZU9iaikubGVuZ3RoKTsKICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBPYmplY3Qua2V5cyhqaXJhTm90ZU9iaikubGVuZ3RoOyBpKyspIHsKICAgICAgICAgICAgICAgIGlmIChqaXJhTm90ZU9ialtpXS5pZCA9PSB0aWNrZXRJZCkgewogICAgICAgICAgICAgICAgICAgICQoJyMnICsgamlyYU5vdGVLZXkpLnZhbChqaXJhTm90ZU9ialtpXS5jb250ZW50cyk7CiAgICAgICAgICAgICAgICAgICAgbmV3SmlyYU5vdGUgPSBmYWxzZTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIH07CiAgICAgICAgICAgIH07CgogICAgICAgIH07CiAgICAgICAgY29uc29sZS5sb2coJ25ld0ppcmFOb3RlMjonICsgbmV3SmlyYU5vdGUpOwogICAgfTsKCiAgICBmdW5jdGlvbiBzYXZlSmlyYU5vdGUoKSB7CiAgICAgICAgdmFyIHRpY2tldElkID0gZ2V0VGlja2V0SWQoc3ByaW50KTsKCgogICAgICAgIGNsZWFyVGltZW91dCh0SmlyYU5vdGUpOwogICAgICAgIHRKaXJhTm90ZSA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7CiAgICAgICAgICAgIHZhciB0cyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpOwogICAgICAgICAgICBjb25zb2xlLmxvZygnQWxsIGNoYW5nZXMgc2F2ZWQ6JyArIHRzKTsKCiAgICAgICAgICAgIGxvY2FsU3RvcmFnZUppcmFOb3RlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oamlyYU5vdGVLZXkpOwogICAgICAgICAgICBqaXJhTm90ZU9iaiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlSmlyYU5vdGUpOwoKICAgICAgICAgICAgdmFyIG5ld09iaiA9IHsKICAgICAgICAgICAgICAgIGlkOiB0aWNrZXRJZCwKICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogdHMsCiAgICAgICAgICAgICAgICBjb250ZW50czogJCgnI2ppcmFOb3RlJykudmFsKCkKICAgICAgICAgICAgfTsKICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBqaXJhTm90ZU9iai5sZW5ndGg7IGkrKykgewogICAgICAgICAgICAgICAgaWYgKGppcmFOb3RlT2JqW2ldLmlkID09IHRpY2tldElkKSB7CiAgICAgICAgICAgICAgICAgICAgamlyYU5vdGVPYmouc3BsaWNlKGksIDEpOwogICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCJTUExJQ0U6ICIgKyB0aWNrZXRJZCk7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICB9OwogICAgICAgICAgICB9OwogICAgICAgICAgICBqaXJhTm90ZU9iai5wdXNoKG5ld09iaik7CiAgICAgICAgICAgIGNvbnNvbGUubG9nKCJQVVNIOiAiICsgdGlja2V0SWQgKyAiIDogIisgJCgnI2ppcmFOb3RlJykudmFsKCkpOwogICAgICAgICAgICB2YXIgcmVzdWx0ID0gSlNPTi5zdHJpbmdpZnkoamlyYU5vdGVPYmopOwogICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShqaXJhTm90ZUtleSwgcmVzdWx0KTsKCgogICAgICAgIH0sIDE1MDApOwogICAgfTsKCiAgICBmdW5jdGlvbiBzYXZlSmlyYU5vdGUyKCkgewogICAgICAgIHZhciB0aWNrZXRJZCA9IGdldFRpY2tldElkKHNwcmludCk7CiAgICAgICAgdmFyIHRzID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7CiAgICAgICAgY29uc29sZS5sb2coJ0FsbCBjaGFuZ2VzIHNhdmVkOicgKyB0cyk7CgogICAgICAgIGxvY2FsU3RvcmFnZUppcmFOb3RlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oamlyYU5vdGVLZXkpOwogICAgICAgIGppcmFOb3RlT2JqID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2VKaXJhTm90ZSk7CgogICAgICAgIHZhciBuZXdPYmogPSB7CiAgICAgICAgICAgIGlkOiB0aWNrZXRJZCwKICAgICAgICAgICAgdGltZXN0YW1wOiB0cywKICAgICAgICAgICAgY29udGVudHM6ICQoJyNqaXJhTm90ZScpLnZhbCgpCiAgICAgICAgfTsKICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGppcmFOb3RlT2JqLmxlbmd0aDsgaSsrKSB7CiAgICAgICAgICAgIGlmIChqaXJhTm90ZU9ialtpXS5pZCA9PSB0aWNrZXRJZCkgewogICAgICAgICAgICAgICAgamlyYU5vdGVPYmouc3BsaWNlKGksIDEpOwogICAgICAgICAgICAgICAgY29uc29sZS5sb2coIlNQTElDRTogIiArIHRpY2tldElkKTsKICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICB9OwogICAgICAgIH07CiAgICAgICAgamlyYU5vdGVPYmoucHVzaChuZXdPYmopOwogICAgICAgIGNvbnNvbGUubG9nKCJQVVNIOiAiICsgdGlja2V0SWQgKyAiIDogIisgJCgnI2ppcmFOb3RlJykudmFsKCkpOwogICAgICAgIHZhciByZXN1bHQgPSBKU09OLnN0cmluZ2lmeShqaXJhTm90ZU9iaik7CiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oamlyYU5vdGVLZXksIHJlc3VsdCk7CiAgICB9Ow=="
          */

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


})();
