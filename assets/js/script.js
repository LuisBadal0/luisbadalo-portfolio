(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.querySelector(".site-header");
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav__toggle");
  const links = [...document.querySelectorAll('.nav__list a[href^="#"]')];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  const year = document.getElementById("year");
  const msg = document.getElementById("flow-msg");
  const live = document.getElementById("whoami-live");
  const brand = document.querySelector(".brand__mark");
  const egg = document.getElementById("egg");
  const run = document.getElementById("run-whoami");
  const out = document.getElementById("whoami-out");

  document.documentElement.classList.add("js");

  if (year) year.textContent = String(new Date().getFullYear());

  const themeBtn = document.getElementById("theme-toggle");
  const metaThemes = document.querySelectorAll('meta[name="theme-color"]');
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
  const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    themeBtn?.setAttribute("aria-pressed", String(theme === "dark"));
    themeBtn?.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    const color = theme === "dark" ? "#16130f" : "#f3eee4";
    if (metaThemes.length) {
      metaThemes.forEach((m) => {
        // If meta has a media query, keep it in sync when it matches the active theme
        if (!m.media || m.media === "" || m.media.includes(theme)) {
          m.setAttribute("content", color);
        }
      });
      // Ensure at least one meta reflects the current theme (for browsers ignoring media).
      if (![...metaThemes].some((m) => !m.media)) {
        metaThemes[0].setAttribute("content", color);
      }
    }
  };

  themeBtn?.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("theme", next); } catch (e) {}
    applyTheme(next);
  });

  if (!localStorage.getItem("theme")) {
    systemDark.addEventListener("change", (event) => {
      applyTheme(event.matches ? "dark" : "light");
    });
  }

  let scrollQueued = false;
  const onScroll = () => {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(() => {
      scrollQueued = false;
      header?.classList.toggle("is-stuck", window.scrollY > 8);
      if (msg && !reduced) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        const trackTop = 104;
        const trackH = Math.max(window.innerHeight - trackTop - 40, 0);
        msg.style.top = `${trackTop + p * trackH}px`;
      }

      const y = window.scrollY + 120;
      let current = sections[0];
      for (const section of sections) {
        if (section.offsetTop <= y) current = section;
      }
      links.forEach((link) => {
        const on = current && link.getAttribute("href") === `#${current.id}`;
        link.toggleAttribute("aria-current", Boolean(on));
      });
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const closeNav = () => {
    nav?.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  };

  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeNav();
  });

  links.forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("click", (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute("href").slice(1);
    event.preventDefault();
    const behavior = reduced ? "auto" : "smooth";
    if (id) {
      const target = document.getElementById(id);
      if (!target) return;
      target.scrollIntoView({ behavior, block: "start" });
      target.tabIndex = -1;
      target.focus({ preventScroll: true });
    } else {
      window.scrollTo({ top: 0, behavior });
      const fallback = document.querySelector(".brand");
      if (fallback) fallback.focus({ preventScroll: true });
    }
  });

  if (!reduced && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-in");
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
  }

  const buildPayload = () => {
    const s = (key, fallback) => (window.I18N ? window.I18N.s(key) : null) || fallback;
    return JSON.stringify(
      {
        name: "Luís Badalo",
        role: s("whoami.role", "Middleware Consultant"),
        employer: "Glintt Global",
        assignment: "Banco CTT",
        certified: "Salesforce MuleSoft Developer I",
        based: s("whoami.based", "Portugal"),
        languages: [s("whoami.lang1", "Portuguese"), s("whoami.lang2", "English")],
        status: 200,
        message: s("whoami.message", "Ready to integrate.")
      },
      null,
      2
    );
  };

  let typed = "";
  let shown = false;

  const showWhoami = () => {
    if (!out || shown) return;
    shown = true;
    typed = "";
    const payload = buildPayload();
    const announce = () => {
      if (live) live.textContent = payload;
    };
    if (reduced) {
      out.textContent = payload;
      announce();
      return;
    }
    let i = 0;
    out.textContent = "";
    const tick = () => {
      i += 2;
      out.textContent = payload.slice(0, i);
      if (i < payload.length) requestAnimationFrame(tick);
      else announce();
    };
    requestAnimationFrame(tick);
  };

  run?.addEventListener("click", showWhoami);

  window.addEventListener("i18n:change", () => {
    if (shown) {
      const payload = buildPayload();
      out.textContent = payload;
      if (live) live.textContent = payload;
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const target = event.target;
    if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
    if (event.key.length !== 1) return;
    typed = (typed + event.key.toLowerCase()).slice(-6);
    if (typed.endsWith("whoami")) showWhoami();
  });

  let clicks = 0;
  let clickTimer;
  brand?.addEventListener("click", () => {
    clicks += 1;
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => { clicks = 0; }, 900);
    if (clicks >= 5 && egg) {
      egg.hidden = false;
      showWhoami();
      window.setTimeout(() => { egg.hidden = true; }, 4200);
      clicks = 0;
    }
  });
})();
