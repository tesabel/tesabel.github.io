const images = [
    "0.JPG",
    "1.JPG",
    "2.JPG",
    "3.JPG",
    "4.JPG",
    "5.JPG",
    "6.JPG"
];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");
bgImage.src = `img/${chosenImage}`;
bgImage.classList.add("bg-image");

const overlay = document.createElement("div");
overlay.classList.add("overlay");

document.body.appendChild(bgImage);
document.body.appendChild(overlay);
