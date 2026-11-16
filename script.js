// Set this to the extension's Chrome Web Store URL once it is published.
// Until then, "Add to Chrome" buttons scroll to the manual install steps.
const CHROME_WEB_STORE_URL = "";

document.addEventListener("DOMContentLoaded", () => {
	const root = document.documentElement;

	/* Theme toggle (the initial theme is applied by an inline script in <head>) */
	const themeBtn = document.getElementById("theme-btn");

	function syncThemeButton() {
		const dark = root.dataset.theme === "dark";
		themeBtn.setAttribute("aria-pressed", String(dark));
		themeBtn.setAttribute(
			"aria-label",
			dark ? "Switch to light mode" : "Switch to dark mode",
		);
	}

	if (themeBtn) {
		syncThemeButton();
		themeBtn.addEventListener("click", () => {
			root.dataset.theme =
				root.dataset.theme === "dark" ? "light" : "dark";
			try {
				localStorage.setItem("timeLimitTheme", root.dataset.theme);
			} catch (e) {
				// Storage can be unavailable (private mode); the toggle still works for this visit
			}
			syncThemeButton();
		});
	}

	/* Mobile menu */
	const menuBtn = document.getElementById("menu-btn");
	const nav = document.getElementById("site-nav");

	function setMenu(open) {
		nav.classList.toggle("is-open", open);
		menuBtn.setAttribute("aria-expanded", String(open));
		menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
	}

	if (menuBtn && nav) {
		menuBtn.addEventListener("click", () =>
			setMenu(!nav.classList.contains("is-open")),
		);
		// Close after choosing a link, or with Escape
		nav.querySelectorAll("a").forEach((link) =>
			link.addEventListener("click", () => setMenu(false)),
		);
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape" && nav.classList.contains("is-open")) {
				setMenu(false);
				menuBtn.focus();
			}
		});
	}

	/* Highlight the nav link for the section currently on screen */
	const navLinks = nav
		? [...nav.querySelectorAll('a[href^="#"]:not(.btn)')]
		: [];
	const sections = [...document.querySelectorAll("main section[id]")];

	function updateActiveLink() {
		// A section counts as current once its top passes a line a third of the way down the screen
		const line = window.innerHeight / 3;
		let current = null;
		for (const section of sections) {
			if (section.getBoundingClientRect().top <= line) current = section;
		}
		// At the very bottom, the last section wins even if it is too short to reach the line
		if (
			window.innerHeight + window.scrollY >=
			document.documentElement.scrollHeight - 2
		) {
			current = sections[sections.length - 1];
		}
		const id = current ? `#${current.id}` : null;
		navLinks.forEach((link) => {
			const active = link.getAttribute("href") === id;
			link.classList.toggle("is-active", active);
			if (active) link.setAttribute("aria-current", "location");
			else link.removeAttribute("aria-current");
		});
	}

	if (navLinks.length && sections.length) {
		let ticking = false;
		const requestUpdate = () => {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(() => {
				ticking = false;
				updateActiveLink();
			});
		};
		window.addEventListener("scroll", requestUpdate, { passive: true });
		window.addEventListener("resize", requestUpdate);
		updateActiveLink();
	}

	/* Store links */
	if (CHROME_WEB_STORE_URL) {
		document.querySelectorAll("[data-store-link]").forEach((link) => {
			link.href = CHROME_WEB_STORE_URL;
			link.target = "_blank";
			link.rel = "noopener";
		});
		const manual = document.getElementById("manual-install");
		if (manual) manual.hidden = true;
	}

	/* FAQ: slide answers open and closed instead of snapping */
	const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

	document.querySelectorAll(".faq-item").forEach((item) => {
		const summary = item.querySelector("summary");
		if (!summary || typeof item.animate !== "function") return;
		let anim = null;

		summary.addEventListener("click", (e) => {
			if (reduceMotion.matches) return; // let <details> toggle instantly
			e.preventDefault();

			const startHeight = item.offsetHeight; // includes any in-progress animation
			if (anim) anim.cancel();

			const opening = !item.open || item.classList.contains("is-closing");
			item.classList.add("is-animating");
			let endHeight;
			if (opening) {
				item.classList.remove("is-closing");
				item.open = true;
				endHeight = item.offsetHeight;
			} else {
				item.classList.add("is-closing");
				const borders = item.offsetHeight - item.clientHeight;
				endHeight = summary.offsetHeight + borders;
			}

			anim = item.animate(
				{ height: [`${startHeight}px`, `${endHeight}px`] },
				{ duration: 300, easing: "cubic-bezier(0.2, 0.7, 0.3, 1)" },
			);
			anim.onfinish = () => {
				anim = null;
				item.classList.remove("is-animating");
				if (!opening) {
					item.open = false;
					item.classList.remove("is-closing");
				}
			};
		});
	});

	/* Keep the copyright year current */
	const year = document.getElementById("year");
	if (year) year.textContent = String(new Date().getFullYear());
});
