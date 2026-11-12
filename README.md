# Emmanuel Noel Kakwera — Personal Portfolio

A personal portfolio website for **Emmanuel Noel Kakwera**, built with plain **HTML, CSS and JavaScript** as part of the *Multimedia Tools and Their Application* Assignment 2.

The site presents three sides of my professional identity:

- **Technology** — software development, web development, machine learning and IT support
- **Creativity** — graphic design, brand identity and visual communication
- **Media** — DJing, photography and videography

> **Tagline:** *Technology meets creativity.*

The visual direction is a near-black editorial portfolio with oversized Syne headings, monochrome cards and restrained motion.

---

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Home — editorial hero with profile photo, typing intro, services slider, skills and a featured project slider |
| `about.html` | About Me — personal introduction, education table, technical skills, industrial placement, interests, career aspirations and contact details |
| `projects.html` | Projects — four software projects with problem statements and repository/profile links, plus a creative portfolio (Fulo's Blend, Machili Agricultural Innovations, graphic design, DJ/media) |
| `animations.html` | Animated Concepts — six live animation demonstrations with explanations |

All four pages are linked through the same navigation menu.

---

## Features

- Responsive near-black editorial design with a monochrome white and grey palette
- Large uppercase Syne headings and an animated blob-shaped profile portrait
- Animated typing text for professional descriptions
- Animated background shapes and a skills ticker
- Prev/next service and project sliders with disabled-state controls
- White service cards that invert to dark on hover, with a corner arrow detail
- Portfolio images that fade to reveal captions and a “View project” cue on hover
- Lift and colour transitions on project and concept cards
- Animated skill progress bars that fill on scroll
- Scroll-reveal animations using `IntersectionObserver`
- Subtle film-grain overlay, hero light wash and grid texture on interior page heroes
- Reading-progress bar, numbered section labels and an animated scroll cue
- Availability badge and an oversized outlined footer wordmark
- HTML education table with styled headings and rows
- Ordered and unordered lists for skills and career goals
- Internal, external, email (`mailto:`) and section links
- Accessible markup: skip link, focus styles, `alt` text and `prefers-reduced-motion` support

---

## Technologies

- **HTML5** — semantic structure, tables, lists, images, hyperlinks
- **CSS3** — custom properties, Flexbox, CSS Grid, transitions, keyframe animations, media queries
- **JavaScript (ES6)** — DOM manipulation, event listeners, typing effect, IntersectionObserver and scroll-progress updates
- **Google Fonts** — Syne
- **Ionicons** — icon set loaded from a CDN

No frameworks, build tools or animation libraries are required.

---

## Project structure

```text
pfolio-master/
├── index.html
├── about.html
├── projects.html
├── animations.html
├── favicon.svg
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── script.js
    └── images/
        ├── profile.jpg
        └── covers/
            ├── moneyguard.svg
            ├── mccoy-project.png
            ├── machiri.svg
            ├── voting.svg
            ├── fulos-blend-project.png
            ├── dj-media.svg
            └── graphic-design.svg
```

---

## Run locally

The site is completely static. Any local web server will work.

Using Python:

```bash
cd pfolio-master
python -m http.server 8080
```

Then open <http://127.0.0.1:8080/>.

Using VS Code, you can also install the **Live Server** extension and choose *Open with Live Server* on `index.html`.

> Opening `index.html` directly from the file system also works, but a local server gives more accurate results.

---

## Publish with GitHub Pages

1. Create a repository named `personal-portfolio` (or use the existing repository).
2. Upload `index.html`, `about.html`, `projects.html`, `animations.html` and the `assets/` folder.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/ (root)` folder, then save.
6. Wait for GitHub to publish the site and open the generated URL.

Expected URL format:

```text
https://<username>.github.io/<repository-name>/
```

---

## Personalisation checklist

Before submitting, replace the remaining placeholders:

- [ ] **Secondary school name** in `about.html` — the education table currently lists MANEB as the awarding body for the MSCE. Replace it with the specific secondary school if you want the school named.
- [ ] **Project screenshots** — replace the remaining SVG covers in `assets/images/covers/` with real screenshots.
- [ ] **Project repository links** — McCOY and MoneyGuard have public repositories; update the Machili Agricultural Innovations and voting-system buttons with their exact repository URLs once published.
- [ ] **Profile photo** — `assets/images/profile.jpg` is the current portrait; replace it with a higher-resolution photo if available.
- [ ] **Social links** — add LinkedIn, Instagram or other professional profiles to the footer if desired.
- [ ] **GitHub Pages URL** — add the published link to the README and repository description.

---

## Credits

- Original layout inspiration: [Pfolio by codewithsadee](https://github.com/codewithsadee/pfolio) (MIT License).
- All content, structure, styling and JavaScript in this version have been rewritten and customised for this portfolio.
- Icons: [Ionicons](https://ionic.io/ionicons).
- Fonts: [Google Fonts](https://fonts.google.com/) — Syne.

---

## Contact

**Emmanuel Noel Kakwera**

- Email: [emmanuelkakwera4@gmail.com](mailto:emmanuelkakwera4@gmail.com)
- Phone: [098220439](tel:098220439)
- GitHub: [github.com/emmanuelkakwera](https://github.com/emmanuelkakwera)
- Location: Blantyre, Malawi
