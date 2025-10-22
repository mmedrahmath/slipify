document.addEventListener("DOMContentLoaded", () => {
  // Generate a simple User ID using timestamp
  const userId = Date.now();
  document.getElementById("userId").textContent = userId;

  // DOM Elements
  const songList = document.getElementById("songList");
  const emptyMessage = document.getElementById("emptyMessage");
  const addSongButton = document.getElementById("addSongButton");
  const fileInput = document.getElementById("songFileInput");

  // Load stored songs from localStorage
  let songs = JSON.parse(localStorage.getItem("songs")) || [];

  // Update UI with songs
  function updateSongList() {
    songList.innerHTML = ""; // Clear existing

    if (songs.length === 0) {
      emptyMessage.style.display = "block";
      return;
    } else {
      emptyMessage.style.display = "none";
    }

    songs.forEach((song, index) => {
      const li = document.createElement("li");
      li.classList.add("song-item");

      li.innerHTML = `
        <strong>${song.name}</strong>
        <audio controls src="${song.url}" style="width: 100%; margin-top: 10px;"></audio>
      `;

      songList.appendChild(li);
    });

    // Save updated song list to localStorage
    localStorage.setItem("songs", JSON.stringify(songs));
  }

  // Open file input when "Upload Song" is clicked
  addSongButton.addEventListener("click", () => {
    fileInput.click();
  });

  // Handle file upload
  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];

    if (file && file.type === "audio/mpeg") {
      const reader = new FileReader();
      reader.onload = function(e) {
        const songData = {
          name: file.name,
          url: e.target.result // Base64 data URL
        };
        songs.push(songData);
        updateSongList();
      };
      reader.readAsDataURL(file); // Convert file to Base64 string
    } else {
      alert("Please upload a valid MP3 file.");
    }
  });

  // Initial display
  updateSongList();
});
