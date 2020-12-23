const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

//song titles
const songs = [
  "helkimer-enough",
  "roa-music-winter-magic",
  "sapajou-cross-over",
];
//track of song
let songIndex = 2;

//initially load song to dom
loadSong(songs[songIndex]);

//update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

//plausong
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}

//pausesong
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  audio.pause();
}
//presong
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}
//nextsong
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}
//update progress
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPrecent = (currentTime / duration) * 100;
  progress.style.width = `${progressPrecent}%`;
}
//set progress
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}
//event
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

//change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

//time update
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
//song ends
audio.addEventListener("ended", nextSong);
