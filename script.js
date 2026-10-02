/* =========================================================================
   Dexichs — поведение страницы

   Язык, цвет, появление разделов, шапка, мобильное меню, раскрытие
   вопросов, «шифр» в схеме и оглавление документов. Каждый блок проверяет,
   есть ли на странице то, с чем он работает: один и тот же файл подключён
   и к главной, и к политике с поддержкой.
   ========================================================================= */

(function () {
  "use strict";

  var root = document.documentElement;
  var still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Язык ------------------------------------------------------------
     Русский — основной, английский — полный перевод той же страницы.
     Ключи совпадают с data-i18n в разметке; чего нет в словаре, остаётся
     по-русски, а не пропадает. data-i18n-aria переводит подпись для
     экранного диктора, а не видимый текст. */

  var EN = {
    skip: "Skip to content",
    navLabel: "Sections", menu: "Menu",
    navHow: "How it works", navInside: "What is inside",
    navPrivacy: "Privacy", navFaq: "FAQ", navSupport: "Support",

    heroEyebrow: "P2P · no server in between",
    // Те же строки-маски, что и в русском варианте: иначе при переключении
    // языка заголовок терял бы свою раскладку и въезд по строкам.
    heroTitle: "<span class=\"line\"><span>Connects</span></span><span class=\"line\"><span>two phones</span></span><span class=\"line\"><span><em>directly</em></span></span>",
    heroLede: "When the other person is nearby, no internet is needed at all: the app finds them over Wi-Fi or Bluetooth and connects on its own. When they are far away, the message gets there through a relay, encrypted.",
    ctaHow: "How it works", ctaInside: "What is inside",
    chip1: "No phone number", chip2: "Encrypted on your device", chip3: "iPhone · iOS 16+",

    sceneNearby: "nearby · no internet",
    m1: "No signal at all. Where are you?",
    m2: "By the campfire, two tents down 🏕",
    composer: "Message",
    sceneLink: "Wi-Fi · Bluetooth",
    sceneNoServer: "No server involved",

    mq1: "No phone number", mq2: "No email", mq3: "No ads", mq4: "No analytics",
    mq5: "No third-party libraries", mq6: "Nearby — no internet",
    mq7: "Encrypted on your device", mq8: "Talking is free",

    howEyebrow: "How it works",
    howTitle: "Two roads to the other person",
    howLede: "One works where there is no network at all. The other is for when the person is far away. You can switch right inside the public room, without going into settings.",
    dgNoServer: "no server needed",
    dgMailbox: "waits in a mailbox if you are offline",
    p1t: "Nearby — no internet",
    p1d: "Wi-Fi and Bluetooth straight between phones. On a plane, in the underground, in the mountains, at a camp, with the network down. The server takes no part in this at all.",
    p2t: "Far away — through a relay",
    p2d: "It carries encrypted bytes and cannot read them. If you are offline, the message waits in a mailbox and arrives when you come back.",
    p3t: "A name instead of a number",
    p3d: "Signing up means picking one name. It is bound to your device key: nobody else can take it, and you get it back after reinstalling.",
    nameBound: "bound to device key",
    nameNoPhone: "not needed",

    insideEyebrow: "What is inside",
    insideTitle: "Everything the app can do",
    insideLede: "For reference: everything listed below works today.",

    f1t: "Messaging",
    f1a: "Text, photos, stickers, voice notes",
    f1b: "Replies and editing what you sent",
    f1c: "Search through a conversation, and forwarding",
    f1d: "Groups and a public room",
    vReplyQ: "Where do we meet?",
    vReplyA: "At the entrance, at seven",
    vEdited: "edited",
    f2t: "Calls",
    f2a: "Voice and video, one to one or as a group",
    f2b: "Screen sharing",
    f2c: "They arrive like an ordinary phone call",
    f3t: "Watching together",
    f3a: "YouTube, TikTok, VK Video or a direct link",
    f3b: "The host drives, everyone else follows",
    f3c: "Its own chat and voice inside the room",
    f4t: "Games for a group",
    f4a: "Durak, Mafia, Spy, Words",
    f4b: "Shared chat and voice during the game",
    f4c: "Statistics survive a reinstall",
    f4d: "They work without the internet too, if everyone is nearby",
    f5t: "Profile",
    f5a: "Display name, bio, emoji status",
    f5b: "Avatar, banner, name colour",
    f5c: "Dark and light themes",
    f5d: "Moving your account to another phone",
    vBio: "into mountains and quiet",
    f6t: "Notifications",
    f6a: "With sound, silent, or off completely",
    f6b: "Name and text show on a closed phone",
    f6c: "Decrypted on your device, not on the way",
    vNow: "now",
    f7t: "Keeping it civil",
    f7a: "Report a person or a message",
    f7b: "Block someone just for yourself",
    f7c: "Bans follow the device key, not the name",
    vReport: "Report", vBlock: "Block",
    f8t: "Three languages",
    f8d: "The interface is fully translated into Russian, English and Azerbaijani. People's names, room titles and the messages themselves stay as they were written.",

    lookEyebrow: "Looks", lookTitle: "A face of its own —<br>and one for you",
    tintEyebrow: "Icon colour",
    tintLede: "The home screen icon can be repainted — eight options, applied at once.",
    tintHint: "this site repaints along with the icon",
    tBlack: "Black", tBlue: "Blue", tAqua: "Aqua", tGreen: "Green",
    tYellow: "Yellow", tRed: "Red", tPurple: "Purple", tGrey: "Grey",

    privEyebrow: "Privacy", privTitle: "What is known about you, and to whom",
    encYou: "Your phone", encRelay: "What the relay sees", encThem: "Their phone",
    encMsg: "Meet you at the entrance at seven", encTo: "to",
    pr1t: "Messages",
    pr1d: "<strong>Encrypted on your device</strong> with the recipient's key and decrypted only on theirs. The relay sees a blob of bytes and a recipient name — enough to forward, not enough to read.",
    pr2t: "Never asked for",
    pr2d: "Phone number, email address, real name, address book, location. No advertising, no analytics, and no third-party libraries in the app at all.",
    pr3t: "Notifications",
    pr3d: "The push from Apple carries <strong>only an encrypted piece of the message</strong>. No name and no text — the server does not know them either. The real name appears on screen on your own device, with your own key.",
    pr4t: "One exception",
    pr4d: "Reports. When you report a message, <strong>you</strong> attach an excerpt yourself, and it is stored in plain text: otherwise there would be nothing to review.",
    pr5t: "Deletion",
    pr5d: "You delete your account inside the app: <em>Profile → Account → Delete account</em>. Your name, profile, character and statistics are erased.",
    privLink: "Full privacy policy",

    faqEyebrow: "Questions", faqTitle: "The short answers",
    faqAskT: "Didn't find an answer?",
    faqAskD: "Write to us — we reply within 24 hours.",
    faqAskLink: "Support page",
    q1: "Does it really work without the internet?",
    a1: "Yes, if the other person is nearby — roughly within a room or a floor. The phones find each other over Wi-Fi and Bluetooth and connect directly. The internet is only needed to reach someone far away.",
    q2: "Who can read my messages?",
    a2: "Only the person you write to. Messages are encrypted on your device with the recipient's key. We hold no key and have no way to obtain one.",
    q3: "I reinstalled the app — will I lose my name?",
    a3: "No. The name is bound to your device key, and the key lives in the keychain and survives a reinstall. Your profile and game statistics come back with it.",
    q4: "Where do I download it?",
    a4: "The app is being prepared for the App Store. This site is informational: it describes what the app does. The link will appear here as soon as it is out.",
    q5: "What does it cost?",
    a5: "Messaging, calls, games and watching together are free. There is no paid access to talking to people, and none is planned.",
    q6: "What about Android?",
    a6: "iPhone only for now, iOS 16 and newer. Nearby connection is built on Apple's technology, and an Android version would need a different one.",

    outroStatus: "Being prepared for release",
    outroTitle: "Coming to the App Store",
    outroText: "This site is informational: there is no install file here and there never will be. The App Store link will appear right here as soon as the app is out.",

    fTag: "A messenger that connects phones directly.",
    fSections: "Sections", fDocs: "Documents", fContact: "Contact",
    fPrivacy: "Privacy policy", fSupport: "Support",
    fNote: "This site is informational. The app is not distributed from here — wait for the App Store release."
  };

  var original = null;
  var onLanguage = [];   // кто хочет знать о смене языка (подпись цвета)

  function each(selector, fn) {
    Array.prototype.forEach.call(document.querySelectorAll(selector), fn);
  }

  function collect() {
    // Русский снимаем прямо из разметки: держать его ещё и в словаре значит
    // держать два источника правды, которые однажды разойдутся.
    original = { text: {}, aria: {} };
    each("[data-i18n], [data-i18n-html]", function (node) {
      var key = node.getAttribute("data-i18n") || node.getAttribute("data-i18n-html");
      if (!(key in original.text)) original.text[key] = node.innerHTML;
    });
    each("[data-i18n-aria]", function (node) {
      original.aria[node.getAttribute("data-i18n-aria")] = node.getAttribute("aria-label");
    });
  }

  function apply(lang) {
    if (!original) collect();
    each("[data-i18n], [data-i18n-html]", function (node) {
      var key = node.getAttribute("data-i18n") || node.getAttribute("data-i18n-html");
      var value = lang === "en" ? EN[key] : original.text[key];
      if (value != null && node.innerHTML !== value) node.innerHTML = value;
    });
    each("[data-i18n-aria]", function (node) {
      var key = node.getAttribute("data-i18n-aria");
      var value = lang === "en" ? EN[key] : original.aria[key];
      if (value != null) node.setAttribute("aria-label", value);
    });
    root.lang = lang;
    each(".lang button", function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.lang === lang));
    });
    onLanguage.forEach(function (fn) { fn(lang); });
    try { localStorage.setItem("dexichs-lang", lang); } catch (e) { /* приватный режим */ }
  }

  var hasSwitch = !!document.querySelector(".lang");
  if (hasSwitch) {
    var saved = null;
    try { saved = localStorage.getItem("dexichs-lang"); } catch (e) { /* см. выше */ }
    var start = saved || ((navigator.language || "ru").toLowerCase().indexOf("ru") === 0 ? "ru" : "en");
    if (start === "en") apply("en"); else collect();

    each(".lang button", function (button) {
      button.addEventListener("click", function () { apply(button.dataset.lang); });
    });
  }

  /* ---- Цвет --------------------------------------------------------------
     Цвет иконки — это и цвет сайта: выбранный вариант ставится атрибутом на
     <html>, и все акценты пересчитываются из него. Сам атрибут при загрузке
     ставит крошечный скрипт в <head>, ещё до отрисовки, — здесь только
     кнопки и картинки. */

  var tintButtons = document.querySelectorAll(".tints [data-tint]");
  var currentLabel = document.querySelector(".look__current");

  function tintTo(name, animate) {
    var picked = null;
    Array.prototype.forEach.call(tintButtons, function (button) {
      var on = button.dataset.tint === name;
      button.setAttribute("aria-checked", String(on));
      button.tabIndex = on ? 0 : -1;
      if (on) picked = button;
    });
    if (!picked) return;
    root.setAttribute("data-tint", name);
    if (currentLabel) currentLabel.textContent = picked.querySelector(".sr").textContent;
    each("[data-tint-icon]", function (img) {
      var src = img.getAttribute("data-tint-icon") === "small"
        ? picked.querySelector("img").getAttribute("src")
        : picked.dataset.src;
      if (img.getAttribute("src") === src) return;
      img.setAttribute("src", src);
      if (animate && !still) {
        img.classList.remove("is-bump");
        void img.offsetWidth;          // перезапуск анимации на том же узле
        img.classList.add("is-bump");
      }
    });
  }

  if (tintButtons.length) {
    var savedTint = root.getAttribute("data-tint") || "blue";
    tintTo(savedTint, false);

    Array.prototype.forEach.call(tintButtons, function (button, index) {
      button.addEventListener("click", function () {
        tintTo(button.dataset.tint, true);
        try { localStorage.setItem("dexichs-tint", button.dataset.tint); } catch (e) { /* приватный режим */ }
      });
      // Группа радиокнопок: стрелками по кругу, как положено.
      button.addEventListener("keydown", function (event) {
        var step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
        if (!step) return;
        event.preventDefault();
        var next = tintButtons[(index + step + tintButtons.length) % tintButtons.length];
        next.focus();
        next.click();
      });
    });

    onLanguage.push(function () {
      var on = document.querySelector(".tints [aria-checked=\"true\"] .sr");
      if (on && currentLabel) currentLabel.textContent = on.textContent;
    });
  }

  /* ---- Появление при прокрутке ---------------------------------------- */

  var reveals = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window) || still) {
    Array.prototype.forEach.call(reveals, function (node) { node.classList.add("is-in"); });
  } else {
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        seen.unobserve(entry.target);   // показали — и хватит, обратно не прячем
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });
    Array.prototype.forEach.call(reveals, function (node) { seen.observe(node); });
  }

  /* ---- Появление по очереди -------------------------------------------
     Соседи в одной сетке не должны выпрыгивать разом: задержка растёт по
     порядку, но упирается в потолок — иначе последняя карточка в длинном
     ряду появлялась бы заметно позже остальных, и это читалось бы как
     подвисание, а не как замысел. */

  [".roads", ".bento", ".facts", ".qa", ".section__head", ".faq__head"].forEach(function (selector) {
    each(selector, function (group) {
      Array.prototype.forEach.call(group.children, function (child, index) {
        child.style.setProperty("--d", Math.min(index * 0.07, 0.35) + "s");
      });
    });
  });

  /* ---- Свет под курсором на карточках ----------------------------------
     Только для мыши: на сенсорном экране пятно застревало бы там, где
     последний раз коснулись. */

  if (window.matchMedia("(hover: hover)").matches) {
    each(".card", function (card) {
      card.addEventListener("pointermove", function (event) {
        var box = card.getBoundingClientRect();
        card.style.setProperty("--mx", (event.clientX - box.left) + "px");
        card.style.setProperty("--my", (event.clientY - box.top) + "px");
      });
    });
  }

  /* ---- «Шифр»: что видит ретранслятор ----------------------------------
     Байты меняются, пока схема на экране, — так понятнее, что это не текст,
     а шум. Вне экрана и при «уменьшить движение» ничего не крутится. */

  var HEX = "0123456789abcdef";
  var blobs = document.querySelectorAll("[data-scramble]");

  function noise(length, groups) {
    var out = "";
    for (var i = 0; i < length; i++) {
      if (groups && i && i % 4 === 0) out += " ";
      out += HEX.charAt(Math.floor(Math.random() * 16));
    }
    return out;
  }

  if (blobs.length && !still && "IntersectionObserver" in window) {
    var visible = [];
    var timer = null;
    var watch = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var at = visible.indexOf(entry.target);
        if (entry.isIntersecting && at < 0) visible.push(entry.target);
        if (!entry.isIntersecting && at >= 0) visible.splice(at, 1);
      });
      if (visible.length && !timer) {
        timer = setInterval(function () {
          visible.forEach(function (node) {
            var size = +node.getAttribute("data-scramble");
            node.textContent = size > 8 ? noise(size, true) : noise(4) + "·" + noise(2);
          });
        }, 140);
      } else if (!visible.length && timer) {
        clearInterval(timer);
        timer = null;
      }
    });
    Array.prototype.forEach.call(blobs, function (node) { watch.observe(node); });
  }

  // SVG-анимации (точки на линии связи) CSS не останавливает — только так.
  if (still) each("svg", function (svg) { if (svg.pauseAnimations) svg.pauseAnimations(); });

  /* ---- Плавное раскрытие вопроса ---------------------------------------
     У <details> своей анимации нет: он открывается рывком. Оборачиваем ответ
     в слой с высотой и ведём её руками, а сам details закрываем только после
     того, как высота доехала до нуля — иначе ответ исчезал бы мгновенно. */

  each(".qa details", function (item) {
    var summary = item.querySelector("summary");
    var body = document.createElement("div");
    body.className = "answer";
    while (summary.nextSibling) body.appendChild(summary.nextSibling);
    item.appendChild(body);

    var busy = false;

    summary.addEventListener("click", function (event) {
      if (still) return;
      event.preventDefault();
      if (busy) return;
      busy = true;
      function done(fn) {
        body.addEventListener("transitionend", function end(e) {
          if (e.target !== body) return;
          body.removeEventListener("transitionend", end);
          fn();
          busy = false;
        });
      }
      if (item.open) {
        body.style.height = body.scrollHeight + "px";
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { body.style.height = "0px"; });
        });
        done(function () { item.open = false; body.style.height = ""; });
      } else {
        item.open = true;
        body.style.height = "0px";
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { body.style.height = body.scrollHeight + "px"; });
        });
        done(function () { body.style.height = ""; });   // чтобы переворот экрана не обрезал текст
      }
    });
  });

  /* ---- Мобильное меню --------------------------------------------------- */

  var top = document.querySelector(".top");
  var burger = document.querySelector(".burger");

  function setMenu(open) {
    if (!top || !burger) return;
    top.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
  }

  if (burger) {
    burger.addEventListener("click", function () {
      setMenu(!top.classList.contains("is-open"));
    });
    each(".nav a", function (link) {
      link.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && top.classList.contains("is-open")) {
        setMenu(false);
        burger.focus();
      }
    });
    document.addEventListener("click", function (event) {
      if (top.classList.contains("is-open") && !top.contains(event.target)) setMenu(false);
    });
  }

  /* ---- Где мы сейчас: подсветка пункта меню ---------------------------- */

  var spyLinks = Array.prototype.filter.call(document.querySelectorAll(".nav a"), function (a) {
    return a.getAttribute("href").charAt(0) === "#";
  });
  var spyTargets = spyLinks.map(function (a) { return document.querySelector(a.getAttribute("href")); });

  function spy() {
    var line = window.innerHeight * 0.35;
    var active = -1;
    spyTargets.forEach(function (section, index) {
      if (section && section.getBoundingClientRect().top <= line) active = index;
    });
    spyLinks.forEach(function (link, index) {
      if (index === active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  /* ---- Оглавление документа --------------------------------------------
     Собирается из заголовков h2 каждой языковой части. Раскрыта только та
     часть, которую сейчас читают, — иначе у политики вышло бы два длинных
     списка подряд. */

  var toc = document.querySelector(".toc");
  var tocHeads = [];
  var tocLinks = [];
  var tocGroups = [];

  if (toc) {
    each(".doc__part", function (part) {
      var group = document.createElement("div");
      group.className = "toc__group";
      var title = document.createElement("a");
      title.className = "toc__lang";
      title.href = "#" + part.id;
      title.textContent = part.getAttribute("data-label") || part.id;
      group.appendChild(title);
      var list = document.createElement("ol");
      Array.prototype.forEach.call(part.querySelectorAll("h2"), function (head, index) {
        if (!head.id) head.id = part.id + "-" + (index + 1);
        var item = document.createElement("li");
        var link = document.createElement("a");
        link.href = "#" + head.id;
        link.textContent = head.textContent;
        item.appendChild(link);
        list.appendChild(item);
        tocHeads.push(head);
        tocLinks.push(link);
        tocGroups.push(group);
      });
      group.appendChild(list);
      toc.appendChild(group);
    });
    var firstGroup = toc.querySelector(".toc__group");
    if (firstGroup) firstGroup.classList.add("is-current");
  }

  function tocSpy() {
    if (!tocHeads.length) return;
    // Сначала — какую часть читают: она начинается, как только её шапка
    // доехала до верха, ещё до первого заголовка внутри.
    var parts = document.querySelectorAll(".doc__part");
    var groups = toc.querySelectorAll(".toc__group");
    var part = 0;
    Array.prototype.forEach.call(parts, function (node, index) {
      if (node.getBoundingClientRect().top <= 160) part = index;
    });
    var active = -1;
    tocHeads.forEach(function (head, index) {
      if (tocGroups[index] === groups[part] && head.getBoundingClientRect().top <= 140) active = index;
    });
    tocLinks.forEach(function (link, index) { link.classList.toggle("is-active", index === active); });
    Array.prototype.forEach.call(groups, function (group, index) {
      group.classList.toggle("is-current", index === part);
    });
  }

  /* ---- Шапка: стекло после прокрутки и полоска прочитанного ------------ */

  var progress = document.querySelector(".progress");
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY;
      if (top) top.classList.toggle("is-stuck", y > 8);
      if (progress) {
        var full = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.setProperty("--p", full > 0 ? Math.min(y / full, 1) : 0);
      }
      if (spyLinks.length) spy();
      tocSpy();
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();
})();
