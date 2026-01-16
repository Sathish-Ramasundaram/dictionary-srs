const API_URL = "https://opensheet.elk.sh/1ocCdId5BHJqPWXoHfQr05QHgZg6-Ztq-M-cYoXB6NNk/Sheet1";

let allWords = [];

const container = document.getElementById("wordContainer");
const searchInput = document.getElementById("searchInput");
const sortAZBtn = document.getElementById("sortAZ");
const sortZABtn = document.getElementById("sortZA");
const refreshBtn = document.getElementById("refreshBtn");
const wordCount = document.getElementById("wordCount");

// Fallback image if URL is missing or broken
const FALLBACK_IMAGE = "https://via.placeholder.com/100";

// Fetch data from Google Sheet
function loadData() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      allWords = data.map(item => ({
        Word: item.Word || item.word || "",
        Meaning: item.Meaning || item.meaning || "",
        Image: item.Image || item.image || FALLBACK_IMAGE
      }));
      displayWords(allWords);
    })
    .catch(error => console.error("Error loading data:", error));
}

// Initial load
loadData();

// Display words as cards with image
function displayWords(words) {
  container.innerHTML = "";

  if (words.length === 0) {
    container.innerHTML = "<p>No words found.</p>";
    wordCount.textContent = "Total words: 0";
    return;
  }

  words.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${item.Image}" alt="${item.Word}" onerror="this.src='${FALLBACK_IMAGE}'" />
      <div class="text">
        <strong>${item.Word}</strong><br/>
        ${item.Meaning}
      </div>
    `;

    container.appendChild(card);
  });

  wordCount.textContent = `Total words: ${words.length}`;
}

// Search functionality
searchInput.addEventListener("input", () => {
  const text = searchInput.value.toLowerCase();
  const filtered = allWords.filter(item => item.Word.toLowerCase().includes(text));
  displayWords(filtered);
});

// Sort A–Z
sortAZBtn.addEventListener("click", () => {
  const sorted = [...allWords].sort((a, b) => a.Word.localeCompare(b.Word));
  displayWords(sorted);
});

// Sort Z–A
sortZABtn.addEventListener("click", () => {
  const sorted = [...allWords].sort((a, b) => b.Word.localeCompare(a.Word));
  displayWords(sorted);
});

// Refresh button
refreshBtn.addEventListener("click", loadData);
