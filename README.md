# Rock Creek Composite — Team Website

Public website for **Rock Creek Composite**, a youth mountain bike community in the Oregon League.

## Active pages

| Page | File |
|------|------|
| Home | `index.html` |
| About | `about.html` |
| Coaches | `coaches.html` |
| Join / Registration | `register.html` |
| Event Schedule | `schedule.html` |
| Gallery | `gallery.html` |

## Content updates

- **Event schedule:** Edit `js/events-data.js` each season (source: [oregonmtb.org/eventweekends](https://www.oregonmtb.org/eventweekends))
- **Coach photos:** `img/coaches/` (Jean, Dave, John). Gray placeholders used when no photo is available.
- **Gallery:** `img/gallery/gallery-01.png` through `gallery-05.png`
- **Contact:** `contact.html` (linked from Join and Coaches pages; not in main nav)

## Local preview

```bash
cd /path/to/Website
ruby -run -e httpd . -p 8080
```

Open http://127.0.0.1:8080

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository.
2. **Settings → Pages →** branch `main`, folder **/ (root)**.
3. Site URL: `https://<username>.github.io/<repo>/`

Official rider registration: [oregonmtb.org/find-a-team](https://www.oregonmtb.org/find-a-team)
