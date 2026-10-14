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
      if (e.key === "Escape" && document.body.classList.contains("menu-open") && !document.body.classList.contains("lightbox-open")) {
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

  /* Lightbox gallery */
  (function initLightbox() {
    var galleries = new Map();

    document.querySelectorAll("[data-lightbox-gallery]").forEach(function (container, index) {
      var key = container.getAttribute("data-lightbox-gallery") || "gallery-" + index;

      if (!galleries.has(key)) {
        galleries.set(key, []);
      }

      var galleryItems = galleries.get(key);

      container.querySelectorAll("img").forEach(function (img) {
        if (!img.getAttribute("src") || img.closest(".connect-contact, .contact__link")) {
          return;
        }

        var trigger = img.closest(".lightbox__trigger");
        if (!trigger) {
          trigger = document.createElement("button");
          trigger.type = "button";
          trigger.className = "lightbox__trigger";
          trigger.setAttribute("aria-label", "View larger: " + (img.alt || "Photo"));
          img.parentNode.insertBefore(trigger, img);
          trigger.appendChild(img);
        }

        var item = { src: img.getAttribute("src"), alt: img.alt || "", trigger: trigger };
        galleryItems.push(item);

        trigger.addEventListener("click", function () {
          openLightbox(galleryItems, galleryItems.indexOf(item));
        });
      });
    });

    if (!galleries.size) {
      return;
    }

    var lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.hidden = true;
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Expanded photo viewer");
    lightbox.innerHTML =
      '<button type="button" class="lightbox__close" aria-label="Close">&times;</button>' +
      '<div class="lightbox__dialog">' +
      '<button type="button" class="lightbox__control lightbox__control--prev" aria-label="Previous photo">&#8249;</button>' +
      '<figure class="lightbox__figure">' +
      '<img class="lightbox__image" alt="" />' +
      '<p class="lightbox__counter" aria-live="polite"></p>' +
      "</figure>" +
      '<button type="button" class="lightbox__control lightbox__control--next" aria-label="Next photo">&#8250;</button>' +
      "</div>";

    document.body.appendChild(lightbox);

    var closeBtn = lightbox.querySelector(".lightbox__close");
    var prevBtn = lightbox.querySelector(".lightbox__control--prev");
    var nextBtn = lightbox.querySelector(".lightbox__control--next");
    var imageEl = lightbox.querySelector(".lightbox__image");
    var counterEl = lightbox.querySelector(".lightbox__counter");

    var activeGallery = null;
    var activeIndex = 0;
    var lastTrigger = null;

    function showSlide(index) {
      if (!activeGallery || !activeGallery.length) {
        return;
      }

      var total = activeGallery.length;
      activeIndex = (index + total) % total;
      var slide = activeGallery[activeIndex];

      imageEl.src = slide.src;
      imageEl.alt = slide.alt;
      counterEl.textContent = total > 1 ? (activeIndex + 1) + " / " + total : "";

      var showNav = total > 1;
      prevBtn.hidden = !showNav;
      nextBtn.hidden = !showNav;
    }

    function openLightbox(gallery, index) {
      activeGallery = gallery;
      if (!activeGallery || !activeGallery.length) {
        return;
      }

      lastTrigger = activeGallery[index].trigger;
      showSlide(index);
      lightbox.hidden = false;
      document.body.classList.add("lightbox-open");
      closeBtn.focus();
    }

    function closeLightbox() {
      lightbox.hidden = true;
      imageEl.removeAttribute("src");
      document.body.classList.remove("lightbox-open");
      activeGallery = null;

      if (lastTrigger) {
        lastTrigger.focus();
        lastTrigger = null;
      }
    }

    closeBtn.addEventListener("click", closeLightbox);

    prevBtn.addEventListener("click", function () {
      showSlide(activeIndex - 1);
    });

    nextBtn.addEventListener("click", function () {
      showSlide(activeIndex + 1);
    });

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (lightbox.hidden) {
        return;
      }

      if (e.key === "Escape") {
        e.stopPropagation();
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        showSlide(activeIndex - 1);
      } else if (e.key === "ArrowRight") {
        showSlide(activeIndex + 1);
      }
    });
  })();
})();
