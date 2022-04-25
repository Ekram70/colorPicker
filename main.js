/**
 * Change the background color by generating random rbg color by clicking a button
 * Also display the hex code to the disabled input field
 * Add a button to copy the color code
 * Add a toast message when copied
 * User can type their own hex code
 * Remove the # from input of hex
 * Show rgb color and user can copy
 */

// Step 1 - create onload handler

window.onload = () => {
  main();
};

function main() {
  const root = document.getElementById("root");
  const btn = document.getElementById("change-btn");
  const output = document.getElementById("output");
  const output2 = document.getElementById("output2");
  const copyBtn = document.getElementById("copy-btn");
  const copyBtn2 = document.getElementById("copy-btn2");

  btn.addEventListener("click", function () {
    const color = decimalColor();
    const hexColor = generateHexColor(color);
    root.style.backgroundColor = hexColor;
    output.setAttribute("value", `${hexColor.slice(1)}`);
    output.value = hexColor.slice(1);

    const rbgColor = generateRgbColor(color);
    output2.setAttribute("value", `${rbgColor}`);
    output2.value = rbgColor;
  });

  copyBtn.addEventListener("click", function () {
    navigator.clipboard.writeText(output.getAttribute("value"));
    if( isValidHex(output.getAttribute("value")) ){
      generateToastMessage(`${output.getAttribute("value").toUpperCase()} is Copied`);
    }
    else{
      generateToastMessage(`Invalid Color Code!`);
    }
  });

  copyBtn2.addEventListener("click", function () {
    navigator.clipboard.writeText(output2.getAttribute("value"));
    if( isValidHex(output.getAttribute("value")) ){
      generateToastMessage(`${output2.getAttribute("value").toUpperCase()} is Copied`);
    }
    else{
      generateToastMessage(`Invalid Color Code!`);
    }
  });



  output.addEventListener("keyup", function(event){
      const color = event.target.value;
      if( isValidHex(color) ){
        root.style.backgroundColor = `#${color}`;
        output.setAttribute("value", `${color}`);

        output2.setAttribute("value", `${hexToDecimal(color)}`);
        output2.value = hexToDecimal(color);
      }

  });

}

// step 2 - random color generator function

function decimalColor(){
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  return {red,green,blue};
}

function generateHexColor(color) {
  function twoCodeColor(x){
      return x.toString(16).length == 1 ? `0${x.toString(16)}`: x.toString(16);
  }
  return `#${twoCodeColor(color.red)}${twoCodeColor(color.green)}${twoCodeColor(color.blue)}`;
}

function generateRgbColor(color){
  return `Rgb(${color.red},${color.green},${color.blue})`;
}

function hexToDecimal(hex){
    const red = parseInt(hex.slice(0,2), 16);
    const green = parseInt(hex.slice(2,4), 16);
    const blue = parseInt(hex.slice(4), 16);
    return `Rgb(${red},${green},${blue})`
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

// step 4 - Hex color validation function

function isValidHex(color){
  if( color.length == 6){
    return /^[0-9A-Fa-f]{6}$/i.test(color);
  }
  else{
    return false;
  }
}