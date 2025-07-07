import { runImageSlider } from "./image.js";
import { runTextSlider } from "./text.js";

function loadHTML(id, url, callback) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(id).innerHTML = data;

      // صبر کن تا DOM آپدیت بشه
      setTimeout(() => {
        if (callback) callback();
      }, 100); // می‌تونی مقدار رو زیادتر هم بذاری مثلا 300ms
    })
    .catch((err) => console.error(`Error loading ${url}:`, err));
}

document.addEventListener("DOMContentLoaded", function () {
  loadHTML("header", "header.html", () => {
    runImageSlider();
  });

  loadHTML("content", "content.html", () => {
    runTextSlider();
  });

  loadHTML("footer", "footer.html");
});
  