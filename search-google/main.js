// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// When you specify "type": "module" in the manifest background,
// you can include the service worker as an ES Module,  

// Add a listener to create the initial context menu items,
// context menu items only need to be created at runtime.onInstalled
chrome.runtime.onInstalled.addListener(async () => {
    chrome.contextMenus.create({
      id: 'search-google',
      title: 'Search "%s" on Google',
      contexts: ['selection'],
      type: 'normal',
    });
});

chrome.contextMenus.onClicked.addListener((item, tab) => {
  const id = item.menuItemId;
  if (id === 'search-google'){
    let url = new URL(`https://google.com/search`)
    url.searchParams.set('q', item.selectionText)
    chrome.tabs.create({ url: url.href, index: tab.index + 1 });
  }
});
