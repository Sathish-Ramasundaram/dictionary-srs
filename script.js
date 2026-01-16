const API_URL =
  "https://opensheet.elk.sh/1ocCdId5BHJqPWXoHfQr05QHgZg6-Ztq-M-cYoXB6NNk/Sheet1";

let allWords = [];

const list = document.getElementById("wordList");
const searchInput = document.getElementById("searchInput");
const sortAZBtn = document.getElementById("sortAZ");
const sortZABtn = document.getElementById("sortZA");
const refreshBtn = document.getElementById("refreshBtn");
const wordCount = document.getElementById("wordCount");

// Load data
function loadData() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      allWords = data;
      displayWords(allWords);
    })
    .catch(error => {
      console.error("Error loading data:", error);
    });
}

// Initial load
loadData();

// Display function
function displayWords(words) {
  list.innerHTML = "";

  words.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${item.Word}</strong> : ${item.Meaning}`;
    list.appendChild(li);
  });

  // Update count
  wordCount.textContent = `Total words: ${words.length}`;
}

// Search logic
searchInput.addEventListener("input", function () {
  const searchText = searchInput.value.toLowerCase();

  const filteredWords = allWords.filter(item =>
    item.Word.toLowerCase().includes(searchText)
  );

  displayWords(filteredWords);
});

// Sort A–Z
sortAZBtn.addEventListener("click", function () {
  const sorted = [...allWords].sort((a, b) =>
    a.Word.localeCompare(b.Word)
  );
  displayWords(sorted);
});

// Sort Z–A
sortZABtn.addEventListener("click", function () {
  const sorted = [...allWords].sort((a, b) =>
    b.Word.localeCompare(a.Word)
  );
  displayWords(sorted);
});

// Refresh button
refreshBtn.addEventListener("click", function () {
  loadData();
});
