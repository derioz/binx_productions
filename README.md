# Binx Productions - Photography Portfolio

The central hub for the Binx visual agency.

## ⚠️ IMPORTANT: Setup
1.  Save your logo as `public/logo.png`.
2.  Install dependencies:
    ```bash
    npm install
    ```

---

## 📸 PHOTOGRAPHER PROTOCOL: FILE NAMING

**ATTENTION CREATIVE TEAM:**
To ensure the Portfolio Engine correctly sorts your work, you **must** follow this strict naming convention before uploading to the `public/gallery` folder.

### The Golden Rule
The system reads filenames to generate the website. It splits the filename by **Underscores (`_`)**.

**Format:**
`[Artist]_[Category]_[Session-Name]_[Photo-Title].jpg`

### ⚠️ Critical Syntax
1.  **Separators:** Use Underscores `_` to separate the 4 main tags.
2.  **Spaces:** Use Dashes `-` for spaces *inside* a name. **NEVER** use actual spaces in the filename.
3.  **Extensions:** `.jpg`, `.png`, or `.webp` are accepted.

### 📝 Examples

| Scenario | ❌ WRONG | ✅ CORRECT |
| :--- | :--- | :--- |
| **Standard** | `Damon Car Shot.jpg` | `Damon_Automotive_Midnight-Run_GT3-Rear.jpg` |
| **Multi-word Title** | `Amy_Portraits_Summer_Vibes_Sunset.jpg` (Too many underscores) | `Amy_Portraits_Summer-Vibes_Sunset-Glow.jpg` |
| **Events** | `Callum_Event_Gala_1.jpg` | `Callum_Events_Charity-Gala_Red-Carpet-01.jpg` |

### 📂 Category List (Standardized)
Please stick to these categories to keep the filter bar clean:
*   `Automotive`
*   `Portraits`
*   `Events`
*   `Urban`
*   `Editorial`

### 💡 Pro Tip: Creating Sessions
To group photos into a specific folder/page on the site (e.g., "The Gala"), simply use the same **Session Name** (3rd tag) for multiple photos. The site automatically groups them.

---

## 🚀 MANAGEMENT WORKFLOW

### 1. Run the Scanner (The Engine)
After dropping photos into `public/gallery`, run this command to update the code registry:
```bash
npm run gallery:scan
```

### 2. Build & Deploy
Once the scan is complete, build the application to finalize the changes for the website:
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
