"use strict";

// Change the values below to your liking
const type = "Mountains";
const accessKey = "Ylxye9W78-qmdBwcTVEmYOgJRM3k6A9_ZxAxygj1FYg";
const localStorageKey = "backgroundImage";

// Function to set the background image with fade-in animation
function setBackgroundImage(imageUrl) {
  // Create a new image object to track loading
  const img = new Image();
  img.onload = function () {
    // Once the image is loaded, set it as the background with fade-in animation
    document.body.style.backgroundImage = `url(${imageUrl})`;

    // Apply fade-in animation
    document.body.style.transition = "opacity 0.7s";
    document.body.style.opacity = 1; // Set opacity to 1 to reveal content
  };
  img.src = imageUrl; // Trigger the loading of the image
}

// Function to fetch image from Unsplash and store it locally
function fetchAndStoreImage() {
  // Fetch photos from Unsplash based on the specified type
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
      // Get the URL of the fetched image
      const imageUrl = data.urls.regular;

      // Set background image and save it to local storage
      setBackgroundImage(imageUrl);
      localStorage.setItem(localStorageKey, imageUrl);
    })
    .catch((error) => {
      // Log and handle errors
      console.error("Error fetching image:", error);
    });
}

// Function to check if today's image is already stored locally
function checkLocalImage() {
  const storedImageUrl = localStorage.getItem(localStorageKey);
  if (storedImageUrl) {
    setBackgroundImage(storedImageUrl);
  } else {
    fetchAndStoreImage();
  }
}

// Set background image once DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  checkLocalImage();
});
