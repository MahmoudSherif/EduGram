# EduMini – Mini Educational Website

EduMini is a small, responsive educational website showcasing how to deliver lesson content online. It is completely static—no build steps or dependencies required—making it easy to host on any static hosting service such as GitHub Pages, Netlify, or Vercel.

## Features

- Modern, responsive design built with HTML5 & CSS3 (no frameworks required)
- Smooth navigation with sticky header
- Dynamic course listing powered by 100% client-side JavaScript
- Accessible colour palette and mobile-first layout
- Minimal footprint — only three main files (`index.html`, `styles.css`, `script.js`)

## Getting Started

1. **Clone or download** this repository to your local machine.
2. Open `index.html` in your favourite browser.
    ```bash
    # Example using Python to serve locally
    python3 -m http.server 8080
    ```
3. Navigate to `http://localhost:8080` (or open the file directly). That's it!

## Deployment

Because EduMini is a static site, you can deploy it by uploading the three files (`index.html`, `styles.css`, `script.js`) to any web server or static hosting service.

- GitHub Pages: push to the `main` branch and enable Pages in repository settings.
- Netlify / Vercel: drag-and-drop the folder or connect the repo.

## Customisation

- **Add Courses:** Edit the `courses` array in `script.js` with your own course information.
- **Style Tweaks:** Modify `styles.css` or replace colours in the `:root` section.
- **Content:** Update text in the various `<section>` elements inside `index.html`.

## License

This project is released under the MIT License. Feel free to use, modify, and share.