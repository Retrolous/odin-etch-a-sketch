

function populateWrapper(noOfItemsPerRow){
    const wrapperDiv = document.querySelector("#wrapper");
    for(i = 0; i < (noOfItemsPerRow ** 2); i++){
        let newDiv = document.createElement("div");
        wrapperDiv.appendChild(newDiv);
        newDiv.style.height = `${100 / noOfItemsPerRow}%`
        newDiv.addEventListener("mouseover", () => {
        newDiv.classList.add("hovered")
        })
    }
}
function initialiseButton(){
    const button = document.querySelector("button");
    const numInput = document.querySelector("input");
    

    numInput.addEventListener("animationend", (e) => {
        numInput.classList.remove("apply-shake");
    });
    
}
initialiseButton()
populateWrapper(10)
