"use strict";

// Change the values below to your liking
const type = "Mountains";
const accessKey = "Ylxye9W78-qmdBwcTVEmYOgJRM3k6A9_ZxAxygj1FYg";
const localStorageKey = "backgroundImage";

function setBackgroundImage(imageUrl) {
  const img = new Image();
  img.onload = function () {
    document.body.style.backgroundImage = `url(${imageUrl})`;

    // Apply fade-in animation to the entire body
    document.body.style.transition = "opacity 2s"; // Increase duration to 1s
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
