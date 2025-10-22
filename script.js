document.addEventListener("DOMContentLoaded", () => {
  const userId = Date.now();
  document.getElementById("userId").textContent = userId;

  const songList = document.getElementById("songList");
  const emptyMessage = document.getElementById("emptyMessage");
  const modal = document.getElementById("songModal");

  const addSongButton = document.getElementById("addSongButton");
  const saveSongButton = document.getElementById("saveSong");
  const closeModalButton = document.getElementById("closeModal");

  let songs = JSON.parse(localStorage.getItem("songs")) || [];

  function updateSongList() {
    songList.innerHTML = "";
    if (songs.length === 0) {
      emptyMessage.style.display = "block";
    } else {
      emptyMessage.style.display = "none";
      songs.forEach((song, index) => {
        const li = document.createElement("li");
        li.classList.add("song-item");
        li.innerHTML = `<strong>${song.title}</strong> by ${song.artist}`;
        songList.appendChild(li);
      });
    }
    localStorage.setItem("songs", JSON.stringify(songs));
  }

  addSongButton.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  saveSongButton.addEventListener("click", () => {
    const title = document.getElementById("songTitle").value;
    const artist = document.getElementById("songArtist").value;

    if (title && artist) {
      songs.push({ title, artist });
      updateSongList();
      modal.style.display = "none";
    }
  });

  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  updateSongList();
});
