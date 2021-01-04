chrome.browserAction.onClicked.addListener(function(activeTab) {
  chrome.tabs.executeScript(activeTab.id, {
    code:`$(".property-thumbnail-feature > a").map(function(i, obj) {
      const url = $(this).attr('href');
      const fullUrl = window.location.origin + url
      return fullUrl
    });`
  }, accomodationUrls);


  // $(".property-thumbnail-feature").each(function(i, obj) {
  //   $(".a-more-detail").each(function(i, obj) {
  //     const url = $(".a-more-detail:first").attr('href');
  //
  //   };
  //   const ok = $(".a-more-detail:first").attr('href');
  //   console.log(ok)
  //   $(this).find(".a-more-detail").text();
  //   chrome.tabs.create({ url: `${window.location.hostname}${url}` });
  // })
});

function accomodationUrls(urls) {
  console.log('accomodationUrls')
  console.log(urls)
  console.log(urls[0])
  console.log('accomodationUrls')

  const url = urls[0][0]
  chrome.tabs.create({ url: url, active: false }, function(tab){ getSurfaceArea(tab.id)});


  // Object.values(urls[0]).forEach(function(url) {
  //   if (typeof url === 'string') {
  //     chrome.tabs.create({ url: url, active: false }, function(tab){ getSurfaceArea(tab.id)});
  //   }
  // });
}

function getSurfaceArea(tabId) {
  chrome.tabs.onUpdated.addListener(function (tabId , info) {
    if (info.status === 'complete') {
      chrome.tabs.executeScript(tabId, { code: `$(".psm:first").text()` }, okok);
    }
  });
}

function okok(area) {
  chrome.tabs.query({ active: true }, function (tabs) {
    console.log(tabs)
    chrome.tabs.sendMessage(tabs[0].id, { parameter: area });
  });


  // Object.values(urls[0]).forEach(function(url) {
  //   if (typeof url === 'string') {
  //     chrome.tabs.create({ url: url, active: false }, function(tab){ console.log(tab.id)});
  //   }
  // });
}
