//(function() {

const appInfo = 'Jira Note Remote ver 0.292';
'use strict';
//throw 'throw';
console.log(appInfo);
console.log('document.URL: ' + document.URL);
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
let jiraNoteExpiry = 365;//Days

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
            //ts = ts - (1000 * 60 * 60 * 24 * 120);//120days
            console.log('jiraNoteExpiry: ' + jiraNoteExpiry + 'days');
            ts = ts - (1000 * 60 * 60 * 24 * jiraNoteExpiry);
            for (var i = jiraNoteObj.length - 1; i >= 0; i--) {
                console.log(i + ' : ' + jiraNoteObj[i].timestamp + ' : ' + ts);
                if (jiraNoteObj[i].timestamp < ts || (jiraNoteObj[i].contents.trim().length == 0)) {
                    console.log('DELETE : ' + jiraNoteObj[i].id + ' : ' + jiraNoteObj[i].timestamp + ' : ' + jiraNoteObj[i].contents.trim().length);
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
    getUsed();
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
          contents: $('#jiraNote').val().trim()
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

function exportJiraNote() {
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

function importJiraNote() {
  if (!document.querySelector('#jiraNoteImportContainer')) {
    console.log('importJiraNote()');
    let textArea = '<div id="jiraNoteImportContainer" style="margin-top:20px;">';
    //textArea += '<h4>Import Jira Note data</h4><textarea id="'+jiraNoteKey+'Import" name="'+jiraNoteKey+'Import" rows="4" cols="50" class="" style="height: '+heightTextArea+'px; width: 100%; background-color:#DFE2E6;color:#000" placeholder="Paste the Jira Note Data here.\n!!! Your all Jira Note data will be overwritten. !!!"></textarea>';
    let localStorageJiraNote = localStorage.getItem(jiraNoteKey);
    textArea += '<h4>Import Jira Note data</h4><p style="padding:4px;background-color:#f44336;color:#fff;"><strong>Danger!</strong> Your all Jira Note data will be overwritten.</p><textarea id="'+jiraNoteKey+'Import" name="'+jiraNoteKey+'Import" rows="4" cols="50" class="" style="height: '+heightTextArea+'px; width: 100%; background-color:#DFE2E6;color:#000">'+localStorageJiraNote.trim()+'</textarea>';
    textArea += '<input class="button aui-button aui-button-primary" type="button" value="Save" onclick="saveImportJiraNote();">';
    textArea += '<input class="button aui-button aui-button-primary" type="button" value="Cancel" onclick="cancelImportJiraNote();">';
    textArea += '</div>';

    //let elem = document.querySelector('#jiraNoteContainer');
    let elem = document.querySelector('#jiraNoteSubContainer');

    //elem.insertAdjacentHTML('afterend', textArea);
    elem.insertAdjacentHTML('beforeend', elem);
  }

}

function saveImportJiraNote() {
  localStorage.setItem(jiraNoteKey, document.querySelector('#' + jiraNoteKey + 'Import').value.trim());
  cancelImportJiraNote();    
  alert('Imported.\nRefresh the browser.');

}

function cancelImportJiraNote() {
  document.querySelector('#' + jiraNoteKey + 'ImportContainer').remove();
}

function getUsed() {
  var _lsTotal = 0,
    _lsMax = 10400008,
    _xLen, _x;
  for (_x in localStorage) {
      if (!localStorage.hasOwnProperty(_x)) {
          continue;
      }
      _xLen = ((localStorage[_x].length + _x.length) * 2);
      _lsTotal += _xLen;
      //console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB")
  };
  console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
  //max of _lsTotal = 10400008
  console.log('localStorage: ' + (_lsTotal / _lsMax * 100).toFixed(2) + '% used');
  //return (_lsTotal / _lsMax * 100).toFixed(2) + '% used';
  document.querySelector('#' + jiraNoteKey + 'Used').innerText = (_lsTotal / _lsMax * 100).toFixed(2) + '% used';

}

function searchJiraNote() {
  console.log('searchJiraNote()');

  if (document.querySelector('#jiraNoteSearchContainer')) {
    document.querySelector('#jiraNoteSearchContainer').remove();
  }

  let qs = prompt('Enter a key word');
  if ((qs = qs.toLowerCase().trim()).length < 1) throw new Error;

  console.log('qs:'+qs);

  var localStorageJiraNote = localStorage.getItem(jiraNoteKey);
  var jiraNoteObj = JSON.parse(localStorageJiraNote);

  //let qs = 'illustrator';
  let result = [];

  if (jiraNoteObj !== null || jiraNoteObj !== undefined) {
      for (var i = jiraNoteObj.length - 1; i >= 0; i--) {
        let text = jiraNoteObj[i].contents.toLowerCase();
        if (text.includes(qs.toLowerCase())) {
            result.push(jiraNoteObj[i].id);
        }
      };
      console.log('search result:'+result);

      //display result
      let textArea = '<div id="jiraNoteSearchContainer" style="margin-top:20px;background-color:rgba(183, 240, 247, 0.5);padding:4px;">';
      textArea += `<h4>Jira Note Search result for '${qs}'</h4>`;
      textArea += `<p>`;
      for (let i = 0; i < result.length; i++){
        textArea += `<a href="https://jira.corp.adobe.com/browse/${result[i]}" target="_blank">${result[i]}</a><br />`;
      }
      textArea += `</p>`;
      textArea += '</div>';
  
      let elem = document.querySelector('#jiraNoteSubContainer');
      elem.insertAdjacentHTML('afterbegin', textArea);



      
  };

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

        let textArea = '<div id="jiraNoteContainer" style="margin-top:20px;">';
        textArea += '<h4>Jira Note</h4><textarea id="'+jiraNoteKey+'" name="'+jiraNoteKey+'" rows="4" cols="50" class="" style="height: '+heightTextArea+'px; width: 100%; background-color:#000;color:#FFF" onchange="saveJiraNote();" onkeyup="saveJiraNote();" placeholder="Make your note at here."></textarea>';
        //textArea += '<input class="button aui-button aui-button-primary" type="button" value="Save" onclick="saveJiraNote2();">';
        textArea += '<input class="button aui-button aui-button-primary" type="button" value="Search" onclick="searchJiraNote();">';
        textArea += '<input class="button aui-button aui-button-secondary" type="button" value="Export" onclick="exportJiraNote();">';
        textArea += '<input class="button aui-button aui-button-secondary" type="button" value="Import" onclick="importJiraNote();">';
        textArea += '<span id="'+jiraNoteKey+'Used" style="color: grey;margin-left: 12px;">xx% used</span>';
        textArea += '<div id="'+jiraNoteKey+'SubContainer"></div>';
        textArea += '</div>';

        let targetPosition = document.getElementById("viewissuesidebar");
        targetPosition.insertAdjacentHTML('beforeend', textArea);

        if (ticketId != '') {
            loadJiraNote();
        };

    }, waiting);

});


//})();
