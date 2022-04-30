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
  const bgPreview = document.getElementById("bg-preview");
  const uploadBtn = document.getElementById("bg-file-upload-btn");
  const fileInput = document.getElementById("bg-file-input");
  const removeBtn = document.getElementById("bg-file-remove-btn");
  const bgSize = document.getElementById("bg-size");
  const bgRepeat = document.getElementById("bg-repeat");
  const bgPosition = document.getElementById("bg-position");
  const bgAttachment = document.getElementById("bg-attachment");

  // handling events
  generateRandomColor.addEventListener("click", handleRandomColor);
  copyToClipBoard.addEventListener(
    "click",
    handleCopyToClipBoard(inputHex.value, inputRgb.value)
  );
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
    colorBox[i].addEventListener("click", handleColorBoxes(colorBox[i]));
  }

  saveColor.addEventListener("click", handleCustomColor);

  // upload reomve btn
  uploadBtn.addEventListener("click", function () {
    fileInput.click();
  });
  fileInput.addEventListener("change", handleFileInput);
  removeBtn.addEventListener("click", handleRemoveBtn);

  // background events
  bgSize.addEventListener("change", function () {
    document.body.style.backgroundSize = bgSize.value;
  });
  bgRepeat.addEventListener("change", function () {
    document.body.style.backgroundRepeat = bgRepeat.value;
  });
  bgPosition.addEventListener("change", function () {
    document.body.style.backgroundPosition = bgPosition.value;
  });
  bgAttachment.addEventListener("change", function () {
    document.body.style.backgroundAttachment = bgAttachment.value;
  });

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

    slidersAndLabels(color.red, color.green, color.blue);
  }

  /**
   * handles the copy to clipboard click event
   */
  function handleCopyToClipBoard(inputHex, inputRgb) {
    return function () {
      const checkedRadio = isCheckedRadio();
      if (checkedRadio == "hex") {
        navigator.clipboard.writeText(inputHex);
        if (isValidHex(inputHex)) {
          generateToastMessage(`#${inputHex.toUpperCase()} is Copied`);
        } else {
          generateToastMessage(`Invalid Color Code!`);
        }
      } else {
        navigator.clipboard.writeText(inputRgb);
        if (isValidHex(inputHex)) {
          generateToastMessage(`${inputRgb.toUpperCase()} is Copied`);
        } else {
          generateToastMessage(`Invalid Color Code!`);
        }
      }
    };
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

      slidersAndLabels(red, green, blue);
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

    divElement.addEventListener("click", handleColorBoxes(divElement));

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

  /**
   * creates image url from input and sets it to the background
   */
  function handleFileInput(event) {
    const bgPreview = document.getElementById("bg-preview");
    const imageUrl = URL.createObjectURL(event.target.files[0]);
    bgPreview.style.background = `url(${imageUrl})`;
    document.body.style.background = `url(${imageUrl})`;
  }

  /**
   * removes the image and sets default bg color
   */
  function handleRemoveBtn() {
    bgPreview.style.background = "none";
    document.body.style.background = "none";
    bgPreview.style.backgroundColor = "#dddeee";
    document.body.style.backgroundColor = "#dddeee";
    fileInput.value = null;
  }

  /**
   * takes an color box div and adds functionality
   * @param {HTMLElement} element
   * @returns
   */
  function handleColorBoxes(element) {
    return function () {
      playSound();

      const hexColor = element.getAttribute("value");
      const red = parseInt(hexColor.slice(1).slice(0, 2), 16);
      const green = parseInt(hexColor.slice(1).slice(2, 4), 16);
      const blue = parseInt(hexColor.slice(1).slice(4), 16);
      const rgbColor = `rgb(${red},${green}, ${blue})`;

      colorDisplay.style.backgroundColor = hexColor;
      inputHex.value = hexColor.slice(1);
      inputHex.setAttribute("value", hexColor.slice(1));

      inputRgb.value = rgbColor;
      inputRgb.setAttribute("value", rgbColor);
      slidersAndLabels(red, green, blue);

      handleCopyToClipBoard(inputHex.value, inputRgb.value)();
    };
  }

  /**
   * handles slider and labels
   * @param {Number} red
   * @param {Number} green
   * @param {Number} blue
   */
  function slidersAndLabels(red, green, blue) {
    colorRedLabel.innerText = red;
    colorGreenLabel.innerText = green;
    colorBlueLabel.innerText = blue;

    colorSliderRed.value = red;
    colorSliderGreen.value = green;
    colorSliderBlue.value = blue;
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
 * @param {string} hex without #
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

/**
 * volume down and play audio
 */
function playSound() {
  copySound.volume = 0.2;
  copySound.play();
}
