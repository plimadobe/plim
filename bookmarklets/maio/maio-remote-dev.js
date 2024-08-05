(function() {
  const appInfo = 'Milo All in One ver 0.13';

  'use strict';
  //throw 'throw';

  console.log(appInfo);
  console.log('document.URL: ' + document.URL);
  //let currentUrl = window.location.href;
  let currentUrl = document.URL;

  let checkPageType = function() {
      if (currentUrl.includes('adobecom.hlx')) {
          return 'miloPage';
      //} else if (currentUrl.includes('adobe.sharepoint.com/:')) {
      } else if (currentUrl.includes('adobe.sharepoint.com/:') || (currentUrl.includes('adobe.sharepoint.com/sites/adobecom') && currentUrl.includes('Doc.aspx'))) {
          return 'sharepointPage';
      } else if (currentUrl.includes('adobe.sharepoint.com/sites/adobecom') && (!currentUrl.includes('Doc.aspx'))) {
          return 'sharepointDrive';
      } else if (currentUrl.includes('milo.adobe.com/tools/library')) {
          return 'miloLib';
      }

  }
  let pageType = checkPageType();

  let country = function() {
      let countries = ['ar','br','ca','ca_fr','cl','co','cr','ec','gt','la','mx','pe','pr','au','africa','be_fr','be_en','be_nl','dk','de','ee','eg_en','eg_ar','es','fr','gr_en','gr_el','ie','il_en','it','kw_en','kw_ar','lv','lt','lu_de','lu_en','lu_fr','hu','mena_en','nl','ng','no','pl','pt','qa_en','qa_ar','ro','sa_en','ch_de','si','sk','za','ch_fr','fi','se','ch_it','tr','ae_en','uk','at','cz','bg','ru','ua','il_he','ae_ar','mena_ar','sa_ar','au','hk_en','in','id_id','id_en','my_ms','my_en','nz','ph_en','ph_fil','sg','th_en','vn_en','vn_vi','in_hi','th_th','cn','hk_zh','tw','jp','kr'];
      let ta = currentUrl.split('/');
      if (countries.includes(ta[3])) {
          return ta[3];
      } else {
          return 'us';
      }

  }

  let addMiloPath = function() {
      var infoUrl = _wopiContextJson.ParentFolderFullUrl;
      infoUrl = infoUrl.replace(/ /g, " ");
      var tArr = infoUrl.split('/');
      infoUrl = 'https://adobe.sharepoint.com/sites/' + tArr[4] + '/' + tArr[5] + '/Forms/AllItems.aspx?ga=1&id=/';
      tArr.shift();
      tArr.shift();
      tArr.shift();
      infoUrl += tArr.join('/');
      var displayText = _wopiContextJson.ParentFolderFullUrl + '/' + _wopiContextJson.FileName;
      tArr = displayText.split('/');
      tArr.shift();
      tArr.shift();
      tArr.shift();
      displayText = '/' + tArr.join('/');
      var infoHtml = '<span id="maioFolderInfo"><a href="' + infoUrl + '" target="_blank">Path: ' + displayText + '</span>';
      if (document.querySelector('body > helix-sidekick') === null) {
          prompt(displayText, infoUrl);
          console.log(displayText);
          console.log(infoUrl);
      } else {
          document.querySelector('#maioContainer').insertAdjacentHTML("afterbegin", infoHtml);

      };

  }

  let addToolsSharepointPage = function() {

  }

  let addToolsSharepointDrive = function() {

  }

  let addToolsMiloLib = function() {

  }

  let watchHelixSidekick = function() {
      // Select the target node
      const targetNode = document.body;

      // Options for the observer (which mutations to observe)
      const config = { childList: true, subtree: true };

      // Callback function to execute when mutations are observed
      const callback = function(mutationsList, observer) {
          for(const mutation of mutationsList) {
              if (mutation.type === 'childList') {
                  mutation.addedNodes.forEach(node => {
                      if (node.tagName && node.tagName.toLowerCase() === 'helix-sidekick') {
                          console.log('The "helix-sidekick" tag was created!');
                          // Do something when the 'helix' tag is created

                          setTimeout(() => {
                              main();
                          }, 2000);
                      }
                  });
              }
          }
      };

      // Create an observer instance linked to the callback function
      const observer = new MutationObserver(callback);

      // Start observing the target node for configured mutations
      observer.observe(targetNode, config);

  }

  let watchMiloLib = function() {
      // Select the target node
      const targetNode = document.body;

      // Options for the observer (which mutations to observe)
      const config = { childList: true, subtree: true };

      // Callback function to execute when mutations are observed
      const callback = function(mutationsList, observer) {
          for(const mutation of mutationsList) {
              if (mutation.type === 'childList') {
                  mutation.addedNodes.forEach(node => {
                      //if (node.tagName && node.tagName.toLowerCase() === 'helix-sidekick') {
                      if (document.querySelector('body > helix-sidekick').shadowRoot.querySelector('hlx-sk-palette-library')) {
                          //document.querySelector('body > helix-sidekick').shadowRoot.querySelector('hlx-sk-palette-library')
                          console.log('### Milo Lib Loaded! ###');
                          // Do something when the 'helix' tag is created
                          //main();

                      }
                  });
              }
          }
      };

      // Create an observer instance linked to the callback function
      const observer = new MutationObserver(callback);

      // Start observing the target node for configured mutations
      observer.observe(targetNode, config);

  }

  let addBottom = function() {
      let scriptString = `
      function maioFooterToggle() {
          let w = document.querySelector('#maioFooter').style.width;
          if (w === '100%') {
              document.querySelector('#maioContainer').style.display = 'none';
              document.querySelector('#maioFooter').style.width = '80px';
          } else {
              document.querySelector('#maioContainer').style.display = 'table';
              document.querySelector('#maioFooter').style.width = '100%';
          }

      }
      `;

      var scriptElement = document.createElement( "script" );
      scriptElement.type = "text/javascript";
      scriptElement.id = "maioRuntime";
      //scriptElement.src = "data:text/plain;base64,aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoImJvZHkgPiBoZWxpeC1zaWRla2ljayIpLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcigiI21pbG9Gb2xkZXJJbmZvIikgPT09IG51bGwpIHtkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCJib2R5ID4gaGVsaXgtc2lkZWtpY2siKS5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoImRpdi5obHgtc2sgPiBkaXYucGx1Z2luLWNvbnRhaW5lciIpLmluc2VydEFkamFjZW50SFRNTCgiYmVmb3JlZW5kIiwgaW5mb0h0bWwpO307";
      scriptElement.src = "data:text/plain;base64," + btoa(scriptString);
      document.body.appendChild( scriptElement );


      console.log('addBottom()');
      let footerHtml = `
<div id='maioFooter' class='maioFooter'>
<div id='maioContainer'></div><span id='maioFooterToggle'>Milo AIO <</span>
</div>
      `;
      document.querySelector('body').insertAdjacentHTML('beforeend', footerHtml);

      document.querySelector('#maioFooterToggle').addEventListener('click', function() {
          let w = document.querySelector('#maioFooter').style.width;
          if (w === '100%'|| !w) {
              document.querySelector('#maioContainer').style.display = 'none';
              document.querySelector('#maioFooter').style.width = '40px';
              document.querySelector('#maioFooter').style.bottom = '35px';
              document.querySelector('#maioFooterToggle').innerText = 'M';
              document.querySelector('#maioFooterToggle').classList.add('maioCircle');
          } else {
              document.querySelector('#maioContainer').style.display = 'table';
              document.querySelector('#maioFooter').style.width = '100%';
              document.querySelector('#maioFooter').style.bottom = '0';
              document.querySelector('#maioFooterToggle').innerText = 'Milo AIO <';
              document.querySelector('#maioFooterToggle').classList.remove('maioCircle');
          }

      });

  }

  let addButton = function(title, id) {
      console.log(`addButton('${title}', '${id}')`);
      let htmlString = `<span><button title='${title}' id='${id}' class='maioButton'>${title}</button></span>`;
      if (document.querySelector('#maioContainer')) {
          document.querySelector('#maioContainer').insertAdjacentHTML('beforeend', htmlString);
          return true;
      } else {
          console.log('Check #maioContainer');
          return false;
      }

  }

  let addLinkLib = function() {
      if (addButton('Library', 'maioLinkLib')) {
          document.querySelector('#maioLinkLib').addEventListener('click', function() {
              window.open('https://milo.adobe.com/tools/library', '_blank');
          });
      }
  }

  let addLocalLink = function() {
      if (addButton('Find Local link', 'maioLocalLink')) {
          document.querySelector('#maioLocalLink').addEventListener('click', function() {
              //do something for this button
              console.log('country: '+country());
              let currentCountry = country();
              let commerceCountry = currentCountry.toUpperCase();


              setInterval(function() {
                  let els = document.querySelectorAll('a[href*="/' + currentCountry + '/"], a[href*="=' + commerceCountry + '"], a[href^="#"]');
                  for (let i = 0;i < els.length;i++) {
                      if (els[i].classList.contains('CMY_Valid')) {
                          els[i].classList.remove('CMY_Valid');
                      } if (els[i].classList.contains('CMY_Link')) {
                          els[i].classList.remove('CMY_Link');
                      } if (els[i].classList.contains('CMY_Redirect')) {
                          els[i].classList.remove('CMY_Redirect');
                      }
                      els[i].style.backgroundColor = 'orange';
                      els[i].style.color = 'red';
                  }
              }, 2000);

          });
      }


  }


  let addLinkFinder = function() {
      if (addButton('Link finder', 'maioLinkFinder')) {
          document.querySelector('#maioLinkFinder').addEventListener('click', function() {
              //do something for this button
              let sType = prompt('1 : Starting with\n2 : Ending with\n3 : Containing');
              if (sType == 1) {
                  sType = '^';
              } else if (sType == 2) {
                  sType = '$';
              } else if (sType == 3) {
                  sType = '*';
              }
              let tURL = prompt('Enter the part of link URL');
              setInterval(function() {
                  let els = document.querySelectorAll('a[href' + sType + '="' + tURL + '"]');
                  for (let i = 0; i < els.length; i++) {
                      if (els[i].classList.contains('CMY_Valid')) {
                          els[i].classList.remove('CMY_Valid');
                      }
                      if (els[i].classList.contains('CMY_Link')) {
                          els[i].classList.remove('CMY_Link');
                      }
                      els[i].style.backgroundColor = 'orange';
                      els[i].style.color = 'red';
                  }
              }, 2000);
          });
      }


  }

  let addStageToggle = function() {
      let buttonText = '', newUrl = '';
      if (currentUrl.includes('//main--')) {
          newUrl = currentUrl.replace('//main--', '//stage--');
          buttonText = 'Stage';
      } else if (currentUrl.includes('//stage--')) {
          newUrl = currentUrl.replace('//stage--', '//main--');
          buttonText = 'Main';
      }
      if (addButton(buttonText, 'maioStageToggle')) {
          document.querySelector('#maioStageToggle').addEventListener('click', function() {
              //do something for this button
              window.open(newUrl, '_blank');
          });
      }


  }

  let addLivePage = function() {
    if (addButton('Live', 'maioLivePage')) {
      document.querySelector('#maioLivePage').addEventListener('click', function() {
        //do something for this button
        let cHostname = window.location.hostname;
        let cPathname = window.location.pathname;
        let cSearch = window.location.search;
        let nHostname = 'www.adobe.com';
        if (cHostname.includes('bacom')) {
            nHostname = 'business.adobe.com';
        }
        if (cSearch) {
            cSearch += '&ts=' + Date.now();
        } else {
            cSearch = '?ts=' + Date.now();
        }
        if (cPathname.includes('.html')) {
            window.open('https://' + nHostname + cPathname + cSearch, '_blank');
        } else {
            window.open('https://' + nHostname + cPathname + '.html' + cSearch, '_blank');
        }
      });
    }


  }

  let addResizeMiloLib = function() {
      console.log('addResizeMiloLib()');
      if (addButton('Resize Milo Lib', 'maioResizeLib')) {
          document.querySelector('#maioResizeLib').addEventListener('click', function() {
              //do something for this button
              if (document.querySelector('body > helix-sidekick').shadowRoot.querySelector('#hlx-sk-palette-library')) {
                  document.querySelector('body > helix-sidekick').shadowRoot.querySelector('#hlx-sk-palette-library').style.height = '60vh';
                  document.querySelector('body > helix-sidekick').shadowRoot.querySelector('#hlx-sk-palette-library').style.bottom = '40px';
              } else {
                  alert('Load Milo Lib first.');
              }
          });
      }

  }

  let addPathChanger = function() {
      console.log('addPathChanger()');
      if (addButton('Change path', 'maioPathChanger')) {
          document.querySelector('#maioPathChanger').addEventListener('click', function() {
              //do something for this button
              var cUrl = window.location.href;
              var er = function() {
                  var msg = "Oops, it's unsupported path. Copy the current URL then contact plim@adobe.com.";
                  console.log(msg);
                  console.log(cUrl);
                  alert(msg);
                  return !1;
              };
              if (!cUrl.split('?')[0]) {
                  er();
              }
              var nUrl = cUrl.split('?')[0] + '?';
              var path, pathId, params, mode = '_self';
              if (!cUrl.split('?')[1]) {
                  alert('Try to run at a child level.');
                  return !1;
              }
              params = cUrl.split('?')[1].split('&');
              if (cUrl.includes('id=%2')) {
                  pathId = 'id=';
              } else if (cUrl.includes('RootFolder=%2')) {
                  pathId = 'RootFolder=';
              } else {
                  er();
              }
              for (var i = 0; i < params.length; i++) {
                  if (params[i].includes(pathId + '%2')) {
                      path = decodeURIComponent(params[i].split('=')[1]);
                      path = prompt('Type new path. \nTo open new Window, add " \\n" at the end of tha path.', path);
                      if (!path) {
                          return !1;
                      }
                      if (path.includes('\\n')) {
                          mode = '_blank';
                          path = path.replaceAll('\\n', '').trim();
                      }
                      nUrl += pathId + encodeURIComponent(path) + '&';
                  } else {
                      nUrl += params[i] + '&';
                  }
              }
              window.open(nUrl.slice(0, -1), mode);
          });
      }


  }
  let getMiloName = function(s='') {
      let ta = ['_', '.' ,',', ' '];
      s = s.toLowerCase();
      s = s.replace('.docx', '');
      ta.forEach((x, i) => {
          s = s.replaceAll(x, '-');
      });

      return s;
  }
  let getRepoPrompt = function(s='') {
              var repo = prompt(s+`\nType \n"c" for cc, \n"d" for dc, \n"b" for bacom, \n"e" for express, \n"h" for homepage, \n"m" for milo \nOr enter repository name.`);
              repo = repo.replace(/\s/g, '');
              switch (repo) {
                  case 'c':
                      repo = 'cc';
                      break;
                  case 'd':
                      repo = 'dc';
                      break;
                  case 'b':
                      repo = 'bacom';
                      break;
                  case 'e':
                      repo = 'express';
                      break;
                  case 'h':
                      repo = 'homepage';
                      break;
                  case 'm':
                      repo = 'milo';
                      break;
                  default:
                      repo = repo;
              }

      return repo;

  }

  let addMultiViewOpener = function() {
      console.log("addMultiViewOpener()");
      if (addButton('View multiple pages', 'maioMultiViewOpener')) {
          document.querySelector('#maioMultiViewOpener').addEventListener('click', function() {
              //do something for this button
              var repo = getRepoPrompt();
              var breadcrumbs = [];
              for (var i = 0; i < document.querySelectorAll("div.ms-Breadcrumb > div > ol > li").length; i++) {
                  breadcrumbs.push(document.querySelectorAll("div.ms-Breadcrumb > div > ol > li")[i].querySelector("div.ms-TooltipHost > div").textContent.trim());
              };
              var pUrl = 'https://main--' + repo + '--adobecom.hlx.page';
              for (let i = 2; i < breadcrumbs.length; i++) {
                  pUrl += '/' + breadcrumbs[i];
              };
              var collection = document.getElementsByClassName("is-selected");
              for (let i = 0; i < collection.length; i++) {
                  let fileName, previewURL;
                  try {
                      fileName = collection[i].querySelector("div > div > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(1) > span > span > button").textContent;
                  } catch (err) {
                      fileName = collection[i].querySelector("div > div > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(1) > span > span > button").textContent;
                  };
                  fileName = fileName.toLowerCase();
                  let ta = fileName.split('.docx');
                  /*
                  ta[0] = ta[0].replace(/[_., ]/g, function(m) {
                      return {'_':'-','.':'-',',':'-',' ':'-'}[m];
                  });
                  */
                  ta[0] = getMiloName(ta[0]);


                  if (ta[0] == 'index') {
                      previewURL = pUrl + '/';
                  } else {
                      previewURL = pUrl + '/' + ta[0];
                  }
                  console.log(previewURL);
                  window.open(previewURL, '_blank');
              };

          });

      }



  }

  let addMiloBlockInfo = function() {
      console.log('addMiloBlockInfo()');
      addButton('Block Info', 'maioBlockInfo');
      document.querySelector('#maioBlockInfo').addEventListener('click', function() {
          //do something for this button
          if (document.querySelector('.miloBlockInfo')) {
              let blocks = document.querySelectorAll('.miloBlockInfo');
              for (let i = 0; i < blocks.length; i++) {
                  blocks[i].remove();
              }
          } else {
              let libUrl = 'https://main--milo--adobecom.hlx.page/docs/library/blocks/';
              let blocks = document.querySelectorAll('.section > div');
              let style = 'padding: 2px; background-color:#ffc170; font-size: 0.75em;z-index: 9999;';
              for (let i = 0; i < blocks.length; i++) {
                  let blockName = blocks[i].className.replace(/ .*/,'');
                  let classes = '<b>' + blocks[i].className;
                  classes = classes.replace(' ', '</b> ');
                  blocks[i].insertAdjacentHTML('afterbegin', `<span class='miloBlockInfo' style='${style}'>${classes} <a href='${libUrl}${blockName}' target='_blank'>@lib</a></span>`);
              }
          }
      });

  }

  let addOpenLangstore = function() {
    if (!window.location.href.includes('/langstore/')) {
      console.log('addOpenLangstore()');
      addButton('Langstore', 'maioOpenLangstore');
      document.querySelector('#maioOpenLangstore').addEventListener('click', function() {
        let countryFolerLangstoreMap = {'uk':'en-gb', 'au':'en-gb', 'africa':'en-gb', 'be_en':'en-gb', 'cy_en':'en-gb', 'gr_en':'en-gb', 'hk_en':'en-gb', 'i.e.':'en-gb', 'in':'en-gb', 'lu_en':'en-gb', 'mt':'en-gb', 'nz':'en-gb', 'sg':'en-gb', 'my_en':'en-gb', 'kw_en':'en-gb', 'qa_en':'en-gb', 'eg_en':'en-gb', 'ng':'en-gb', 'za':'en-gb', 'ca_fr':'fr-ca', 'ar':'es-419', 'la':'es-419', 'mx':'es-419', 'pe':'es-419', 'cl':'es-419', 'co':'es-419', 'cr':'es-419', 'ec':'es-419', 'gt':'es-419', 'pr':'es-419', 'cn':'zh-hans', 'hk_zh':'zh-hant', 'tw':'zh-hant'}
        let pageInfo = window.aldadp.pageInfo;
        let countryFolder = pageInfo.location.pathname.split('/')[1];//kr, my_en, hk_en
        let country = countryFolder.split('_')[0];//kr, my_en, hk_en
        let currentUrl = window.location.href;
        let language = pageInfo.language.split('-')[0];//en, zh, ko
        if (countryFolerLangstoreMap[countryFolder]) language = countryFolerLangstoreMap[countryFolder];
        let langstoreUrl = currentUrl.replace('/' + countryFolder + '/', '/langstore/' + language + '/');
        window.open(langstoreUrl,'_blank');
      });
    }

  }

  let addDisplayFragments = function() {
    if (addButton('Fragments', 'maioDisplayFragments')) {
      document.querySelector('#maioDisplayFragments').addEventListener('click', function() {
        setInterval(function() {
          let fs = document.querySelectorAll('.fragment[data-path]');
          for (let i = 0; i < fs.length; i++) {
            if (!fs[i].classList.contains('maioXF')) {
              console.log(fs[i].getAttribute('data-path'));
              fs[i].classList.add('maioXF');
              let f = `<div style='background-color:yellow;color:red;position:relative;'><a href='${fs[i].getAttribute('data-path')}' target='_blank'>${fs[i].getAttribute('data-path')}</a></div>`;
              fs[i].insertAdjacentHTML('afterbegin', f)
            }
          }
          }, 2000);
              
      });

    }

  }

  let addHeadingHeighlighter = function() {
    if (addButton('Headings', 'maioHeadingHeighlighter')) {
      document.querySelector('#maioHeadingHeighlighter').addEventListener('click', function() {
        setInterval(function() {
          let headings = document.querySelectorAll('h1:not(.cMarker), h2:not(.cMarker), h3:not(.cMarker), h4:not(.cMarker), h5:not(.cMarker), h6:not(.cMarker)');
          let headingArray = [...headings];
          headingArray.forEach(heading => {
              let tn = heading.tagName;
              let fontSize = parseFloat(window.getComputedStyle(heading, null).getPropertyValue('font-size'));
              let fontFamily = window.getComputedStyle(heading, null).getPropertyValue('font-family');
              //heading.textContent = tn + ':' + heading.textContent;
              heading.textContent = tn + ':' + fontSize +'px:' + heading.textContent;
              heading.setAttribute('title', fontFamily);
              heading.style.color = '#F020D8';
              heading.classList.add('cMarker');
          });
        }, 2000);
    
      });

    }
  }

  let addSharepointOpener = function() {
    if (addButton('Sharepoint', 'maioSharepointOpener')) {
      document.querySelector('#maioSharepointOpener').addEventListener('click', function() {
        //do something for this button
        let instance = window.location.hostname.split('--')[1];
        let pathname = window.location.pathname;
        let li = pathname.lastIndexOf('/');
        pathname = pathname.substring(0, li);
        let sharepointUrl = 'https://adobe.sharepoint.com/sites/adobecom';
        switch(instance) {
          case 'cc':
            sharepointUrl += `/CC/Forms/AllItems.aspx?ga=1&id=/sites/adobecom/CC/www${pathname}`;
            break;
          case 'express':
            sharepointUrl += `/Express/Forms/AllItems.aspx?ga=1&id=/sites/adobecom/Express/website${pathname}`;
            break;
          default:
            sharepointUrl += `/Shared%20Documents/Forms/AllItems.aspx?ga=1&id=/sites/adobecom/Shared%20Documents/${instance}${pathname}`;
        }
        window.open(sharepointUrl, '_blank');

      });
    }

  }

  let addKitchenSink = function() {
      console.log('addKitchenSink()');
      addButton('Kitchen Sink', 'maioKitchenSink');


      document.querySelector('#maioKitchenSink').addEventListener('click', function() {
          //do something for this button
          var xmlhttp = new XMLHttpRequest();
          var kitchenSinkUrl = 'https://adobe.sharepoint.com/sites/adobecom/_api/web/GetListUsingPath(DecodedUrl=@a1)/RenderListDataAsStream?@a1=%27%2Fsites%2Fadobecom%2FShared%20Documents%27&RootFolder=%2Fsites%2Fadobecom%2FShared%20Documents%2Fmilo%2Fdocs%2Flibrary%2Fkitchen%2Dsink&View=d776cf70-9b7e-4ab7-b9da-9e0f8e03a7d2&TryNewExperienceSingle=TRUE';
          var obj;
          xmlhttp.onreadystatechange = function() {
              if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                  if (xmlhttp.status == 200) {
                      console.log(xmlhttp.responseText);
                      let obj = JSON.parse(xmlhttp.responseText);
                      let htmlString = '';
                      for (var i = 0; i < obj.Row.length; i++) {
                          if (obj.Row[i].FSObjType == 0) {
                              var ts = obj.Row[i].FileRef;
                              ts = ts.replace('/sites/adobecom/Shared Documents/milo', '')
                              ts = ts.replace('.docx', '');
                              console.log(ts);
                              var ta = ts.split('/');
                              ta[ta.length-1] = getMiloName(ta[ta.length-1]);
                              ts = ta.join('/');
                              ts = 'https://main--milo--adobecom.hlx.page' + ts;
                              htmlString += `<div><a href='${ts}' target='_blank'>${obj.Row[i].FileLeafRef}</a></div>`;

                              // /sites/adobecom/Shared Documents/milo
                          }

                      }
                      htmlString = '<html><head><title>Kitchen Sink</title><body>' + htmlString + '</body></html>';
                      var tab = window.open('about: blank', '_blank');
                      tab.document.write(htmlString);
                      tab.document.close();

                      //const obj = JSON.parse(xmlhttp.responseText);
                      //console.log(obj.edit.url);
                      //window.open(obj.edit.url, '_blank');
                  } else if (xmlhttp.status == 400) {
                      alert('There was an error 400');
                  } else {
                      alert('Check your log-in status for Milo repository. \nSomething else other than 200 was returned');
                  }
              }
          };
          xmlhttp.open("POST", kitchenSinkUrl, true);
          xmlhttp.send();


      });

  }

  let addDocOpener = function() {
      console.log('addDocOpener()');
      addButton('Word doc by URL', 'maioOpenWord');
      document.querySelector('#maioOpenWord').addEventListener('click', function() {
          //do something for this button
          let getEditUrl = function(reqUrl) {
              console.log(reqUrl);
              var xmlhttp = new XMLHttpRequest();
              xmlhttp.onreadystatechange = function() {
                  if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                      if (xmlhttp.status == 200) {
                          const obj = JSON.parse(xmlhttp.responseText);
                          console.log(obj.edit.url);
                          window.open(obj.edit.url, '_blank');
                      }
                      else if (xmlhttp.status == 400) {
                          alert('There was an error 400');
                      }
                      else {
                          alert('Check your Sidekick log-in status. \nSomething else other than 200 was returned');
                      }
                  }
              };
              xmlhttp.open("GET", reqUrl, true);
              xmlhttp.send();
          };
          let mUrls = prompt('Enter Milo preview URLs');
          if ((mUrls = mUrls.trim()).length < 1) throw new Error;
          var mua;
          if (mUrls.search(',') > 0) {
              mua = mUrls.split(',')
              } else {
                  mua = mUrls.split('\n');
              }
          if (mua.length > 10) throw alert('Terminate to avoid opening too many pages at once.\nDo not enter more than 10 URLs'), new Error;
          let repo = 'cc', branch = 'main';
          for (var i = 0; i < mua.length; i++) {
              if (mua[i].search('https') < 0) {
                  throw alert('Check URLs, it should start with https'), new Error;
              }

              console.log(mua[i]);
              let tA = mua[i].split('/');
              tA.shift();
              tA.shift();
              let hostName = tA.shift();
              let reqPath = '';
              for (let j = 0; j < tA.length; j++) {
                  reqPath += '/' + tA[j];
              }

              let hostNames = hostName.split('--');
              if (mua[i].search('adobecom.hlx') < 0) {
                  repo = getRepoPrompt(mua[i]);
                  //branch = prompt('Enter branch. e.g) main, stage');
              } else {
                  repo = hostNames[1];
                  //branch = hostNames[0];
              }
              branch = 'main';
              let reqUrl = 'https://admin.hlx.page/status/adobecom/' + repo + '/' + branch;
              console.log(reqPath);
              getEditUrl(reqUrl + reqPath + '?editUrl=auto');
          }

      });

  }

  let checkMaio = function() {
      if (document.querySelector('#maioFooter')) {
          return true;
      } else {
          return false;
      }
  }

  let addSeparator = function() {
    let htmlString = `<span class="maioSeparator">|</span>`;
    if (document.querySelector('#maioContainer')) {
        document.querySelector('#maioContainer').insertAdjacentHTML('beforeend', htmlString);
        return true;
    } else {
        console.log('Check #maioContainer');
        return false;
    }

  }

  let addText = function(s) {
    let htmlString = `<span class="maioSeparator">${s}</span>`;
    if (document.querySelector('#maioContainer')) {
        document.querySelector('#maioContainer').insertAdjacentHTML('beforeend', htmlString);
        return true;
    } else {
        console.log('Check #maioContainer');
        return false;
    }

  }

  let addOpenGEO = function() {
    if (addButton('GEO', 'maioOpenGEO')) {
      document.querySelector('#maioOpenGEO').addEventListener('click', function() {
        let tcc = prompt(`Options \n1. Click OK to open US page.\n2. Enter country. Use comma separator to open multiple GEOs. e.g) au,kr`);
        tcc = tcc.replace(/\s/g, '');
        let cc = country();
        ta = tcc.split(',');
        for (let i = 0; i < ta.length; i++) {
            if (cc === 'us') {
                if (ta[i] !== 'us' && ta[i] !== '') {
                    let tUrl = currentUrl.split('/');
                    tUrl.splice(3, 0, ta[i]);
                    window.open(tUrl.join('/'), "_blank");
        
                }
            } else {
                if (ta[i] === '' || ta[i] === 'us') {
                    window.open(currentUrl.replace('/' + cc + '/', '/'), "_blank");
                } else {
                    window.open(currentUrl.replace('/' + cc + '/', '/' + ta[i] + '/'), "_blank");
                }
            }
        }
            
      });

    }

  }

  let addDynamicPrice = function() {
    if (addButton('Dynamic Price', 'maioDynamicPrice')) {
      document.querySelector('#maioDynamicPrice').addEventListener('click', function() {
        let overlay = document.createElement("div");
        overlay.setAttribute("class", "maioPriceOverlay");
        document.body.appendChild(overlay);
        let dps = document.querySelectorAll('.placeholder-resolved');
        for (let i = 0; i < dps.length; i++) {
            dps[i].style.backgroundColor = 'lightgreen';
            dps[i].addEventListener("click", (e) => {
                let t = e.target.closest("[data-wcs-osi].placeholder-resolved");
                document.querySelector('.maioPriceOverlay').style.left = (e.clientX) + 'px';
                document.querySelector('.maioPriceOverlay').style.top = (e.clientY + 30) + 'px';
                if (!t) return;
                let {
                    offerSelectorIds: [r],
                    offerId: o,
                    productArrangement: {
                        productFamily: l
                    },
                    productArrangementCode: i,
                    planType: n,
                    offerType: a,
                    customerSegment: d,
                    marketSegments: [s],
                    pricePoint: y,
                    language: p
                } = t.value[0];
                let overlayDiv = document.querySelector(".maioPriceOverlay");
                let newHtml = '<strong>Offer Selector ID:</strong> ' + [r];
                newHtml += '<br /><strong>Offer ID:</strong> ' + o;
                newHtml += '<br /><strong>Offer Type:</strong> ' + a;
                newHtml += '<br /><strong>Plan Type:</strong> ' + n;
                newHtml += '<br /><strong>Customer Segment:</strong> ' + d;
                newHtml += '<br /><strong>Market Segment:</strong> ' + [s];
                newHtml += '<br /><strong>PA Code:</strong> ' + i;
                newHtml += '<br /><strong>Product Family:</strong> ' + l;
                newHtml += '<br /><strong>Price Point:</strong> ' + y;
                newHtml += '<br /><strong>Language:</strong> ' + p;
                newHtml += '<div class="maioPriceOverlayClose" onclick=\'document.querySelector(".maioPriceOverlay").style.opacity=0;\'>X</div>';
                overlayDiv.innerHTML = newHtml;
                if (overlayDiv.style.opacity === '0' || overlayDiv.style.opacity === '') {
                    overlayDiv.style.opacity = 1;
                };
            });
        };
            
      });

    }

  }

  let main = function() {

      console.log('main() Page Type:' + pageType);
      if (checkMaio()) {
          console.log('Ignored main(). Already loaded.' + pageType);
          return true;
      }
      //console.log('page123:'+_wopiContextJson.ParentFolderFullUrl);
      switch (pageType) {
          case 'miloPage':
              addBottom();
              setTimeout(() => {
                  addText('Open:');
                  addSharepointOpener();
                  addOpenLangstore();
                  addOpenGEO();
                  addStageToggle();
                  addLivePage();
                  addDocOpener();

                  addSeparator();

                  addText('Tools:');
                  addLocalLink();
                  addLinkFinder();
                  //addGeoOpener();
                  addMiloBlockInfo();
                  addDisplayFragments();                  
                  addHeadingHeighlighter();
                  addDynamicPrice();
              }, 1000);


              break;

          case 'sharepointPage':
              addBottom();
              setTimeout(() => {
                  addMiloPath();
                  //addLinkLib();
                  addResizeMiloLib();
                  watchMiloLib();
                  addDocOpener();
                  addKitchenSink();
              }, 1000);

              break;

          case 'sharepointDrive':
              addBottom();
              addMultiViewOpener();
              addDocOpener();
              addPathChanger();

              break;

          default:
              console.log(`Out of scope`);
      }

  }

  if (pageType === 'miloLib') {
      //mainLib();
  } else {
      watchHelixSidekick();

  }


})();
