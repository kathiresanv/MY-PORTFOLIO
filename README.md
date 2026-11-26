# Kathiresan V – Portfolio

## Run locally
1. Keep index.html, style.css, script.js (and profile.jpg if added) in one folder.
2. Double-click index.html, or run `python -m http.server 8000` in the folder and open http://localhost:8000.

## Edit content
- Text: edit index.html (sections are commented). Colours: the `:root` variables at the top of style.css.
- Replace each `[Add repo URL]` link with the project's GitHub repository URL (and add a live demo link if you have one).
- Add dates to the two internship cards and describe what you did in each.

## Add a profile photo
Put profile.jpg in the folder, then in index.html replace `<span>[Add Profile Photo]</span>` with `<img src="profile.jpg" alt="Kathiresan V">`.

## Real email delivery
Create a free form at formspree.io, then in script.js replace the `window.location.href = mailto…` line with a `fetch('https://formspree.io/f/YOUR_ID', {method:'POST', body:new FormData(form), headers:{Accept:'application/json'}})`. Netlify Forms also works.

## Deploy free
- GitHub Pages: create a repo, upload the files, Settings > Pages > Deploy from branch > main / root. Your site appears at https://kathiresanv.github.io/<repo>/.
- Netlify: go to app.netlify.com/drop and drag the folder in.
