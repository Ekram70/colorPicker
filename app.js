//Loads the main function and default color when window is loaded

window.onload = () => {
  main();
  defaultColor();
};

function main() {
  //Getting All the Dom reference
  const generateRandomColor = document.getElementById("generate-random-color");
  const colorDisplay = document.getElementById("color-display");
  const inputHex = document.getElementById("input-hex");
  const inputRgb = document.getElementById("input-rgb");
  const copyToClipBoard = document.getElementById("copy-to-clipboard");
  const colorRedLabel = document.getElementById("color-slider-red-label");
  const colorGreenLabel = document.getElementById("color-slider-green-label");
  const colorBlueLabel = document.getElementById("color-slider-blue-label");
  const colorSliderRed = document.getElementById("color-slider-red");
  const colorSliderGreen = document.getElementById("color-slider-green");
  const colorSliderBlue = document.getElementById("color-slider-blue");

  // handling events
  generateRandomColor.addEventListener("click", handleRandomColor);
  copyToClipBoard.addEventListener("click", handleCopyToClipBoard);
  inputHex.addEventListener("keyup", handleInputHex);
  colorSliderRed.addEventListener(
    "input",
    handleColorSlider(colorRedLabel, colorSliderRed)
  );
  colorSliderGreen.addEventListener(
    "input",
    handleColorSlider(colorGreenLabel, colorSliderGreen)
  );
  colorSliderBlue.addEventListener(
    "input",
    handleColorSlider(colorBlueLabel, colorSliderBlue)
  );

  // callback function for event handlers
  function handleRandomColor() {
    const color = decimalColor();
    const hexColor = generateHexColor(color);
    colorDisplay.style.backgroundColor = hexColor;
    inputHex.setAttribute("value", `${hexColor.slice(1)}`);
    inputHex.value = hexColor.slice(1);

    const rbgColor = generateRgbColor(color);
    inputRgb.setAttribute("value", `${rbgColor}`);
    inputRgb.value = rbgColor;

    colorRedLabel.innerText = color.red;
    colorGreenLabel.innerText = color.green;
    colorBlueLabel.innerText = color.blue;

    colorSliderRed.value = color.red;
    colorSliderGreen.value = color.green;
    colorSliderBlue.value = color.blue;
  }

  function handleCopyToClipBoard() {
    const checkedRadio = isCheckedRadio();
    if (checkedRadio == "hex") {
      navigator.clipboard.writeText(inputHex.getAttribute("value"));
      if (isValidHex(inputHex.getAttribute("value"))) {
        generateToastMessage(
          `#${inputHex.getAttribute("value").toUpperCase()} is Copied`
        );
      } else {
        generateToastMessage(`Invalid Color Code!`);
      }
    } else {
      navigator.clipboard.writeText(inputRgb.getAttribute("value"));
      if (isValidHex(inputHex.getAttribute("value"))) {
        generateToastMessage(
          `${inputRgb.getAttribute("value").toUpperCase()} is Copied`
        );
      } else {
        generateToastMessage(`Invalid Color Code!`);
      }
    }
  }

  function handleInputHex(event) {
    const color = event.target.value;
    if (isValidHex(color)) {
      colorDisplay.style.backgroundColor = `#${color}`;
      inputHex.setAttribute("value", `${color}`);

      inputRgb.setAttribute("value", `${hexToDecimal(color)}`);
      inputRgb.value = hexToDecimal(color);

      const red = parseInt(color.slice(0, 2), 16);
      const green = parseInt(color.slice(2, 4), 16);
      const blue = parseInt(color.slice(4), 16);

      colorRedLabel.innerText = red;
      colorGreenLabel.innerText = green;
      colorBlueLabel.innerText = blue;

      colorSliderRed.value = red;
      colorSliderGreen.value = green;
      colorSliderBlue.value = blue;

      console.log(color);
    }
  }

  function handleColorSlider(label, slider) {
    return function () {
      const red = colorSliderRed.value;
      const green = colorSliderGreen.value;
      const blue = colorSliderBlue.value;

      colorDisplay.style.backgroundColor = `rgb(${red},${green},${blue})`;
      inputRgb.value = `rgb(${red},${green},${blue})`;
      inputRgb.setAttribute("value", `rgb(${red},${green},${blue})`);
      label.innerText = slider.value;

      const hex = {
        red: Number(red),
        green: Number(green),
        blue: Number(blue),
      };
      inputHex.value = generateHexColor(hex).slice(1);
      inputHex.setAttribute("value", generateHexColor(hex).slice(1));
    };
  }
}

// Utilities functions

function decimalColor() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  return { red, green, blue };
}

function generateHexColor(color) {
  function twoCodeColor(x) {
    return x.toString(16).length == 1 ? `0${x.toString(16)}` : x.toString(16);
  }
  return `#${twoCodeColor(color.red)}${twoCodeColor(color.green)}${twoCodeColor(
    color.blue
  )}`;
}

function generateRgbColor(color) {
  return `Rgb(${color.red},${color.green},${color.blue})`;
}

function hexToDecimal(hex) {
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4), 16);
  return `Rgb(${red},${green},${blue})`;
}

function generateToastMessage(msg) {
  let div = document.createElement("div");
  div.innerText = msg;
  div.className = "toast-message";
  document.body.appendChild(div);
  setTimeout(() => {
    div.remove();
  }, 500);
}

function isValidHex(color) {
  if (color.length == 6) {
    return /^[0-9A-Fa-f]{6}$/i.test(color);
  } else {
    return false;
  }
}

function isCheckedRadio() {
  let checked = "";
  const colorMode = document.getElementsByClassName("color-mode");
  if (colorMode[0].checked) {
    checked = "hex";
  } else {
    checked = "rgb";
  }
  return checked;
}

function defaultColor() {
  const color = {
    red: 221,
    green: 222,
    blue: 238,
  };
  const hexColor = generateHexColor(color).slice(1);
  const rgbColor = generateRgbColor(color);

  document.getElementById("color-display").style.backgroundColor = hexColor;
  document.getElementById("input-hex").value = hexColor;
  document.getElementById("input-rgb").value = rgbColor;
  document.getElementById("input-hex").setAttribute("value", hexColor);
  document.getElementById("input-rgb").setAttribute("value", rgbColor);
}
