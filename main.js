let selectedColour = "black";
let selectedHex;

function populateWrapper(noOfItemsPerRow) {
  const wrapperDiv = document.querySelector("#wrapper");
  wrapperDiv.innerHTML = ""; // ensure no previous divs are in wrapper
  for (i = 0; i < noOfItemsPerRow ** 2; i++) {
    let newDiv = document.createElement("div");
    wrapperDiv.appendChild(newDiv);

    // ensures that the divs all fit perfectly, as aspect ratio sets width to equal height
    newDiv.style.height = `${100 / noOfItemsPerRow}%`;
    newDiv.style.backgroundColor = "rgba(255, 255, 255, 0)";
    newDiv.addEventListener("mouseover", () => {
      let regex = /^rgba.*$/i;
      // if backgroundColor is rgba as opposed to rgb
      if (regex.test(newDiv.style.backgroundColor)) {
        let alphaMatches = newDiv.style.backgroundColor
          .split(",")[3]
          .match(/[+-]?\d+(\.\d+)?/g)
          .join("");
        // finds the alpha value of the div, and then adds 10% on to it
        alphaMatches = +alphaMatches + (+alphaMatches < 1 ? 0.1 : 0);
        switch(selectedColour){
          case "black":
            newDiv.style.backgroundColor = `rgba(0, 0, 0, ${alphaMatches})`;
            break;
          case "eraser":
            newDiv.style.backgroundColor = `rgba(255, 255, 255, 0)`
            break;
          case "rainbow":
            newDiv.style.backgroundColor = returnRandomColour() + `${alphaMatches})`;
            break;
          case "custom":
            newDiv.style.backgroundColor = hexToRGB(selectedHex, alphaMatches);
            break;
        }
        
      } else {
        // formats the returned value to be rgb instead of rgba -
        // removes the "a" and replaces last command with a parenthesis
        switch(selectedColour){
          case "black":
            newDiv.style.backgroundColor = `rgb(0, 0, 0)`
            break;
          case "eraser":
            newDiv.style.backgroundColor = `rgba(255, 255, 255, 0)`
            break;
          case "rainbow":
            let tempColor = returnRandomColour().split("");
            tempColor.pop();
            tempColor[tempColor.length - 1] = ")";
            tempColor.splice(3, 1);
            newDiv.style.backgroundColor = tempColor.join("");
            break;
          case "custom":
            newDiv.style.backgroundColor = hexToRGB(selectedHex);
        }
      }
    });
  }
}
function initialiseButton() {
  const button = document.querySelector("#grid");
  const numInput = document.querySelector("input");
  const black = document.querySelector("#black");
  const rainbow = document.querySelector("#rainbow");
  const eraser = document.querySelector("#eraser");
  const color = document.querySelector("#color")

  button.addEventListener("click", () => {
    inputValue = numInput.value;
    if (inputValue < 1 || inputValue > 100) {
      numInput.classList.add("apply-shake");
      button.classList.add("invalid");
    } else {
      populateWrapper(+inputValue);
    }
  });

  numInput.addEventListener("animationend", (e) => {
    numInput.classList.remove("apply-shake");
    button.classList.remove("invalid");
  });

  black.addEventListener("click", () => {
    selectedColour = "black";
  });

  rainbow.addEventListener("click", () => {
    selectedColour = "rainbow";
  });

  eraser.addEventListener("click", () => {
    selectedColour = "eraser";
  });

  color.addEventListener("input", () => {
    selectedColour = "custom"
    selectedHex = color.value;
  });
}

function returnRandomColour() {
  function returnRandomHex() {
    return Math.floor(Math.random() * 255 + 1);
  }

  return `rgba(${returnRandomHex()}, ${returnRandomHex()}, ${returnRandomHex()}, `;
}

function hexToRGB(hex, alpha) {
  let r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}


populateWrapper(16);
initialiseButton();
