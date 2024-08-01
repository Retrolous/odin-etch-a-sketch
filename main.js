

function populateWrapper(noOfItemsPerRow){
    const wrapperDiv = document.querySelector("#wrapper");
    wrapperDiv.innerHTML = "";
    for(i = 0; i < (noOfItemsPerRow ** 2); i++){
        let newDiv = document.createElement("div");
        wrapperDiv.appendChild(newDiv);
        newDiv.style.height = `${100 / noOfItemsPerRow}%`
        newDiv.style.backgroundColor = "rgba(255, 255, 255, 0)";
        newDiv.addEventListener("mouseover", () => {
            let regex = /^rgba.*$/i;
            if (regex.test(newDiv.style.backgroundColor)){

                let matches = newDiv.style.backgroundColor.split(",")[3].match(/[+-]?\d+(\.\d+)?/g).join("");

                matches = +matches + (+matches < 1 ? 0.1 : 0);

                newDiv.style.backgroundColor = returnRandomColour() + `${matches})`; 

            } else {
                let tempColor = returnRandomColour().split("")
                tempColor.pop();
                tempColor[tempColor.length - 1] = ")";
                tempColor.splice(3, 1);
                newDiv.style.backgroundColor = tempColor.join("");
            }
        })
    }
}
function initialiseButton(){
    const button = document.querySelector("button");
    const numInput = document.querySelector("input");
    
    button.addEventListener("click", () => {
        inputValue = numInput.value;
        if(inputValue < 1 || inputValue > 100){
            numInput.classList.add("apply-shake");
            button.classList.add("invalid")
        } else {
            populateWrapper(+inputValue);
        }
    })

    numInput.addEventListener("animationend", (e) => {
        numInput.classList.remove("apply-shake");
        button.classList.remove("invalid")
    });
    
}

function returnRandomColour(){

    function returnRandomHex(){
        return Math.floor((Math.random() * 255) + 1);
    }
    
    return `rgba(${returnRandomHex()}, ${returnRandomHex()}, ${returnRandomHex()}, `;
}

initialiseButton()