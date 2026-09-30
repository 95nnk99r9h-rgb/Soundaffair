/* BIM trifft Bahnsteig – kleine Helfer ohne Abhängigkeiten */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  /* ---------- Mobile Navigation ---------- */
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-nav]");

  function setNav(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNav(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setNav(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 1080px)").addEventListener("change", function (mq) {
      if (mq.matches) setNav(false);
    });
  }

  /* ---------- Aktiver Abschnitt in der Navigation ---------- */
  var navLinks = nav ? Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]')) : [];
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var activeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = "#" + entry.target.id;
        navLinks.forEach(function (a) {
          var on = a.getAttribute("href") === id;
          a.classList.toggle("is-active", on);
          if (on) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { activeObserver.observe(s); });
  }

  /* ---------- Einblenden beim Scrollen ---------- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealTargets = document.querySelectorAll(
    ".section-head, .person, .org, .baseline, .chart, .party, .bim-card, .sign__photo, .sign__text, .progress-card, .openspace__media, .contact-card"
  );

  if (!reduceMotion && "IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    revealTargets.forEach(function (el) {
      el.classList.add("reveal");
      revealObserver.observe(el);
    });
  }

  /* ---------- Video-Flächen ----------
     data-video-src   = lokale Datei (z. B. assets/video/fortschrittskontrolle.mp4)
     data-video-embed = externe Einbettung (YouTube-nocookie / Vimeo);
                        wird erst nach Klick geladen (Zwei-Klick-Lösung, DSGVO). */
  document.querySelectorAll(".video-slot").forEach(function (slot) {
    var src = (slot.getAttribute("data-video-src") || "").trim();
    var embed = (slot.getAttribute("data-video-embed") || "").trim();
    var title = slot.getAttribute("data-video-title") || "Video";
    var placeholder = slot.querySelector(".video-slot__placeholder");

    if (src) {
      var video = document.createElement("video");
      video.controls = true;
      video.preload = "metadata";
      video.playsInline = true;
      video.setAttribute("aria-label", title);
      var poster = slot.getAttribute("data-video-poster");
      if (poster) video.poster = poster;
      video.src = src;
      if (placeholder) placeholder.remove();
      slot.appendChild(video);
      return;
    }

    if (embed && placeholder) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = placeholder.className;
      button.innerHTML = placeholder.innerHTML;
      var hint = document.createElement("span");
      hint.className = "video-slot__hint";
      hint.textContent = "Beim Abspielen wird eine Verbindung zu " + new URL(embed).hostname + " hergestellt.";
      button.appendChild(hint);
      button.setAttribute("aria-label", title + " abspielen");
      var b = button.querySelector(".video-slot__badge");
      if (b) b.remove();
      placeholder.replaceWith(button);

      button.addEventListener("click", function () {
        var iframe = document.createElement("iframe");
        var url = new URL(embed);
        url.searchParams.set("autoplay", "1");
        iframe.src = url.toString();
        iframe.title = title;
        iframe.allow = "autoplay; fullscreen; picture-in-picture";
        iframe.allowFullscreen = true;
        button.replaceWith(iframe);
        iframe.focus();
      });
      return;
    }

    /* Noch kein Video hinterlegt: Platzhalter bleibt stehen. */
  });
})();
