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

        newDiv.style.backgroundColor = returnRandomColour() + `${alphaMatches})`;
      } else {
        // formats the returned value to be rgb instead of rgba -
        // removes the "a" and replaces last command with a parenthesis
        let tempColor = returnRandomColour().split("");
        tempColor.pop();
        tempColor[tempColor.length - 1] = ")";
        tempColor.splice(3, 1);
        newDiv.style.backgroundColor = tempColor.join("");
      }
    });
  }
}
function initialiseButton() {
  const button = document.querySelector("button");
  const numInput = document.querySelector("input");

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
}

function returnRandomColour() {
  function returnRandomHex() {
    return Math.floor(Math.random() * 255 + 1);
  }

  return `rgba(${returnRandomHex()}, ${returnRandomHex()}, ${returnRandomHex()}, `;
}

initialiseButton();
