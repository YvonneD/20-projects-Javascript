const container = document.getElementById("container");
const text = document.getElementById("text");
const audio = document.querySelector("audio");
const toggleAudio = document.getElementById("toggleAudio");

const totalTime = 7500;
const breathTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;
breathAnimation();
function breathAnimation() {
  text.innerText = "Breath in!";
  container.className = "container grow";
  setTimeout(() => {
    text.innerText = "hold";
    setTimeout(() => {
      text.innerText = "Breath out!";
      container.className = "container shrink";
    }, holdTime);
  }, breathTime);
}
setInterval(breathAnimation, totalTime);

audio.play();
audio.muted = true;
toggleAudio.addEventListener("click", () => {
  audio.muted = !audio.muted;
});
