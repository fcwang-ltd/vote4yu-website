/* Vote 4 Yu — site behaviour.
 *
 * One script for all five pages; each block no-ops when its markup isn't on the page.
 * Behaviour matches the Claude Design prototypes in project/*.dc.html.
 */

(function () {
  "use strict";

  var LANG_KEY = "v4y-lang";
  var CAMPAIGN_EMAIL = "hello@vote4yu.ca";

  var page = document.body.getAttribute("data-page") || "";
  var content = (window.V4Y && window.V4Y.content) || {};

  /* ------------------------------------------------------------ helpers ---- */

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function readLang() {
    try {
      var stored = localStorage.getItem(LANG_KEY);
      if (stored === "en" || stored === "zh") return stored;
    } catch (e) { /* private mode, blocked storage — fall through to English */ }
    return "en";
  }

  function writeLang(lang) {
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* nothing to do */ }
  }

  /* Resolves "news.2.title" against the dictionary. Returns undefined when the path is absent —
     the About page's 中文 story is shorter than the English one, and those paragraphs hide. */
  function lookup(dict, path) {
    var parts = path.split(".");
    var value = dict;
    for (var i = 0; i < parts.length; i++) {
      if (value === null || typeof value !== "object") return undefined;
      value = value[parts[i]];
    }
    return value;
  }

  /* ---------------------------------------------------------- language ---- */

  var currentLang = readLang();

  function dictFor(lang) {
    var pack = content[lang] || {};
    var merged = {};
    var source = [pack.common || {}, pack[page] || {}];
    for (var i = 0; i < source.length; i++) {
      for (var key in source[i]) {
        if (Object.prototype.hasOwnProperty.call(source[i], key)) merged[key] = source[i][key];
      }
    }
    return merged;
  }

  function applyLang(lang) {
    currentLang = lang;
    var dict = dictFor(lang);

    document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";
    document.body.classList.toggle("lang-zh", lang === "zh");

    $$("[data-i18n]").forEach(function (el) {
      var value = lookup(dict, el.getAttribute("data-i18n"));
      if (typeof value === "string") {
        el.textContent = value;
        el.hidden = false;
      } else {
        /* No copy for this slot in this language — hide rather than show the other language. */
        el.hidden = true;
      }
    });

    $$("[data-lang-btn]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang-btn") === lang));
    });

    writeLang(lang);
  }

  $$("[data-lang-btn]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyLang(btn.getAttribute("data-lang-btn"));
    });
  });

  applyLang(currentLang);

  /* --------------------------------------------------------------- nav ---- */

  var burger = $("#nav-burger");
  var mainNav = $("#main-nav");

  if (burger && mainNav) {
    burger.addEventListener("click", function () {
      var open = mainNav.getAttribute("data-open") === "true";
      mainNav.setAttribute("data-open", String(!open));
      burger.setAttribute("aria-expanded", String(!open));
    });
  }

  /* ------------------------------------------------------- wechat modal ---- */

  var modal = $("#wechat-modal");

  if (modal) {
    var lastFocused = null;

    var openModal = function (event) {
      if (event) event.preventDefault();
      lastFocused = document.activeElement;
      modal.hidden = false;
      var close = $(".modal__close", modal);
      if (close) close.focus();
      document.addEventListener("keydown", onModalKeydown);
    };

    var closeModal = function () {
      modal.hidden = true;
      document.removeEventListener("keydown", onModalKeydown);
      if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
    };

    var onModalKeydown = function (event) {
      if (event.key === "Escape") {
        closeModal();
        return;
      }
      if (event.key !== "Tab") return;
      /* Only the close button is focusable inside the card, so keep focus on it. */
      var focusable = $$("button, a[href], img[tabindex]", modal);
      if (!focusable.length) return;
      event.preventDefault();
      focusable[0].focus();
    };

    $$("[data-wechat]").forEach(function (trigger) {
      trigger.addEventListener("click", openModal);
    });

    modal.addEventListener("click", function (event) {
      if (event.target === modal) closeModal();
    });

    $$(".modal__close", modal).forEach(function (btn) {
      btn.addEventListener("click", closeModal);
    });
  }

  /* -------------------------------------------------- events page: tabs ---- */

  var tablist = $("[data-tablist]");

  if (tablist) {
    var tabs = $$("[data-tab]", tablist);

    var showTab = function (name) {
      tabs.forEach(function (tab) {
        var selected = tab.getAttribute("data-tab") === name;
        tab.setAttribute("aria-selected", String(selected));
        tab.setAttribute("tabindex", selected ? "0" : "-1");
      });
      $$("[data-tab-panel]").forEach(function (panel) {
        panel.hidden = panel.getAttribute("data-tab-panel") !== name;
      });
    };

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        showTab(tab.getAttribute("data-tab"));
      });
    });

    /* Arrow keys move between tabs, as a tablist should. */
    tablist.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      var index = tabs.indexOf(document.activeElement);
      if (index === -1) return;
      var next = event.key === "ArrowRight" ? index + 1 : index - 1;
      if (next < 0) next = tabs.length - 1;
      if (next >= tabs.length) next = 0;
      tabs[next].focus();
      showTab(tabs[next].getAttribute("data-tab"));
    });

    /* --------------------------------------------- events page: paging ---- */

    var articleList = $("[data-paginate]");
    var pagination = $("[data-pagination]");

    if (articleList && pagination) {
      var perPage = parseInt(articleList.getAttribute("data-per-page"), 10) || 5;
      var cards = $$(".article-card", articleList);
      var pageCount = Math.ceil(cards.length / perPage);

      var showPage = function (n) {
        cards.forEach(function (card, i) {
          card.hidden = Math.floor(i / perPage) !== n - 1;
        });
        $$("button", pagination).forEach(function (btn, i) {
          btn.setAttribute("aria-current", String(i + 1 === n));
        });
      };

      for (var p = 1; p <= pageCount; p++) {
        (function (n) {
          var btn = document.createElement("button");
          btn.type = "button";
          btn.className = "page-btn";
          btn.textContent = String(n);
          btn.setAttribute("aria-label", "Page " + n + " of " + pageCount);
          btn.addEventListener("click", function () { showPage(n); });
          pagination.appendChild(btn);
        })(p);
      }

      showPage(1);
    }

    /* "See All News" links from Home, About and Platform land on the journey tab. */
    var syncHash = function () {
      if (window.location.hash === "#journey") showTab("journey");
    };
    showTab("events");
    syncHash();
    window.addEventListener("hashchange", syncHash);
  }

  /* ------------------------------------------ platform page: talk to yu ---- */

  var talkForm = $("#talk-form");

  if (talkForm) {
    var errorBox = $("#talk-form-error", talkForm);

    /* Swap point: replace the mailto with a POST to the campaign's form endpoint once the
       campaign has one. Everything above this function stays as it is. */
    var submitTalkToYu = function (payload) {
      var subject = "Ward 2 — " + payload.category + (payload.name ? " (from " + payload.name + ")" : "");
      var lines = [];
      if (payload.name) lines.push("Name: " + payload.name);
      if (payload.address) lines.push("Address: " + payload.address);
      lines.push("Category: " + payload.category, "", payload.comments);
      window.location.href = "mailto:" + CAMPAIGN_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(lines.join("\n"));
    };

    talkForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var payload = {
        name: talkForm.elements.name.value.trim(),
        address: talkForm.elements.address.value.trim(),
        category: talkForm.elements.category.value,
        comments: talkForm.elements.comments.value.trim()
      };

      if (!payload.category || !payload.comments) {
        var dict = dictFor(currentLang);
        errorBox.textContent = dict.errRequired;
        errorBox.hidden = false;
        (payload.category ? talkForm.elements.comments : talkForm.elements.category).focus();
        return;
      }

      errorBox.hidden = true;
      submitTalkToYu(payload);
    });
  }
})();
