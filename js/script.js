(function () {
  "use strict";

  const menuButton = document.querySelector(".icon-menu");
  const menuBody = document.querySelector(".menu__body");

  if (menuButton && menuBody) {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-controls", "main-navigation");
    menuBody.id = "main-navigation";

    menuButton.addEventListener("click", function () {
      const open = document.body.classList.toggle("menu-open");
      menuButton.setAttribute("aria-expanded", open ? "true" : "false");
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("menu-open")) {
        document.body.classList.remove("menu-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.focus();
      }
    });

    menuBody.querySelectorAll(".menu__link").forEach(function (link) {
      link.addEventListener("click", function () {
        document.body.classList.remove("menu-open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll(".menu__dropdown-toggle").forEach(function (toggle) {
    const parent = toggle.closest(".menu__item--dropdown");
    toggle.setAttribute("aria-haspopup", "true");
    toggle.setAttribute("aria-expanded", "false");

    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      const open = parent.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  const spollerButtons = document.querySelectorAll("[data-spoller] .spollers-faq__button");

  spollerButtons.forEach(function (button) {
    const item = button.closest("[data-spoller]");
    const panel = item.querySelector(".spollers-faq__text");
    const panelId = panel.id || "faq-panel-" + Math.random().toString(36).slice(2, 9);

    panel.id = panelId;
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", panelId);

    button.addEventListener("click", function () {
      const parent = item.parentNode;
      const isOne = parent.hasAttribute("data-one-spoller");

      if (isOne) {
        parent.querySelectorAll("[data-spoller]").forEach(function (other) {
          if (other !== item) {
            other.classList.remove("active");
            const otherBtn = other.querySelector(".spollers-faq__button");
            const otherPanel = other.querySelector(".spollers-faq__text");
            otherBtn.setAttribute("aria-expanded", "false");
            otherPanel.style.maxHeight = null;
          }
        });
      }

      const active = item.classList.toggle("active");
      button.setAttribute("aria-expanded", active ? "true" : "false");

      if (active) {
        panel.style.maxHeight = panel.scrollHeight + "px";
      } else {
        panel.style.maxHeight = null;
      }
    });
  });
})();
