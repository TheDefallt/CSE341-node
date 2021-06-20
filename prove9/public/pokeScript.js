//First and las URL's
const firstURL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=10";
const lastURL = "https://pokeapi.co/api/v2/pokemon?offset=1110&limit=10";

//Placeholders for dynamic URL's
let currentURL = '';
let nextURL = '';
let prevURL = '';

//Page elements
const list = document.getElementById("pokeList");
const firstB = document.getElementById("first");
const prevB = document.getElementById("previous");
const currentB = document.getElementById("current");
const nextB = document.getElementById("next");
const lastB = document.getElementById("last");

console.log("pokeScript");

//Fetch a page by URL (Put this in a model?)
const getPageByURL = url => {
    console.log("Making it here");
    fetch(url)
    .then(response => response.json())
    .then((responseData) => {
        //Clears the list for the next fetch
        list.innerHTML = '';

        //Loops through elements in the response and adds line items to the ul list for each of them
        responseData.results.forEach(element => {
            list.innerHTML += `<li>${element.name}</li>`
        });

        //Sets the url variables to the proper variables for the buttons.
        currentURL = url;
        nextURL = responseData.next;
        prevURL = responseData.previous;
    });
}

//Trigger getPageByURL for the first page
const getFirstPage = () => {
    getPageByURL(firstURL);
}

//Trigger getPageByURL for the previous page
const getPrevPage = () => {
    if (prevURL != null){
        getPageByURL(prevURL);
    }else{
        return;
    }
}

//Trigger getPageByURL for the current page
const getCurrentPage = () => {
    getPageByURL(currentURL);
}

//Trigger getPageByURL for the next page
const getNextPage = () => {
    if (nextURL != null){
        getPageByURL(nextURL);
    }else{
        return;
    }
}

//Trigger getPageByURL for the last page
const getLastPage = () => {
    getPageByURL(lastURL);
}

//Initialize page with first URL
getPageByURL(firstURL);

//Add event listeners to each button for their various functions.
firstB.addEventListener('click', getFirstPage);
prevB.addEventListener('click', getPrevPage);
currentB.addEventListener('click', getCurrentPage);
nextB.addEventListener('click', getNextPage);
lastB.addEventListener('click', getLastPage);