# Jane Sun — Portfolio

Personal portfolio site for Jane Sun, built with Jekyll on top of the
[Academic Pages](https://academicpages.github.io/) template, restyled with a
cool, minimalist palette.

## Structure

- `_pages/about.md` — homepage content (bio, education, experience, skills)
- `_portfolio/` — one Markdown file per project, shown on the Portfolio page
- `_config.yml` — site title, author info, contact links
- `_data/navigation.yml` — top nav links (Portfolio, Resume)
- `assets/css/claude.css` — the color/typography system (edit the `:root`
  variables at the top to retheme the whole site)

## Adding a new project

Create a new file in `_portfolio/`, e.g. `_portfolio/02my-project.md`:

```markdown
---
title: "Project Title"
tag: "Category / Tech Tag"
excerpt: "One paragraph describing the project.<br/><img src='/images/your-image.png' style='width:100%; max-width:1000px; '>"
collection: portfolio
link: /files/your-writeup.pdf   # or an external URL (GitHub repo, live demo, etc.)
featured: false                 # set true for the large featured card
---
```

Drop the image into `images/` and (optionally) a writeup PDF into `files/`.

## Running locally

```bash
bundle install
bundle exec jekyll serve
```

Then open `http://localhost:4000`.

## Deploying

Push to a GitHub repo named `<your-username>.github.io` and enable GitHub
Pages in the repo settings (Settings → Pages → Deploy from branch → main).
