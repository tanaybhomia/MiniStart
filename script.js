"use strict";

// Change values according to your liking
const name = "Tanay";
const city = "Mumbai";

// Change the values below to your liking
const type = "River";
const accessKey = "Ylxye9W78-qmdBwcTVEmYOgJRM3k6A9_ZxAxygj1FYg";
const localStorageKey = "backgroundImage";

function setBackgroundImage(imageUrl) {
  const img = new Image();
  img.onload = function () {
    document.body.style.backgroundImage = `url(${imageUrl})`;

    document.body.style.transition = "opacity 2s";
    document.body.style.opacity = 1;
  };
  img.src = imageUrl;
}

function fetchAndStoreImage() {
  fetch(
    `https://api.unsplash.com/photos/random?query=${type}&client_id=${accessKey}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const imageUrl = data.urls.regular;

      setBackgroundImage(imageUrl);
      localStorage.setItem(localStorageKey, imageUrl);
    })
    .catch((error) => {
      console.error("Error fetching image:", error);
    });
}

function checkLocalImage() {
  const storedImageUrl = localStorage.getItem(localStorageKey);
  if (storedImageUrl) {
    setBackgroundImage(storedImageUrl);
  } else {
    fetchAndStoreImage();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = 0;

  checkLocalImage();
});

// Updating Clock
function updateTime() {
  var now = new Date();

  var hours = ("0" + now.getHours()).slice(-2);
  var minutes = ("0" + now.getMinutes()).slice(-2);

  document.getElementById("currentTime").innerText = hours + ":" + minutes;
}
updateTime();

function startClock() {
  setInterval(updateTime, 1000);
}
startClock();

// Updating greetings
const greetings = [
  "Hello ",
  "Find a way ",
  "Have a nice day ",
  "Stay positive ",
  "Work hard ",
];
const names = "Tanay";

function getRandomGreeting() {
  const randomIndex = Math.floor(Math.random() * greetings.length);
  return greetings[randomIndex];
}
function updateTimeAndGreetings() {
  const now = new Date();
  const currentHour = now.getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }
  const randomGreeting = getRandomGreeting();

  const combinedGreeting = `${randomGreeting}, ${names}!`;
  document.getElementById("greetings").textContent = combinedGreeting;
}

updateTimeAndGreetings();
setInterval(updateTimeAndGreetings, 60000);

// Updating Quotes
function fetchRandomQuote() {
  fetch("https://api.quotable.io/random")
    .then((response) => response.json())
    .then((data) => {
      const quoteElement = document.getElementById("randomquote");
      quoteElement.innerText = `"${data.content}"`;
    })
    .catch((error) => {
      console.error("Error fetching quote:", error);
    });
}
fetchRandomQuote();
