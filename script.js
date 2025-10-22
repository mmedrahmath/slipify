document.addEventListener("DOMContentLoaded", () => {
  // ✅ Check if user already has an ID saved
  let userId = localStorage.getItem("melodyVaultUserID");
  if (!userId) {
    userId = "USER-" + Date.now();
    localStorage.setItem("melodyVaultUserID", userId);
  }
  document.getElementById("userId").textContent = userId;

  // DOM elements
  const songList = document.getElementById("songList");
  const emptyMessage = document.getElementById("emptyMessage");
  const fileInput = document.getElementById("songFileInput");
  const addSongButton = document.getElementById("addSongButton");

  // ✅ Load songs from localStorage
  let songs = JSON.parse(localStorage.getItem("songs")) || [];

  // ✅ Show Songs List
  function updateSongList() {
    songList.innerHTML = "";

    if (songs.length === 0) {
      emptyMessage.style.display = "block";
      return;
    }
    emptyMessage.style.display = "none";

    songs.forEach((song, index) => {
      const li = document.createElement("li");
      li.classList.add("song-item");

      li.innerHTML = `
        <strong>${song.name}</strong>
        <audio controls src="${song.url}" style="width: 100%; margin-top: 10px;"></audio>
      `;

      // ✅ If song belongs to this user → Show Delete button
      if (song.ownerId === userId) {
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "❌ Delete";
        deleteButton.classList.add("delete-btn");
        deleteButton.onclick = () => {
          songs.splice(index, 1);
          localStorage.setItem("songs", JSON.stringify(songs));
          updateSongList();
        };
        li.appendChild(deleteButton);
      }

      songList.appendChild(li);
    });

    localStorage.setItem("songs", JSON.stringify(songs));
  }

  // ✅ Upload MP3 File
  addSongButton.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file && file.type === "audio/mpeg") {
      const reader = new FileReader();
      reader.onload = function(e) {
        songs.push({
          name: file.name,
          url: e.target.result,
          ownerId: userId // ✅ Only owner can delete
        });
        localStorage.setItem("songs", JSON.stringify(songs));
        updateSongList();
      };
      reader.readAsDataURL(file);
    } else {
      alert("Only MP3 files are allowed!");
    }
  });

  updateSongList();
});
