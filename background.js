chrome.browserAction.onClicked.addListener(function(activeTab) {
  chrome.tabs.executeScript(activeTab.id, {
    code:`$(".property-thumbnail-feature > a").map(function(i, obj) {
      const url = $(this).attr('href');
      const fullUrl = window.location.origin + url
      return fullUrl
    });`
  }, accomodationUrls);
});

function accomodationUrls(urls) {
  // const url = urls[0][0]
  // chrome.tabs.create({ url: url, active: false }, function(tab){ getSurfaceArea(tab.id)});

  // Object.values(urls[0]).forEach(function(url) {
  //   if (typeof url === 'string') {
  //     (function () {
  //       setTimeout(function () {
  //         chrome.tabs.create({ url: url, active: false }, function(tab){ getSurfaceArea(tab.id)});
  //       }, 1000);
  //     })();
  //   }
  // });

  var urls = Object.values(urls[0]);
  for (var i = 0; i < urls.length; i++) {
      (function (i) {
          setTimeout(function () {
            console.log(urls[i])
            chrome.tabs.create({ url: urls[i], active: false }, function(tab){ getSurfaceArea(tab.id)});
          }, 3000 * i);
      })(i);
  };
}

function getSurfaceArea(tabId) {
  chrome.tabs.onUpdated.addListener(function (tabId , info) {
    chrome.tabs.executeScript(tabId, { code: `[$(".psm:first").text(), ${tabId}]` }, test);
  });
}

function test(data) {
  if(data[0] != null) {
    if(data[0][0] != "") {
      chrome.tabs.executeScript(data[0][1], { code: `[$(".psm:first").text(), $(".sharethis").attr("data-mlsnumber")]` }, okok);
      chrome.tabs.remove(data[0][1], function() { });
    }
  }
}

function okok(data) {
  chrome.tabs.query({ active: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { data: data });
  });
}
