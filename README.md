# Binx Productions - Photography Portfolio - Created by Damon

A high-performance, dark-themed photography agency landing page.

## ⚠️ IMPORTANT: Setup
1.  Save your logo as `public/logo.png`.
2.  Install dependencies:
    ```bash
    npm install
    ```

---

## 📸 WORKFLOW: How to Update the Website

Follow these steps to add new photos and update the live site.

### 1. Add Photos
Drop your images (`.jpg`, `.png`, `.webp`) into the `public/gallery` folder.

**Naming Convention:**
`Photographer_Category_Session-Name_Title.jpg`
*   Example: `Damon_Automotive_Midnight-Run_Drift-King.jpg`
*   *Note: Use dashes instead of spaces. They are converted automatically.*

### 2. Run the Scanner (The Engine)
This command detects your new files and updates the code registry.
```bash
npm run gallery:scan
```

### 3. Build & Deploy
Once the scan is complete, build the application to finalize the changes for the website.
```bash
npm run build
```
*After building, commit and push your changes to GitHub to update the live site.*

---

## 🛠️ Development Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start local development server. |
| `npm run gallery:scan` | Scan `public/gallery` and update photo registry. |
| `npm run build` | Compile the website for production (creates `docs/` folder). |
| `npm run preview` | Preview the production build locally. |