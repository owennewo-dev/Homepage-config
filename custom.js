function createObserver() {
  // calling this on init to get style updated first time
  updateDownSitePanelStatus();

  // select the target node, referencing the id parameter from the service definition
  const downSitePanel = document.getElementById("truenas-scale").querySelector(".service-container").children[1];

  // create an observer instance
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "characterData") {
        updateDownSitePanelStatus();
      }
    });
  });

  const config = {
    subtree: true,
    characterData: true,
  };

  // pass in the target node and observer options
  observer.observe(downSitePanel, config);
}

function updateDownSitePanelStatus() {
  const downSitePanel = document.getElementById("truenas-scale").querySelector(".service-container").children[1];

  const siteDownCount = parseInt(downSitePanel.children[0].textContent);

  if (siteDownCount > 0) {
    if (!downSitePanel.classList.contains("down-bg")) {
      downSitePanel.classList.add("down-bg");
    }
  } else {
    if (downSitePanel.classList.contains("down-bg") || isNaN(siteDownCount)) {
      downSitePanel.classList.remove("down-bg");
    }
  }
}

setTimeout(createObserver, 1000); // band-aid, use as needed - sometimes would fire too early without the timeout
//createObserver();
