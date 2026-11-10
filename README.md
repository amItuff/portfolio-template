<div align="center">

<img src="docs/banner.png" alt="Portfolio Template" width="100%" />

<br />

**A fast, gorgeous developer portfolio you configure in one file.**<br />
No framework. No build step. No dependencies. Deploy anywhere for free.

<br />

[![Use this template](https://img.shields.io/badge/Use_this_template-2ea44f?style=for-the-badge&logo=github&logoColor=white)](https://github.com/amItuff/portfolio-template/generate)
[![Deploy with Vercel](https://img.shields.io/badge/Deploy-Vercel-000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/new/clone?repository-url=https://github.com/amItuff/portfolio-template)
[![Deploy to Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://app.netlify.com/start/deploy?repository=https://github.com/amItuff/portfolio-template)

[![License: MIT](https://img.shields.io/github/license/amItuff/portfolio-template?style=flat-square&color=7c8cff)](LICENSE)
[![Stars](https://img.shields.io/github/stars/amItuff/portfolio-template?style=flat-square&color=7c8cff)](https://github.com/amItuff/portfolio-template/stargazers)
![Dependencies: 0](https://img.shields.io/badge/dependencies-0-7c8cff?style=flat-square)

[English](README.md) · [Tiếng Việt](README.vi.md)

</div>

---

## Why this one

Most portfolio templates are a React app you have to understand before you can change your name.
This one is a single page you can read in ten minutes. Everything you would want to change lives in [`config.js`](config.js).

- **One file to edit.** Name, photo, banner, links, projects, colours, language. Save, refresh, done.
- **Looks like a product, not a template.** Animated intro, blurred glass cards, glowing avatar ring, smooth scroll reveals.
- **Your banner, your way.** Use an image, a GIF, a looping video, or the built-in animated gradient.
- **Bilingual out of the box.** Any text can be `{ en: "…", vi: "…" }`; a language switch appears automatically.
- **Optional extras.** Live Discord status, a music player, a local clock, copy-to-clipboard email.
- **Fast.** Under 30 kB of JS and CSS in total (about 10 kB gzipped), no framework, no tracking, no cookies.
- **Accessible.** Keyboard friendly, visible focus, respects `prefers-reduced-motion`, works on a phone.
- **Free hosting anywhere.** GitHub Pages, Vercel, Netlify, Cloudflare Pages, or any static host.

<div align="center">
<img src="docs/hero.png" alt="Hero section" width="49%" />
<img src="docs/cards.png" alt="Cards section" width="49%" />
</div>

## Quick start

**1. Get your copy**

Click **Use this template** above, or:

```bash
git clone https://github.com/amItuff/portfolio-template.git my-portfolio
cd my-portfolio
```

**2. Edit `config.js`**

Open it in any editor and replace the sample values with yours. Every option has a comment.

**3. Preview**

Double-click `index.html`, or run a local server with live reload:

```bash
npm run dev
```

**4. Publish**

Push to GitHub and pick one of the three options in [Deploy](#deploy). It takes about two minutes.

## Customize

Everything below is in [`config.js`](config.js).

| I want to change… | Edit |
| --- | --- |
| Name, tagline, bio, location | `profile` |
| Profile photo | `profile.avatar`, drop your file in `assets/img/` |
| **Banner / background** | `appearance.background`, accepts `.jpg` `.png` `.webp` `.gif` `.mp4` `.webm`, or a URL. `""` uses the animated gradient |
| Accent colour | `appearance.accent`, for example `"#ff6b6b"` |
| Background darkness | `appearance.backgroundDim`, `0` to `1` |
| Remove the intro splash | `appearance.intro: false` |
| Social buttons | `social`, 28 brand icons included |
| Projects | `projects.items` |
| Skills | `skills.items` |
| Languages | `site.languages`, one entry hides the switch |
| Live Discord status | `discord.enabled` and your user ID |
| Music | `music.tracks`, put `.mp3` files in `assets/audio/` |
| Share preview image | `site.shareImage`, 1200×630 |

### Change the banner

```js
appearance: {
  background: "assets/img/my-banner.jpg",   // or a GIF, an .mp4, or a URL
  backgroundDim: 0.5,
  accent: "#ff6b6b",
}
```

Tip: 1920×1080 or larger, under 500 kB for images. For video, keep it under 5 MB, muted and looping.

### Add a project

```js
projects: {
  title: "Selected work",
  items: [
    { title: "My App", description: "What it does.", url: "https://…", tags: ["React", "Node"], icon: "github" },
  ],
},
```

### Add a language

Text fields take either a string or one string per language. Interface labels for English (`en`) and Vietnamese (`vi`) are built in. To add another language, add a block to `UI` in [`assets/js/app.js`](assets/js/app.js) and list it in `site.languages`.

## Link previews

Social sites do not run JavaScript, so they need the title and image in the HTML. After editing `config.js` run:

```bash
npm run meta
```

This copies your title, description and share image into `index.html`. Both Vercel and Netlify do it for you on every deploy, see below.

## Deploy

| Host | How |
| --- | --- |
| **Vercel** | Click the Vercel button above. Build command and settings come from `vercel.json`. |
| **Netlify** | Click the Netlify button above. Settings come from `netlify.toml`. |
| **GitHub Pages** | Settings → Pages → Source: **GitHub Actions**. The workflow in `.github/workflows/pages.yml` publishes on every push to `main`. |
| **Anything else** | Upload the folder. It is plain static files. |

Custom domain: add it in your host's dashboard and set `site.url` in `config.js`.

## Project structure

```
├── config.js            ← the only file most people edit
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/app.js        ← renders the page from config.js
│   ├── js/icons.js      ← brand icons (Simple Icons, CC0)
│   └── img/             ← avatar, banner, favicon, share image
└── scripts/sync-meta.js ← copies config into <head> for link previews
```

## FAQ

<details>
<summary><b>Do I need to know how to code?</b></summary>
<br />
No. If you can edit a text file you can use this. Change the values in <code>config.js</code> and keep the quotes and commas.
</details>

<details>
<summary><b>Is it good for SEO?</b></summary>
<br />
Content is rendered in the browser, which Google handles well. Run <code>npm run meta</code> so titles, descriptions and link previews are in the HTML too.
</details>

<details>
<summary><b>Does it track visitors?</b></summary>
<br />
No analytics, no cookies. The only request to a third party is Google Fonts, plus lanyard.rest if you turn on the Discord card. Self-host the fonts if you want zero external requests.
</details>

<details>
<summary><b>Can I remove the credit link?</b></summary>
<br />
Yes, set <code>footer.showCredit: false</code>. A star on the repo is always appreciated.
</details>

## Contributing

Bug reports, new icons and translations are welcome. Open an issue first for larger changes. Keep it dependency free.

## Credits

Brand icons from [Simple Icons](https://simpleicons.org) (CC0). Fonts: Bricolage Grotesque, Be Vietnam Pro and IBM Plex Mono via Google Fonts.

## License

[MIT](LICENSE). Use it for yourself, for clients, commercially, anything.

<div align="center">
<br />

If this saved you time, **[give it a star](https://github.com/amItuff/portfolio-template)** so others can find it.

</div>
