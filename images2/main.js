// main.js

'use strict';

// Image preloading function
function preloadImages(imagesToPreload) {
  imagesToPreload.forEach((imageUrl) => {
    const image = new Image();
    image.src = imageUrl;
  });
}

// Images to preload
const imagesToPreload = [
  '1.png',
  '2.png',
  '3.png',
  '4.png',
  '5.png',
  '6.png',
  '7.png',
  '8.png',
  '9.png',
  '10.png',
  '11.png',
  '12.png',
];

// Call the function to preload images
preloadImages(imagesToPreload);

// Your other JavaScript code...
