# Time & Limit Landing Page

The official website for **Time & Limit**, a free Chrome extension that tracks where your browsing time goes, sets daily limits on distracting sites, blocks what you don't need, and keeps all data on your device.

The site is plain static HTML, CSS and JavaScript. There is no build step, no framework and no third-party requests (fonts are self-hosted).

## Pages and sections

- **index.html**: the landing page. Sections: hero, feature pillars, features, time tracking, limits, insights, block page, how it works, privacy, FAQ, and install.
- **privacy.html**: the privacy policy (data collection and usage, permissions, policy changes, contact).

## Features

- Neo-brutalist design that matches the extension's UI.
- Light and dark themes. The saved or system theme is applied by an inline script in `<head>` before first paint, so there is no flash. The choice is stored in `localStorage` under `timeLimitTheme`.
- Responsive layout with a mobile menu that closes on link click or Escape.
- Nav link highlighting for the section currently on screen.
- Animated FAQ accordion built on `<details>`.
- Accessibility basics: semantic landmarks, labelled sections, and an inline SVG icon sprite.
- SEO and social preview meta tags (Open Graph, Twitter card).

## Project structure

```
index.html     Landing page
privacy.html   Privacy policy
style.css      Design tokens, layout, components, themes and responsive rules
script.js      Theme toggle, mobile menu, active nav link, store links, FAQ animation
logo.svg       Logo and favicon
fonts/         Self-hosted Inter variable font (WOFF2) and its license (OFL.txt)
```

## Running locally

Open `index.html` in a modern browser, or serve the folder with any static server, for example:

```sh
npx serve .
# or
python -m http.server 8000
```

## Configuration

### Chrome Web Store link

The extension isn't published on the Chrome Web Store yet, so the "Add to Chrome" buttons scroll to the manual install steps. Once it's published, set the URL at the top of `script.js`:

```js
const CHROME_WEB_STORE_URL = "https://chromewebstore.google.com/detail/...";
```

Every element with the `data-store-link` attribute will then open the store listing in a new tab, and the manual install block is hidden.

### Theme colors

Colors and other design tokens are CSS custom properties on `:root` at the top of `style.css`, with dark-theme overrides defined alongside them.

## Deployment

Upload the folder contents to any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages and so on). No build is needed.

## License

- Code: Apache License 2.0. See [LICENSE](LICENSE).
- Inter font: SIL Open Font License 1.1. See [fonts/OFL.txt](fonts/OFL.txt).

## Credits

Designed and developed by [Eon](https://eony.dev).
