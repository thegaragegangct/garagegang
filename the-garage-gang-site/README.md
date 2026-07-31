# The Garage Gang — Website

Plain HTML/CSS/JS. No build step, no framework — just upload as-is to GitHub Pages (or any static host).

## File structure
```
index.html        ← the page itself
css/styles.css     ← all styling (colors, fonts, spacing, responsive rules)
js/main.js         ← phone number + EmailJS config, and form logic
images/            ← all photos + favicon, fixed filenames for easy swapping
```

## Things to fill in before launch

Open **`js/main.js`** — everything you need is in the `CONFIG` block at the top:

1. **Phone number**
   - `PHONE_NUMBER_RAW`: digits only, e.g. `"5550109999"`
   - `PHONE_NUMBER_DISPLAY`: how it's shown, e.g. `"(555) 010-9999"`
   - This automatically updates the header call button, hero "Call Now" button, and footer.

2. **EmailJS keys** (for the quote form to actually send you an email)
   - Sign up free at [emailjs.com](https://www.emailjs.com)
   - Create an Email Service and an Email Template
   - Your template should expect these field names (they match the form inputs):
     `from_name`, `from_phone`, `from_email`, `garage_size`, `preferred_date`, `message`
   - Paste your **Public Key**, **Service ID**, and **Template ID** into the matching `CONFIG` values
   - Until these are filled in, the form will show a friendly "please call us instead" message rather than failing silently

## Swapping images

Every image has a fixed filename — just replace the file with a new one **using the exact same filename** and it updates automatically:

| Filename | Used for |
|---|---|
| `images/hero-bg.jpg` | Full-bleed background behind the hero headline |
| `images/problem.jpg` | Photo next to the "Can't even park in there?" section |
| `images/before.jpg` | Left photo in the "Before / After" section |
| `images/after.jpg` | Right photo in the "Before / After" section |
| `images/logo-mascot.png` | Browser tab favicon only |

Recommended: keep new images roughly the same aspect ratio as the ones they replace so cropping looks intentional (`hero-bg.jpg`/`problem.jpg`/`before.jpg` are ~4:3, `after.jpg` is ~2:1).

## Deploying to GitHub Pages

1. Push this whole folder to a GitHub repo
2. In the repo: **Settings → Pages → Deploy from branch** → select `main` (or your default branch) and `/ (root)`
3. Your site will be live at `https://yourusername.github.io/repo-name/` within a minute or two
