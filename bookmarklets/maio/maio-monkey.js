// ==UserScript==
// @name         Milo All-in-ONE remote
// @namespace    http://tampermonkey.net/
// @version      0.12
// @description  try to take over the world!
// @author       You
// @match        https://milo.adobe.com/tools/library*
// @match        https://*.hlx.page/*
// @match        https://adobe.sharepoint.com/:w:/r/sites/adobecom/_layouts/15/Doc.aspx?sourcedoc=*
// @match        https://adobe.sharepoint.com/:x:/r/sites/adobecom/_layouts/15/Doc.aspx?sourcedoc=*
// @match        https://adobe.sharepoint.com/sites/adobecom*
// @grant        GM_addElement
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @icon         https://www.google.com/s2/favicons?sz=64&domain=adobe.com
// ==/UserScript==
(function() {

  'use strict';

      GM_addStyle(`
  .sk-library {
    height: 100vh !important;

  }

  .sk-library .block-group-list > li {
    border-bottom: 1px solid #c2ff51;
  }
`);

  console.log(GM_info.script.name + ' ver ' + GM_info.script.version);

  //BEGIN Calling MAIO
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.charset = 'utf-8';
  script.src = 'https://main--plim--plimadobe.hlx.page/bookmarklets/maio/maio-remote.js';
  script.id = 'maio-js';
  head.appendChild(script);

  script = document.createElement('link');
  script.rel = 'stylesheet';
  script.href = 'https://main--plim--plimadobe.hlx.page/bookmarklets/maio/maio-remote.css';
  script.id = 'maio-css';
  head.appendChild(script);
  //END Calling MAIO


  //BEGIN MILO LIB
  let waitForLazyElem = function(options) {
      try {
          const initialElemCheck = document.querySelector(options.elem);
          if (initialElemCheck) {
              options.callback(initialElemCheck);
          } else {
              var observer = new MutationObserver(() => {
                  console.log(`waitForLazyElem: "${options.elem}" loaded`);
                  const elemCheck = document.querySelector(options.elem);
                  if (elemCheck) {
                      options.callback(elemCheck);
                      observer.disconnect();
                  }
              });
              const container = document.querySelector(options.elemContainer);
              if (container) {
                  console.log(`waitForLazyElem found elemContainer: ${options.elemContainer} and attaching the observer.`);
                  observer.observe(container, {
                      childList: true,
                      subtree: true,
                  });
              } else {
                  console.log(`waitForLazyElem could not find elemContainer: ${options.elemContainer}`, 'policelight');
              }
          }
      } catch (e) {
          console.log(`waitForLazyElem errored: ${options.elemContainer}. Error:\n${e}`, 'policelight');
      }
  }

  let updateBlocks = function() {
      console.log('updateBlocks()');
      let blocks = document.querySelectorAll('ul.block-group-list > li > p');
      console.log('Adding images - Block length: ' + blocks.length);
      for (var i = 0; i < blocks.length; i++) {
          blocks[i].addEventListener('click', (e) => {
              //console.log('Clicked: ' + e.target.innerText.trim());
              //callLib(e.target.parentNode.parentNode.previousSibling);
          });

          var fileName = blocks[i].innerText.trim();
          fileName = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
          console.log(fileName);

          //blocks[i].insertAdjacentHTML('afterend', '<img src="https://main--plim--plimadobe.hlx.page/bookmarklets/maio/img/' + fileName + '.jpg" />');
          //blocks[i].insertAdjacentHTML('afterend', '<img src="https://main--plim--plimadobe.hlx.page/bookmarklets/maio/img/' + fileName + '.jpg" onerror="this.style.display=\'none\';console.log(\'missing image\')"/>');
          blocks[i].insertAdjacentHTML('afterend', `<img src="https://main--plim--plimadobe.hlx.page/bookmarklets/maio/img/${fileName}.jpg" onerror="this.style.display='none';console.log('missing image:${fileName}');"/>`);

      }

  }

  let mainLib = function() {
      //do something for milo lib page
      console.log('mainLib()');
      setTimeout(() => {
          var url = 'https://milo.adobe.com/docs/library/library.json';
          let blocks = {};

          GM_xmlhttpRequest({
              method: "GET",
              responseType: "json",
              url: url,
              onload: function(response) {
                  let data = JSON.parse(response.responseText);

                  for (let i = 0; i < data.blocks.data.length; i++) {
                      blocks[data.blocks.data[i].name] = data.blocks.data[i].path;
                  }
                  init();

              }
          });

          let init = function() {
              console.log('init()');
              if (document.querySelector('#hlx-sk-palette-library')) {
                  document.querySelector('#hlx-sk-palette-library').setAttribute('style', 'height: 60vh');
              } else {
                  waitForLazyElem({
                      elem: '#hlx-sk-palette-library',
                      elemContainer: 'body',
                      callback: () => {
                          document.querySelector('#hlx-sk-palette-library').setAttribute('style', 'height: 100vh');
                      }
                  });

              }

              waitForLazyElem({
                  //block list container
                  elem: 'ul.con-type-list.con-blocks-list',
                  elemContainer: 'body',
                  callback: () => {
                      waitForLazyElem({
                          elem: 'div.allow-back button.sk-library-logo',
                          elemContainer: 'main div.library-config',
                          callback: () => {
                              document.querySelector('div.allow-back button.sk-library-logo').addEventListener('click', (e) => {
                                  console.log('Back button Clicked');
                                  alert('Milo Lib bookmarklet doesn\'t support back button. This window will be refreshed.');
                                  location.reload();
                              });

                          }
                      });

                      waitForLazyElem({
                          elem: 'li.block-group, ul.block-group-list',
                          elemContainer: 'ul.con-type-list.con-blocks-list',
                          callback: () => {
                              waitForLazyElem({
                                  elem: 'ul.block-group-list li > p',
                                  elemContainer: 'ul.block-group-list',
                                  callback: () => {
                                      var intervalCount = 0, blockLength = -1;
                                      var intervalId = window.setInterval(function(){
                                          // call your function here
                                          if (blockLength === document.querySelectorAll('ul.block-group-list li > p').length) {
                                              intervalCount++;
                                          } else {
                                              blockLength = document.querySelectorAll('ul.block-group-list li > p').length;
                                          }

                                          if (intervalCount > 3) {
                                              clearInterval(intervalId);
                                              //addEventBlocks();
                                              updateBlocks();
                                          }
                                      }, 150);
                                  }
                              });
                          }
                      });
                  }
              });
          };
      }, 1000);
  }

  if (document.URL.includes('milo.adobe.com/tools/library')) {
      mainLib();
  }

  //END MILO LIB

})();
