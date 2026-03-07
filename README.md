# Stopping the Collapse — Site Deployment Guide
## IWasReady.com on GitHub Pages (Free Hosting)

---

## What's in this package

| File | Purpose |
|------|---------|
| `index.html` | Main landing page (IWasReady.com) |
| `about.html` | About Rick Broider |
| `privacy.html` | Privacy policy |
| `editor.html` | Lightweight site editor — open locally to edit pages |
| `hero-seven-fires.png` | Hero background image |
| `cracked-earth-dusk.png` | Problem section image |
| `divider-light-band.png` | Section divider image |
| `rick-portrait-600.jpg` | Author portrait |
| `book-mockup-dark.png` | Book mockup photo |

---

## Step 1 — Create a free GitHub account

Go to https://github.com and sign up. Free accounts include unlimited public repositories with free Pages hosting.

---

## Step 2 — Create a new repository

1. Click the **+** icon in the top right corner of GitHub
2. Select **New repository**
3. Name it exactly: `stopthecollapse` (or any name you prefer)
4. Set visibility to **Public**
5. Do NOT check "Add a README file"
6. Click **Create repository**

---

## Step 3 — Upload your files

1. On the empty repository page, click **uploading an existing file**
2. Drag and drop ALL files from this zip into the upload area:
   - index.html
   - about.html
   - privacy.html
   - editor.html
   - hero-seven-fires.png
   - cracked-earth-dusk.png
   - divider-light-band.png
   - rick-portrait-600.jpg
   - book-mockup-dark.png
3. Scroll down and click **Commit changes**

---

## Step 4 — Enable GitHub Pages

1. In your repository, click **Settings** (top nav)
2. In the left sidebar, click **Pages**
3. Under "Source", select **Deploy from a branch**
4. Under "Branch", select **main** and folder **/ (root)**
5. Click **Save**

GitHub will show a green banner with your live URL within 1-2 minutes. It will be:
`https://YOUR-USERNAME.github.io/stopthecollapse/`

---

## Step 5 — Connect your custom domain (IWasReady.com)

Do this in two places:

**In GitHub:**
1. Go to Settings > Pages
2. Under "Custom domain", type: `iwasready.com`
3. Click Save
4. GitHub will create a CNAME file automatically

**At your domain registrar (where you bought IWasReady.com):**

Add these DNS records:

```
Type    Name    Value
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     YOUR-USERNAME.github.io
```

DNS changes take 15 minutes to 24 hours to propagate. Once live, check the **Enforce HTTPS** checkbox in GitHub Pages settings.

---

## Step 6 — Connect StopTheCollapse.com

At your StopTheCollapse.com domain registrar, add a redirect:

```
Type: URL Redirect (301 Permanent)
From: stopthecollapse.com
To:   https://iwasready.com
```

This sends anyone who finds your brand name directly to the landing page.

---

## Updating your site after launch

**Option A — Use the editor (easiest):**
1. Open `editor.html` in your desktop browser (double-click the file)
2. Edit any page in the code pane
3. Click **Save File** to download the updated HTML
4. Go to GitHub, find the file, click the pencil icon, paste the new content, commit

**Option B — Direct GitHub edit:**
1. Go to your repository on GitHub
2. Click any HTML file
3. Click the pencil icon (Edit)
4. Make changes directly in the browser editor
5. Click **Commit changes**
Changes go live within 30 seconds.

---

## Adding the OG social preview image

Once you have `og-preview.jpg` (1200x630px):
1. Add it to your repository via the same upload process
2. The `<meta property="og:image">` tag is already in index.html pointing to it

---

## Substack embed note

The Substack subscribe forms in index.html pull from `rickbroider.substack.com`.
If you change your Substack URL, search for `rickbroider.substack.com` in index.html using the editor's Find & Replace tool and update all three instances.

---

## Questions?

All content, copy, and architecture was designed for regenerative builders.
Contact: https://rickbroider.substack.com
