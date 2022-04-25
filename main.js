/**
 * Change the background color by generating random rbg color by clicking a button
 * Also display the hex code to the disabled input field
 * Add a button to copy the color code
 * Add a toast message when copied
 */

// Step 1 - create onload handler

window.onload = () => {
  main();
};

function main() {
  const root = document.getElementById("root");
  const btn = document.getElementById("change-btn");
  const output = document.getElementById("output");
  const copyBtn = document.getElementById("copy-btn");

  btn.addEventListener("click", function () {
    const bgColor = generateHexColor();
    root.style.backgroundColor = bgColor;
    output.setAttribute("value", `${bgColor}`);
  });

  copyBtn.addEventListener("click", function () {
    navigator.clipboard.writeText(output.getAttribute("value"));
    generateToastMessage(`${output.getAttribute("value")} is Copied`);
  });
}

// step 2 - random color generator function

function generateHexColor() {
  const red = Math.floor(Math.random() * 255).toString(16);
  const green = Math.floor(Math.random() * 255).toString(16);
  const blue = Math.floor(Math.random() * 255).toString(16);
  return `#${red}${green}${blue}`;
}

// step 3 - toast message generator function

function generateToastMessage(msg) {
    let div = document.createElement("div");
    div.innerText = msg;
    div.className = "toast-message";
    document.body.appendChild(div);
    setTimeout(() => {
      div.remove();
    }, 500)
}
