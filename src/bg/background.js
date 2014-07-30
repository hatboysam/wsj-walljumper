var REFERER_KEY = 'Referer';
var REFERER_VAL = 'https://www.google.com';
var COOKIE_KEY = 'Cookie';

chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    console.log('BEFORE');
    console.log(details.requestHeaders);
    // Check for existing 'Referer' or 'Cookie' header
    var foundHeader = false;
    for (var i = 0; i < details.requestHeaders.length; i++) {
      if (details.requestHeaders[i].name === REFERER_KEY) {
        console.log('CHANGING REFERER');
        details.requestHeaders[i].value = REFERER_VAL;
        foundHeader = true;
      }

      if (details.requestHeaders[i].name === COOKIE_KEY) {
        console.log('REMOVING COOKIE');
        details.requestHeaders.splice(i, 1);
      }
    }

    // Insert referer if we didn't find it
    if (!foundHeader) {
      console.log('ADDING REFERER');
      details.requestHeaders.push({ name: REFERER_KEY, value: REFERER_VAL });
    }

    console.log('AFTER');
    console.log(details.requestHeaders);

    // Return modified
    return { requestHeaders: details.requestHeaders };
  }, 
  { urls: ["*://*.wsj.com/*"] },
  ["blocking", "requestHeaders"]);