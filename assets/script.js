const apiKey = "d9c0aaf84487d1a17ce6e646159d3882";
const searchBtn = document.querySelector("#search-button")




function searchValue() {
    let searchValue = document.querySelector("#search-value").value;
    console.log(searchValue);
}



searchBtn.addEventListener("click", searchValue);