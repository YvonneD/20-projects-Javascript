const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";

//search
async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();
  showData(data);
}

//show song
function showData(data) {
  result.innerHTML = `
    <ul class="songs">
        ${data.data
          .map(
            (
              song
            ) => `<li><span><strong>${song.artist.name}</strong>-${song.title}</strong></span>
        <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">get lyrics</button>
        </li>`
          )
          .join("")}
    </ul>
    `;
  if (data.prev || data.next) {
    more.innerHTML = `
            ${
              data.prev
                ? `<button class="btn onclick="getMoreSongs('${data.prev}')">previous</button>`
                : ""
            }
            ${
              data.next
                ? `<button class="btn" onclick="getMoreSongs('${data.next}')">next</button>`
                : ""
            }
        `;
  } else {
    more.innerHTML = "";
  }
}
//get prev or next songs
async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();
  showData(data);
}

//event
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value.trim();
  if (!searchTerm) {
    search.placeholder = "Please type in a search term!";
  } else {
    searchSongs(searchTerm);
  }
});
//get lyrcs
async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();
  const lyrics = data.lyrics.replace(/(\r\n|r|\n)/g, "<br>");
  result.innerHTML = `<h2><strong>${artist}</strong>-${songTitle}</h2>
    <span>${lyrics}</span>
    `;
  more.innerHTML = "";
}
//get lyrics
result.addEventListener("click", (e) => {
  const clickedEl = e.target;
  if (clickedEl.tagName === "BUTTON") {
    const artist = clickedEl.getAttribute("data-artist");
    const songTitle = clickedEl.getAttribute("data-songtitle");
    getLyrics(artist, songTitle);
  }
});
