https://sathish-ramasundaram.github.io/dictionary-srs/

# 📘 Google Sheet Integration with Vanilla JavaScript

This project demonstrates **how to use a Google Sheet as a data source** and display its content in a **Vanilla JavaScript** web application.

This README is written **step by step**, assuming **zero prior knowledge**, so it can be clearly explained to a **vendor, reviewer, or beginner audience**.

---

## 🎯 Project Objective

* Store **Words and Meanings** in Google Sheets
* Read the data **live** from Google Sheets
* Display it in a **Vanilla JavaScript** application
* Add common features like:

  * Search
  * Sort (A–Z / Z–A)
  * Refresh
  * Total word count
* Deploy the app using **GitHub Pages**

---

## 🧰 Technologies Used

* HTML
* CSS
* Vanilla JavaScript (No frameworks)
* Google Sheets (as database)
* GitHub Pages (hosting)

---

## 🗂 Project Structure

```
google-sheet-words/
├── index.html
├── script.js
└── style.css
```

---

## STEP 1: Create Google Sheet

1. Go to **Google Sheets**
2. Create a new sheet
3. Add the following headers in the **first row**:

```
Word | Meaning
```

4. Add sample data:

```
HTML | Markup language
CSS | Styling language
JavaScript | Programming language
```

⚠️ Column names must match exactly (`Word`, `Meaning`)

---

## STEP 2: Make Google Sheet Public

### 2.1 Publish to Web

1. Open the Google Sheet
2. Click **File → Share → Publish to web**
3. Choose:

   * Entire document
   * Web page
4. Click **Publish**

---

### 2.2 Change Share Permissions

1. Click **Share** button (top-right)
2. Under **General access**:

   * Select **Anyone with the link**
   * Permission: **Viewer**
3. Click **Done**

This step is **mandatory**.

---

## STEP 3: Convert Google Sheet to JSON API

### 3.1 Get Sheet ID

Google Sheet URL example:

```
https://docs.google.com/spreadsheets/d/1ABC123XYZ/edit
```

Sheet ID:

```
1ABC123XYZ
```

---

### 3.2 Get Sheet Name

Check the tab name at the bottom of the sheet.

Example:

```
Sheet1
```

---

### 3.3 JSON URL Format

```
https://opensheet.elk.sh/SHEET_ID/SHEET_NAME
```

Example:

```
https://opensheet.elk.sh/1ABC123XYZ/Sheet1
```

Open this URL in the browser.

✅ If JSON appears, the setup is correct.

---

## STEP 4: Create HTML File

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Words & Meanings</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <h1>📘 Words & Meanings</h1>

  <input type="text" id="searchInput" placeholder="Search a word..." />

  <button id="sortAZ">Sort A–Z</button>
  <button id="sortZA">Sort Z–A</button>
  <button id="refreshBtn">🔄 Refresh</button>

  <p id="wordCount"></p>

  <ul id="wordList"></ul>

  <script src="script.js"></script>
</body>
</html>
```

---

## STEP 5: JavaScript Logic

### `script.js`

```javascript
const API_URL = "https://opensheet.elk.sh/YOUR_SHEET_ID/Sheet1";

let allWords = [];

const list = document.getElementById("wordList");
const searchInput = document.getElementById("searchInput");
const sortAZBtn = document.getElementById("sortAZ");
const sortZABtn = document.getElementById("sortZA");
const refreshBtn = document.getElementById("refreshBtn");
const wordCount = document.getElementById("wordCount");

function loadData() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      allWords = data;
      displayWords(allWords);
    })
    .catch(error => console.error(error));
}

loadData();

function displayWords(words) {
  list.innerHTML = "";

  words.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${item.Word}</strong> : ${item.Meaning}`;
    list.appendChild(li);
  });

  wordCount.textContent = `Total words: ${words.length}`;
}

searchInput.addEventListener("input", () => {
  const text = searchInput.value.toLowerCase();
  const filtered = allWords.filter(item =>
    item.Word.toLowerCase().includes(text)
  );
  displayWords(filtered);
});

sortAZBtn.addEventListener("click", () => {
  const sorted = [...allWords].sort((a, b) => a.Word.localeCompare(b.Word));
  displayWords(sorted);
});

sortZABtn.addEventListener("click", () => {
  const sorted = [...allWords].sort((a, b) => b.Word.localeCompare(a.Word));
  displayWords(sorted);
});

refreshBtn.addEventListener("click", loadData);
```

---

## STEP 6: Styling (Optional)

### `style.css`

```css
body {
  font-family: Arial, sans-serif;
  padding: 20px;
}

input {
  padding: 8px;
  width: 250px;
  margin-bottom: 10px;
}

button {
  margin-left: 5px;
  padding: 6px 10px;
}

li {
  margin-bottom: 8px;
}

#wordCount {
  font-weight: bold;
}
```

---

## STEP 7: Run Locally

### Option 1: Live Server (Recommended)

* Open project in VS Code
* Install **Live Server** extension
* Right-click `index.html`
* Click **Open with Live Server**

### Option 2: Direct

* Double-click `index.html`

---

## STEP 8: Push to GitHub

```bash
git init
git add .
git commit -m "Google Sheet integration using Vanilla JS"
git branch -M main
git remote add origin https://github.com/USERNAME/google-sheet-words.git
git push -u origin main
```

---

## STEP 9: Deploy Using GitHub Pages

1. Go to **GitHub Repository → Settings**
2. Open **Pages**
3. Source:

   * Branch: `main`
   * Folder: `/root`
4. Save

Live URL:

```
https://USERNAME.github.io/google-sheet-words/
```

---

## ✅ Final Outcome

* Google Sheet acts as database
* Vanilla JS fetches live data
* Search, Sort, Refresh, Count implemented
* Hosted publicly via GitHub Pages

---

## 📌 Use Cases

* Vocabulary apps
* Learning projects
* Demo applications
* Beginner JavaScript training

---

## 🙌 Conclusion

This project demonstrates **real-world integration** using only **basic web technologies**, making it ideal for beginners and vendor demonstrations.
