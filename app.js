// Global variables

const defaultPresetColors = [
  "#ffcdd2",
  "#f8bbd0",
  "#e1bee7",
  "#ff8a80",
  "#ff80ab",
  "#ea80fc",
  "#b39ddb",
  "#9fa8da",
  "#90caf9",
  "#b388ff",
  "#8c9eff",
  "#82b1ff",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#80d8ff",
  "#84ffff",
  "#a7ffeb",
  "#c8e6c9",
  "#dcedc8",
  "#f0f4c3",
  "#b9f6ca",
  "#ccff90",
  "#ffcc80",
];

const copySound = new Audio("copy-sound.wav");

let customColorString = "";

//Loads the main function and default color when window is loaded

window.onload = () => {
  defaultColor();
  presetColor();
  customColor();
  main();
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
  const colorBox = document.getElementsByClassName("color-box");
  const customColor = document.getElementById("custom-colors");
  const saveColor = document.getElementById("save");

  // handling events
  generateRandomColor.addEventListener("click", handleRandomColor);
  copyToClipBoard.addEventListener("click", handleCopyToClipBoard);
  inputHex.addEventListener("keyup", handleInputHex);

  // sliders event
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

  // all color box events
  for (let i = 0; i < colorBox.length; i++) {
    colorBox[i].addEventListener("click", function () {
      navigator.clipboard.writeText(colorBox[i].getAttribute("value"));
      copySound.volume = 0.2;
      copySound.play();
      generateToastMessage(
        `${colorBox[i].getAttribute("value").toUpperCase()} is Copied`
      );
    });
  }

  saveColor.addEventListener("click", handleCustomColor);

  // callback function for event handlers

  /**
   * handles the click event of random color
   */
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

  /**
   * handles the copy to clipboard click event
   */
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

  /**
   * handles the user input of hex fields keyup event
   */
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
    }
  }
  /**
   * creates a function that takes label and slide as parameter and returns a function to handel slider event
   * @param {HTMLElement} label
   * @param {HTMLElement} slider
   * @returns {Function} function
   */
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

  /**
   * generates custom color and adds that to local storage when the save button button is clicked
   */
  function handleCustomColor() {
    const divElement = document.createElement("div");
    divElement.className = "color-box";
    divElement.style.backgroundColor = `#${inputHex.getAttribute("value")}`;
    divElement.setAttribute("value", `#${inputHex.getAttribute("value")}`);
    if (!customColor.hasChildNodes()) {
      customColor.appendChild(divElement);
    } else if (
      customColor.hasChildNodes() &&
      customColor.firstChild.getAttribute("value") !=
        divElement.getAttribute("value")
    ) {
      customColor.insertBefore(divElement, customColor.firstChild);
    }

    if (customColor.children.length > 12) {
      customColor.lastChild.remove();
    }
    if (
      !customColorString ||
      !customColorString.includes(`#${inputHex.getAttribute("value")}`)
    ) {
      customColorString += ` #${inputHex.getAttribute("value")} `;
    }
    if (customColorString.length > 96) {
      customColorString = customColorString.slice(8);
    }
    localStorage.setItem("customColorString", customColorString.trim());
  }
}
// Utilities functions

/**
 * generates color object in number format
 * @returns {Object} {red, green, blue}
 */
function decimalColor() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  return { red, green, blue };
}
/**
 * takes a color object and generates hex color
 * @param {Object} color
 * @param {number} color.red
 * @param {number} color.green
 * @param {number} color.blue
 * @returns {string} hex color with #
 */
function generateHexColor(color) {
  function twoCodeColor(x) {
    return x.toString(16).length == 1 ? `0${x.toString(16)}` : x.toString(16);
  }
  return `#${twoCodeColor(color.red)}${twoCodeColor(color.green)}${twoCodeColor(
    color.blue
  )}`;
}

/**
 * takes a color object and generates rgb color
 * @param {Object} color
 * @param {number} color.red
 * @param {number} color.green
 * @param {number} color.blue
 * @returns {string} rgb color with braces
 */
function generateRgbColor(color) {
  return `Rgb(${color.red},${color.green},${color.blue})`;
}

/**
 * converts hex to rgb
 * @param {string} hex
 * @returns {string} rgb color with braces
 */
function hexToDecimal(hex) {
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4), 16);
  return `Rgb(${red},${green},${blue})`;
}

/**
 * takes message as input and creates toast message
 * @param {string} msg
 */
function generateToastMessage(msg) {
  let div = document.createElement("div");
  div.innerText = msg;
  div.className = "toast-message";
  document.body.appendChild(div);
  setTimeout(() => {
    div.remove();
  }, 500);
}

/**
 * takes hex color as input and validated the color
 * @param {string} color
 * @returns {boolean}
 */
function isValidHex(color) {
  if (color.length == 6) {
    return /^[0-9A-Fa-f]{6}$/i.test(color);
  } else {
    return false;
  }
}

/**
 * determines which radio button or mode is checked
 * @returns {string} "hex" or "rgb"
 */
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

/**
 * sets the default color when the window is loaded
 */
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

/**
 * Creates Preset Color boxes from Default Preset Color Array
 */
function presetColor() {
  for (let i = 0; i < defaultPresetColors.length; i++) {
    const presetColor = document.getElementById("preset-colors");
    let divElement = document.createElement("div");
    divElement.className = "color-box";
    divElement.style.backgroundColor = defaultPresetColors[i];
    divElement.setAttribute("value", defaultPresetColors[i]);
    presetColor.appendChild(divElement);
  }
}

/**
 * Creates custom Color boxes using local storage
 */
function customColor() {
  const customColor = document.getElementById("custom-colors");

  if (localStorage.getItem("customColorString")) {
    customColorString = localStorage.getItem("customColorString");
    customColorString = customColorString.split(" ").filter((x) => x);
    console.log(customColorString);
    console.log(customColorString);
    for (let i = customColorString.length - 1; i >= 0; i--) {
      let divElement = document.createElement("div");
      divElement.className = "color-box";
      divElement.style.backgroundColor = customColorString[i];
      divElement.setAttribute("value", customColorString[i]);
      customColor.appendChild(divElement);
    }
    customColorString = customColorString.join(" ");
  }
}
