const wrapperDiv = document.querySelector("#wrapper");

function populateWrapper(noOfItemsPerRow){
    for(i = 0; i < (noOfItemsPerRow ** 2); i++){
        let newDiv = document.createElement("div");
        wrapperDiv.appendChild(newDiv);
    }
}

populateWrapper(16)