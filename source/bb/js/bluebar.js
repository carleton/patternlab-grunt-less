(function() {
  var addClass, addListener, breakpoints, cachedUrls, currBreakIdx, drawerLinks, forAreas, forLinkClicked, getContent, getTabContent, handleBreakpointOne, handleBreakpointTwo, handleDrawerContentsTabbing, handleDrawerMenuTabbing, handleForDropdownTabbing, handleResize, handleSearchFormTabbing, hasClass, isDescendantOf, isElementInViewport, loadingContent, monitorForDropdownHiding, monitorSearchFormHiding, possiblyHideForDropdown, possiblyHideSearchForm, removeClass, searchAreas, setClass, setSearchFormVisibility, setupForDropdown, setupSearchDialog, showForDropdown, toggleClass, toggleMenu;

  loadingContent = "<div class='loading'>Loading...</div>";

  if (!window.console) {
    window.console = {};
  }

  if (!window.console.log) {
    window.console.log = (function() {});
  }

  monitorSearchFormHiding = false;

  drawerLinks = [];

  searchAreas = ["bannerSearch", "bannerSearchImage", "bannerSearchDialog"];

  monitorForDropdownHiding = false;

  forAreas = ["bbForLink", "bbForArrow", "bbForList"];

  handleBreakpointOne = function(descriptor) {
    var banner, bbTabContent, child, i, j, k, len, len1, link, menu, menuContents, ref, results;
    bbTabContent = document.getElementById("bbTabContent");
    if (bbTabContent !== null) {
      bbTabContent.style.display = "none";
      toggleMenu(true);
    }
    for (i = j = 0, len = drawerLinks.length; j < len; i = ++j) {
      link = drawerLinks[i];
      menuContents = document.getElementById("menuContents" + i);
      if (menuContents !== null) {
        menuContents.style.display = "";
      }
    }
    removeClass(document.getElementById("bbFor"), "current");
    menu = document.getElementById("bbMenu");
    banner = document.getElementById("carletonBanner");
    ref = banner.children;
    results = [];
    for (k = 0, len1 = ref.length; k < len1; k++) {
      child = ref[k];
      if (hasClass(child, "closer")) {
        banner.insertBefore(menu, child);
        break;
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  handleBreakpointTwo = function(descriptor) {
    var banner, c, i, j, k, len, len1, link, mainDiv, menu, menuContents, menuWasOpen, ref, searchDiv;
    menuWasOpen = hasClass(document.getElementById("menuToggle"), "current");
    for (i = j = 0, len = drawerLinks.length; j < len; i = ++j) {
      link = drawerLinks[i];
      menuContents = document.getElementById("menuContents" + i);
      if (!menuWasOpen) {
        removeClass(link.parentNode, "current");
      }
      if (menuContents !== null) {
        menuContents.style.display = "none";
      }
      if (menuWasOpen && hasClass(link.parentNode, "current")) {
        console.log("[A] " + link.getAttribute("data-target") + " is open...");
        getTabContent(link, false);
      }
    }
    menu = document.getElementById("bbMenu");

    /*
    for c, i in menu.children
      if (hasClass(c, "current"))
        console.log("[B] " + c.children[0].getAttribute("data-target") + " is active..")
     */
    banner = document.getElementById("carletonBanner");
    mainDiv = banner.children[0];
    searchDiv = null;
    ref = mainDiv.children;
    for (k = 0, len1 = ref.length; k < len1; k++) {
      c = ref[k];
      if (hasClass(c, "search")) {
        searchDiv = c;
      }
    }
    return mainDiv.insertBefore(menu, searchDiv);
  };

  breakpoints = [
    {
      name: "small",
      max: 650,
      fxn: handleBreakpointOne
    }, {
      name: "big",
      fxn: handleBreakpointTwo
    }
  ];

  currBreakIdx = -1;

  handleResize = function() {
    var bp, fxn, idx, j, len, matchIdx, w;
    w = window.innerWidth;
    matchIdx = -1;
    for (idx = j = 0, len = breakpoints.length; j < len; idx = ++j) {
      bp = breakpoints[idx];
      if (bp.max === void 0) {
        matchIdx = idx;
      } else {
        if (bp.max >= w) {
          matchIdx = idx;
          break;
        }
      }
    }
    if (matchIdx !== currBreakIdx) {
      currBreakIdx = matchIdx;
      console.log("switching to [" + currBreakIdx + "] / [" + breakpoints[currBreakIdx].name + "]");
      fxn = breakpoints[currBreakIdx].fxn;
      return fxn(breakpoints[currBreakIdx].name);
    }
  };

  cachedUrls = {};

  getContent = function(url, callback) {
    var exc, r;
    try {
      console.log("requesting [" + url + "]");
      if (cachedUrls[url] !== void 0) {
        callback(cachedUrls[url], null);
        return;
      }
      r = new XMLHttpRequest();
      r.open("GET", url, true);
      r.onreadystatechange = function() {
        if (r.readyState === 4) {
          if (r.status === 200) {
            cachedUrls[url] = r.responseText;
            callback(r.responseText, null);
          } else {
            callback(null, "200 error");
          }
        }
      };
      return r.send();
    } catch (_error) {
      exc = _error;
      console.log("Exception occurred while trying request.");
      return callback(null, "exception: " + exc);
    }
  };

  addListener = function(el, eventType, callback) {
    if ((typeof el) === "string") {
      el = document.getElementById(el);
    }
    return el.addEventListener(eventType, function(e) {
      e.preventDefault();
      return callback(e);
    });
  };

  isElementInViewport = function(el) {
    var rect;
    rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  };

  getTabContent = function(target, allowToggleMode) {
    var div, existingContent, i, j, len, link, links, tabId, tabUrl;
    if (allowToggleMode == null) {
      allowToggleMode = true;
    }
    console.log("getTabContent firing...");
    tabId = "bbTabContent";
    existingContent = document.getElementById(tabId);
    tabUrl = target.getAttribute("data-target");
    if (allowToggleMode && currBreakIdx === 0) {
      if (hasClass(target.parentNode, "current")) {
        removeClass(target.parentNode, "current");
        return;
      }
    }
    links = document.getElementsByTagName("a");
    for (i = j = 0, len = links.length; j < len; i = ++j) {
      link = links[i];
      if (link.attributes["data-target"] !== void 0) {
        removeClass(link.parentNode, "current");
      }
    }
    if (allowToggleMode && currBreakIdx !== 0) {
      if (existingContent !== null && existingContent.getAttribute("data-target") === tabUrl) {
        existingContent.parentNode.removeChild(existingContent);
        return false;
      }
    }
    addClass(target.parentNode, "current");
    if (currBreakIdx === 0) {
      setTimeout((function() {
        var boundingBox, scrollPos;
        if (!isElementInViewport(target)) {
          boundingBox = target.getBoundingClientRect();
          scrollPos = window.pageYOffset + boundingBox.top;
          return scrollTo(0, scrollPos);
        }
      }), 100);
    }
    if (currBreakIdx === 0) {
      return;
    }
    if (existingContent !== null) {
      existingContent.parentNode.removeChild(existingContent);
    }
    div = document.createElement("div");
    div.id = tabId;
    div.setAttribute("data-target", tabUrl);
    div.setAttribute("aria-live", "polite");
    div.innerHTML = loadingContent;
    document.getElementById("carletonBanner").appendChild(div);
    getContent(tabUrl, function(data, err) {
      var closeLink, d, fallbackUrl, firstLinkInLoadedContent, k, len1, subDivs;
      if (err !== null) {
        fallbackUrl = "" + target;
        return window.location.href = fallbackUrl;
      } else {
        div.innerHTML = data;
        subDivs = div.getElementsByTagName("div");
        for (k = 0, len1 = subDivs.length; k < len1; k++) {
          d = subDivs[k];
          if (hasClass(d, "closer")) {
            closeLink = d.getElementsByTagName("a")[0];
            addListener(closeLink, "click", function() {
              return getTabContent(target);
            });
            closeLink.addEventListener("keydown", function(e) {
              return handleDrawerContentsTabbing(e, false);
            });
          }
        }
        firstLinkInLoadedContent = document.querySelector("div#bbTabContent div.tops a");
        return firstLinkInLoadedContent.addEventListener("keydown", function(e) {
          return handleDrawerContentsTabbing(e, true);
        });
      }
    });
    return false;
  };

  handleDrawerMenuTabbing = function(e) {
    var bbTabContent, currLinkTarget, currLoadedTarget, firstLinkInExpandedDrawer;
    if (e.shiftKey) {

    } else if (e.keyCode === 9) {
      currLinkTarget = e.target.getAttribute("data-target");
      bbTabContent = document.getElementById("bbTabContent");
      if (bbTabContent !== null) {
        currLoadedTarget = bbTabContent.getAttribute("data-target");
        if (currLinkTarget === currLoadedTarget) {
          firstLinkInExpandedDrawer = document.getElementById("bbTabContent").querySelector("a");
          firstLinkInExpandedDrawer.focus();
          return e.preventDefault();
        }
      }
    }
  };

  handleDrawerContentsTabbing = function(e, handleShiftTab) {
    var firstLinkUnderLi, j, jumpNext, len, li, menu, ref;
    if (e.keyCode === 9 && ((handleShiftTab && e.shiftKey) || (!handleShiftTab && !e.shiftKey))) {
      menu = document.getElementById("bbMenu");
      jumpNext = false;
      ref = menu.querySelectorAll("li");
      for (j = 0, len = ref.length; j < len; j++) {
        li = ref[j];
        firstLinkUnderLi = li.querySelector("a");
        if (jumpNext) {
          if (!handleShiftTab) {
            firstLinkUnderLi.focus();
          }
          e.preventDefault();
          return;
        }
        if (hasClass(li, "current")) {
          jumpNext = true;
          if (handleShiftTab) {
            firstLinkUnderLi.focus();
          }
        }
      }
    }
  };

  isDescendantOf = function(el, parents) {
    var j, len, p;
    if (el === null) {
      return false;
    } else {
      for (j = 0, len = parents.length; j < len; j++) {
        p = parents[j];
        if (el === p) {
          return true;
        }
      }
    }
    return isDescendantOf(el.parentNode, parents);
  };

  possiblyHideSearchForm = function(e) {
    var area, elMouseIsOver, j, k, len, len1, link, parents;
    if (monitorSearchFormHiding) {
      elMouseIsOver = document.elementFromPoint(e.clientX, e.clientY);
      if (e.target.getAttribute("name") === "scope" && e.target.getAttribute("type") === "radio") {
        return;
      }
      parents = [];
      for (j = 0, len = searchAreas.length; j < len; j++) {
        area = searchAreas[j];
        parents.push(document.getElementById(area));
      }
      for (k = 0, len1 = drawerLinks.length; k < len1; k++) {
        link = drawerLinks[k];
        parents.push(link);
      }
      if (!isDescendantOf(elMouseIsOver, parents)) {
        return setSearchFormVisibility(false);
      }
    }
  };

  setSearchFormVisibility = function(doShow) {
    var searchForm;
    searchForm = document.getElementById("bannerSearchForm");
    if (doShow) {
      addClass(searchForm, "focused");
      monitorSearchFormHiding = true;
      return document.getElementById("bannerSearchImage").setAttribute("aria-hidden", "true");
    } else {
      removeClass(searchForm, "focused");
      removeClass(searchForm, "active");
      monitorSearchFormHiding = false;
      return document.getElementById("bannerSearchImage").removeAttribute("aria-hidden");
    }
  };

  removeClass = function(el, c) {
    return setClass(el, c, false);
  };

  addClass = function(el, c) {
    return setClass(el, c, true);
  };

  toggleClass = function(el, c) {
    if (hasClass(el, c)) {
      return removeClass(el, c);
    } else {
      return addClass(el, c);
    }
  };

  hasClass = function(el, c) {
    var currClasses, j, len, loopClass;
    currClasses = el.className.split(" ");
    for (j = 0, len = currClasses.length; j < len; j++) {
      loopClass = currClasses[j];
      if (loopClass === c) {
        return true;
      }
    }
    return false;
  };

  setClass = function(el, c, onOrOff) {
    var currClasses, j, len, loopClass, needToAdd, trimmed;
    currClasses = el.className.split(" ");
    trimmed = "";
    needToAdd = onOrOff;
    for (j = 0, len = currClasses.length; j < len; j++) {
      loopClass = currClasses[j];
      if (!onOrOff) {
        if (loopClass !== c) {
          trimmed += (trimmed === "" ? "" : " ") + loopClass;
        }
      } else {
        if (loopClass === c) {
          needToAdd = false;
        }
        trimmed += (trimmed === "" ? "" : " ") + loopClass;
      }
    }
    if (needToAdd) {
      trimmed += (trimmed === "" ? "" : " ") + c;
    }
    if (trimmed === "") {
      return el.removeAttribute("class");
    } else {
      return el.className = trimmed;
    }
  };

  setupSearchDialog = function() {
    var area, inputEl, j, k, len, len1, ref, searchDataDiv, searchDialog, searchSitename;
    searchDataDiv = document.getElementById("bluebar-search-data");
    searchDialog = document.getElementById("bannerSearchDialog");
    addClass(searchDialog, (searchDataDiv !== null ? "twoscope" : "singlescope"));
    if (searchDataDiv !== null) {
      searchSitename = searchDataDiv.getAttribute("data-site-name");
      document.getElementById("searchLimitURL").setAttribute("value", searchDataDiv.getAttribute("data-site-url"));
      document.getElementById("searchLimitName").innerHTML = searchSitename;
    }
    addListener("searchToggle", "click", function(e) {
      var searchForm;
      e.stopPropagation();
      showForDropdown(false);
      searchForm = document.getElementById("bannerSearchForm");
      toggleClass(searchForm, "active");
      if (hasClass(searchForm, "active")) {
        document.getElementById("bannerSearch").focus();
        monitorSearchFormHiding = true;
      } else {
        monitorSearchFormHiding = false;
      }
      return false;
    });
    addListener("bannerSearch", "focus", function() {
      return setSearchFormVisibility(true);
    });
    for (j = 0, len = searchAreas.length; j < len; j++) {
      area = searchAreas[j];
      if (area === "bannerSearchDialog") {
        ref = document.getElementById(area).querySelectorAll("input");
        for (k = 0, len1 = ref.length; k < len1; k++) {
          inputEl = ref[k];
          inputEl.addEventListener("keydown", handleSearchFormTabbing);
        }
      } else {
        document.getElementById(area).addEventListener("keydown", handleSearchFormTabbing);
      }
    }
    return document.addEventListener("click", possiblyHideSearchForm);
  };

  handleForDropdownTabbing = function(e) {
    return setTimeout(function() {
      if (!isDescendantOf(document.activeElement, [document.getElementById("bbFor")])) {
        return showForDropdown(false);
      }
    }, 100);
  };

  handleSearchFormTabbing = function(e) {
    if (e.keyCode === 9) {
      return setTimeout(function() {
        var area, j, len, parents;
        parents = [];
        for (j = 0, len = searchAreas.length; j < len; j++) {
          area = searchAreas[j];
          parents.push(document.getElementById(area));
        }
        if (!isDescendantOf(document.activeElement, parents)) {
          return setSearchFormVisibility(false);
        }
      });
    }
  };

  setupForDropdown = function() {
    var j, len, link, ref, results;
    addListener("bbForLink", "click", forLinkClicked);
    document.addEventListener("click", possiblyHideForDropdown);
    ref = document.getElementById("bbFor").querySelectorAll("a");
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      link = ref[j];
      results.push(addListener(link, "blur", handleForDropdownTabbing));
    }
    return results;
  };

  forLinkClicked = function(e) {
    var list;
    list = document.getElementById("bbFor");
    showForDropdown(!hasClass(list, "current"));
    return false;
  };

  showForDropdown = function(doShow) {
    var list;
    list = document.getElementById("bbFor");
    if (doShow) {
      addClass(list, "current");
      return monitorForDropdownHiding = true;
    } else {
      removeClass(list, "current");
      return monitorForDropdownHiding = false;
    }
  };

  possiblyHideForDropdown = function(e) {
    var area, elMouseIsOver, j, k, len, len1, link, parents;
    if (e.target === document.getElementById("bbForLink")) {
      return;
    }
    if (monitorForDropdownHiding && e.detail > 0) {
      elMouseIsOver = document.elementFromPoint(e.clientX, e.clientY);
      parents = [];
      for (j = 0, len = forAreas.length; j < len; j++) {
        area = forAreas[j];
        parents.push(document.getElementById(area));
      }
      for (k = 0, len1 = drawerLinks.length; k < len1; k++) {
        link = drawerLinks[k];
        parents.push(link);
      }
      if (!isDescendantOf(elMouseIsOver, parents)) {
        return showForDropdown(false);
      }
    }
  };

  toggleMenu = function(force) {
    var div, idx, j, len, link, menuToggler, probe, probeId, results, tabUrl, turnOn;
    if (force == null) {
      force = null;
    }
    console.log("toggleMenu [" + force + "]");
    menuToggler = document.getElementById("menuToggle");
    turnOn = !hasClass(menuToggler, "current");
    if (force !== null) {
      turnOn = force;
    }
    if (turnOn) {
      addClass(menuToggler, "current");
      addClass(document.getElementById("bbMenu"), "on");
      results = [];
      for (idx = j = 0, len = drawerLinks.length; j < len; idx = ++j) {
        link = drawerLinks[idx];
        tabUrl = link.getAttribute("data-target");
        probeId = "menuContents" + idx;
        probe = document.getElementById(probeId);
        if (probe === null) {
          div = document.createElement("div");
          div.setAttribute("id", probeId);
          div.innerHTML = "<section class='drawer'>" + loadingContent + "</section>";
          link.parentNode.appendChild(div);
          results.push((!function(looper) {
            return getContent(tabUrl, function(data, err) {
              if (err !== null) {
                return console.log("got back error?");
              } else {
                div = document.getElementById("menuContents" + looper);
                console.log("setting innerHTML on [" + div.getAttribute("id") + "]");
                return div.innerHTML = data;
              }
            });
          })(idx));
        } else {
          results.push(void 0);
        }
      }
      return results;
    } else {
      removeClass(menuToggler, "current");
      return removeClass(document.getElementById("bbMenu"), "on");
    }
  };

  window.initialBluebarSetup = function() {
    var banner, c, i, j, k, len, len1, link, links, ref;
    links = document.getElementsByTagName("a");
    for (i = j = 0, len = links.length; j < len; i = ++j) {
      link = links[i];
      if (link.attributes["data-target"] !== void 0) {
        addListener(link, "click", function(e) {
          return getTabContent(e.target);
        });
        link.addEventListener("keydown", handleDrawerMenuTabbing);
        drawerLinks.push(link);
      }
    }
    banner = document.getElementById("carletonBanner");
    banner.className = "js";
    ref = banner.children;
    for (k = 0, len1 = ref.length; k < len1; k++) {
      c = ref[k];
      if (hasClass(c, "closer")) {
        addListener(c.children[0], "click", function() {
          return toggleMenu();
        });
        break;
      }
    }
    addListener("menuToggle", "click", function() {
      return toggleMenu();
    });
    setupForDropdown();
    setupSearchDialog();
    window.onresize = handleResize;
    return handleResize();
  };

}).call(this);

//# sourceMappingURL=bluebar.js.map
