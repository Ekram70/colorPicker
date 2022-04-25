/**
 *Change the background color by generating random rbg color by clicking a button
 */

// Step 1 - create onload handler

window.onload = () => {
  main();
};

function main() {
  const root = document.getElementById("root");
  const btn = document.getElementById("change-btn");

  btn.addEventListener("click", function () {
    const bgColor = generateRgbColor();
    root.style.backgroundColor = bgColor;
  });
}

// step 2 - random color generator function

function generateRgbColor() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  return `rgb(${red},${green},${blue})`;
}
