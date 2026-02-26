document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for anchor links
  document.querySelectorAll('.nav-link[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Install Button mock action
  const installBtn = document.getElementById("install-btn");
  if (installBtn) {
    installBtn.addEventListener("click", () => {
      alert(
        "This would typically redirect to the Chrome Web Store to install the extension.",
      );
    });
  }

  // Interactive chart preview mock
  const bars = document.querySelectorAll(".bar-column");
  bars.forEach((bar) => {
    bar.addEventListener("click", () => {
      bars.forEach((b) => b.classList.remove("selected"));
      bar.classList.add("selected");
    });
  });

  // FAQ Accordion logic
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");
    questionBtn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all items
      faqItems.forEach((faq) => {
        faq.classList.remove("active");
        const icon = faq.querySelector(".faq-icon");
        if (icon) icon.textContent = "+";
      });

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add("active");
        const icon = item.querySelector(".faq-icon");
        if (icon) icon.textContent = "×";
      }
    });
  });
  const themeToggle = document.getElementById("theme-toggle");

  if (localStorage.getItem("timeLimitTheme") === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggle) themeToggle.checked = true;
  }

  if (themeToggle) {
    themeToggle.addEventListener("change", (e) => {
      if (e.target.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("timeLimitTheme", "dark");
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("timeLimitTheme", "light");
      }
    });
  }
});
