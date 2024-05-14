//(function() {

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
  sprint = false;//For Blocking Sprint mode

  var localStorageJiraNote = '';
  var heightTextArea = 300;
  let jiraNoteKey = 'jiraNote';

  function getTicketId(s) {
    if (s) {
      var tId = window.location.href.split('selectedIssue=');
      if (tId.length > 1) {
          tId = tId[1].split('&');
          tId = tId[0];
      } else {
          tId = '';
      };
      return tId;
    } else {
      return document.querySelector('[name="ajs-issue-key"]').content;
    }

  };

  var ticketId = getTicketId(sprint);
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
    let ticketId = getTicketId(sprint);
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

  function backupJiraNote() {
    let localStorageJiraNote = localStorage.getItem(jiraNoteKey);

    const t = new Date();
    const date = ('0' + t.getDate()).slice(-2);
    const month = ('0' + (t.getMonth() + 1)).slice(-2);
    const year = t.getFullYear();

    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(localStorageJiraNote));
    element.setAttribute('download', `jiranote-${date}-${month}-${year}.txt`);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);    

  }
  //END BASE64

  
  $(document).ready(function() {

    var waiting = 3000;
    if (sprint) {
        waiting = 7000;
        heightTextArea = 120;
    };

      setTimeout(function() {
          console.log('Load Jira Note...');

          var textArea = '<h4>Jira Note</h4><textarea id="'+jiraNoteKey+'" name="'+jiraNoteKey+'" rows="4" cols="50" class="" style="height: '+heightTextArea+'px; width: 100%; background-color:#000;color:#FFF" onchange="saveJiraNote();" onkeyup="saveJiraNote();" placeholder="Make your note at here."></textarea>';
          textArea += '<input class="button aui-button aui-button-primary" type="button" value="Save" onclick="saveJiraNote2();">';
          textArea += '<input class="button aui-button aui-button-primary" type="button" value="Backup" onclick="backupJiraNote();">';

          var targetPosition = document.getElementById("viewissuesidebar");
          targetPosition.insertAdjacentHTML('beforeend', textArea);

          if (ticketId != '') {
              loadJiraNote();
          };

      }, waiting);

  });


//})();
