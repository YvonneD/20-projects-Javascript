const msgEl = document.getElementById("msg");

const randomNum = getRandomNumber();

console.log(randomNum);
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new window.SpeechRecognition();
//start recongnition
recognition.start();
//capture user speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  writeMessage(msg);
  checkNumber(msg);
}
//write what user speak
function writeMessage(msg) {
  msgEl.innerHTML = `
        <div>You said:</div>
        <span class='box'>${msg}</span>
    `;
}
//check msg against number
function checkNumber(msg) {
  const num = +msg;
  if (Number.isNaN(num)) {
    msgEl.innerHTML += "<div>that is not a valide number</div>";
    return;
  }
  if (num > 100 || num < 1) {
    msgEl.innerHTML += "<div>Number must be 1 to 100</div>";
    return;
  }
  if (num === randomNum) {
    document.body.innerHTML = `
            <h2>Congrats! You guess the right number<br> ${num}</h2><br>
            <button class='play-again' id="play-again">Play again</button>
        `;
  } else if (num > randomNum) {
    msgEl.innerHTML += "<div>go lower</div>";
  } else {
    msgEl.innerHTML += "<div>go higher</div>";
  }
}
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}
//speak result
recognition.addEventListener("result", onSpeak);
//end sr server
recognition.addEventListener("end", () => recognition.start());
document.body.addEventListener("click", (e) => {
  if (e.target.id == "play-again") {
    window.location.reload();
  }
});
