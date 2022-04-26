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
  generateRandomColor.addEventListener(
    "click",
    handleRandomColor(
      colorDisplay,
      inputHex,
      inputRgb,
      colorRedLabel,
      colorGreenLabel,
      colorBlueLabel,
      colorSliderRed,
      colorSliderGreen,
      colorSliderBlue
    )
  );

  copyToClipBoard.addEventListener(
    "click",
    handleCopyToClipBoard(inputHex, inputRgb)
  );

  inputHex.addEventListener(
    "keyup",
    handleInputHex(
      colorDisplay,
      inputHex,
      inputRgb,
      colorRedLabel,
      colorGreenLabel,
      colorBlueLabel,
      colorSliderRed,
      colorSliderGreen,
      colorSliderBlue
    )
  );

  colorSliderRed.addEventListener(
    "change",
    handleColorSlider(
      colorDisplay,
      inputHex,
      inputRgb,
      colorRedLabel,
      colorSliderRed,
      colorSliderGreen,
      colorSliderBlue,
      colorSliderRed
    )
  );

  colorSliderGreen.addEventListener(
    "change",
    handleColorSlider(
      colorDisplay,
      inputHex,
      inputRgb,
      colorGreenLabel,
      colorSliderRed,
      colorSliderGreen,
      colorSliderBlue,
      colorSliderGreen
    )
  );

  colorSliderBlue.addEventListener(
    "change",
    handleColorSlider(
      colorDisplay,
      inputHex,
      inputRgb,
      colorBlueLabel,
      colorSliderRed,
      colorSliderGreen,
      colorSliderBlue,
      colorSliderBlue
    )
  );
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

// callback function for event handlers

function handleRandomColor(display, hex, rgb, rl, gl, bl, slr, slg, slb) {
  return function () {
    const color = decimalColor();
    const hexColor = generateHexColor(color);
    display.style.backgroundColor = hexColor;
    hex.setAttribute("value", `${hexColor.slice(1)}`);
    hex.value = hexColor.slice(1);

    const rbgColor = generateRgbColor(color);
    rgb.setAttribute("value", `${rbgColor}`);
    rgb.value = rbgColor;

    rl.innerText = color.red;
    gl.innerText = color.green;
    bl.innerText = color.blue;

    slr.value = color.red;
    slg.value = color.green;
    slb.value = color.blue;
  };
}

function handleCopyToClipBoard(hex, rgb) {
  return function () {
    const checkedRadio = isCheckedRadio();
    if (checkedRadio == "hex") {
      navigator.clipboard.writeText(hex.getAttribute("value"));
      if (isValidHex(hex.getAttribute("value"))) {
        generateToastMessage(
          `#${hex.getAttribute("value").toUpperCase()} is Copied`
        );
      } else {
        generateToastMessage(`Invalid Color Code!`);
      }
    } else {
      navigator.clipboard.writeText(rgb.getAttribute("value"));
      if (isValidHex(hex.getAttribute("value"))) {
        generateToastMessage(
          `${rgb.getAttribute("value").toUpperCase()} is Copied`
        );
      } else {
        generateToastMessage(`Invalid Color Code!`);
      }
    }
  };
}

function handleInputHex(display, hex, rgb, rl, gl, bl, slr, slg, slb) {
  return function (event) {
    const color = event.target.value;
    if (isValidHex(color)) {
      display.style.backgroundColor = `#${color}`;
      hex.setAttribute("value", `${color}`);

      rgb.setAttribute("value", `${hexToDecimal(color)}`);
      rgb.value = hexToDecimal(color);

      const red = parseInt(color.slice(0, 2), 16);
      const green = parseInt(color.slice(2, 4), 16);
      const blue = parseInt(color.slice(4), 16);

      rl.innerText = red;
      gl.innerText = green;
      bl.innerText = blue;

      slr.value = red;
      slg.value = green;
      slb.value = blue;
    }
  };
}

function handleColorSlider(display, hex, rgb, l, slr, slg, slb, pref) {
  return function () {
    const red = slr.value;
    const green = slg.value;
    const blue = slb.value;

    display.style.backgroundColor = `rgb(${red},${green},${blue})`;
    rgb.value = `rgb(${red},${green},${blue})`;
    rgb.setAttribute("value", `rgb(${red},${green},${blue})`);
    l.innerText = pref.value;
    hex.value = `${Number(red).toString(16)}${Number(green).toString(
      16
    )}${Number(blue).toString(16)}`;
  };
}
